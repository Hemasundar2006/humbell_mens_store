import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { FiPackage, FiUsers, FiDollarSign, FiTrendingUp, FiPlus } from 'react-icons/fi';

const Admin = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900 transition-colors duration-300 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-primary-600 dark:text-primary-400">
            Manage your store, products, and orders
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-primary-800 rounded-lg p-6 border dark:border-primary-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FiPackage className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">+12%</span>
            </div>
            <p className="text-2xl font-bold text-primary-900 dark:text-white mb-1">1,234</p>
            <p className="text-sm text-primary-600 dark:text-primary-400">Total Products</p>
          </div>

          <div className="bg-white dark:bg-primary-800 rounded-lg p-6 border dark:border-primary-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FiUsers className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">+8%</span>
            </div>
            <p className="text-2xl font-bold text-primary-900 dark:text-white mb-1">5,678</p>
            <p className="text-sm text-primary-600 dark:text-primary-400">Total Users</p>
          </div>

          <div className="bg-white dark:bg-primary-800 rounded-lg p-6 border dark:border-primary-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FiDollarSign className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">+23%</span>
            </div>
            <p className="text-2xl font-bold text-primary-900 dark:text-white mb-1">$45,231</p>
            <p className="text-sm text-primary-600 dark:text-primary-400">Total Revenue</p>
          </div>

          <div className="bg-white dark:bg-primary-800 rounded-lg p-6 border dark:border-primary-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <FiTrendingUp className="text-orange-600 dark:text-orange-400" size={24} />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">+15%</span>
            </div>
            <p className="text-2xl font-bold text-primary-900 dark:text-white mb-1">892</p>
            <p className="text-sm text-primary-600 dark:text-primary-400">Orders Today</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-primary-800 rounded-lg border dark:border-primary-700">
          <div className="border-b dark:border-primary-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary-900 dark:border-white text-primary-900 dark:text-white'
                    : 'border-transparent text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'products'
                    ? 'border-primary-900 dark:border-white text-primary-900 dark:text-white'
                    : 'border-transparent text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'orders'
                    ? 'border-primary-900 dark:border-white text-primary-900 dark:text-white'
                    : 'border-transparent text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white'
                }`}
              >
                Orders
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b dark:border-primary-700">
                    <div>
                      <p className="font-medium text-primary-900 dark:text-white">New order #12345</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">2 minutes ago</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                      $234.50
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b dark:border-primary-700">
                    <div>
                      <p className="font-medium text-primary-900 dark:text-white">Product updated</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b dark:border-primary-700">
                    <div>
                      <p className="font-medium text-primary-900 dark:text-white">New user registered</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-primary-900 dark:text-white">
                    Product Management
                  </h3>
                  <button className="flex items-center space-x-2 bg-primary-900 dark:bg-white text-white dark:text-primary-900 px-4 py-2 rounded-lg hover:bg-primary-800 dark:hover:bg-primary-50 transition-colors">
                    <FiPlus />
                    <span>Add Product</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary-50 dark:bg-primary-900 border-b dark:border-primary-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-primary-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900 dark:text-white">
                          Classic White Shirt
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400">
                          Tops
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900 dark:text-white">
                          $49.99
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400">
                          142
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-primary-900 dark:text-white hover:underline mr-4">
                            Edit
                          </button>
                          <button className="text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-6">
                  Recent Orders
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary-50 dark:bg-primary-900 border-b dark:border-primary-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-primary-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900 dark:text-white">
                          #12345
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400">
                          John Doe
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900 dark:text-white">
                          $234.50
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-primary-900 dark:text-white hover:underline">
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

