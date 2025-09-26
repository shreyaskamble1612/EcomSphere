import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
// Admin pages
import Dashboard from "./pages/Admin/Dashboard";
import ProductsManagement from "./pages/Admin/ProductsManagement";
import ProductForm from "./pages/Admin/ProductForm";
import UsersManagement from "./pages/Admin/UsersManagement";


const App = () => {
    return (
       <BrowserRouter>
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/register" element={<SignUp />} />
               <Route path="/products" element={<Products />} />
               <Route path="/products/:id" element={<ProductDetail />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/checkout" element={<Checkout />} />
               <Route path="/profile" element={<Profile />} />
               
               {/* Admin Routes */}
               <Route path="/admin/dashboard" element={<Dashboard />} />
               <Route path="/admin/products" element={<ProductsManagement />} />
               <Route path="/admin/products/new" element={<ProductForm />} />
               <Route path="/admin/products/:id/edit" element={<ProductForm />} />
               <Route path="/admin/users" element={<UsersManagement />} />
           </Routes>
       </BrowserRouter>
    )
}
export default App;