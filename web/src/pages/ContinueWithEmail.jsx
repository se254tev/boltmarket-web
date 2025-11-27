import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertCircle, Mail, Loader } from 'lucide-react';
import supabase from '../services/supabase';
import {
  isValidEmail,
  sanitizeEmail,
  getRemainingCooldown,
  setCooldown,
  formatCooldownTime,
} from '../utils/email';

/**
 * ContinueWithEmail - Production-ready email authentication component
 * Features:
 * - Real-time email validation with visual feedback
 * - Persistent cooldown timer using localStorage
 * - Smooth loading states with spinner
 * - Accessibility (aria-live, labels, focus management)
 * - Anti-abuse throttling (3 attempts per minute)
 * - Enhanced error handling for Supabase OTP flow
 */
export default function ContinueWithEmail() {
  const navigate = useNavigate();
  const messageRef = useRef(null);

  // State management
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null); // { type: 'error' | 'success', text: '...' }
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldownState] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);

  // Initialize cooldown from localStorage on mount
  useEffect(() => {
    const remaining = getRemainingCooldown();
    if (remaining > 0) {
      setCooldownState(remaining);
    }
  }, []);

  // Update cooldown timer every second
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldownState(prev => {
        const next = prev - 1000;
        return next > 0 ? next : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  /**
   * Check if email is valid for submission
   * Returns true if email passes validation
   */
  const isEmailValid = isValidEmail(email);

  /**
   * Handle email input change with real-time validation
   */
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Clear message on new input
    if (message) setMessage(null);
  };

  /**
   * Main email send handler with enhanced error handling
   * TODO: Add analytics tracking (login_start, login_success, login_error)
   */
  const handleContinue = async () => {
    // Validation checks
    if (!isEmailValid) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address (e.g., user@example.com)',
      });
      return;
    }

    // Anti-abuse check: max 3 attempts per minute
    if (attemptCount >= 3) {
      setMessage({
        type: 'error',
        text: 'Too many attempts. Please wait a few minutes before trying again.',
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const cleanEmail = sanitizeEmail(email);
      const redirectTo = `${window.location.origin}/auth/callback`;

      // TODO: Add server-side email domain validation and whitelist check

      // Attempt OTP sign-in
      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: { emailRedirectTo: redirectTo },
      });

      if (error) {
        // Handle specific Supabase errors
        let errorText = error.message || 'Failed to send sign-in link';

        if (error.status === 429 || error.message?.includes('rate')) {
          // Rate limit error from Supabase
          errorText = 'Too many sign-in attempts. Please try again in a few minutes.';
          setCooldown(60000); // 60 second cooldown
        } else if (error.message?.includes('Cooldown')) {
          // Cooldown error from Supabase
          errorText = 'Please wait before requesting another sign-in link.';
          setCooldown(30000); // 30 second cooldown
        }

        setMessage({ type: 'error', text: errorText });
        // TODO: Log error to error tracking service (Sentry, etc.)
      } else {
        // Success!
        setMessage({
          type: 'success',
          text: 'Check your email for the magic sign-in link. It may take up to 1 minute to arrive.',
        });

        // Set 30-second cooldown
        const cooldownDuration = 30000;
        setCooldown(cooldownDuration);
        setCooldownState(cooldownDuration);

        // Increment attempt count (resets after 60 seconds)
        setAttemptCount(prev => prev + 1);
        setTimeout(() => setAttemptCount(0), 60000);

        // Focus message for accessibility
        messageRef.current?.focus();
      }
    } catch (err) {
      console.error('Unexpected error during email auth:', err);
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again or contact support.',
      });
      // TODO: Log to error tracking service
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle "resend" link click - allows user to request a new link
   * (only available when cooldown is near completion)
   */
  const handleResendLink = () => {
    if (cooldown > 5000) return; // Prevent accidental resend
    handleContinue();
  };

  /**
   * Determine input styling based on validation state
   */
  const getInputClass = () => {
    let base = 'input w-full mb-4 transition-all focus:ring-2';
    if (email === '') return base;
    if (isEmailValid) {
      return base + ' border-emerald-500 focus:ring-emerald-300 dark:border-emerald-600';
    } else {
      return base + ' border-red-500 focus:ring-red-300 dark:border-red-600';
    }
  };

  const cooldownMs = Math.max(0, cooldown);
  const cooldownDisplay = formatCooldownTime(cooldownMs);
  const isOnCooldown = cooldownMs > 0;
  const isButtonDisabled = loading || isOnCooldown || !isEmailValid;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
              Sign In with Email
            </h1>
            <p className="text-sm text-dark-600 dark:text-dark-400">
              Enter your email and we'll send you a magic sign-in link.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isButtonDisabled) handleContinue();
            }}
            className="space-y-4"
          >
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-dark-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={loading}
                  className={`${getInputClass()} pl-10`}
                  aria-label="Email address"
                  aria-invalid={email && !isEmailValid ? 'true' : 'false'}
                  aria-describedby={email && !isEmailValid ? 'email-error' : undefined}
                  autoComplete="email"
                />
                {/* Validation icon */}
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
                <p id="email-error" className="text-xs text-red-600 dark:text-red-400 mt-1">
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
                  ? `Retry sign-in in ${cooldownDisplay}`
                  : loading
                  ? 'Sending sign-in link'
                  : 'Send sign-in link'
              }
            >
              {loading && <Loader className="w-4 h-4 animate-spin" aria-hidden />}
              <span>
                {loading
                  ? 'Sending...'
                  : isOnCooldown
                  ? `Resend in ${cooldownDisplay}`
                  : 'Continue with Email'}
              </span>
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div
              ref={messageRef}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={`mt-4 p-3 rounded-lg text-sm flex gap-2 items-start ${
                message.type === 'error'
                  ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                  : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              }`}
              tabIndex={-1}
            >
              {message.type === 'error' ? (
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden />
              ) : (
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden />
              )}
              <p>{message.text}</p>
            </div>
          )}

          {/* Resend Link Helper (visible when cooldown is ending) */}
          {isOnCooldown && cooldownMs <= 5000 && (
            <button
              onClick={handleResendLink}
              disabled={cooldownMs > 5000}
              className="mt-3 text-xs text-primary-600 dark:text-primary-400 hover:underline disabled:opacity-50"
              aria-label="Request a new sign-in link"
            >
              Having trouble? Request a new link
            </button>
          )}

          {/* Footer Links */}
          <div className="mt-6 pt-6 border-t border-dark-200 dark:border-dark-700">
            <div className="flex items-center justify-between gap-3 text-xs">
              <button
                onClick={() => navigate('/')}
                className="text-primary-600 dark:text-primary-400 hover:underline"
                aria-label="Return to home page"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="text-primary-600 dark:text-primary-400 hover:underline"
                aria-label="Create a new account"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>

        {/* Additional Help Text */}
        <p className="text-center text-xs text-dark-600 dark:text-dark-400 mt-4">
          No password needed. We'll send you a secure link via email.
        </p>
      </div>
    </div>
  );
}
