// Centralized pricing configuration (KES)
const pricingConfig = {
  currency: 'KES',
  billingCycles: ['daily', 'monthly', 'yearly'],
  plans: {
    starter: {
      name: 'Starter',
      includes: [],
      price: { daily: 0, monthly: 0, yearly: 0 },
      freeDelivery: false,
    },
    professional: {
      name: 'Professional',
      includes: ['Unlimited listings', 'Advanced analytics', 'Priority messaging'],
      price: { daily: 50, monthly: 1200, yearly: 12000 },
      freeDelivery: false,
    },
    enterprise: {
      name: 'Enterprise',
      includes: ['Everything in Professional', 'Dedicated account manager', 'Custom SLAs'],
      price: { daily: 70, monthly: 1800, yearly: 18000 },
      freeDelivery: true,
    }
  },
  // helper to format price display
  format(amount) {
    // Ensure we always show integer for KES
    if (amount === 0) return `KES 0`;
    return `KES ${amount}`;
  }
};

export default pricingConfig;
