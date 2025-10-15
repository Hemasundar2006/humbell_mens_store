import React from 'react';

const Contact = () => {
  return (
    <div className="page-transition min-h-screen bg-white dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold text-primary-900 dark:text-white mb-6">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form className="space-y-4 p-6 rounded-xl border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900">
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-200 mb-1">Name</label>
              <input className="w-full px-4 py-3 rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-200 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-200 mb-1">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white" placeholder="How can we help?" />
            </div>
            <button className="px-6 py-3 rounded-lg bg-primary-900 text-white dark:bg-white dark:text-primary-900 font-semibold">Send</button>
          </form>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">Store</h3>
              <p className="text-primary-700 dark:text-primary-200">123 Menswear Lane, Fashion City</p>
              <p className="text-primary-700 dark:text-primary-200">+1 (555) 555-5555</p>
              <p className="text-primary-700 dark:text-primary-200">support@humbell.com</p>
            </div>
            <div className="rounded-xl overflow-hidden h-72 border border-primary-200 dark:border-primary-700">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531590453!3d-37.81627937975168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzE0LjQiRQ!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="flex gap-4">
              {['Instagram','Facebook','Twitter'].map((s) => (
                <a key={s} href="#" className="text-primary-700 dark:text-primary-200 hover:underline">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


