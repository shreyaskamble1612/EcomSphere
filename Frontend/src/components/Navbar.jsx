import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, Settings, LogOut, ChevronDown } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from "./ui/sheet";
import React from "react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { itemsCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-semibold text-lg">EcomSphere</span>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-lg mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2 rounded-md"
            />
            <Button 
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-sm hover:opacity-80">
            Products
          </Link>
          
          {user ? (
            <>
              {/* Cart */}
              <Link to="/cart" className="relative text-sm hover:opacity-80 flex items-center gap-1">
                <ShoppingCart className="w-4 h-4" />
                Cart
                {itemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {itemsCount}
                  </span>
                )}
              </Link>
              
              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
                
                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      {/* Profile Header */}
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      
                      {/* Profile Settings */}
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile Settings
                      </Link>
                      
                      {/* Admin Dashboard */}
                      {user.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      
                      {/* Logout */}
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:opacity-80">
                Login
              </Link>
              <Button asChild size="sm">
                <Link to="/products">Shop Now</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>EcomSphere</SheetTitle>
              </SheetHeader>
              
              {/* Mobile Search */}
              <div className="mt-6">
                <form onSubmit={handleSearch} className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-12"
                  />
                  <Button 
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </form>
              </div>
              
              <div className="mt-6 grid gap-3">
                <Button asChild variant="ghost" className="justify-start">
                  <Link to="/products">Products</Link>
                </Button>
                
                {user ? (
                  <>
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Hello, {user.name}</p>
                        <p className="text-xs text-gray-500">Welcome back!</p>
                      </div>
                    </div>
                    
                    {/* Admin Dashboard */}
                    {user.role === 'admin' && (
                      <Button asChild variant="ghost" className="justify-start">
                        <Link to="/admin/dashboard">
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Panel
                        </Link>
                      </Button>
                    )}
                    
                    {/* Cart */}
                    <Button asChild variant="ghost" className="justify-start">
                      <Link to="/cart">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Cart {itemsCount > 0 && `(${itemsCount})`}
                      </Link>
                    </Button>
                    
                    {/* Logout */}
                    <Button variant="ghost" className="justify-start" onClick={logout}>
                      <User className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link to="/cart">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Cart {itemsCount > 0 && `(${itemsCount})`}
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link to="/products">Shop Now</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;