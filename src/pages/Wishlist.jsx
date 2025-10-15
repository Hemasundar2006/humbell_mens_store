import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { items } = useSelector((s) => s.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-6">Wishlist</h1>
        {items.length === 0 ? (
          <p className="text-primary-600 dark:text-primary-400">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((p) => (
              <div key={p._id} className="group relative animate-fade-in-up hover-lift">
                <Link to={`/product/${p._id}`}>
                  <div className="aspect-[3/4] bg-primary-100 dark:bg-primary-800 overflow-hidden rounded-lg relative">
                    <img src={p.image || 'https://via.placeholder.com/400x533'} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out" />
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="text-sm font-medium text-primary-900 dark:text-white">{p.name}</h3>
                    <p className="text-sm font-semibold text-primary-900 dark:text-white">${p.price?.toFixed(2)}</p>
                  </div>
                </Link>
                <button onClick={() => dispatch(removeFromWishlist(p._id))} className="absolute top-4 right-4 px-3 py-1 text-xs bg-white/90 dark:bg-primary-900 rounded-full shadow">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;


