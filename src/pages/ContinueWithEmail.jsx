import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase';
import { useNavigate } from 'react-router-dom';

export default function ContinueWithEmail() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let t;
    if (cooldown > 0) {
      t = setTimeout(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [cooldown]);

  const validateEmail = (e) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const handleContinue = async () => {
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) {
        setMessage(error.message || 'Failed to send link');
      } else {
        setMessage('Check your email for the login link. It may take a minute.');
        setCooldown(30);
      }
    } catch (err) {
      console.error(err);
      setMessage('Unexpected error sending link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-dark-800 rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">Continue with Email</h2>
        <p className="text-sm text-dark-600 mb-4">Enter your email and we'll send a magic link to sign you in.</p>

        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full mb-3"
        />

        <button
          onClick={handleContinue}
          disabled={loading || cooldown > 0}
          className="btn btn-primary w-full"
        >
          {loading ? 'Sending...' : cooldown > 0 ? `Resend in ${cooldown}s` : 'Continue with Email'}
        </button>

        {message && <p className="text-sm mt-3 text-dark-600">{message}</p>}

        <div className="mt-4 text-sm text-dark-500">
          <button onClick={() => navigate('/')} className="underline">Back to home</button>
        </div>
      </div>
    </div>
  );
}
