"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Footer from "@/components/landing/Footer";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register", formData);
      setMessage(res.data.message);

      if (res.status === 200) {
        // Automatically sign in after successful registration
        const signInRes = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (signInRes?.ok) {
          window.location.href = "/onboarding";
        } else {
          setMessage("Signup succeeded, but auto login failed.");
          setLoading(false);
        }
      }
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Something went wrong!";
      setMessage(errMsg);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
            Create an Account
          </h2>

          {message && (
            <p className="text-center text-green-700 text-sm mb-4">{message}</p>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 hover:cursor-pointer transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
                className="mt-4 flex items-center gap-3 px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition cursor-pointer"
              >
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
                  width={24}
                  height={24}
                  alt="Google icon"
                />
                <span className="font-medium text-sm sm:text-base">
                  Login with Google
                </span>
              </button>
            </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
