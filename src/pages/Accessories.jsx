import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Accessories = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ category: 'accessories' }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-2">Accessories</h1>
            <p className="text-primary-600 dark:text-primary-400">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-primary-600 dark:text-primary-400 text-lg">No accessories found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accessories;


