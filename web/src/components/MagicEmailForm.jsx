import React, { useState, useEffect, useRef } from 'react';
import { Mail, Loader, Check, AlertCircle } from 'lucide-react';
import FormMessage from './FormMessage';
import {
  isValidEmail,
  sanitizeEmail,
  getRemainingCooldown,
  formatCooldownTime,
} from '../utils/email';

/**
 * MagicEmailForm - Reusable email authentication form component
 * Can be used in ContinueWithEmail page or embedded in modals/dialogs
 * 
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback when form is submitted with valid email
 * @param {string} props.placeholder - Input placeholder text
 * @param {string} props.buttonText - Submit button text
 * @param {boolean} props.loading - External loading state
 * @param {Object} props.message - Message object { type, text }
 * @param {Function} props.onMessageChange - Callback when message changes
 * @param {number} props.cooldownDuration - Cooldown duration in milliseconds (default: 30000)
 * @returns {JSX.Element}
 */
export default function MagicEmailForm({
  onSubmit = async (email) => {},
  placeholder = 'you@example.com',
  buttonText = 'Continue',
  loading = false,
  message = null,
  onMessageChange = () => {},
  cooldownDuration = 30000,
}) {
  const messageRef = useRef(null);
  const [email, setEmail] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // Initialize cooldown from localStorage
  useEffect(() => {
    const remaining = getRemainingCooldown();
    if (remaining > 0) {
      setCooldown(remaining);
    }
  }, []);

  // Update cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(prev => {
        const next = prev - 1000;
        return next > 0 ? next : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const isEmailValid = isValidEmail(email);
  const isOnCooldown = cooldown > 0;
  const isButtonDisabled = loading || isOnCooldown || !isEmailValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      onMessageChange({
        type: 'error',
        text: 'Please enter a valid email address',
      });
      return;
    }
    try {
      await onSubmit(sanitizeEmail(email));
      setCooldown(cooldownDuration);
      messageRef.current?.focus();
    } catch (err) {
      onMessageChange({
        type: 'error',
        text: err?.message || 'An error occurred',
      });
    }
  };

  const getInputClass = () => {
    let base = 'input w-full pl-10 transition-all focus:ring-2';
    if (!email) return base;
    return email && isEmailValid
      ? base + ' border-emerald-500 focus:ring-emerald-300 dark:border-emerald-600'
      : base + ' border-red-500 focus:ring-red-300 dark:border-red-600';
  };

  const cooldownDisplay = formatCooldownTime(Math.max(0, cooldown));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Input */}
      <div>
        <label htmlFor="magic-email" className="sr-only">
          Email address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-dark-400 pointer-events-none" />
          <input
            id="magic-email"
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              onMessageChange(null);
            }}
            disabled={loading}
            className={getInputClass()}
            aria-label="Email address"
            aria-invalid={email && !isEmailValid ? 'true' : 'false'}
            autoComplete="email"
          />
          {email && (
            <>
              {isEmailValid ? (
                <Check className="absolute right-3 top-3 w-5 h-5 text-emerald-500" aria-hidden />
              ) : (
                <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" aria-hidden />
              )}
            </>
          )}
        </div>
        {email && !isEmailValid && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            Please enter a valid email address
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isButtonDisabled}
        className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
          isButtonDisabled
            ? 'opacity-50 cursor-not-allowed bg-primary-500 text-white'
            : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white active:scale-95'
        }`}
        aria-busy={loading}
        aria-label={
          isOnCooldown
            ? `Retry in ${cooldownDisplay}`
            : loading
            ? 'Sending'
            : buttonText
        }
      >
        {loading && <Loader className="w-4 h-4 animate-spin" aria-hidden />}
        <span>
          {loading
            ? 'Sending...'
            : isOnCooldown
            ? `Resend in ${cooldownDisplay}`
            : buttonText}
        </span>
      </button>

      {/* Message Display */}
      <FormMessage ref={messageRef} message={message} />
    </form>
  );
}
