import React from 'react';

const posts = [
  { id: '1', title: 'How to style casual wear', excerpt: 'Simple rules to elevate everyday looks.' },
  { id: '2', title: 'Building a capsule wardrobe', excerpt: 'Key pieces that work year-round.' },
  { id: '3', title: 'New arrivals this month', excerpt: 'Fresh drops you should not miss.' },
];

const Blog = () => {
  return (
    <div className="page-transition min-h-screen bg-white dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold text-primary-900 dark:text-white mb-6">Style Guide</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article key={p.id} className="p-6 rounded-xl border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900">
              <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">{p.title}</h3>
              <p className="text-primary-700 dark:text-primary-200 mb-4">{p.excerpt}</p>
              <a href="#" className="text-primary-900 dark:text-white hover:underline">Read more →</a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;


