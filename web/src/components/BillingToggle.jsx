import React from 'react';

export default function BillingToggle({ value = 'monthly', onChange }){
  return (
    <div role="tablist" aria-label="Billing cycle" className="inline-flex bg-slate-200 rounded-lg p-1">
      <button
        role="tab"
        aria-pressed={value === 'monthly'}
        className={`px-4 py-2 rounded-md font-semibold ${value === 'monthly' ? 'bg-white text-primary-600 shadow-sm' : 'text-dark-600'}`}
        onClick={() => onChange('monthly')}
      >
        Monthly
      </button>
      <button
        role="tab"
        aria-pressed={value === 'annual'}
        className={`px-4 py-2 rounded-md font-semibold ${value === 'annual' ? 'bg-white text-primary-600 shadow-sm' : 'text-dark-600'}`}
        onClick={() => onChange('annual')}
      >
        Annual
        <span className="ml-2 text-emerald-600 font-bold">Save 20%</span>
      </button>
    </div>
  );
}
