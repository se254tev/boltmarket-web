import React, { useState } from 'react';
import { Link as LinkIcon, TrendingUp, Shield, Zap } from 'lucide-react';

/**
 * Partners Page
 * Partner program, tiers, benefits, and partnership information
 */
function PartnersPage() {
  const [selectedTier, setSelectedTier] = useState('standard');

  const partnerTypes = [
    {
      id: 'standard',
      name: 'Standard Partner',
      description: 'Perfect for growing companies looking to integrate with Bolt Market',
      benefits: [
        'API access with documentation',
        'Technical support via email',
        'Co-marketing opportunities',
        'Partner portal and dashboard',
        'Monthly partner calls',
        'Revenue sharing model'
      ],
      requirements: ['Company established for 1+ year', 'Relevant product/service', 'Dedicated point of contact'],
      color: 'from-blue-50 to-blue-100'
    },
    {
      id: 'premium',
      name: 'Premium Partner',
      description: 'For established companies with significant integration plans',
      benefits: [
        'Everything in Standard',
        'Priority technical support (24/7)',
        'Dedicated partner manager',
        'Co-branded marketing campaigns',
        'Enhanced revenue sharing',
        'Joint webinars and events',
        'Early access to new features'
      ],
      requirements: ['$1M+ annual revenue', 'Proven integration capability', 'Regional presence'],
      color: 'from-primary-50 to-primary-100'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Partner',
      description: 'Strategic partnerships with enterprise-scale opportunities',
      benefits: [
        'Everything in Premium',
        'Custom SLA agreements',
        'White-label solutions',
        'Strategic business reviews',
        'Joint go-to-market strategy',
        'Custom integration support',
        'Executive relationship management'
      ],
      requirements: ['$10M+ annual revenue', 'Market leadership', 'Strategic alignment'],
      color: 'from-amber-50 to-amber-100'
    }
  ];

  const partners = [
    {
      name: 'Payment Gateway',
      category: 'Payments',
      logo: '💳',
      description: 'Integrated payment processing'
    },
    {
      name: 'Shipping Provider',
      category: 'Logistics',
      logo: '📦',
      description: 'Streamlined shipping solutions'
    },
    {
      name: 'Analytics Platform',
      category: 'Data',
      logo: '📊',
      description: 'Advanced analytics and reporting'
    },
    {
      name: 'Email Service',
      category: 'Communications',
      logo: '📧',
      description: 'Transactional email services'
    },
    {
      name: 'Cloud Provider',
      category: 'Infrastructure',
      logo: '☁️',
      description: 'Reliable hosting infrastructure'
    },
    {
      name: 'Security Platform',
      category: 'Security',
      logo: '🔒',
      description: 'Advanced fraud prevention'
    }
  ];

  const successStories = [
    {
      name: 'TechPayments Inc.',
      metric: '300%',
      achievement: 'Revenue growth through Bolt partnership'
    },
    {
      name: 'LogisticsPro',
      metric: '50K+',
      achievement: 'Active integrations from Bolt marketplace'
    },
    {
      name: 'DataInsights',
      metric: '2M',
      achievement: 'Daily analytics processed for partners'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6 font-display">
            Partner with Bolt Market
          </h1>
          <p className="text-xl text-dark-600 mb-8">
            Join our network of innovative companies building the future of e-commerce.
          </p>
          <button className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Become a Partner
          </button>
        </div>
      </div>

      {/* Why Partner */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
            Why Partner with Bolt Market?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Revenue Growth',
                description: 'Access to millions of users and new revenue streams'
              },
              {
                icon: Zap,
                title: 'Easy Integration',
                description: 'Simple APIs and comprehensive documentation'
              },
              {
                icon: Shield,
                title: 'Reliability',
                description: '99.99% uptime and enterprise-grade infrastructure'
              },
              {
                icon: LinkIcon,
                title: 'Support',
                description: 'Dedicated partner teams and technical support'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                  <Icon size={32} className="text-primary-600 mb-4" />
                  <h3 className="text-lg font-bold text-dark-900 mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-dark-700">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Partner Tiers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
          Partnership Tiers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerTypes.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`rounded-xl border-2 transition-all cursor-pointer ${
                selectedTier === tier.id
                  ? 'border-primary-600 shadow-xl'
                  : 'border-slate-200 shadow-sm hover:shadow-lg'
              }`}
            >
              <div className={`bg-gradient-to-br ${tier.color} p-8 rounded-t-lg`}>
                <h3 className="text-2xl font-bold text-dark-900 mb-2 font-display">
                  {tier.name}
                </h3>
                <p className="text-dark-700">
                  {tier.description}
                </p>
              </div>

              <div className="p-8">
                {/* Requirements */}
                <div className="mb-8">
                  <h4 className="font-semibold text-dark-900 mb-4">Requirements</h4>
                  <ul className="space-y-2">
                    {tier.requirements.map((req, idx) => (
                      <li key={idx} className="text-dark-700 text-sm flex items-start gap-2">
                        <span className="text-primary-600 font-bold">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                {selectedTier === tier.id && (
                  <div className="border-t border-slate-200 pt-8">
                    <h4 className="font-semibold text-dark-900 mb-4">Benefits</h4>
                    <ul className="space-y-3">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-dark-700 text-sm flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-6 bg-primary-600 text-white font-semibold py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Partners */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
            Our Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 text-center hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{partner.logo}</div>
                <h4 className="font-semibold text-dark-900 mb-1 text-sm">{partner.name}</h4>
                <p className="text-xs text-dark-600">{partner.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
          Partner Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-8 border border-primary-100 text-center"
            >
              <h3 className="text-lg font-bold text-dark-900 mb-4 font-display">
                {story.name}
              </h3>
              <div className="text-4xl font-bold text-primary-600 mb-2 font-display">
                {story.metric}
              </div>
              <p className="text-dark-700">
                {story.achievement}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* API & Integration */}
      <div className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-8 text-center font-display">
            Powerful APIs & Integrations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-primary-100">
              <h3 className="text-xl font-bold text-dark-900 mb-4 font-display">
                Listings API
              </h3>
              <p className="text-dark-700 mb-4">
                Manage listings, inventory, and product information in real-time.
              </p>
              <ul className="space-y-2 text-dark-700 text-sm">
                <li>✓ Full CRUD operations</li>
                <li>✓ Bulk operations</li>
                <li>✓ Real-time webhooks</li>
                <li>✓ Rate limiting: 10,000 req/sec</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-primary-100">
              <h3 className="text-xl font-bold text-dark-900 mb-4 font-display">
                Payments API
              </h3>
              <p className="text-dark-700 mb-4">
                Process transactions and manage payment flows securely.
              </p>
              <ul className="space-y-2 text-dark-700 text-sm">
                <li>✓ Multiple currencies</li>
                <li>✓ Escrow management</li>
                <li>✓ Instant payouts</li>
                <li>✓ PCI DSS compliant</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-primary-100">
              <h3 className="text-xl font-bold text-dark-900 mb-4 font-display">
                Orders API
              </h3>
              <p className="text-dark-700 mb-4">
                Track and manage orders across your integration.
              </p>
              <ul className="space-y-2 text-dark-700 text-sm">
                <li>✓ Order tracking</li>
                <li>✓ Status updates</li>
                <li>✓ Shipping integration</li>
                <li>✓ Webhook notifications</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-primary-100">
              <h3 className="text-xl font-bold text-dark-900 mb-4 font-display">
                Analytics API
              </h3>
              <p className="text-dark-700 mb-4">
                Access detailed metrics and analytics data.
              </p>
              <ul className="space-y-2 text-dark-700 text-sm">
                <li>✓ Sales metrics</li>
                <li>✓ User behavior data</li>
                <li>✓ Custom dashboards</li>
                <li>✓ Real-time reporting</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-primary-100">
            <h3 className="text-xl font-bold text-dark-900 mb-4 font-display">
              Full Documentation Available
            </h3>
            <p className="text-dark-700 mb-6">
              Comprehensive API documentation, SDKs, and code examples for all major platforms.
            </p>
            <button className="bg-primary-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '1',
              title: 'Apply',
              description: 'Submit your partnership application'
            },
            {
              step: '2',
              title: 'Review',
              description: 'We review and assess fit'
            },
            {
              step: '3',
              title: 'Onboard',
              description: 'Get API access and support'
            },
            {
              step: '4',
              title: 'Grow',
              description: 'Scale together with us'
            }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-dark-900 mb-2 font-display">
                {item.title}
              </h3>
              <p className="text-dark-700 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-dark-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-display">
            Ready to Partner with Bolt Market?
          </h2>
          <p className="text-dark-300 mb-8 text-lg">
            Let's explore how we can grow together and create value for our users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
              Apply Now
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-dark-900 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnersPage;
