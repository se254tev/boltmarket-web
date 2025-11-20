import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, DollarSign, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

/**
 * Navbar Component
 * Main navigation bar with logo, menu, search, and user actions
 */
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-dark-800 border-b border-dark-100 dark:border-dark-700 shadow-sm transition-colors">
      <div className="container-safe">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-2xl font-bold font-display text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            Bolt Market
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/browse" 
              className={`font-medium transition-colors ${
                isActive('/browse') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Browse
            </Link>
            <Link 
              to="/loans" 
              className={`font-medium transition-colors flex items-center gap-2 ${
                isActive('/loans') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Loans
            </Link>
            <Link 
              to="/chat" 
              className={`font-medium transition-colors flex items-center gap-2 ${
                isActive('/chat') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Messages
            </Link>
            <Link 
              to="/dashboard" 
              className={`font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors relative">
              <svg className="w-6 h-6 text-dark-700 dark:text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent-500 rounded-full"></span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Sign In */}
            <button className="btn btn-primary btn-sm">Sign In</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
            >
              <svg className="w-6 h-6 text-dark-700 dark:text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-slideUp">
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors text-dark-900 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/browse" 
                className="px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors text-dark-900 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link 
                to="/loans" 
                className="px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors text-dark-900 dark:text-white flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <DollarSign className="w-4 h-4" />
                Loans
              </Link>
              <Link 
                to="/chat" 
                className="px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors text-dark-900 dark:text-white flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                Messages
              </Link>
              <Link 
                to="/dashboard" 
                className="px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors text-dark-900 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button className="btn btn-primary btn-sm mt-2 w-full">Sign In</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
