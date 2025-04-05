"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("/api/auth/register", formData);
      setMessage(res.data.message);

      if (res.status === 200) {
        setTimeout(() => {
          window.location.href = "/login"; // or "/auth-pages/login"
        }, 2000);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong! Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-bold text-center text-green-400">Sign Up</h2>

        {message && <p className="text-center text-red-400 mt-2">{message}</p>}

        <form onSubmit={handleSignup} className="mt-4">
          <div className="mb-3">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="w-full bg-green-500 py-2 rounded hover:bg-green-600">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account? <Link href="/login" className="text-blue-400">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
