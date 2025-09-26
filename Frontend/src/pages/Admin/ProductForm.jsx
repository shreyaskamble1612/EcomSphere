import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
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
    className={`border px-3 py-2 rounded-md outline-none w-full ${className}`}
  >
    {children}
  </select>
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`border px-3 py-2 rounded-md outline-none w-full resize-vertical ${className}`}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
    isActive: true
  });
  const [errors, setErrors] = useState({});

  const categories = [
    'Electronics',
    'Fashion', 
    'Home Appliances',
    'Sports',
    'Books',
    'Beauty',
    'Other'
  ];

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  // Fetch product data if editing
  useEffect(() => {
    if (isEditing && user?.role === 'admin') {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/api/products/${id}`);
          const data = await response.json();

          if (data.success) {
            const product = data.product;
            setFormData({
              name: product.name,
              description: product.description,
              price: product.price.toString(),
              category: product.category,
              stock: product.stock.toString(),
              images: product.images || [],
              isActive: product.isActive
            });
          } else {
            alert('Product not found');
            navigate('/admin/products');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          alert('Error loading product');
          navigate('/admin/products');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, isEditing, navigate, user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageAdd = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl && imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }));
    }
  };

  const handleImageRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        images: formData.images,
        isActive: formData.isActive
      };

      const url = isEditing 
        ? `http://localhost:5000/api/admin/products/${id}`
        : 'http://localhost:5000/api/admin/products';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (data.success) {
        alert(`Product ${isEditing ? 'updated' : 'created'} successfully!`);
        navigate('/admin/products');
      } else {
        alert(data.message || `Failed to ${isEditing ? 'update' : 'create'} product`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert(`Error ${isEditing ? 'updating' : 'creating'} product`);
    } finally {
      setSaving(false);
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
          <div className="text-xl">Loading product...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/admin/products"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Update product information' : 'Create a new product for your store'}
          </p>
        </div>

        {/* Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={errors.category ? 'border-red-500' : ''}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Inventory</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <Input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={errors.price ? 'border-red-500' : ''}
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <Input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className={errors.stock ? 'border-red-500' : ''}
                  />
                  {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h2>
              
              <div className="space-y-4">
                <Button
                  type="button"
                  onClick={handleImageAdd}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Add Image URL
                </Button>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                          onError={(e) => {
                            e.target.src = '/vite.svg';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleImageRemove(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
              </div>
            </div>

            {/* Status */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Status</h2>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Product is active and visible to customers</span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving 
                  ? (isEditing ? 'Updating...' : 'Creating...') 
                  : (isEditing ? 'Update Product' : 'Create Product')
                }
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProductForm;