import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/home")}>
          MyShop
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-grow p-2 rounded-l-md text-black"
          />
          <button className="bg-yellow-400 px-4 py-2 rounded-r-md text-black font-semibold">
            Search
          </button>
        </div>

        {/* Auth Buttons */}
        {token ? (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="ml-4 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        )}
      </header>

      {/* Hero Banner */}
      <section className="bg-yellow-300 p-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to MyShop</h1>
        <p className="text-lg">Your one-stop destination for amazing products!</p>
      </section>

      {/* Demo Products */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { id: 1, name: "Smartphone", price: "$299", img: "https://via.placeholder.com/200" },
          { id: 2, name: "Headphones", price: "$99", img: "https://via.placeholder.com/200" },
          { id: 3, name: "Laptop", price: "$799", img: "https://via.placeholder.com/200" },
          { id: 4, name: "Smartwatch", price: "$199", img: "https://via.placeholder.com/200" },
        ].map((product) => (
          <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
            <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-6">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </footer>
    </div>
  );
}
