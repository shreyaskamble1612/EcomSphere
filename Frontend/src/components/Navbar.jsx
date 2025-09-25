import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React from "react";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { itemsCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-3">
        
        {/* Logo */}
        <h1
          className="text-2xl font-extrabold cursor-pointer"
          onClick={() => navigate("/")}
        >
          EcomSphere
        </h1>

        {/* Search Bar */}
        <div className="flex flex-1 w-full md:w-auto mx-0 md:mx-6">
          <Input type="text" placeholder="Search for products..." />
          <Button className="bg-yellow-400 text-black ml-2 hover:bg-yellow-500">
            <Search className="w-5 h-5 inline" />
          </Button>
        </div>

        {/* Right Side: Auth + Cart */}
        <div className="flex items-center space-x-6 text-sm">
          {user ? (
            <>
              {/* 👤 Show username when logged in */}
              <span className="font-medium">Hello, {user.name}</span>
              {/* 🚪 Logout button */}
              <Button
                onClick={logout}
                className="flex items-center gap-1 bg-transparent hover:text-yellow-300"
              >
                <User className="w-5 h-5" /> Logout
              </Button>
            </>
          ) : (
            /* 🔑 Show Login button when not logged in */
            <Button className="flex items-center gap-1 bg-transparent hover:text-yellow-300">
              <User className="w-5 h-5" /> <Link to="/login">Login</Link>
            </Button>
          )}

          {/* 🛒 Cart is always visible */}
          <Button className="flex items-center gap-1 bg-transparent hover:text-yellow-300 relative">
            <ShoppingCart className="w-5 h-5" /> 
            <Link to="/cart">Cart</Link>
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;