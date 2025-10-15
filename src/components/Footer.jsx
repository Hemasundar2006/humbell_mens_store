import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-primary-50 dark:bg-primary-900 border-t dark:border-primary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/Humbell_logo.jpg" alt="Humbell" className="h-10 w-auto object-contain" />
              <h3 className="text-2xl font-display font-bold text-primary-900 dark:text-white">HUMBELL</h3>
            </div>
            <p className="text-sm text-primary-600 dark:text-primary-300">
              Elevate your style with our curated collection of modern fashion essentials.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-primary-900 dark:text-white uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop?gender=men"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Menswear
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold text-primary-900 dark:text-white uppercase tracking-wider mb-4">
              Help
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Customer Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold text-primary-900 dark:text-white uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Style Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t dark:border-primary-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-600 dark:text-primary-400">
            © {new Date().getFullYear()} Humbell. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <FiFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

