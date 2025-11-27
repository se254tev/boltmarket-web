// Centralized pricing configuration and helpers for PricingPage
// Pricing assumptions:
// - Currency: KES
// - Annual discount: 20% by default (applied to monthly * 12)
// - Plans defined with monthly base; annual computed from monthly * 12 * (1 - discount)

const currencySymbol = 'KES';
const defaultContactNumber = '254797819571';

const format = (amount, currency = 'KES') => {
  try {
    const nf = new Intl.NumberFormat('en-KE', { style: 'currency', currency });
    return nf.format(amount);
  } catch (err) {
    // Fallback
    return `${currencySymbol} ${Number(amount).toFixed(2)}`;
  }
};

const annualFromMonthly = (monthly, discount = 0.2) => {
  const yearly = monthly * 12 * (1 - discount);
  return Math.round(yearly);
};

// Discount used across annual prices (20%)
const defaultAnnualDiscount = 0.2;

const plans = [
  {
    key: 'free',
    name: 'Starter Free',
    description: 'Forever free plan for individual sellers',
    price: { monthly: 0, annual: 0 },
    features: [
      '1 active listing',
      'Basic dashboard',
      'Ads enabled',
      'Standard support (48 hrs)',
      'Limited uploads (100MB)',
      'No advanced analytics',
      'No bulk actions',
      'Watermark branding',
    ],
    cta: 'Get Started',
    highlighted: false,
    trialEligible: false,
    contactNumber: defaultContactNumber,
  },
  {
    key: 'basic',
    name: 'Basic',
    description: 'Affordably upgrade to grow your listings',
    price: { monthly: 50, annual: annualFromMonthly(50, defaultAnnualDiscount) },
    features: [
      'Up to 10 active listings',
      'Light analytics',
      '24-hour support',
      'No ads',
      '500MB storage',
      'Access to templates',
      'Weekly payout',
    ],
    cta: 'Get Started',
    highlighted: false,
    trialEligible: false,
    contactNumber: defaultContactNumber,
  },
  {
    key: 'standard',
    name: 'Standard',
    description: 'Recommended — full analytics and scheduling',
    price: { monthly: 60, annual: annualFromMonthly(60, defaultAnnualDiscount) },
    features: [
      'Unlimited listings',
      'Full analytics dashboard',
      'Same-day support',
      '1GB storage',
      'Premium templates',
      'Scheduling tools',
      'Limited bulk actions',
      'Branding removal',
      'Daily payouts',
    ],
    cta: 'Start Trial',
    highlighted: true,
    trialEligible: true,
    contactNumber: defaultContactNumber,
  },
  {
    key: 'premium',
    name: 'Premium',
    description: 'Power seller features with priority support',
    price: { monthly: 70, annual: annualFromMonthly(70, defaultAnnualDiscount) },
    features: [
      'Unlimited usage',
      'Real-time analytics',
      '1-hour priority support',
      '5GB storage',
      'All automations',
      'Full bulk operations',
      'Custom domain support',
      'API access',
      'Boosted marketplace placement',
    ],
    cta: 'Start Trial',
    highlighted: false,
    trialEligible: true,
    contactNumber: defaultContactNumber,
  },
];

export default {
  currencySymbol,
  defaultContactNumber,
  format,
  plans,
  defaultAnnualDiscount,
};

// README note:
// TODO: Server must implement trial lifecycle: create trial record with `trialEndsAt` and
// auto-downgrade users to the Free plan when trial expires. Client should call `plansAPI.startTrial`.
