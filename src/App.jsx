import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import SellerDashboard from './pages/SellerDashboard';
import NotFoundPage from './pages/NotFoundPage';
import LoansPage from './pages/LoansPage';
import ChatPage from './pages/ChatPage';
import AdminDashboard from './pages/AdminDashboard';
import SettingsPage from './pages/SettingsPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import SecurityPage from './pages/SecurityPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import PartnersPage from './pages/PartnersPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import ContinueWithEmail from './pages/ContinueWithEmail';
import AuthCallback from './pages/AuthCallback';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  // Initialize PWA service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }

    // Request notification permission for push notifications
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Mock current user ID (replace with real auth)
  const currentUserId = localStorage.getItem('userId') || 'user-demo-123';

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-dark-900 transition-colors">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/item/:id" element={<ItemDetailsPage />} />
              <Route path="/dashboard" element={<SellerDashboard />} />
              <Route path="/loans" element={<LoansPage userId={currentUserId} />} />
              <Route
                path="/chat"
                element={<ChatPage userId={currentUserId} userName="You" />}
              />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/continue-with-email" element={<ContinueWithEmail />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/press" element={<PressPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
