import React from 'react';
import { Link } from 'react-router-dom';

const Sale = () => {
  return (
    <div className="page-transition min-h-screen bg-white dark:bg-primary-900">
      {/* Hero banner similar to reference format */}
      <section className="relative h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1600')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70"></div>
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wider">COMING SOON</h1>
          <p className="mt-4 text-white/90 text-lg">New collection launching soon</p>
          <p className="mt-2 text-2xl text-amber-400 font-bold">STAY TUNED</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-primary-900 dark:text-white">Sale Is On The Way</h2>
          <p className="mt-2 text-primary-700 dark:text-primary-300">Subscribe to get notified when our sale goes live.</p>
        </div>
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white" />
          <button className="px-6 py-3 rounded-lg bg-primary-900 text-white dark:bg-white dark:text-primary-900 font-semibold">Notify Me</button>
        </div>
        <div className="text-center mt-12">
          <Link to="/shop?gender=men" className="inline-block px-8 py-3 rounded-lg border border-primary-300 dark:border-primary-700 text-primary-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-800">Browse Menswear</Link>
        </div>
      </section>
    </div>
  );
};

export default Sale;


