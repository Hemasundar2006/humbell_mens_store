import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import Loader from '../components/Loader';
import { FiShoppingBag, FiHeart, FiTruck, FiRefreshCw } from 'react-icons/fi';

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      })
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary-600 dark:text-primary-400 mb-4">Product not found</p>
          <Link to="/shop" className="text-primary-900 dark:text-white underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const sizes = product.sizes || ['XS', 'S', 'M', 'L', 'XL'];
  const colors = product.colors || ['Black', 'White', 'Gray'];

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 mb-8">
          <Link to="/" className="hover:text-primary-900 dark:hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary-900 dark:hover:text-white">
            Shop
          </Link>
          <span>/</span>
          <span className="text-primary-900 dark:text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-[3/4] bg-primary-100 dark:bg-primary-800 rounded-lg overflow-hidden group animate-fade-in-up">
            <img
              src={product.image || 'https://via.placeholder.com/600x800'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            <div>
              <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-primary-900 dark:text-white">
                ${product.price?.toFixed(2)}
              </p>
            </div>

            <p className="text-primary-700 dark:text-primary-300 leading-relaxed">
              {product.description ||
                'Premium quality fashion piece designed for comfort and style. Made with sustainable materials and crafted with attention to detail.'}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-semibold text-primary-900 dark:text-white uppercase tracking-wider mb-3">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedSize === size
                        ? 'border-primary-900 dark:border-white bg-primary-900 dark:bg-white text-white dark:text-primary-900'
                        : 'border-primary-300 dark:border-primary-700 text-primary-900 dark:text-white hover:border-primary-900 dark:hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-semibold text-primary-900 dark:text-white uppercase tracking-wider mb-3">
                Select Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedColor === color
                        ? 'border-primary-900 dark:border-white bg-primary-900 dark:bg-white text-white dark:text-primary-900'
                        : 'border-primary-300 dark:border-primary-700 text-primary-900 dark:text-white hover:border-primary-900 dark:hover:border-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-primary-900 dark:text-white uppercase tracking-wider mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-primary-300 dark:border-primary-700 rounded-lg text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium text-primary-900 dark:text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-primary-300 dark:border-primary-700 rounded-lg text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 bg-primary-900 dark:bg-white text-white dark:text-primary-900 py-4 rounded-lg font-semibold hover:bg-primary-800 dark:hover:bg-primary-50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group ${
                  added ? 'animate-wiggle' : ''
                }`}
              >
                <FiShoppingBag className={`${added ? 'animate-bounce-soft' : ''} transition-all duration-300`} />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {added ? 'Added! ✓' : 'Add to Cart'}
                </span>
              </button>
              <button className="p-4 border border-primary-300 dark:border-primary-700 rounded-lg text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-800 hover:scale-110 transition-all duration-300">
                <FiHeart size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="border-t dark:border-primary-800 pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-primary-700 dark:text-primary-300">
                <FiTruck size={20} />
                <span className="text-sm">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-700 dark:text-primary-300">
                <FiRefreshCw size={20} />
                <span className="text-sm">Free returns within 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

