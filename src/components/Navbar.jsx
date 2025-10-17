import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiSun, FiMoon, FiChevronLeft, FiChevronRight, FiHeart, FiSearch } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState('100%');
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

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

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

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDragMove);
      document.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, dragStart]);

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

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart;
    const screenWidth = window.innerWidth;
    const newWidth = Math.max(60, Math.min(100, (100 + (deltaX / screenWidth) * 100)));
    setSidebarWidth(`${newWidth}%`);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const widthPercent = parseFloat(sidebarWidth);
    if (widthPercent > 80) {
      setSidebarWidth('100%');
    } else if (widthPercent < 70) {
      setSidebarWidth('60%');
    }
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setSidebarWidth('100%');
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

      {/* Mobile Navbar */}
      <div className="md:hidden bg-white dark:bg-primary-900 border-b border-gray-300 dark:border-primary-700">
        <div className="max-w-5xl mx-auto px-3">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg transition-colors flex-shrink-0"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

            {/* Center: Brand with Logo and Crown */}
            <Link to="/" className="flex items-center gap-1.5 flex-1 justify-center">
              <img src="/Humbell_logo.jpg" alt="Humbell" className="h-5 w-auto object-contain" />
              {/* <span className="text-base">👑</span> */}
              <span className="text-xs font-semibold text-gray-800 dark:text-white tracking-wide">HUMBELL</span>
            </Link>

            {/* Right: Action Icons */}
            <div className="flex items-center space-x-0.5 flex-shrink-0">
              {/* Search */}
              <button className="p-1.5 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-primary-800 rounded-full transition-colors">
                <FiSearch size={18} />
              </button>
              
              {/* Subscriptions */}
              <Link
                to="/subscriptions"
                className="p-1.5 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-full transition-colors"
                aria-label="Subscriptions"
              >
                <span className="text-base">⭐</span>
              </Link>
              
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-1.5 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-primary-800 rounded-full transition-colors"
              >
                <FiHeart size={18} />
              </Link>
              
              {/* Profile */}
              <Link
                to="/login"
                className="p-1.5 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-primary-800 rounded-full transition-colors"
                aria-label="Profile"
              >
                <FiUser size={18} />
              </Link>
              
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-1.5 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-primary-800 rounded-full transition-colors"
              >
                <FiShoppingBag size={18} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gray-800 dark:bg-white text-white dark:text-gray-800 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:block max-w-5xl mx-auto px-2 sm:px-4 lg:px-6">
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
            </div>

            {/* Desktop Right Icons */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Subscriptions Icon */}
            <Link
                to="/subscriptions"
                className="p-2 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-0 focus-visible:ring-0"
                aria-label="Subscriptions"
            >
                <span className="text-xl">⭐</span>
            </Link>

              {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
                className="p-2 text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-800 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-0 focus-visible:ring-0"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* User Menu */}
            {user ? (
                <div className="flex items-center space-x-4">
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
                  className="flex items-center space-x-1 text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-colors nav-underline"
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
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop - positioned below navbar */}
          <div 
            className="absolute left-0 top-16 right-0 bottom-0 bg-black/50 transition-opacity"
            onClick={closeSidebar}
            onTouchEnd={closeSidebar}
          />
          
          {/* Sidebar */}
          <div 
            className={`absolute left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-primary-900 shadow-2xl transition-all duration-300 ${
              isDragging ? 'transition-none' : ''
            }`}
            style={{ width: sidebarWidth }}
          >
            {/* Drag Handle */}
            <div 
              className="absolute right-0 top-0 w-1 h-full bg-gray-300 dark:bg-primary-700 cursor-ew-resize hover:bg-gray-400 dark:hover:bg-primary-600 transition-colors"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            />
            
            <div className="h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-primary-700">
                <div className="flex items-center gap-2">
                  <img src="/Humbell_logo.jpg" alt="Humbell" className="h-6 w-auto object-contain" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">HUMBELL</span>
                </div>
                <button
                  onClick={closeSidebar}
                  className="p-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-primary-800 rounded-full"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Top Categories with Images */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Shop by Category</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Link to="/shop/t-shirts" onClick={closeSidebar} className="text-center">
                    <div className="w-full h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">👕</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">T-Shirts</span>
                  </Link>
                  <Link to="/shop/shirts" onClick={closeSidebar} className="text-center">
                    <div className="w-full h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">👔</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">Shirts</span>
                  </Link>
                  <Link to="/shop/jeans" onClick={closeSidebar} className="text-center">
                    <div className="w-full h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">👖</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">Jeans</span>
                  </Link>
                  <Link to="/shop/tracks" onClick={closeSidebar} className="text-center">
                    <div className="w-full h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">🏃</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">Tracks</span>
                  </Link>
                  <Link to="/shop/hoodies" onClick={closeSidebar} className="text-center">
                    <div className="w-full h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">🧥</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">Hoodies</span>
                  </Link>
                  <Link to="/shop/jackets" onClick={closeSidebar} className="text-center">
                    <div className="w-full h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">🧥</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">Jackets</span>
                  </Link>
                </div>
              </div>

              {/* T-Shirts Categories */}
              <div className="px-4 pb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">T-Shirts</h4>
                <div className="space-y-1">
                  <Link to="/shop/t-shirts/polo-printed" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👕</span>
                    </div>
                    <span>Polo Printed T-Shirts</span>
                  </Link>
                  <Link to="/shop/t-shirts/round-neck-printed" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👕</span>
                    </div>
                    <span>Round Neck Printed</span>
                  </Link>
                  <Link to="/shop/t-shirts/polo" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👕</span>
                    </div>
                    <span>Polo T-Shirts</span>
                  </Link>
                  <Link to="/shop/t-shirts/round-neck" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👕</span>
                    </div>
                    <span>Round Neck T-Shirts</span>
                  </Link>
                </div>
              </div>

              {/* Shirts Categories */}
              <div className="px-4 pb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Shirts</h4>
                <div className="space-y-1">
                  <Link to="/shop/shirts/plain" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👔</span>
                    </div>
                    <span>Plain Shirts</span>
                  </Link>
                  <Link to="/shop/shirts/office-wear" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👔</span>
                    </div>
                    <span>Office Wear Shirts</span>
                  </Link>
                  <Link to="/shop/shirts/printed" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👔</span>
                    </div>
                    <span>Printed Shirts</span>
                  </Link>
                  <Link to="/shop/shirts/check" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👔</span>
                    </div>
                    <span>Check Shirts</span>
                  </Link>
                  <Link to="/shop/shirts/streetwear" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👔</span>
                    </div>
                    <span>Streetwear Shirts</span>
                  </Link>
                </div>
              </div>

              {/* Hoodies Categories */}
              <div className="px-4 pb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Hoodies</h4>
                <div className="space-y-1">
                  <Link to="/shop/hoodies/pullover" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🧥</span>
                    </div>
                    <span>Pullover Hoodie</span>
                  </Link>
                  <Link to="/shop/hoodies/zip-up" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🧥</span>
                    </div>
                    <span>Zip-Up Hoodies</span>
                  </Link>
                  <Link to="/shop/hoodies/sleeveless" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🧥</span>
                    </div>
                    <span>Sleeveless Hoodie</span>
                  </Link>
                  <Link to="/shop/hoodies/graphic" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🧥</span>
                    </div>
                    <span>Graphic Hoodie</span>
                  </Link>
                  <Link to="/shop/hoodies/fleece" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🧥</span>
                    </div>
                    <span>Fleece Hoodie</span>
                  </Link>
                  <Link to="/shop/hoodies/tech" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🧥</span>
                    </div>
                    <span>Tech Hoodie</span>
            </Link>
                </div>
              </div>

              {/* Shorts Categories */}
              <div className="px-4 pb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Shorts</h4>
                <div className="space-y-1">
                  {['Print', 'Plain', '3/4', 'Cargo', 'Board', 'Bermuda', 'Sweat', 'Running', 'Chino', 'Denim'].map((type) => (
            <Link
                      key={type}
                      to={`/shop/shorts/${type.toLowerCase()}`}
                      onClick={closeSidebar}
                      className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                        <span className="text-sm">🩳</span>
                      </div>
                      <span>{type} Shorts</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Cargo Pants Categories */}
              <div className="px-4 pb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Cargo Pants</h4>
                <div className="space-y-1">
                  <Link to="/shop/cargo/classic" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👖</span>
                    </div>
                    <div className="flex-1">
                      <span>Classic Cargo Pants</span>
                      <span className="text-xs text-gray-500 block">Loose/Relaxed Fit</span>
                    </div>
                  </Link>
                  <Link to="/shop/cargo/slim-fit" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👖</span>
                    </div>
                    <span>Slim Fit Cargoes</span>
                  </Link>
                  <Link to="/shop/cargo/tactical" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👖</span>
                    </div>
                    <span>Tactical Cargo</span>
                  </Link>
                  <Link to="/shop/cargo/jogger" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👖</span>
                    </div>
                    <span>Jogger Cargo</span>
                  </Link>
                  <Link to="/shop/cargo/chinos" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👖</span>
                    </div>
                    <span>Cargo Chinos</span>
                  </Link>
                </div>
              </div>

              {/* Sports & Innerwear */}
              <div className="px-4 pb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Sports & Innerwear</h4>
                <div className="space-y-1">
                  <Link to="/shop/sportswear/t-shirts" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👕</span>
                    </div>
                    <span>Sports T-Shirts</span>
                  </Link>
                  <Link to="/shop/sportswear/tracks" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👖</span>
                    </div>
                    <span>Track Pants</span>
                  </Link>
                  <Link to="/shop/sportswear/shorts" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🩳</span>
                    </div>
                    <span>Sports Shorts</span>
                  </Link>
                  <Link to="/shop/sportswear/jackets" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🧥</span>
                    </div>
                    <span>Track Jackets</span>
                  </Link>
                </div>
              </div>

              {/* Innerwear Categories */}
              <div className="px-4 pb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Innerwear</h4>
                <div className="space-y-1">
                  <Link to="/shop/innerwear/briefs" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🩲</span>
                    </div>
                    <div className="flex-1">
                      <span>Briefs</span>
                      <span className="text-xs text-gray-500 block">Snug Fit</span>
                    </div>
                  </Link>
                  <Link to="/shop/innerwear/boxers" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🩲</span>
                    </div>
                    <div className="flex-1">
                      <span>Boxers</span>
                      <span className="text-xs text-gray-500 block">Loose Fit</span>
                    </div>
                  </Link>
                  <Link to="/shop/innerwear/boxer-briefs" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🩲</span>
                    </div>
                    <div className="flex-1">
                      <span>Boxer Briefs</span>
                      <span className="text-xs text-gray-500 block">Best of Both</span>
                    </div>
                  </Link>
                  <Link to="/shop/innerwear/trunks" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🩲</span>
                    </div>
                    <div className="flex-1">
                      <span>Trunks</span>
                      <span className="text-xs text-gray-500 block">Shorter Version</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Undershirts */}
              <div className="px-4 pb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Undershirts</h4>
                <div className="space-y-1">
                  <Link to="/shop/undershirts/tank-tops" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👕</span>
                    </div>
                    <div className="flex-1">
                      <span>Tank Tops</span>
                      <span className="text-xs text-gray-500 block">Sleeveless</span>
                    </div>
                  </Link>
                  <Link to="/shop/undershirts/crew-neck" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👕</span>
                    </div>
                    <span>Crew Neck T-Shirts</span>
                  </Link>
                  <Link to="/shop/undershirts/v-neck" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👕</span>
                    </div>
                    <span>V-Neck T-Shirts</span>
                  </Link>
                  <Link to="/shop/undershirts/thermals" onClick={closeSidebar} className="flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👕</span>
                    </div>
                    <span>Long Sleeve Thermals</span>
                  </Link>
                </div>
              </div>

              {/* Accessory Categories */}
              <div className="px-4 pb-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Accessories</h3>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  <Link to="/shop?category=socks" onClick={closeSidebar} className="text-center flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-xl">🧦</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">Socks</span>
                  </Link>
                  <Link to="/shop?category=caps" onClick={closeSidebar} className="text-center flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-xl">🧢</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">Caps</span>
            </Link>
                  <Link to="/shop?category=belts" onClick={closeSidebar} className="text-center flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-xl">🪢</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">Belts</span>
            </Link>
                  <Link to="/shop?category=watches" onClick={closeSidebar} className="text-center flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-primary-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-xl">⌚</span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">Watches</span>
            </Link>
                </div>
              </div>

              {/* Additional Links */}
              <div className="px-4 pb-4">
                <div className="space-y-1">
            <Link
                    to="/sale"
                    onClick={closeSidebar}
                    className="flex items-center justify-between py-3 px-2 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-primary-800 rounded-lg"
                  >
                    <span className="font-medium">Sale</span>
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">New Drops</span>
            </Link>
            <Link
                    to="/subscriptions"
                    onClick={closeSidebar}
                    className="flex items-center justify-between py-3 px-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg"
                  >
                    <span className="font-medium">MY MEMBERSHIP</span>
                    <FiChevronRight size={16} />
            </Link>
            <Link
                    to="/orders"
                    onClick={closeSidebar}
                    className="flex items-center justify-between py-3 px-2 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-primary-800 rounded-lg"
                  >
                    <span className="font-medium">Track My Order</span>
                    <span className="text-red-500">📍</span>
            </Link>
                  <Link
                    to="/about"
                    onClick={closeSidebar}
                    className="flex items-center justify-between py-3 px-2 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-primary-800 rounded-lg"
                  >
                    <span className="font-medium">More</span>
                    <FiChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
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

