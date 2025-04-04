"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0F0F0F] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-wide flex items-center text-[#00E87B]">
          🌾 <span className="ml-1">FarmersHub</span>
        </Link>

        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <Link href="/" className="hover:text-[#F47400] transition duration-300">Home</Link>
          <Link href="/marketplace" className="hover:text-[#F47400] transition duration-300">Marketplace</Link>
          <Link href="/farmers" className="hover:text-[#F47400] transition duration-300">Farmers</Link>
          <Link href="/buyers" className="hover:text-[#F47400] transition duration-300">Buyers</Link>
        </nav>

        {/* Login Button */}
        <Link href="/login" className="hidden md:flex bg-[#F71616] text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-[#8860F4] hover:scale-105 transition duration-300">
          Login / Signup
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[#272727] text-white py-4 space-y-4 text-center">
          <Link href="/" className="block hover:text-[#F47400] transition duration-300">Home</Link>
          <Link href="/marketplace" className="block hover:text-[#F47400] transition duration-300">Marketplace</Link>
          <Link href="/farmers" className="block hover:text-[#F47400] transition duration-300">Farmers</Link>
          <Link href="/buyers" className="block hover:text-[#F47400] transition duration-300">Buyers</Link>
          <Link href="/login" className="inline-block bg-[#F71616] text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-[#8860F4] hover:scale-105 transition duration-300">
            Login / Signup
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
