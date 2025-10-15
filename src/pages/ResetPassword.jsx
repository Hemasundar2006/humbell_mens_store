import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    // Integrate API to reset password using token
    setDone(true);
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex items-center justify-center py-12 px-4 page-transition">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-2">Reset Password</h1>
        <p className="text-primary-600 dark:text-primary-400 mb-6">Enter your new password{token ? '' : ' (demo token missing)'}.</p>
        {done ? (
          <div className="p-4 rounded-lg bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-white">Password updated. Redirecting to login…</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="password" required placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-white" />
            <input type="password" required placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-white" />
            <button type="submit" className="w-full py-3 rounded-lg bg-primary-900 text-white dark:bg-white dark:text-primary-900 font-semibold">Update password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;


