import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

// Simple components
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-md font-medium transition ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);

const StatCard = ({ title, value, icon, color = "blue" }) => {
  const IconComponent = icon;
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
        </div>
        <IconComponent className={`w-8 h-8 text-${color}-600`} />
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch products for stats and recent products
        const productsResponse = await fetch('http://localhost:5000/api/products?limit=5');
        const productsData = await productsResponse.json();
        
        if (productsData.success) {
          setRecentProducts(productsData.products);
          setStats(prev => ({
            ...prev,
            totalProducts: productsData.pagination?.totalProducts || 0
          }));
        }

        // Mock data for other stats (you can implement these endpoints later)
        setStats(prev => ({
          ...prev,
          totalUsers: 156,
          totalOrders: 89,
          totalRevenue: 12450.50
        }));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}! Here's what's happening with your store.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            color="blue"
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            color="green"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            color="purple"
          />
          <StatCard
            title="Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            color="yellow"
          />
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/products/new"
              className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
            >
              <Plus className="w-5 h-5 text-blue-600 mr-3" />
              <span className="font-medium text-blue-800">Add New Product</span>
            </Link>
            
            <Link
              to="/admin/products"
              className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition"
            >
              <Package className="w-5 h-5 text-green-600 mr-3" />
              <span className="font-medium text-green-800">Manage Products</span>
            </Link>
            
            <Link
              to="/admin/users"
              className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
            >
              <Users className="w-5 h-5 text-purple-600 mr-3" />
              <span className="font-medium text-purple-800">Manage Users</span>
            </Link>
          </div>
        </Card>

        {/* Recent Products */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Products</h2>
            <Link
              to="/admin/products"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentProducts.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img
                          src={product.images?.[0] || '/vite.svg'}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded mr-3"
                          onError={(e) => {
                            e.target.src = '/vite.svg';
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-800">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.category}</td>
                    <td className="px-4 py-3 font-medium text-green-600">${product.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.stock > 10 
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/products/${product._id}`}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          title="View Product"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Delete Product"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this product?')) {
                              // Implement delete functionality
                              alert('Delete functionality will be implemented');
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;