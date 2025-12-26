import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-gray-300 mt-20 pt-16 pb-8 border-t border-gray-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">TechShop</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Premium gadgets and accessories for developers and tech enthusiasts. 
              Upgrade your setup today.
            </p>
            <div className="flex space-x-4">
              {/* Social Placeholders */}
              <a href="#" className="hover:text-indigo-400 transition">Twitter</a>
              <a href="#" className="hover:text-indigo-400 transition">GitHub</a>
              <a href="#" className="hover:text-indigo-400 transition">LinkedIn</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-indigo-400 transition">All Products</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-indigo-400 transition">New Arrivals</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-400 transition">My Cart</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition">My Account</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition">About Us</Link>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">Returns</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Address) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>
                  123 Tech Park Avenue,<br />
                  Electronic City, Phase 1,<br />
                  Bangalore, KA 560100
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <a href="mailto:support@techshop.com" className="hover:text-white">support@techshop.com</a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} TechShop. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;