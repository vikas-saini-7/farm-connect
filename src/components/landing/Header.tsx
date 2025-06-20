'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm border-b border-emerald-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-emerald-700 text-3xl font-extrabold tracking-tight">
          <Link href="/" className="flex items-center gap-2">
            {/* <span className="text-4xl">🌱</span> */}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-alkatra">
              FarmConnect
            </span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="space-x-4 hidden md:flex items-center">
          <Link href="/login">
            <button className="cursor-pointer group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-emerald-300 px-6 py-2 font-medium text-emerald-700 transition hover:shadow-lg hover:border-emerald-400">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-100 via-emerald-50 to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <span className="relative z-10">Login</span>
            </button>
          </Link>
          <Link href="/signup">
            <button className="cursor-pointer group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]">
              <span className="relative z-10 flex items-center gap-1">
                <span>Sign Up</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        {/* <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-emerald-700 focus:outline-none p-2 rounded-lg hover:bg-emerald-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div> */}
      </div>

      {/* Mobile Auth Menu */}
      {/* {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-emerald-50 to-white px-6 py-4 space-y-4 font-medium rounded-b-xl shadow-inner border-t border-emerald-100">
          <Link 
            href="/" 
            className="block py-2 px-3 rounded-lg hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <div className="pt-4 border-t border-emerald-200 space-y-3">
            <Link 
              href="/login" 
              className="block py-2 px-3 rounded-lg hover:bg-emerald-100 text-emerald-700 hover:text-emerald-900 transition font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="block py-2 px-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition font-semibold text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )} */}
    </header>
  )
}
