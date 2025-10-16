import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Loader from '../components/Loader';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get('/orders/mine');
        setOrders(res.data || []);
      } catch (e) {
        const message =
          (e.response && e.response.data && e.response.data.message) ||
          e.message ||
          'Failed to load orders';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 page-transition">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white">My Orders</h1>
          <Link to="/shop" className="text-sm text-primary-700 dark:text-primary-300 hover:underline">Continue shopping</Link>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-primary-600 dark:text-primary-400 mb-4">You have no orders yet.</p>
            <Link to="/shop" className="inline-block px-6 py-3 rounded-lg bg-primary-900 dark:bg-white text-white dark:text-primary-900 font-semibold">Shop now</Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-primary-800 border dark:border-primary-700 rounded-xl">
            <table className="w-full">
              <thead className="bg-primary-50 dark:bg-primary-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">Items</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-primary-700">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-primary-50/60 dark:hover:bg-primary-900/40 transition-colors">
                    <td className="px-4 py-3 text-sm text-primary-900 dark:text-white font-medium">#{order._id?.slice(-6)}</td>
                    <td className="px-4 py-3 text-sm text-primary-700 dark:text-primary-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm text-primary-700 dark:text-primary-300">{order.items?.reduce((acc, i) => acc + (i.qty || 0), 0)}</td>
                    <td className="px-4 py-3 text-sm text-primary-900 dark:text-white font-semibold">${Number(order.totalPrice || 0).toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">
                      {order.isPaid ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Paid</span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs rounded-full capitalize bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                        {order.status || (order.isDelivered ? 'delivered' : 'processing')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;


