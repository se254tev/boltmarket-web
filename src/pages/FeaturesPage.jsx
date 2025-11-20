import React from 'react';
import { Check, Zap, Shield, Users, TrendingUp, Lock, Smartphone, Globe } from 'lucide-react';

/**
 * Features Page
 * Showcases all key features and benefits of Bolt Market
 */
function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Browse and list items in seconds with our optimized platform',
      color: 'text-primary-500'
    },
    {
      icon: Shield,
      title: 'Buyer Protection',
      description: 'Every purchase is protected with our secure escrow system',
      color: 'text-emerald-500'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of buyers and sellers in our vibrant marketplace',
      color: 'text-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track your sales and market trends with detailed insights',
      color: 'text-amber-500'
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'Multiple payment methods with encrypted transactions',
      color: 'text-pink-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Shop and sell anywhere with our fully responsive app',
      color: 'text-purple-500'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with buyers and sellers from around the world',
      color: 'text-cyan-500'
    },
    {
      icon: Check,
      title: '24/7 Support',
      description: 'Our team is always here to help with any questions',
      color: 'text-green-500'
    }
  ];

  const benefits = [
    {
      title: 'For Buyers',
      points: [
        'Access millions of listings from trusted sellers',
        'Secure payment with buyer protection guarantee',
        'Real-time chat with sellers',
        'Detailed item descriptions and reviews',
        'Easy returns and refund process',
        'Price comparison across categories'
      ]
    },
    {
      title: 'For Sellers',
      points: [
        'Easy listing creation with image uploads',
        'Real-time sales analytics and dashboard',
        'Multiple payment withdrawal options',
        'Rating and review system to build trust',
        'Promotional tools to boost visibility',
        'Seller protection against fraud'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6 font-display">
            Everything You Need to Succeed
          </h1>
          <p className="text-xl text-dark-600 mb-8 max-w-2xl mx-auto">
            Bolt Market is packed with powerful features designed to make buying and selling easier, safer, and more profitable.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`${feature.color} mb-4`}>
                  <Icon size={32} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-dark-900 mb-2 font-display">
                  {feature.title}
                </h3>
                <p className="text-dark-600 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Sections */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-16 text-center font-display">
            Tailored for Your Role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((section, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-2xl font-bold text-dark-900 mb-8 font-display">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.points.map((point, pidx) => (
                    <li key={pidx} className="flex items-start gap-3">
                      <Check size={20} className="text-emerald-500 flex-shrink-0 mt-1" />
                      <span className="text-dark-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-16 text-center font-display">
          Advanced Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-8 border border-primary-100">
            <h3 className="text-xl font-semibold text-dark-900 mb-4 font-display">
              Smart Search & Discovery
            </h3>
            <p className="text-dark-700 mb-4">
              AI-powered recommendations and advanced filters help buyers find exactly what they need.
            </p>
            <ul className="space-y-2 text-sm text-dark-600">
              <li>✓ Full-text search across 10M+ listings</li>
              <li>✓ Category-based filtering</li>
              <li>✓ Price range & condition filters</li>
              <li>✓ Seller rating filters</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-8 border border-pink-100">
            <h3 className="text-xl font-semibold text-dark-900 mb-4 font-display">
              Secure Transactions
            </h3>
            <p className="text-dark-700 mb-4">
              Bank-level security with encrypted payments and fraud protection.
            </p>
            <ul className="space-y-2 text-sm text-dark-600">
              <li>✓ SSL/TLS encryption</li>
              <li>✓ PCI DSS compliance</li>
              <li>✓ Escrow service</li>
              <li>✓ Fraud detection</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100">
            <h3 className="text-xl font-semibold text-dark-900 mb-4 font-display">
              Community Tools
            </h3>
            <p className="text-dark-700 mb-4">
              Built-in communication and reputation systems foster trust.
            </p>
            <ul className="space-y-2 text-sm text-dark-600">
              <li>✓ In-app messaging</li>
              <li>✓ User ratings & reviews</li>
              <li>✓ Seller verification</li>
              <li>✓ Dispute resolution</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-display">
            Ready to Get Started?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Join thousands of buyers and sellers on Bolt Market today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-white font-semibold px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors">
              Start Buying
            </button>
            <button className="btn bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-800 transition-colors">
              Start Selling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;
