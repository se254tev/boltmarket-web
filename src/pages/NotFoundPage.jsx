import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * NotFoundPage Component
 * 404 error page
 */
function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-light py-12 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-heading-2 mb-3">Page Not Found</h2>
        <p className="text-body-lg text-dark-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Go Home
          </button>
          <button 
            onClick={() => navigate('/browse')}
            className="btn btn-secondary"
          >
            Browse Items
          </button>
        </div>

        {/* Illustration */}
        <div className="mt-12">
          <svg className="w-48 h-48 mx-auto text-primary-200" fill="currentColor" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" opacity="0.1" />
            <path d="M70 80 Q100 50 130 80" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="80" cy="70" r="3" fill="currentColor" />
            <circle cx="120" cy="70" r="3" fill="currentColor" />
            <path d="M80 100 L120 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
