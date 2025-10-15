import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const STORAGE_KEY = 'humbell_login_prompt_dismissed';
const SHOWN_KEY = 'humbell_login_prompt_shown';

const LoginPrompt = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setOpen(false);
      return;
    }
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    const alreadyShown = sessionStorage.getItem(SHOWN_KEY);
    if (!dismissed && !alreadyShown) {
      sessionStorage.setItem(SHOWN_KEY, '1'); // prevent duplicate show (StrictMode, re-renders)
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, [user]);

  const handleClose = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
  };

  const handleLogin = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
    navigate('/login');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white dark:bg-primary-900 rounded-2xl shadow-2xl w-[90%] max-w-md p-6 animate-scale-in">
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 text-primary-900 dark:text-white"
          aria-label="Close"
          onClick={handleClose}
        >
          <FiX size={20} />
        </button>
        <h3 className="text-2xl font-display font-bold text-primary-900 dark:text-white mb-2">Welcome to Humbell</h3>
        <p className="text-primary-700 dark:text-primary-300 mb-6">Log in to access faster checkout, saved items, and exclusive offers.</p>
        <div className="flex gap-3">
          <button
            onClick={handleLogin}
            className="flex-1 bg-primary-900 dark:bg-white text-white dark:text-primary-900 font-semibold py-3 rounded-lg hover:opacity-90"
          >
            Login
          </button>
          <button
            onClick={handleClose}
            className="flex-1 border border-primary-300 dark:border-primary-700 text-primary-900 dark:text-white py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-800"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;


