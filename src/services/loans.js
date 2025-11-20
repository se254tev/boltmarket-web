/**
 * Soft loans feature management
 * Users can apply for loans, providers set terms, and users track repayment
 */

import { loansAPI } from './supabase';

export const LOAN_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  DEFAULTED: 'defaulted',
};

export const REPAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  PARTIALLY_PAID: 'partially_paid',
};

/**
 * Apply for a loan
 */
export const applyForLoan = async (data) => {
  const {
    borrower_id,
    amount,
    reason,
    employment_status,
    annual_income,
    requested_term_months,
  } = data;

  try {
    const { data: loan, error } = await loansAPI.createLoanApplication({
      borrower_id,
      amount,
      reason,
      employment_status,
      annual_income,
      requested_term_months,
      status: LOAN_STATUS.PENDING,
    });

    if (error) throw error;
    return loan[0];
  } catch (error) {
    console.error('Error applying for loan:', error);
    throw error;
  }
};

/**
 * Get loan providers
 */
export const getLoanProviders = async () => {
  try {
    const { data: providers, error } = await loansAPI.getLoanProviders();
    if (error) throw error;
    return providers || [];
  } catch (error) {
    console.error('Error fetching loan providers:', error);
    throw error;
  }
};

/**
 * Get user's loan applications
 */
export const getUserLoans = async (userId) => {
  try {
    const { data: loans, error } = await loansAPI.getLoanApplications(userId);
    if (error) throw error;
    return loans || [];
  } catch (error) {
    console.error('Error fetching user loans:', error);
    throw error;
  }
};

/**
 * Approve loan application
 */
export const approveLoan = async (loanId, approvalData) => {
  const {
    approved_amount,
    interest_rate,
    term_months,
    monthly_payment,
  } = approvalData;

  try {
    const { data: loan, error } = await loansAPI.updateLoanStatus(
      loanId,
      LOAN_STATUS.APPROVED
    );

    if (error) throw error;

    // Store approval details
    console.log('Loan approved:', {
      approved_amount,
      interest_rate,
      term_months,
      monthly_payment,
    });

    return loan[0];
  } catch (error) {
    console.error('Error approving loan:', error);
    throw error;
  }
};

/**
 * Reject loan application
 */
export const rejectLoan = async (loanId, reason) => {
  try {
    const { data: loan, error } = await loansAPI.updateLoanStatus(
      loanId,
      LOAN_STATUS.REJECTED
    );

    if (error) throw error;

    console.log('Loan rejected. Reason:', reason);
    return loan[0];
  } catch (error) {
    console.error('Error rejecting loan:', error);
    throw error;
  }
};

/**
 * Activate approved loan (disburse funds)
 */
export const activateLoan = async (loanId) => {
  try {
    const { data: loan, error } = await loansAPI.updateLoanStatus(
      loanId,
      LOAN_STATUS.ACTIVE
    );

    if (error) throw error;

    // In real system, this would trigger fund disbursement
    console.log('Loan activated and funds disbursed');

    return loan[0];
  } catch (error) {
    console.error('Error activating loan:', error);
    throw error;
  }
};

/**
 * Record loan repayment
 */
export const recordRepayment = async (loanId, paymentData) => {
  const {
    amount,
    payment_method,
    transaction_id,
  } = paymentData;

  try {
    const { data: repayment, error } = await loansAPI.createRepayment({
      loan_id: loanId,
      amount,
      payment_method,
      transaction_id,
      status: REPAYMENT_STATUS.PAID,
      paid_date: new Date(),
    });

    if (error) throw error;

    return repayment[0];
  } catch (error) {
    console.error('Error recording repayment:', error);
    throw error;
  }
};

/**
 * Get repayment schedule
 */
export const getRepaymentSchedule = async (loanId) => {
  try {
    const { data: schedule, error } = await loansAPI.getRepaymentSchedule(loanId);
    if (error) throw error;
    return schedule || [];
  } catch (error) {
    console.error('Error fetching repayment schedule:', error);
    throw error;
  }
};

/**
 * Calculate loan details
 */
export const calculateLoanDetails = (principal, annualRate, monthsTerm) => {
  const monthlyRate = annualRate / 100 / 12;
  const n = monthsTerm;
  
  // Monthly payment calculation (amortization formula)
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1);
  
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - principal;

  return {
    principal,
    annualRate,
    monthsTerm,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    effectiveRate: annualRate + ((totalInterest / principal) * 100),
  };
};

/**
 * Generate repayment schedule
 */
export const generateRepaymentSchedule = (
  principal,
  monthlyPayment,
  monthsTerm,
  startDate = new Date()
) => {
  const schedule = [];
  let remainingBalance = principal;
  const date = new Date(startDate);

  for (let i = 0; i < monthsTerm; i++) {
    // Move to next month
    date.setMonth(date.getMonth() + 1);

    const interestPayment = remainingBalance * 0.02; // Assuming 2% monthly interest
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    schedule.push({
      installment: i + 1,
      due_date: new Date(date),
      monthly_payment: Math.round(monthlyPayment * 100) / 100,
      principal_payment: Math.round(principalPayment * 100) / 100,
      interest_payment: Math.round(interestPayment * 100) / 100,
      remaining_balance: Math.max(0, Math.round(remainingBalance * 100) / 100),
      status: REPAYMENT_STATUS.PENDING,
    });
  }

  return schedule;
};

/**
 * Get loan status badge color
 */
export const getLoanStatusColor = (status) => {
  const colors = {
    [LOAN_STATUS.PENDING]: 'bg-yellow-100 text-yellow-700',
    [LOAN_STATUS.APPROVED]: 'bg-blue-100 text-blue-700',
    [LOAN_STATUS.REJECTED]: 'bg-red-100 text-red-700',
    [LOAN_STATUS.ACTIVE]: 'bg-green-100 text-green-700',
    [LOAN_STATUS.COMPLETED]: 'bg-purple-100 text-purple-700',
    [LOAN_STATUS.DEFAULTED]: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

/**
 * Check if loan is eligible based on criteria
 */
export const checkLoanEligibility = (userProfile, loanAmount) => {
  const eligibility = {
    eligible: true,
    reasons: [],
  };

  // Check annual income (must be at least 10x the loan amount)
  if (!userProfile.annual_income || userProfile.annual_income < loanAmount * 10) {
    eligibility.eligible = false;
    eligibility.reasons.push('Income insufficient for loan amount');
  }

  // Check employment status
  if (!['employed', 'self-employed', 'business_owner'].includes(userProfile.employment_status)) {
    eligibility.eligible = false;
    eligibility.reasons.push('Employment status does not meet requirements');
  }

  // Check credit history (mock)
  if (userProfile.previous_defaults > 0) {
    eligibility.eligible = false;
    eligibility.reasons.push('Previous loan defaults on record');
  }

  // Check existing loans
  if (userProfile.active_loans > 2) {
    eligibility.eligible = false;
    eligibility.reasons.push('Too many active loans');
  }

  return eligibility;
};

export default {
  applyForLoan,
  getLoanProviders,
  getUserLoans,
  approveLoan,
  rejectLoan,
  activateLoan,
  recordRepayment,
  getRepaymentSchedule,
  calculateLoanDetails,
  generateRepaymentSchedule,
  getLoanStatusColor,
  checkLoanEligibility,
  LOAN_STATUS,
  REPAYMENT_STATUS,
};
