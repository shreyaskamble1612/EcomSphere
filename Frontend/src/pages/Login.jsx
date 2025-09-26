import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      
      // Store token
      localStorage.setItem("token", res.data.token);
      
      // Fetch user data
      const userResponse = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${res.data.token}`
        }
      });
      
      // Update context with user data
      login(userResponse.data.user);
      
      alert("Welcome! You are now logged in.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in");
      console.log(err)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange}
          className="w-full p-2 border rounded mb-3" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange}
          className="w-full p-2 border rounded mb-3" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
