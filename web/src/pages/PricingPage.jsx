import React, { useState, useMemo } from 'react';
import pricingConfig from '../config/pricingConfig';
import PricingCard from '../components/PricingCard';
import BillingToggle from '../components/BillingToggle';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FaqAccordion from '../components/FaqAccordion';
import plansAPI from '../services/plansAPI';

// Lightweight analytics guard
const track = (event, payload) => {
  try{
    if (typeof window !== 'undefined' && window.analytics && typeof window.analytics.track === 'function'){
      window.analytics.track(event, payload);
    }
  }catch(e){ console.debug('analytics error', e); }
};

function PricingPage(){
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loadingPlan, setLoadingPlan] = useState(null);

  const plans = pricingConfig.plans;

  const handleCta = async (plan) => {
    track('pricing_click', { plan: plan.key, billingCycle });
    if (plan.cta === 'Get Started'){
      // navigate to signup with plan key
      window.location.href = `/signup?s=${plan.key}`;
      return;
    }

    if (plan.cta === 'Start Trial'){
      setLoadingPlan(plan.key);
      try{
        // TODO: Implement plansAPI.startTrial on the backend
        const resp = await plansAPI.startTrial(plan.key, billingCycle);
        // On success, you might redirect user to dashboard or show trial details
        // For now, alert success (replace with real UX)
        alert('Trial started — check your account for details');
      }catch(err){
        console.error(err);
        // Friendly error UI; replace with toast if available
        alert(err.message || 'Failed to start trial. Please contact support.');
      }finally{
        setLoadingPlan(null);
      }
      return;
    }

    // Contact sales via WhatsApp
    const number = plan.contactNumber || pricingConfig.defaultContactNumber;
    const text = encodeURIComponent(`Hi, I'm interested in the ${plan.name} plan`);
    const url = `https://wa.me/${number}?text=${text}`;
    window.open(url, '_blank');
  };

  const priceLabelFor = (plan) => {
    const amount = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;
    const label = `${pricingConfig.format(amount)} ${billingCycle === 'monthly' ? '/month' : '/year'}`;
    return label;
  };

  const testimonials = useMemo(()=>[
    { name: 'Sarah Johnson', role: 'Full-time Seller', quote: 'Bolt Market helped me turn my side hustle into a full-time business. The analytics are incredible!' },
    { name: 'Mike Chen', role: 'Small Business Owner', quote: 'The easiest marketplace platform I\'ve used. Great features at an affordable price.' },
    { name: 'Emma Williams', role: 'Vintage Shop Owner', quote: 'Professional tools at a price that makes sense. Highly recommend to any seller.' },
  ], []);

  const faqs = useMemo(()=>[
    { question: 'Can I change plans anytime?', answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
    { question: 'Is there a setup fee?', answer: 'No setup fees at all. You only pay the subscription fee (if applicable) and transaction commission.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, digital wallets, and bank transfers depending on your plan.' },
    { question: 'Do you offer refunds?', answer: 'Yes, 30-day money-back guarantee if you\'re not satisfied with your plan.' },
    { question: 'Is there a free trial?', answer: 'Standard and Premium include a 7-day free Premium trial. New users are auto-downgraded to Free when trial expires.' },
  ], []);

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-6 font-display">Simple, Transparent Pricing</h1>
          <p className="text-xl text-dark-600 mb-8">Choose the perfect plan for your business. No hidden fees.</p>
          <div className="flex justify-center mb-12">
            <BillingToggle value={billingCycle} onChange={(v)=> setBillingCycle(v)} />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {plans.map(plan => (
            <PricingCard
              key={plan.key}
              plan={plan}
              priceLabel={priceLabelFor(plan)}
              highlighted={plan.highlighted}
              onAction={handleCta}
              ctaText={plan.cta}
              extraInfo={plan.trialEligible ? 'Includes 7-day Premium trial' : ''}
              disabled={loadingPlan && loadingPlan !== plan.key}
            />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-6 text-center font-display">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm overflow-hidden" role="table">
              <caption className="sr-only">Comparison of pricing plans</caption>
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-dark-900">Feature</th>
                  {plans.map(p => (
                    <th key={p.key} scope="col" className="px-6 py-4 text-center font-semibold text-dark-900">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* build a set of rows from feature union */}
                {(() => {
                  const features = new Set();
                  plans.forEach(p => (p.features||[]).forEach(f => features.add(f)));
                  return Array.from(features).map((feature, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-dark-900">{feature}</td>
                      {plans.map(p => (
                        <td key={p.key} className="px-6 py-4 text-center text-dark-600">{p.features.includes(feature) ? <span>Yes</span> : <span className="text-xs text-dark-400">—</span>}</td>
                      ))}
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <TestimonialCarousel items={testimonials} />
      </section>

      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-6 text-center font-display">Frequently Asked Questions</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </main>
  );
}

export default PricingPage;
