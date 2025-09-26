import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Users as UsersIcon, 
  Shield,
  User,
  ArrowLeft,
  Mail,
  Calendar
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

// Simple components
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-md font-medium transition ${className}`}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`border px-3 py-2 rounded-md outline-none w-full ${className}`}
  />
);

const Select = ({ children, className = "", ...props }) => (
  <select
    {...props}
    className={`border px-3 py-2 rounded-md outline-none ${className}`}
  >
    {children}
  </select>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);

// Mock users data (replace with actual API call)
const mockUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20',
    isActive: true
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-19',
    isActive: true
  },
  {
    _id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    createdAt: '2024-01-12',
    lastLogin: '2024-01-18',
    isActive: false
  },
  {
    _id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'user',
    createdAt: '2024-01-08',
    lastLogin: '2024-01-17',
    isActive: true
  },
  {
    _id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'user',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-16',
    isActive: true
  }
];

const UsersManagement = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    sort: 'createdAt',
    order: 'desc'
  });

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  // Fetch users (mock implementation)
  const fetchUsers = React.useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredUsers = [...mockUsers];
      
      // Apply search filter
      if (filters.search) {
        filteredUsers = filteredUsers.filter(u => 
          u.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          u.email.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      // Apply role filter
      if (filters.role) {
        filteredUsers = filteredUsers.filter(u => u.role === filters.role);
      }
      
      // Apply sorting
      filteredUsers.sort((a, b) => {
        const aValue = a[filters.sort];
        const bValue = b[filters.sort];
        const order = filters.order === 'desc' ? -1 : 1;
        
        if (aValue < bValue) return -1 * order;
        if (aValue > bValue) return 1 * order;
        return 0;
      });
      
      setUsers(filteredUsers);
    } catch (err) {
      setError('Error fetching users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [fetchUsers, user]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      // Mock API call
      console.log(`Changing user ${userId} role to ${newRole}`);
      
      // Update local state
      setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
      ));
      
      alert('User role updated successfully!');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Error updating user role');
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const action = currentStatus ? 'deactivate' : 'activate';
    
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    try {
      // Mock API call
      console.log(`${action} user ${userId}`);
      
      // Update local state
      setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u, isActive: !currentStatus } : u
      ));
      
      alert(`User ${action}d successfully!`);
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      alert(`Error ${action}ing user`);
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading users...</div>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
                <p className="text-gray-600">Manage user accounts and permissions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Total Users: {users.length}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <Select
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <Select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              >
                <option value="createdAt">Join Date</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="lastLogin">Last Login</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Order</label>
              <Select
                value={filters.order}
                onChange={(e) => handleFilterChange('order', e.target.value)}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </Select>
            </div>
          </div>
        </Card>

        {/* Users Table */}
        {error ? (
          <Card className="p-6">
            <div className="text-center text-red-600 py-8">
              <UsersIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg mb-4">{error}</p>
              <Button 
                onClick={fetchUsers}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Try Again
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  All Users ({users.length})
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Join Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Login</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map(userData => (
                    <tr key={userData._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{userData.name}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail className="w-3 h-3 mr-1" />
                              {userData.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {userData.role === 'admin' ? (
                            <Shield className="w-4 h-4 text-red-500 mr-2" />
                          ) : (
                            <User className="w-4 h-4 text-blue-500 mr-2" />
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            userData.role === 'admin' 
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {userData.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(userData.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(userData.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          userData.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {userData.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {/* Role Change */}
                          <Select
                            value={userData.role}
                            onChange={(e) => handleRoleChange(userData._id, e.target.value)}
                            className="text-sm"
                            disabled={userData._id === user?.id} // Prevent self role change
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </Select>
                          
                          {/* Status Toggle */}
                          <Button
                            onClick={() => handleToggleUserStatus(userData._id, userData.isActive)}
                            disabled={userData._id === user?.id} // Prevent self deactivation
                            className={`text-xs px-2 py-1 ${
                              userData.isActive
                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {userData.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;