import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase';

export default function AuthCallback() {
  const [message, setMessage] = useState('Verifying...');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handle = async () => {
      setLoading(true);
      try {
        // Retrieve session from URL and store it
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
        if (error) {
          console.error('auth callback error', error);
          setMessage(error.message || 'Failed to verify session');
          setLoading(false);
          return;
        }

        const session = data?.session;
        const user = session?.user || (await supabase.auth.getUser()).data?.user;
        if (!user) {
          setMessage('No user information found');
          setLoading(false);
          return;
        }

        // Upsert profile into 'profiles' table (create on first login)
        const profile = {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          created_at: new Date().toISOString(),
        };

        const { error: upsertErr } = await supabase.from('profiles').upsert(profile, { returning: 'minimal' });
        if (upsertErr) {
          console.error('profile upsert error', upsertErr);
        }

        setMessage('Successfully signed in. Redirecting...');
        setTimeout(() => navigate('/dashboard'), 900);
      } catch (err) {
        console.error(err);
        setMessage('Unexpected error completing sign-in');
      } finally {
        setLoading(false);
      }
    };

    handle();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-dark-800 rounded-lg p-6 shadow text-center">
        <h2 className="text-lg font-semibold mb-2">Authentication</h2>
        <p className="text-sm text-dark-600">{message}</p>
        {loading && <div className="mt-4">Loading...</div>}
      </div>
    </div>
  );
}
