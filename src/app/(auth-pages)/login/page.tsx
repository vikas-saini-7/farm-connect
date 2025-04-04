"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/landing/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });
    // Add authentication logic here
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-bold text-center text-green-400">Login</h2>

        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-green-500 py-2 rounded hover:bg-green-600">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account? <Link href="/signup" className="text-blue-400">Sign up</Link>
        </p>
      </motion.div>
      
    </div>
    <Footer/>
    </>

  );
};

export default Login;
