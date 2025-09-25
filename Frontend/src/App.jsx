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
           </Routes>
       </BrowserRouter>
    )
}
export default App;