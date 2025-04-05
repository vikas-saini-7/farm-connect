"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F0F0F] text-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-green-400">AgroConnect</h2>
          <p className="mt-4 text-sm text-gray-400">
            Empowering farmers and connecting them with buyers across the country. Freshness, fairness, and growth—all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-green-300 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-green-400">Home</Link></li>
            <li><Link href="/marketplace" className="hover:text-green-400">Marketplace</Link></li>
            <li><Link href="/about" className="hover:text-green-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-green-400">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold text-green-300 mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-green-400">FAQs</Link></li>
            <li><Link href="/terms" className="hover:text-green-400">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-green-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-green-300 mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">
            📍 Village Tech Park, India <br />
            📞 +91 98765 43210 <br />
            📧 support@agroconnect.com
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-300"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-500"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} AgroConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
