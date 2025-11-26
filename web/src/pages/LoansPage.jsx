import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import loansService, { calculateLoanDetails } from '../services/loans';
import { loansAPI } from '../services/supabase';

export const LoansPage = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('apply');
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
    employment_status: 'employed',
    annual_income: '',
    phone_number: '',
    email: '',
    id_number: '',
    dob: '',
    gender: 'male',
    address: '',
    collateral: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    bank_account: '',
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
      [name]: ['amount', 'annual_income'].includes(name) ? (value === '' ? '' : parseFloat(value)) : value,
    }));
  };

  const handleApplyLoan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Basic validation
      const requiredFields = ['phone_number', 'id_number', 'email', 'dob', 'bank_account'];
      for (let field of requiredFields) {
        if (!formData[field]) {
          alert(`Please provide ${field.replace('_', ' ')}`);
          setIsLoading(false);
          return;
        }
      }

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
        phone_number: '',
        email: '',
        id_number: '',
        dob: '',
        gender: 'male',
        address: '',
        collateral: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        bank_account: '',
        requested_term_months: 12,
      });

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
      <div className="mb-8">
        <h1 className="text-heading-2 mb-2">Soft Loans</h1>
        <p className="text-body-lg text-dark-600 dark:text-dark-300">
          Get quick loans with flexible repayment terms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <FeatureCard icon={DollarSign} title="Fast Approval" description="Get approved within 24 hours" />
        <FeatureCard icon={TrendingUp} title="Flexible Terms" description="Choose your repayment period (6-36 months)" />
        <FeatureCard icon={CheckCircle} title="Competitive Rates" description="From 12% annual interest" />
      </div>

      <div className="flex gap-2 mb-6 border-b border-dark-200 dark:border-dark-700">
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="apply" label="Apply for Loan" />
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="history" label="My Loans" />
        <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="providers" label="Loan Providers" />
      </div>

      {activeTab === 'apply' && (
        <LoanApplicationForm formData={formData} onInputChange={handleInputChange} onSubmit={handleApplyLoan} isLoading={isLoading} />
      )}
      {activeTab === 'history' && <LoanHistory loans={loans} isLoading={isLoading} />}
      {activeTab === 'providers' && <LoanProviders />}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
    <Icon className="w-8 h-8 text-primary-500 mb-3" />
    <h3 className="font-bold text-dark-900 dark:text-white mb-1">{title}</h3>
    <p className="text-sm text-dark-600 dark:text-dark-300">{description}</p>
  </div>
);

const TabButton = ({ activeTab, setActiveTab, tab, label }) => (
  <button
    onClick={() => setActiveTab(tab)}
    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
      activeTab === tab ? 'border-primary-500 text-primary-500' : 'border-transparent text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-dark-200'
    }`}
  >
    {label}
  </button>
);

const LoanApplicationForm = ({ formData, onInputChange, onSubmit, isLoading }) => {
  const [loanDetails, setLoanDetails] = useState(null);

  const handleAmountChange = (e) => {
    onInputChange(e);
    if (e.target.value) {
      const details = calculateLoanDetails(parseFloat(e.target.value), 18, formData.requested_term_months);
      setLoanDetails(details);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <form onSubmit={onSubmit} className="card card-base dark:bg-dark-800 dark:border-dark-700">
          <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">Loan Application Form</h3>

          <div className="space-y-4">
            <InputField label="Loan Amount (KES)" name="amount" type="number" value={formData.amount} onChange={handleAmountChange} placeholder="10,000" min="5000" max="1000000" />
            <TextareaField label="Loan Purpose" name="reason" value={formData.reason} onChange={onInputChange} placeholder="Tell us why you need this loan..." />
            <SelectField label="Employment Status" name="employment_status" value={formData.employment_status} onChange={onInputChange} options={['employed', 'self-employed', 'business_owner', 'student', 'retired']} />
            <InputField label="Annual Income (KES)" name="annual_income" type="number" value={formData.annual_income} onChange={onInputChange} placeholder="500,000" />
            <InputField label="Phone Number" name="phone_number" type="tel" value={formData.phone_number} onChange={onInputChange} placeholder="07XXXXXXXX" />
            <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={onInputChange} placeholder="you@example.com" />
            <InputField label="ID Number" name="id_number" type="text" value={formData.id_number} onChange={onInputChange} placeholder="ID / National ID" />
            <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={onInputChange} />
            <SelectField label="Gender" name="gender" value={formData.gender} onChange={onInputChange} options={['male', 'female', 'other']} />
            <InputField label="Address" name="address" type="text" value={formData.address} onChange={onInputChange} placeholder="Your full address" />
            <InputField label="Collateral / Security" name="collateral" type="text" value={formData.collateral} onChange={onInputChange} placeholder="If any" />
            <InputField label="Emergency Contact Name" name="emergency_contact_name" type="text" value={formData.emergency_contact_name} onChange={onInputChange} placeholder="Emergency contact" />
            <InputField label="Emergency Contact Phone" name="emergency_contact_phone" type="tel" value={formData.emergency_contact_phone} onChange={onInputChange} placeholder="07XXXXXXXX" />
            <InputField label="Bank Account / Mobile Money" name="bank_account" type="text" value={formData.bank_account} onChange={onInputChange} placeholder="Bank account / M-PESA" />

            <div>
              <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                Repayment Period: {formData.requested_term_months} months
              </label>
              <input type="range" name="requested_term_months" value={formData.requested_term_months} onChange={onInputChange} min="6" max="36" step="6" className="w-full" />
              <div className="flex justify-between text-xs text-dark-500 dark:text-dark-400 mt-2">
                <span>6 months</span>
                <span>36 months</span>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary w-full disabled:opacity-50">
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>

      {loanDetails && (
        <div className="card card-base dark:bg-dark-800 dark:border-dark-700 h-fit sticky top-4">
          <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">Loan Estimate</h3>
          <DetailRow label="Principal" value={`KES ${loanDetails.principal.toLocaleString()}`} />
          <DetailRow label="Monthly Payment" value={`KES ${loanDetails.monthlyPayment.toLocaleString()}`} />
          <DetailRow label="Total Interest" value={`KES ${loanDetails.totalInterest.toLocaleString()}`} highlight />
          <DetailRow label="Total Repayment" value={`KES ${loanDetails.totalPayment.toLocaleString()}`} highlight />
          <DetailRow label="Interest Rate" value="18% per annum" />
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, name, type, value, onChange, placeholder, min, max }) => (
  <div>
    <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} min={min} max={max} className="input dark:bg-dark-800 dark:text-white dark:border-dark-600" />
  </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">{label}</label>
    <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3} className="input dark:bg-dark-800 dark:text-white dark:border-dark-600" />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">{label}</label>
    <select name={name} value={value} onChange={onChange} className="input dark:bg-dark-800 dark:text-white dark:border-dark-600">
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt.replace('_', ' ')}</option>
      ))}
    </select>
  </div>
);

const DetailRow = ({ label, value, highlight }) => (
  <div className={`flex justify-between items-center p-2 rounded ${highlight ? 'bg-primary-50 dark:bg-primary-900' : ''}`}>
    <span className="text-sm text-dark-600 dark:text-dark-300">{label}</span>
    <span className={`font-bold ${highlight ? 'text-primary-600 dark:text-primary-300' : 'text-dark-900 dark:text-white'}`}>{value}</span>
  </div>
);

export default LoansPage;
