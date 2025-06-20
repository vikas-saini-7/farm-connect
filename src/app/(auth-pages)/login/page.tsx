"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });


    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/onboarding");
      setLoading(false);
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
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 hover:cursor-pointer transition"
            >
              {loading ? "logging In..." : "Log In"}
            </button>
          </form>
          <button
            onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
            className="mt-4 mx-auto flex items-center gap-3 px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition cursor-pointer"
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

          <p className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
