import React, { useState } from 'react';
import { Check, X, Star } from 'lucide-react';

/**
 * Pricing Page
 * Shows pricing tiers, features comparison, and testimonials
 */
function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 0 : 0,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Perfect for getting started',
      highlighted: false,
      features: [
        { text: 'Up to 5 active listings', included: true },
        { text: 'Basic seller analytics', included: true },
        { text: 'In-app messaging', included: true },
        { text: 'Community support', included: true },
        { text: 'Advanced tools', included: false },
        { text: 'Priority support', included: false },
        { text: 'Bulk operations', included: false }
      ],
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 9.99 : 99.99,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For serious sellers',
      highlighted: true,
      features: [
        { text: 'Unlimited listings', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Priority messaging', included: true },
        { text: 'Email support', included: true },
        { text: 'Promotion tools', included: true },
        { text: 'API access', included: false },
        { text: 'Custom branding', included: false }
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For high-volume sellers',
      highlighted: false,
      features: [
        { text: 'Everything in Professional', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'Custom analytics', included: true },
        { text: 'Bulk listing tools', included: true },
        { text: 'Full API access', included: true },
        { text: 'Custom branding', included: true }
      ],
      cta: 'Contact Sales'
    }
  ];

  const comparison = [
    { feature: 'Active Listings', starter: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Commission Rate', starter: '5%', pro: '3.5%', enterprise: 'Negotiable' },
    { feature: 'Payment Methods', starter: '2', pro: '5', enterprise: '5+' },
    { feature: 'Analytics Dashboard', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
    { feature: 'Support Response Time', starter: '24 hours', pro: '2 hours', enterprise: '1 hour' },
    { feature: 'Monthly Payout', starter: 'Yes', pro: 'Daily', enterprise: 'Real-time' },
    { feature: 'Bulk Operations', starter: 'No', pro: 'Limited', enterprise: 'Yes' },
    { feature: 'Custom Domain', starter: 'No', pro: 'No', enterprise: 'Yes' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Full-time Seller',
      image: '👤',
      quote: 'Bolt Market helped me turn my side hustle into a full-time business. The analytics are incredible!'
    },
    {
      name: 'Mike Chen',
      role: 'Small Business Owner',
      image: '👤',
      quote: 'The easiest marketplace platform I\'ve used. Great features at an affordable price.'
    },
    {
      name: 'Emma Williams',
      role: 'Vintage Shop Owner',
      image: '👤',
      quote: 'Professional tools at a price that makes sense. Highly recommend to any seller.'
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees at all. You only pay the subscription fee (if applicable) and transaction commission.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, digital wallets, and bank transfers depending on your plan.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, 30-day money-back guarantee if you\'re not satisfied with your plan.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Professional plan includes a 14-day free trial. Starter plan is always free.'
    },
    {
      question: 'What happens to my listings if I downgrade?',
      answer: 'You\'ll be able to keep your 5 most recent listings. Older ones will be archived.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6 font-display">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-dark-600 mb-8">
            Choose the perfect plan for your business. No hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-slate-200 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-dark-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-dark-600'
                }`}
              >
                Annual
                <span className="ml-2 text-emerald-600 font-bold">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-8 transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-primary-50 to-blue-50 border-2 border-primary-500 shadow-xl relative'
                  : 'bg-white border border-slate-200 shadow-sm'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-dark-900 mb-2 font-display">
                {plan.name}
              </h3>
              <p className="text-dark-600 mb-6">{plan.description}</p>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-dark-900">
                    {typeof plan.price === 'string' ? plan.price : `$${plan.price.toFixed(2)}`}
                  </span>
                  <span className="text-dark-600">{plan.period}</span>
                </div>
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold mb-8 transition-all ${
                  plan.highlighted
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-slate-100 text-dark-900 hover:bg-slate-200'
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={20} className="text-slate-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-dark-700'
                          : 'text-dark-400 line-through'
                      }
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
            Detailed Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-left font-semibold text-dark-900">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-dark-900">Starter</th>
                  <th className="px-6 py-4 text-center font-semibold text-dark-900">Professional</th>
                  <th className="px-6 py-4 text-center font-semibold text-dark-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-dark-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-dark-600">{row.starter}</td>
                    <td className="px-6 py-4 text-center text-dark-600">{row.pro}</td>
                    <td className="px-6 py-4 text-center text-dark-600">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
          Loved by Sellers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
                ))}
              </div>
              <p className="text-dark-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.image}</div>
                <div>
                  <p className="font-semibold text-dark-900">{testimonial.name}</p>
                  <p className="text-sm text-dark-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-12 text-center font-display">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 cursor-pointer group">
                <summary className="flex items-center justify-between font-semibold text-dark-900 select-none">
                  {faq.question}
                  <span className="text-primary-600 transform group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-dark-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-display">
            Choose Your Plan Today
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            All plans include 14-day free trial. No credit card required.
          </p>
          <button className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
