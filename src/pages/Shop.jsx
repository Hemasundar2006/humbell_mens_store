import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { FiFilter, FiX } from 'react-icons/fi';

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useSelector((state) => state.products);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    gender: 'men',
  });

  useEffect(() => {
    dispatch(getProducts({ ...filters, gender: 'men' }));
  }, [dispatch, filters]);

  const handleFilterChange = (name, value) => {
    if (name === 'gender') return; // lock to men
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    const locked = { ...newFilters, gender: 'men' };
    Object.keys(locked).forEach((key) => {
      if (locked[key]) {
        params.set(key, locked[key]);
      }
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      gender: 'men',
    });
    setSearchParams({ gender: 'men' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-2">
              Menswear
            </h1>
            <p className="text-primary-600 dark:text-primary-400">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-primary-900 dark:bg-white text-white dark:text-primary-900 rounded-lg hover:bg-primary-800 dark:hover:bg-primary-50 transition-colors"
          >
            <FiFilter />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-64 ${
              showFilters ? 'block' : 'hidden'
            } lg:block fixed lg:relative inset-0 lg:inset-auto z-40 lg:z-auto`}
          >
            <div className="lg:sticky lg:top-24 bg-white dark:bg-primary-900 lg:bg-transparent h-full lg:h-auto overflow-y-auto lg:overflow-visible p-6 lg:p-0">
              {/* Mobile close button */}
              <div className="lg:hidden flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-primary-900 dark:text-white">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg"
                >
                  <FiX size={24} className="text-primary-900 dark:text-white" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category (menswear) */}
                <div>
                  <h3 className="text-sm font-semibold text-primary-900 dark:text-white uppercase tracking-wider mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {['', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'].map((cat) => (
                      <label key={cat} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat.toLowerCase()}
                          checked={filters.category === cat.toLowerCase()}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="w-4 h-4 text-primary-900 border-primary-300 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-primary-700 dark:text-primary-300">
                          {cat || 'All'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gender locked to men - hidden */}

                {/* Price Range removed for Menswear */}

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm font-medium text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white border border-primary-300 dark:border-primary-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
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
                <p className="text-primary-600 dark:text-primary-400 text-lg">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter overlay */}
      {showFilters && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowFilters(false)}
        ></div>
      )}
    </div>
  );
};

export default Shop;

