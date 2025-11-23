import React from 'react';

/**
 * PricingCard - reusable pricing card component
 */
function PricingCard({ plan, priceLabel, highlighted, onAction, ctaText }) {
  return (
    <div className={`rounded-xl p-6 transition-all ${highlighted ? 'bg-gradient-to-br from-primary-50 to-blue-50 border-2 border-primary-500 shadow-xl' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <h3 className="text-2xl font-bold text-dark-900 mb-2 font-display">{plan.name}</h3>
      <p className="text-dark-600 mb-4">{plan.description || plan.includes?.join(', ')}</p>
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-dark-900">{priceLabel}</span>
        </div>
      </div>
      <button onClick={onAction} className={`w-full py-2 rounded-lg font-semibold ${highlighted ? 'bg-primary-600 text-white' : 'bg-slate-100 text-dark-900'}`}>
        {ctaText}
      </button>
      <ul className="mt-6 space-y-2 text-sm text-dark-700">
        {(plan.includes || []).map((inc, i) => (
          <li key={i}>• {inc}</li>
        ))}
      </ul>
    </div>
  );
}

export default PricingCard;
