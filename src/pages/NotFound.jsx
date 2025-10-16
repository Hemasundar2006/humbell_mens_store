import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-primary-900 page-transition">
      <div className="text-center px-6">
        <div className="text-7xl font-extrabold text-primary-900 dark:text-white mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-900 dark:text-white mb-3">Page not found</h1>
        <p className="text-primary-600 dark:text-primary-400 max-w-md mx-auto mb-8">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-3 rounded-lg bg-primary-900 text-white dark:bg-white dark:text-primary-900 font-semibold hover:opacity-90"
          >
            Go Home
          </Link>
          <Link
            to="/shop?gender=men"
            className="px-5 py-3 rounded-lg border border-primary-300 dark:border-primary-700 text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-800"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;


