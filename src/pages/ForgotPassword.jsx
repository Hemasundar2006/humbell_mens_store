import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Integrate API to send reset link here
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex items-center justify-center py-12 px-4 page-transition">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-2">Forgot Password</h1>
        <p className="text-primary-600 dark:text-primary-400 mb-6">Enter your email and we'll send you a reset link.</p>
        {sent ? (
          <div className="p-4 rounded-lg bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-white">If an account exists for {email}, a reset link has been sent.</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-white"
            />
            <button type="submit" className="w-full py-3 rounded-lg bg-primary-900 text-white dark:bg-white dark:text-primary-900 font-semibold">Send reset link</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;


