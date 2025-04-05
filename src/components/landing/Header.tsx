'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-green-600 via-lime-500 to-yellow-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-white text-2xl font-extrabold tracking-wide font-serif">
          <Link href="/">🌾 FarmConnect</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-white font-medium text-lg">
          <Link href="/" className="hover:text-yellow-100 transition duration-200">Home</Link>
          <Link href="/marketplace" className="hover:text-yellow-100 transition duration-200">Marketplace</Link>
          <Link href="/farmer" className="hover:text-yellow-100 transition duration-200">Farmer</Link>
          <Link href="/buyer" className="hover:text-yellow-100 transition duration-200">Buyer</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="space-x-4 hidden md:flex">
          <Link href="/login">
            <button className="bg-white text-green-700 px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-100 transition duration-200">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-yellow-300 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-yellow-400 transition duration-200">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-700 text-white px-6 py-4 space-y-2 font-medium">
          <Link href="/" className="block hover:text-yellow-200">Home</Link>
          <Link href="/marketplace" className="block hover:text-yellow-200">Marketplace</Link>
          <Link href="/farmer" className="block hover:text-yellow-200">Farmer</Link>
          <Link href="/buyer" className="block hover:text-yellow-200">Buyer</Link>
          <div className="pt-2">
            <Link href="/login" className="block hover:text-yellow-300">Login</Link>
            <Link href="/signup" className="block hover:text-yellow-300">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  )
}
