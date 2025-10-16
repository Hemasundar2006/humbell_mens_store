import React from 'react';

const About = () => {
  return (
    <div className="page-transition min-h-screen bg-white dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold text-primary-900 dark:text-white mb-4">About Humbell</h1>
        <p className="text-primary-700 dark:text-primary-200 mb-2 max-w-3xl">
          Humbell is fashion with quiet confidence — luxury that whispers. We design pieces that feel
          graceful, grounded, and deeply personal.
        </p>
        <p className="text-primary-700 dark:text-primary-200 mb-10 italic">“Style that speaks softly, and says everything.”</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800">
            <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">Humbell — the name</h3>
            <p className="text-primary-700 dark:text-primary-200">
              A gentle fusion of <span className="font-semibold">“Humble”</span> and <span className="font-semibold">“Bell”</span>.
              It embodies elegant self‑expression without arrogance — fashion that lets character lead.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800">
            <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">The dove</h3>
            <p className="text-primary-700 dark:text-primary-200">A symbol of calm confidence and inner peace. Our clothes are designed to help you feel at ease — clear, composed, and true to yourself.</p>
          </div>
          <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800">
            <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">The bell</h3>
            <p className="text-primary-700 dark:text-primary-200">Recognition without noise. Like a bell, we attract attention with clarity, not volume — setting trends through refined taste.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-xl border border-primary-200 dark:border-primary-700">
            <h4 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">Blue — trust & luxury</h4>
            <p className="text-primary-700 dark:text-primary-200">Our blue palette signals loyalty, depth, and premium craft — a calm kind of sophistication.</p>
          </div>
          <div className="p-6 rounded-xl border border-primary-200 dark:border-primary-700">
            <h4 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">Signature typography</h4>
            <p className="text-primary-700 dark:text-primary-200">A refined, handwritten feel adds designer warmth — a boutique sensibility with a personal touch.</p>
          </div>
          <div className="p-6 rounded-xl border border-primary-200 dark:border-primary-700">
            <h4 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">Brand essence</h4>
            <p className="text-primary-700 dark:text-primary-200">Peaceful, elegant, meaningful — fashion with a soul. Minimal, premium, and comfort‑first.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            title: 'Luxury casual wear',
            desc: 'Elevated essentials for everyday ease.'
          },{
            title: 'Minimalist premium',
            desc: 'Timeless silhouettes, refined materials.'
          },{
            title: 'Sustainably inspired',
            desc: 'A considered approach to craft and impact.'
          }].map((item) => (
            <div key={item.title} className="p-6 rounded-xl border border-primary-200 dark:border-primary-700">
              <h4 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-primary-700 dark:text-primary-200">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-primary-50 dark:bg-primary-800 border border-primary-200 dark:border-primary-700">
          <h3 className="text-xl font-display font-bold text-primary-900 dark:text-white mb-2">Brand tagline</h3>
          <p className="text-primary-700 dark:text-primary-200">Quiet Luxury. True Self.</p>
        </div>
      </div>
    </div>
  );
};

export default About;


