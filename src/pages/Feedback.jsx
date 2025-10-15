import { useState } from 'react';

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', rating: '5', message: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend endpoint
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 page-transition">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold text-primary-900 dark:text-white mb-4">Feedback</h1>
        <p className="text-primary-700 dark:text-primary-300 mb-8">We value your thoughts. Share your experience with Humbell.</p>

        {submitted ? (
          <div className="p-6 rounded-lg bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-white">Thank you for the feedback! We appreciate it.</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5 bg-white dark:bg-primary-900 border border-primary-200 dark:border-primary-700 p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" className="px-4 py-3 rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white" />
              <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="Email address" className="px-4 py-3 rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white" />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-primary-700 dark:text-primary-300">Rating</label>
              <select name="rating" value={form.rating} onChange={onChange} className="px-3 py-2 rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white">
                {[5,4,3,2,1].map((r) => (
                  <option key={r} value={r}>{r} {r===1 ? 'star' : 'stars'}</option>
                ))}
              </select>
            </div>
            <textarea name="message" rows={5} value={form.message} onChange={onChange} required placeholder="Write your feedback..." className="w-full px-4 py-3 rounded-lg border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white" />
            <button type="submit" className="px-6 py-3 rounded-lg bg-primary-900 text-white dark:bg-white dark:text-primary-900 font-semibold">Submit feedback</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;


