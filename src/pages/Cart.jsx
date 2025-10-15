import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, calculateTotal } from '../features/cart/cartSlice';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cartItems]);

  const handleRemove = (item) => {
    dispatch(removeFromCart({ _id: item._id, size: item.size, color: item.color }));
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(
      updateQuantity({
        _id: item._id,
        size: item.size,
        color: item.color,
        quantity: newQuantity,
      })
    );
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300 page-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-fade-in-up">
            <FiShoppingBag className="mx-auto text-primary-300 dark:text-primary-700 mb-4 animate-bounce-soft" size={64} />
            <h2 className="text-2xl font-display font-bold text-primary-900 dark:text-white mb-4 animate-fade-in-up delay-100">
              Your cart is empty
            </h2>
            <p className="text-primary-600 dark:text-primary-400 mb-8 animate-fade-in-up delay-200">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/shop"
              className="inline-block bg-primary-900 dark:bg-white text-white dark:text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 dark:hover:bg-primary-50 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-8 animate-fade-in-down">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={`${item._id}-${item.size}-${item.color}`}
                className="bg-white dark:bg-primary-800 border dark:border-primary-700 rounded-lg p-4 flex gap-4 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={item.image || 'https://via.placeholder.com/150'}
                  alt={item.name}
                  className="w-24 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-900 dark:text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="font-semibold text-primary-900 dark:text-white">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-3 mt-3">
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      className="w-8 h-8 border border-primary-300 dark:border-primary-600 rounded text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-primary-900 dark:text-white w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      className="w-8 h-8 border border-primary-300 dark:border-primary-600 rounded text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors h-fit"
                  aria-label="Remove item"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-primary-50 dark:bg-primary-800 border dark:border-primary-700 rounded-lg p-6 sticky top-24 animate-fade-in-up delay-200">
              <h2 className="text-xl font-display font-bold text-primary-900 dark:text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-primary-700 dark:text-primary-300">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary-700 dark:text-primary-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t dark:border-primary-700 pt-3 flex justify-between text-lg font-bold text-primary-900 dark:text-white">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-900 dark:bg-white text-white dark:text-primary-900 py-3 rounded-lg font-semibold hover:bg-primary-800 dark:hover:bg-primary-50 hover:scale-105 transition-all duration-300 mb-3 group"
              >
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                  Proceed to Checkout →
                </span>
              </button>
              <Link
                to="/shop"
                className="block text-center text-sm text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

