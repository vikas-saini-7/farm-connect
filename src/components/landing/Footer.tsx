'use client'

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white font-alkatra">FarmConnect</h2>
          <p className="text-sm text-green-100 leading-relaxed">
            Empowering farmers and buyers through transparency, connection, and opportunity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-green-100 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-all duration-200">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-all duration-200">Marketplace</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-all duration-200">Farmers</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-all duration-200">Buyers</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-3 text-green-100 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-green-300" /> +91 9876543210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-green-300" /> support@farmconnect.in
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-green-300" /> Punjab, India
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-300 transition">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-green-300 transition">
              <Instagram size={22} />
            </a>
            <a href="#" className="hover:text-green-300 transition">
              <Twitter size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="text-center text-green-200 text-sm mt-12 border-t border-green-600 pt-6">
        © {new Date().getFullYear()} FarmConnect. All rights reserved.
      </div>
    </footer>
  )
}
