import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home"

function privateRoute({children}){
    const token = localStorage.getItem("token");
    if(!token){
        return <Login />
    }
    return children;
}
const App = () => {
    return (
       <BrowserRouter>
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/home" element={
                   <privateRoute>
                       <Home />
                   </privateRoute>
               } />
           </Routes>
       </BrowserRouter>
    )
}
export default App;