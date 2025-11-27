import React from 'react';
import { Check, X } from 'lucide-react';

// PricingCard: presentational card for a single plan
export default function PricingCard({ plan, priceLabel, highlighted = false, onAction, ctaText, extraInfo, disabled = false }){
  const handleClick = async (e) => {
    try{
      // Analytics hook (guarded)
      if (typeof window !== 'undefined' && window.analytics && typeof window.analytics.track === 'function'){
        window.analytics.track('pricing_click', { plan: plan.key });
      } else {
        // dev-time debug
        if (process.env.NODE_ENV === 'development') console.debug('pricing_click', { plan: plan.key });
      }
    }catch(err){ console.debug('analytics error', err); }
    if (onAction) await onAction(plan);
  };

  return (
    <article className={`card card-base p-6 ${highlighted? 'ring-2 ring-yellow-400':''}`} aria-labelledby={`plan-${plan.key}`}>
      <header>
        <h3 id={`plan-${plan.key}`} className="text-lg font-semibold">{plan.name}</h3>
        <p className="text-sm text-dark-600">{plan.description}</p>
      </header>
      <div className="my-4">
        <div className="text-3xl font-bold" aria-live="polite">{priceLabel}</div>
        {plan.trialEligible && <div className="text-xs text-emerald-600 mt-1">Includes 7-day Premium trial</div>}
      </div>

      <ul className="mb-4 space-y-2">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check size={16} className="text-primary-600 mt-1" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-3">
          <button
            className={`btn w-full ${disabled? 'opacity-60 cursor-not-allowed': 'btn-primary'}`}
            onClick={handleClick}
            disabled={disabled}
            data-plan={plan.key}
            aria-disabled={disabled}
          >
            {ctaText}
          </button>
        </div>
        {extraInfo && <div className="text-xs text-dark-600">{extraInfo}</div>}
      </div>
    </article>
  );
}

