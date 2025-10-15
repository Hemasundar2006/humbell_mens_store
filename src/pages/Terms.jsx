import React from 'react';

const Terms = () => (
  <div className="page-transition min-h-screen bg-white dark:bg-primary-900">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-display font-bold text-primary-900 dark:text-white mb-6">Terms & Conditions</h1>
      <p className="text-primary-700 dark:text-primary-200 mb-4">By using our website, you agree to the following terms and conditions.</p>
      <ul className="list-disc pl-6 space-y-2 text-primary-700 dark:text-primary-200">
        <li>Use of content is for personal, non-commercial purposes.</li>
        <li>All purchases are subject to our return/refund policy.</li>
        <li>We may update these terms at any time.</li>
      </ul>
    </div>
  </div>
);

export default Terms;


