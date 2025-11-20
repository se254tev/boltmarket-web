import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import loansService, { calculateLoanDetails } from '../services/loans';
import { loansAPI } from '../services/supabase';

/**
 * Loans Page - Main entry point for soft loans feature
 * Allows users to apply for loans and view their loan history
 */
export const LoansPage = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('apply');
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
    employment_status: 'employed',
    annual_income: '',
    requested_term_months: 12,
  });

  useEffect(() => {
    if (activeTab === 'history') {
      loadUserLoans();
    }
  }, [activeTab]);

  const loadUserLoans = async () => {
    setIsLoading(true);
    try {
      const userLoans = await loansService.getUserLoans(userId);
      setLoans(userLoans);
    } catch (error) {
      console.error('Error loading loans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'annual_income' ? parseFloat(value) : value,
    }));
  };

  const handleApplyLoan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const application = await loansService.applyForLoan({
        borrower_id: userId,
        ...formData,
      });

      alert('Loan application submitted successfully!');
      setFormData({
        amount: '',
        reason: '',
        employment_status: 'employed',
        annual_income: '',
        requested_term_months: 12,
      });
      
      // Load loans to show new application
      loadUserLoans();
      setActiveTab('history');
    } catch (error) {
      alert('Error applying for loan: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-safe py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-2 mb-2">Soft Loans</h1>
        <p className="text-body-lg text-dark-600 dark:text-dark-300">
          Get quick loans with flexible repayment terms
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <FeatureCard
          icon={DollarSign}
          title="Fast Approval"
          description="Get approved within 24 hours"
        />
        <FeatureCard
          icon={TrendingUp}
          title="Flexible Terms"
          description="Choose your repayment period (6-36 months)"
        />
        <FeatureCard
          icon={CheckCircle}
          title="Competitive Rates"
          description="From 12% annual interest"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-dark-200 dark:border-dark-700">
        <button
          onClick={() => setActiveTab('apply')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'apply'
              ? 'border-primary-500 text-primary-500'
              : 'border-transparent text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-200'
          }`}
        >
          Apply for Loan
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'history'
              ? 'border-primary-500 text-primary-500'
              : 'border-transparent text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-200'
          }`}
        >
          My Loans
        </button>
        <button
          onClick={() => setActiveTab('providers')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'providers'
              ? 'border-primary-500 text-primary-500'
              : 'border-transparent text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-200'
          }`}
        >
          Loan Providers
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'apply' && (
        <LoanApplicationForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleApplyLoan}
          isLoading={isLoading}
        />
      )}

      {activeTab === 'history' && (
        <LoanHistory loans={loans} isLoading={isLoading} />
      )}

      {activeTab === 'providers' && (
        <LoanProviders />
      )}
    </div>
  );
};

/**
 * Feature Card Component
 */
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
      <Icon className="w-8 h-8 text-primary-500 mb-3" />
      <h3 className="font-bold text-dark-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-dark-600 dark:text-dark-300">{description}</p>
    </div>
  );
};

/**
 * Loan Application Form
 */
const LoanApplicationForm = ({ formData, onInputChange, onSubmit, isLoading }) => {
  const [loanDetails, setLoanDetails] = useState(null);

  const handleAmountChange = (e) => {
    onInputChange(e);
    if (e.target.value) {
      const details = calculateLoanDetails(
        parseFloat(e.target.value),
        18, // 18% annual rate example
        formData.requested_term_months
      );
      setLoanDetails(details);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-2">
        <form onSubmit={onSubmit} className="card card-base dark:bg-dark-800 dark:border-dark-700">
          <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
            Loan Application Form
          </h3>

          <div className="space-y-4">
            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                Loan Amount (KES)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleAmountChange}
                placeholder="10,000"
                min="5000"
                max="1000000"
                required
                className="input dark:bg-dark-800 dark:text-white dark:border-dark-600"
              />
              <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">
                Minimum 5,000 KES - Maximum 1,000,000 KES
              </p>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                Loan Purpose
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={onInputChange}
                placeholder="Tell us why you need this loan..."
                rows={3}
                required
                className="input dark:bg-dark-800 dark:text-white dark:border-dark-600"
              />
            </div>

            {/* Employment Status */}
            <div>
              <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                Employment Status
              </label>
              <select
                name="employment_status"
                value={formData.employment_status}
                onChange={onInputChange}
                className="input dark:bg-dark-800 dark:text-white dark:border-dark-600"
              >
                <option value="employed">Employed</option>
                <option value="self-employed">Self-employed</option>
                <option value="business_owner">Business Owner</option>
                <option value="student">Student</option>
                <option value="retired">Retired</option>
              </select>
            </div>

            {/* Annual Income */}
            <div>
              <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                Annual Income (KES)
              </label>
              <input
                type="number"
                name="annual_income"
                value={formData.annual_income}
                onChange={onInputChange}
                placeholder="500,000"
                required
                className="input dark:bg-dark-800 dark:text-white dark:border-dark-600"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                Repayment Period: {formData.requested_term_months} months
              </label>
              <input
                type="range"
                name="requested_term_months"
                value={formData.requested_term_months}
                onChange={onInputChange}
                min="6"
                max="36"
                step="6"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-dark-500 dark:text-dark-400 mt-2">
                <span>6 months</span>
                <span>36 months</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>

      {/* Loan Details Preview */}
      {loanDetails && (
        <div className="card card-base dark:bg-dark-800 dark:border-dark-700 h-fit sticky top-4">
          <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
            Loan Estimate
          </h3>
          <div className="space-y-3">
            <DetailRow
              label="Principal"
              value={`KES ${loanDetails.principal.toLocaleString()}`}
            />
            <DetailRow
              label="Monthly Payment"
              value={`KES ${loanDetails.monthlyPayment.toLocaleString()}`}
            />
            <DetailRow
              label="Total Interest"
              value={`KES ${loanDetails.totalInterest.toLocaleString()}`}
              highlight={true}
            />
            <DetailRow
              label="Total Repayment"
              value={`KES ${loanDetails.totalPayment.toLocaleString()}`}
              highlight={true}
            />
            <DetailRow
              label="Interest Rate"
              value="18% per annum"
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Detail Row Component
 */
const DetailRow = ({ label, value, highlight }) => {
  return (
    <div className={`flex justify-between items-center p-2 rounded ${
      highlight ? 'bg-primary-50 dark:bg-primary-900' : ''
    }`}>
      <span className="text-sm text-dark-600 dark:text-dark-300">{label}</span>
      <span className={`font-bold ${
        highlight 
          ? 'text-primary-600 dark:text-primary-300'
          : 'text-dark-900 dark:text-white'
      }`}>
        {value}
      </span>
    </div>
  );
};

/**
 * Loan History Component
 */
const LoanHistory = ({ loans, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading your loans...</div>;
  }

  if (loans.length === 0) {
    return (
      <div className="card card-base text-center py-8 dark:bg-dark-800 dark:border-dark-700">
        <p className="text-dark-500 dark:text-dark-400">You haven't applied for any loans yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loans.map((loan) => (
        <div
          key={loan.id}
          className="card card-base dark:bg-dark-800 dark:border-dark-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-dark-900 dark:text-white">
                KES {loan.amount.toLocaleString()}
              </h4>
              <p className="text-sm text-dark-500 dark:text-dark-400">
                Applied on {new Date(loan.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {loan.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
              {loan.status === 'approved' && <CheckCircle className="w-5 h-5 text-blue-500" />}
              {loan.status === 'active' && <CheckCircle className="w-5 h-5 text-green-500" />}
              <span className="text-sm font-medium capitalize">
                {loan.status}
              </span>
            </div>
          </div>
          {loan.approved_amount && (
            <p className="text-sm text-dark-600 dark:text-dark-300">
              Approved amount: KES {loan.approved_amount.toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Loan Providers Component
 */
const LoanProviders = () => {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const resp = await loansAPI.getProviders();
      setProviders(resp.data || []);
    } catch (error) {
      console.error('Error loading providers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading loan providers...</div>;
  }

  if (providers.length === 0) {
    return (
      <div className="card card-base text-center py-8 dark:bg-dark-800 dark:border-dark-700">
        <p className="text-dark-500 dark:text-dark-400">No loan providers available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {providers.map((provider) => (
        <div
          key={provider.id}
          className="card card-base dark:bg-dark-800 dark:border-dark-700"
        >
          <h4 className="font-bold text-dark-900 dark:text-white mb-2">
            {provider.name}
          </h4>
          <div className="space-y-2 mb-4">
            <p className="text-sm text-dark-600 dark:text-dark-300">
              <strong>Interest Rate:</strong> {provider.interest_rate}% per annum
            </p>
            <p className="text-sm text-dark-600 dark:text-dark-300">
              <strong>Min Amount:</strong> KES {provider.min_amount.toLocaleString()}
            </p>
            <p className="text-sm text-dark-600 dark:text-dark-300">
              <strong>Max Amount:</strong> KES {provider.max_amount.toLocaleString()}
            </p>
            <p className="text-sm text-dark-600 dark:text-dark-300">
              <strong>Term Range:</strong> {provider.min_term_months}-{provider.max_term_months} months
            </p>
          </div>
          <button className="btn btn-primary w-full">
            Apply with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LoansPage;
