import React, { useState } from 'react';

const tiers = [
  {
    name: 'Silver',
    price: 149,
    period: 'per month',
    discount: '10% off on all orders',
    features: [
      '10% discount on every order',
      'Early access to selected drops',
      'Member-only newsletter',
      'Priority email support',
    ],
    ctaStyle: 'bg-gray-900 text-white hover:bg-gray-800',
    border: 'border-gray-300',
  },
  {
    name: 'Gold',
    price: 249,
    period: 'per month',
    discount: '15% off on all orders',
    features: [
      '15% discount on every order',
      'Early access to all drops',
      'Free standard shipping',
      'Priority customer support',
    ],
    highlighted: true,
    ctaStyle: 'bg-blue-600 text-white hover:bg-blue-500',
    border: 'border-blue-300',
  },
  {
    name: 'Platinum',
    price: 799,
    period: 'per month',
    discount: '25% off on all orders',
    features: [
      '25% discount on every order',
      'Exclusive platinum-only drops',
      'Free express shipping',
      'Dedicated concierge support',
    ],
    ctaStyle: 'bg-black text-white hover:bg-neutral-800',
    border: 'border-gray-400',
  },
];

export default function Subscriptions() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const openCheckout = (tier) => {
    setSelectedTier(tier);
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setSelectedTier(null);
  };

  const onChoosePayment = (method) => {
    // Placeholder for payment integration
    console.log('Selected payment method:', method, 'for', selectedTier?.name);
    // Keep modal open for now; integrate gateway here later
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-900 dark:text-white">Humbell Memberships</h1>
        <p className="mt-3 text-primary-700 dark:text-primary-200">Choose a plan and get instant savings on every order.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl border ${tier.border} dark:border-primary-700 bg-white/70 dark:bg-primary-900/70 shadow-lg backdrop-blur p-6 flex flex-col`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white shadow">Most Popular</span>
            )}
            <h2 className="text-xl font-bold text-primary-900 dark:text-white">{tier.name}</h2>
            <p className="mt-1 text-sm text-primary-600 dark:text-primary-300">{tier.discount}</p>
            <div className="mt-4 flex items-end gap-1">
              <span className="text-3xl font-extrabold text-primary-900 dark:text-white">₹{tier.price}</span>
              <span className="text-sm text-primary-600 dark:text-primary-300">{tier.period}</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-primary-800 dark:text-primary-200 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current inline-block"></span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-6 w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${tier.ctaStyle}`}
              onClick={() => openCheckout(tier)}
            >
              Choose {tier.name}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <section className="mt-12 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <span className="text-3xl">🚚</span>
            </div>
            <div className="text-sm font-medium text-primary-900 dark:text-white">
              <div>Free</div>
              <div>Delivery</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <span className="text-3xl">📦</span>
            </div>
            <div className="text-sm font-medium text-primary-900 dark:text-white">
              <div>Easy</div>
              <div>Returns</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <span className="text-3xl">🔒</span>
            </div>
            <div className="text-sm font-medium text-primary-900 dark:text-white">
              <div>Secure</div>
              <div>Payment</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 text-center text-sm text-primary-600 dark:text-primary-300">
        <p>Cancel anytime. Prices in INR. Discounts apply automatically at checkout while membership is active.</p>
      </section>

      {showCheckout && selectedTier && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <button className="absolute inset-0 bg-black/50" aria-label="Dismiss" onClick={closeCheckout}></button>
          <div className="relative bg-white dark:bg-primary-900 rounded-2xl shadow-2xl w-[92%] max-w-lg p-6 border border-primary-100 dark:border-primary-800">
            <button
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800"
              aria-label="Close"
              onClick={closeCheckout}
            >
              ✕
            </button>

            <h3 className="text-2xl font-display font-bold text-primary-900 dark:text-white text-center">Complete Your Purchase</h3>
            <p className="mt-1 text-center text-primary-700 dark:text-primary-300">
              {selectedTier.name} Plan – ₹{selectedTier.price}/{selectedTier.period.replace('per ', '')}
            </p>

            <h4 className="mt-6 mb-3 font-semibold text-primary-900 dark:text-white">Choose Payment Method:</h4>

            <div className="space-y-3">
              <button
                onClick={() => onChoosePayment('UPI')}
                className="w-full text-left flex items-start gap-3 px-4 py-4 rounded-xl border border-primary-200 dark:border-primary-700 hover:bg-primary-50/60 dark:hover:bg-primary-800/60 transition-colors"
              >
                <span className="mt-0.5 text-green-600 text-xl">📱</span>
                <div>
                  <div className="font-semibold text-primary-900 dark:text-white">UPI</div>
                  <div className="text-sm text-primary-600 dark:text-primary-300">GooglePay, PhonePe, Paytm</div>
                </div>
              </button>

              <button
                onClick={() => onChoosePayment('Card')}
                className="w-full text-left flex items-start gap-3 px-4 py-4 rounded-xl border border-primary-200 dark:border-primary-700 hover:bg-primary-50/60 dark:hover:bg-primary-800/60 transition-colors"
              >
                <span className="mt-0.5 text-green-600 text-xl">💳</span>
                <div>
                  <div className="font-semibold text-primary-900 dark:text-white">Card</div>
                  <div className="text-sm text-primary-600 dark:text-primary-300">Debit/Credit Cards</div>
                </div>
              </button>

              <button
                onClick={() => onChoosePayment('Wallet')}
                className="w-full text-left flex items-start gap-3 px-4 py-4 rounded-xl border border-green-300/70 dark:border-green-700/70 bg-green-50/50 dark:bg-green-900/10 hover:bg-green-100/60 dark:hover:bg-green-900/20 transition-colors"
              >
                <span className="mt-0.5 text-green-600 text-xl">👛</span>
                <div>
                  <div className="font-semibold text-primary-900 dark:text-white">Wallet</div>
                  <div className="text-sm text-primary-600 dark:text-primary-300">Paytm, Mobikwik</div>
                </div>
              </button>
            </div>

            <button
              onClick={closeCheckout}
              className="mt-5 w-full rounded-xl border border-green-500 text-green-700 dark:text-green-400 px-4 py-3 font-semibold hover:bg-green-50/60 dark:hover:bg-green-900/20"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


