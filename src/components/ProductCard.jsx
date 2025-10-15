import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const wishlistItems = useSelector((s) => s.wishlist.items);

  const inWishlist = wishlistItems.some((i) => i._id === product._id);

  const toggleWishlist = () => {
    if (!user) {
      // not logged in: route to login after adding locally
      if (!inWishlist) dispatch(addToWishlist({ _id: product._id, name: product.name, price: product.price, image: product.image }));
      navigate('/login');
      return;
    }
    if (inWishlist) dispatch(removeFromWishlist(product._id));
    else dispatch(addToWishlist({ _id: product._id, name: product.name, price: product.price, image: product.image }));
    setIsLiked(!isLiked);
  };

  return (
    <div className="group relative animate-fade-in-up hover-lift">
      <Link to={`/product/${product._id}`}>
        <div className="aspect-[3/4] bg-primary-100 dark:bg-primary-800 overflow-hidden rounded-lg relative">
          <img
            src={product.image || 'https://via.placeholder.com/400x533'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium text-primary-900 dark:text-white group-hover:translate-x-1 transition-transform duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-primary-500 dark:text-primary-400 transition-all duration-300">
            Menswear{product.category ? ` • ${product.category}` : ''}
          </p>
          <p className="text-sm font-semibold text-primary-900 dark:text-white transition-all duration-300">
            ${product.price?.toFixed(2)}
          </p>
        </div>
      </Link>
      <button
        onClick={toggleWishlist}
        className={`absolute top-4 right-4 p-2 bg-white dark:bg-primary-900 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 ${
          isLiked || inWishlist ? 'animate-wiggle' : ''
        }`}
        aria-label="Add to wishlist"
      >
        <FiHeart
          size={18}
          className={`transition-all duration-300 ${
            isLiked || inWishlist
              ? 'fill-red-500 text-red-500 scale-110'
              : 'text-primary-900 dark:text-white'
          }`}
        />
      </button>
    </div>
  );
};

export default ProductCard;

