import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

// Simple components
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-md font-medium transition ${className}`}
  >
    {children}
  </button>
);

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(item.product._id);
    } else {
      updateQuantity(item.product._id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(item.product._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/products/${item.product._id}`}>
            <img
              src={item.product.images?.[0] || '/vite.svg'}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition"
              onError={(e) => {
                e.target.src = '/vite.svg';
              }}
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-2 md:mb-0">
              <Link 
                to={`/products/${item.product._id}`}
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
              >
                {item.product.name}
              </Link>
              <p className="text-gray-600 text-sm mt-1">{item.product.category}</p>
              <p className="text-green-600 font-bold text-lg mt-1">${item.product.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100 rounded-l-lg"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 border-x bg-gray-50 min-w-[60px] text-center">
                  {item.quantity}
                </span>
                <Button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100 rounded-r-lg"
                  disabled={item.quantity >= item.product.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={handleRemove}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                title="Remove from cart"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Item Total */}
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {item.quantity} × ${item.product.price}
            </span>
            <span className="font-bold text-lg text-gray-800">
              ${(item.quantity * item.product.price).toFixed(2)}
            </span>
          </div>

          {/* Stock Warning */}
          {item.quantity >= item.product.stock && (
            <p className="text-orange-600 text-sm mt-2">
              ⚠️ Maximum available quantity reached
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const { items, itemsCount, totalPrice, clearCart } = useCart();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page (we'll create this next)
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button
            onClick={() => navigate('/products')}
            className="mb-6 bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Products
          </Button>

          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/products')}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Continue Shopping
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">
              Shopping Cart ({itemsCount} {itemsCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          
          <Button
            onClick={handleClearCart}
            className="text-red-600 hover:bg-red-50 border border-red-300"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.map(item => (
              <CartItem key={item.product._id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemsCount} items)</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">
                    ${(totalPrice + totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-lg font-semibold"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-3 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  🔒 Secure checkout with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You might also like</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600 text-center">
              Recommended products will appear here based on your cart items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;