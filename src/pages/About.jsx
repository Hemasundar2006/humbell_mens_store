import React from 'react';

const About = () => {
  return (
    <div className="page-transition min-h-screen bg-white dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold text-primary-900 dark:text-white mb-6">About Humbell</h1>
        <p className="text-primary-700 dark:text-primary-200 mb-10 max-w-3xl">
          Humbell is a menswear brand dedicated to timeless style and modern craftsmanship. We design
          elevated essentials that balance comfort, durability, and refined aesthetics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800">
            <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">Our Story</h3>
            <p className="text-primary-700 dark:text-primary-200">Born from a passion for detail and fit, Humbell began with a small collection of wardrobe staples and grew into a full menswear line.</p>
          </div>
          <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800">
            <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">Mission</h3>
            <p className="text-primary-700 dark:text-primary-200">To make men feel confident every day through quality garments that last and styles that never go out of fashion.</p>
          </div>
          <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800">
            <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">Values</h3>
            <p className="text-primary-700 dark:text-primary-200">Craftsmanship, responsibility, transparency. We partner with trusted mills and factories and stand behind every piece we create.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            title: 'Quality Materials',
            desc: 'Premium fabrics selected for hand-feel, breathability, and longevity.'
          },{
            title: 'Tailored Fit',
            desc: 'Considered cuts that are comfortable yet sharp, across sizes.'
          },{
            title: 'Fair Production',
            desc: 'Ethical manufacturing and reduced-waste processes where possible.'
          }].map((item) => (
            <div key={item.title} className="p-6 rounded-xl border border-primary-200 dark:border-primary-700">
              <h4 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-primary-700 dark:text-primary-200">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;


