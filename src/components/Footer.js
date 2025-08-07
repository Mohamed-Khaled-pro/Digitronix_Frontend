// src/components/Footer.jsx
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-100 mb-10 md:mb-0 dark:bg-black border-t-2 border-white shadow-white text-gray-700 dark:text-gray-300 py-10 px-5 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
<div className="text-2xl md:text-3xl font-bold tracking-wider"><Link to="/">
            <span className="text-primaryGreen text-3xl md:text-4xl">D</span>igitronix
          </Link>
          </div>          <p className="mt-2 text-sm">
            Your go-to store for the latest electronics: phones, laptops, gaming, and more.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-black dark:hover:text-white">Home</a></li>
            <li><a href="https://digitronix-store.netlify.app/api/products" className="hover:text-black dark:hover:text-white">Products</a></li>
            <li><a href="https://digitronix-store.netlify.app/api/products" className="hover:text-black dark:hover:text-white">Categories</a></li>
            <li><a href="https://digitronix-store.netlify.app/contact" className="hover:text-black dark:hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#"><FaFacebook className="hover:text-blue-500" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-400" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
            <a href="#"><FaYoutube className="hover:text-red-500" /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 border-t border-gray-300 dark:border-gray-700 pt-4">
        © {new Date().getFullYear()} Digitronixs. All rights reserved.
      </div>
    </footer>
  );
}
