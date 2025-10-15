import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import { FiCheck } from 'react-icons/fi';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const invoiceRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Snapshot the order and place it
    const snapshot = {
      id: `HMB-${Date.now().toString().slice(-6)}`,
      items: cartItems,
      total: cartTotal,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      shipping: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      placedAt: new Date().toISOString(),
    };
    setOrderDetails(snapshot);
    setOrderPlaced(true);
    dispatch(clearCart());
  };

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const printInvoice = () => {
    const content = invoiceRef.current?.innerHTML || '';
    const printWindow = window.open('', 'PRINT', 'height=800,width=600');
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html><html><head><title>Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
        h1,h2,h3 { margin: 0 0 8px; }
        .muted { color: #6b7280; }
        .row { display: flex; justify-content: space-between; }
        .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .table th, .table td { border-bottom: 1px solid #e5e7eb; padding: 8px; text-align: left; }
      </style>
    </head><body>`);
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (orderPlaced && orderDetails) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900 py-12">
        <div className="max-w-3xl mx-auto px-4 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <FiCheck className="text-green-600 dark:text-green-400" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-primary-900 dark:text-white">Order Confirmed</h1>
              <p className="text-primary-600 dark:text-primary-400 text-sm">Order #{orderDetails.id} • {new Date(orderDetails.placedAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Invoice content (printable) */}
          <div ref={invoiceRef}>
            <h2 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">Invoice</h2>
            <div className="row muted">
              <span>Humbell Menswear</span>
              <span>{orderDetails.customer.email}</span>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-primary-900 dark:text-white mb-1">Billing To</h3>
                <p className="text-primary-700 dark:text-primary-200 text-sm">
                  {orderDetails.customer.firstName} {orderDetails.customer.lastName}<br/>
                  {orderDetails.shipping.address}<br/>
                  {orderDetails.shipping.city}, {orderDetails.shipping.state} {orderDetails.shipping.zipCode}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 dark:text-white mb-1">Order Info</h3>
                <p className="text-primary-700 dark:text-primary-200 text-sm">Order ID: {orderDetails.id}<br/>Placed: {new Date(orderDetails.placedAt).toLocaleDateString()}</p>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((it) => (
                  <tr key={`${it._id}-${it.size}-${it.color}`}>
                    <td>{it.name} ({it.size} / {it.color})</td>
                    <td>{it.quantity}</td>
                    <td>${it.price.toFixed(2)}</td>
                    <td>${(it.price * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row" style={{ marginTop: 12 }}>
              <span className="muted">Total</span>
              <strong>${orderDetails.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={printInvoice} className="px-5 py-3 rounded-lg bg-primary-900 dark:bg-white text-white dark:text-primary-900 font-semibold">Download Invoice (PDF)</button>
            <button onClick={() => navigate('/')} className="px-5 py-3 rounded-lg border border-primary-300 dark:border-primary-700 text-primary-900 dark:text-white">Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-8 animate-fade-in-down">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white dark:bg-primary-800 border dark:border-primary-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-primary-900 dark:text-white mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-primary-800 border dark:border-primary-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-primary-900 dark:text-white mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white dark:bg-primary-800 border dark:border-primary-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-primary-900 dark:text-white mb-4">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    required
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      required
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      required
                      value={formData.cvv}
                      onChange={handleChange}
                      className="px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-900 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 dark:bg-primary-800 border dark:border-primary-700 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-display font-bold text-primary-900 dark:text-white mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={`${item._id}-${item.size}-${item.color}`}
                      className="flex gap-3 pb-3 border-b dark:border-primary-700"
                    >
                      <img
                        src={item.image || 'https://via.placeholder.com/60'}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-primary-900 dark:text-white">{item.name}</p>
                        <p className="text-primary-600 dark:text-primary-400">
                          {item.size} | {item.color}
                        </p>
                        <p className="text-primary-600 dark:text-primary-400">Qty: {item.quantity}</p>
                        <p className="font-semibold text-primary-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-primary-700 dark:text-primary-300">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary-700 dark:text-primary-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t dark:border-primary-700 pt-2 flex justify-between text-lg font-bold text-primary-900 dark:text-white">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-900 dark:bg-white text-white dark:text-primary-900 py-3 rounded-lg font-semibold hover:bg-primary-800 dark:hover:bg-primary-50 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

