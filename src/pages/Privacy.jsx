import React from 'react';

const Privacy = () => (
  <div className="page-transition min-h-screen bg-white dark:bg-primary-900">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-display font-bold text-primary-900 dark:text-white mb-6">Privacy Policy</h1>
      <p className="text-primary-700 dark:text-primary-200 mb-4">We respect your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard data.</p>
      <ul className="list-disc pl-6 space-y-2 text-primary-700 dark:text-primary-200">
        <li>We collect information to process orders and improve our services.</li>
        <li>We do not sell personal data to third parties.</li>
        <li>You can request, update, or delete your data anytime.</li>
      </ul>
    </div>
  </div>
);

export default Privacy;


