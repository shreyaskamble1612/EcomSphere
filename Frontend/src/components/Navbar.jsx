import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AivoraAI
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/orders" className="hover:text-blue-600">Orders</Link>
          <Link to="/admin" className="hover:text-blue-600">Admin</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="default">
              <User className="h-4 w-4 mr-2" /> Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
