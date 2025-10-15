import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Loader from '../components/Loader';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 page-transition">
      <div className="max-w-md w-full space-y-8 animate-fade-in-up">
        <div>
          <h2 className="text-center text-3xl font-display font-bold text-primary-900 dark:text-white animate-fade-in-down">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-primary-600 dark:text-primary-400 animate-fade-in-up delay-100">
            Join us today
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={onChange}
                className="appearance-none relative block w-full px-4 py-3 border border-primary-300 dark:border-primary-700 placeholder-primary-500 dark:placeholder-primary-500 text-primary-900 dark:text-white bg-white dark:bg-primary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={onChange}
                className="appearance-none relative block w-full px-4 py-3 border border-primary-300 dark:border-primary-700 placeholder-primary-500 dark:placeholder-primary-500 text-primary-900 dark:text-white bg-white dark:bg-primary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={onChange}
                className="appearance-none relative block w-full px-4 py-3 border border-primary-300 dark:border-primary-700 placeholder-primary-500 dark:placeholder-primary-500 text-primary-900 dark:text-white bg-white dark:bg-primary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password2" className="sr-only">
                Confirm Password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                required
                value={password2}
                onChange={onChange}
                className="appearance-none relative block w-full px-4 py-3 border border-primary-300 dark:border-primary-700 placeholder-primary-500 dark:placeholder-primary-500 text-primary-900 dark:text-white bg-white dark:bg-primary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-900 hover:bg-primary-800 dark:bg-white dark:text-primary-900 dark:hover:bg-primary-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300">Create Account</span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-200">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

