import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiSun, FiMoon, FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const announcements = [
    'FREE SHIPPING ON ORDERS ABOVE ₹999',
    'FLAT 10% OFF ON FIRST ORDER – CODE: HELLO10',
    'NEW ARRIVALS DROP EVERY FRIDAY',
    'EASY RETURNS WITHIN 14 DAYS',
    'EARN REWARDS ON EVERY PURCHASE',
    'SUPPORT: support@humbell.com',
  ];
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!user) {
      const dismissed = localStorage.getItem('dismissedLoginPrompt');
      if (dismissed === 'true') {
        setShowLoginPrompt(false);
        return;
      }
      const timer = setTimeout(() => setShowLoginPrompt(true), 1200);
      const auto = setTimeout(() => {
        setShowLoginPrompt(false);
        localStorage.setItem('dismissedLoginPrompt', 'true');
      }, 8000);
      const onKey = (e) => {
        if (e.key === 'Escape') {
          setShowLoginPrompt(false);
          localStorage.setItem('dismissedLoginPrompt', 'true');
        }
      };
      window.addEventListener('keydown', onKey);
      return () => {
        clearTimeout(timer);
        clearTimeout(auto);
        window.removeEventListener('keydown', onKey);
      };
    } else {
      setShowLoginPrompt(false);
    }
  }, [user]);

  useEffect(() => {
    const id = setInterval(() => {
      setAnnouncementIndex((i) => (i + 1) % announcements.length);
    }, 2000);
    return () => clearInterval(id);
  }, [announcements.length]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 bg-transparent ${
      scrolled ? 'backdrop-blur-sm ' : ''
    }`}>
      {/* Announcement Bar */}
      <div className="bg-[#071018] text-white">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 h-8 flex items-center justify-center gap-2 announcement-ticker">
          <FiChevronLeft className="text-blue-300" size={14} />
          <span key={announcementIndex} className="text-[10px] sm:text-xs tracking-wider">
            {announcements[announcementIndex]}
          </span>
          <FiChevronRight className="text-blue-300" size={14} />
        </div>
      </div>

      {/* Auth quick bar: Login (left) • Theme (center) • Register (right) */}
      {!user && (
        <div className="bg-white/60 dark:bg-primary-900/60 backdrop-blur-sm md:hidden">
          <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 h-10 grid grid-cols-3 items-center">
            <Link to="/login" onClick={() => setIsOpen(false)} className="justify-self-start text-sm font-medium text-primary-900 dark:text-white">Login</Link>
            <button
              onClick={toggleTheme}
              className="justify-self-center text-sm px-3 py-1 rounded-full hover:bg-primary-50 dark:hover:bg-primary-800 text-primary-900 dark:text-white"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <Link to="/register" onClick={() => setIsOpen(false)} className="justify-self-end text-sm font-medium text-primary-900 dark:text-white">Register</Link>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="rounded-2xl border border-white/40 dark:border-primary-700/60 bg-white/70 dark:bg-primary-900/70 shadow-lg backdrop-blur-md px-3 sm:px-4 lg:px-5">
          <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
            <img src="/Humbell_logo.jpg" alt="Humbell" className="h-10 w-auto object-contain" />
            <span className="text-xl md:text-2xl font-display font-bold text-primary-900 dark:text-white brand-animated-rtl">HUMBELL</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 nav-underline"
            >
              Home
            </Link>
            <Link
              to="/shop?gender=men"
              className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 nav-underline"
            >
              Menswear
            </Link>
            <Link
              to="/accessories"
              className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 nav-underline"
            >
              Accessories
            </Link>
            <Link
              to="/sale"
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 hover:-translate-y-0.5 blink-blue-text"
            >
              Sale
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 nav-underline"
            >
              About
            </Link>
            {/* <Link
              to="/blog"
              className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 nav-underline"
            >
              Blog
            </Link> */}
            <Link
              to="/contact"
              className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 nav-underline"
            >
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle - Desktop Only */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-800 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-0 focus-visible:ring-0"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-colors nav-underline"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-colors nav-underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-1 text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-colors nav-underline"
              >
                <FiUser size={20} />
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-800 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-0 focus-visible:ring-0"
            >
              <FiShoppingBag size={20} className={cartItems.length > 0 ? 'animate-bounce-soft' : ''} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-900 dark:bg-white text-white dark:text-primary-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-800 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-0 focus-visible:ring-0"
            >
              <FiHeart size={20} />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-800 rounded-lg transition-colors focus:outline-none focus:ring-0 focus-visible:ring-0"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-transparent backdrop-blur-sm">
          <div className="px-2 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-primary-200 hover:bg-white/10 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop?gender=men"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-primary-200 hover:bg-white/10 rounded-lg transition-colors"
            >
              Menswear
            </Link>
            <Link
              to="/accessories"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-primary-200 hover:bg-white/10 rounded-lg transition-colors"
            >
              Accessories
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-primary-200 hover:bg-white/10 rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-primary-200 hover:bg-white/10 rounded-lg transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-primary-200 hover:bg-white/10 rounded-lg transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/sale"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-blue-600 dark:text-blue-400 hover:bg-white/10 rounded-lg transition-colors blink-blue-text"
            >
              Sale
            </Link>
            
            {/* {user ? (
              <>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-primary-200 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-primary-700 dark:text-primary-200 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-primary-700 dark:text-primary-200 hover:bg-white/10 rounded-lg transition-colors"
              >
                Login
              </Link>
            )} */}
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <button className="absolute inset-0 bg-black/50" aria-label="Dismiss" onClick={() => { setShowLoginPrompt(false); localStorage.setItem('dismissedLoginPrompt', 'true'); }}></button>
          <div className="relative bg-white dark:bg-primary-900 rounded-2xl shadow-2xl w-[90%] max-w-md p-6">
            <button
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800"
              aria-label="Close"
              onClick={() => { setShowLoginPrompt(false); localStorage.setItem('dismissedLoginPrompt', 'true'); }}
            >
              <FiX size={20} />
            </button>
            <h3 className="text-xl font-display font-bold text-primary-900 dark:text-white mb-2">Welcome to Humbell</h3>
            <p className="text-primary-700 dark:text-primary-200 mb-6">Log in to sync your cart, track orders, and get personalized picks.</p>
            <div className="flex gap-3">
              <Link to="/login" className="flex-1 px-4 py-3 rounded-lg bg-primary-900 text-white dark:bg-white dark:text-primary-900 text-center font-semibold blink-blue" onClick={() => { setShowLoginPrompt(false); localStorage.setItem('dismissedLoginPrompt', 'true'); }}>Login</Link>
              <Link to="/register" className="flex-1 px-4 py-3 rounded-lg border border-primary-300 dark:border-primary-700 text-primary-900 dark:text-white text-center font-semibold" onClick={() => { setShowLoginPrompt(false); localStorage.setItem('dismissedLoginPrompt', 'true'); }}>Register</Link>
            </div>
            <button className="mt-4 w-full text-sm text-primary-700 dark:text-primary-300 hover:underline" onClick={() => { setShowLoginPrompt(false); localStorage.setItem('dismissedLoginPrompt', 'true'); }}>Maybe later</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

