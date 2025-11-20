import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Site-wide footer with links, newsletter signup, and info
 */
function Footer() {
  return (
    <footer className="bg-dark-900 text-white mt-20">
      {/* Main Footer */}
      <div className="container-safe py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold font-display">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              Bolt Market
            </div>
            <p className="text-dark-400 text-sm">Your modern marketplace for buying and selling amazing items.</p>
            <div className="flex gap-4 mt-4">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-dark-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                  aria-label={social}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Security', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-dark-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Press', 'Partners'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-dark-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-dark-400 text-sm mb-4">Get the latest deals and news.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-3 py-2 rounded-lg bg-dark-800 text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="btn btn-primary btn-sm">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-400 text-sm">
              © 2024 Bolt Market. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-dark-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
