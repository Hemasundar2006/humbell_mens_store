import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1528701800489-20be3c2ea5fd?w=1600', // man in jacket
      title: 'Menswear',
      subtitle: 'New Season, New Style',
    },
    {
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600', // mens street style
      title: 'Essentials',
      subtitle: 'Daily fits, elevated',
    },
    {
      image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1600', // chinos/joggers
      title: 'Comfort & Fit',
      subtitle: 'Chinos, joggers and more',
    },
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600', // coat / outerwear
      title: 'Outerwear',
      subtitle: 'Layer up in style',
    },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative h-[600px] bg-primary-100 dark:bg-primary-800 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slides[current].image}
          alt="Fashion Banner"
          className="w-full h-full object-cover opacity-90 scale-105 animate-[scale_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20"></div>
      </div>

      {/* Content with arrows (hidden on mobile) */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className={`max-w-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-up">
            {slides[current].title}
            <br />
            <span className="inline-block animate-fade-in-up delay-200">{slides[current].subtitle}</span>
          </h1>
          <p className="text-lg text-white/90 mb-8 animate-fade-in-up delay-300">
            Discover our latest menswear collection designed for modern style and comfort.
          </p>
          <Link
            to="/shop?gender=men"
            className="inline-block bg-white text-primary-900 px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-primary-50 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up delay-400 group"
          >
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
              Shop Now →
            </span>
          </Link>
        </div>

        {/* Arrow buttons (hidden on small screens) */}
        <button
          className="hidden sm:flex group absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:scale-105 shadow-lg transition-all z-10"
          aria-label="Previous"
          onClick={goPrev}
        >
          <FiChevronLeft size={22} className="transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          className="hidden sm:flex group absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:scale-105 shadow-lg transition-all z-10"
          aria-label="Next"
          onClick={goNext}
        >
          <FiChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Mobile tap zones: left=prev, right=next */}
      <button
        className="sm:hidden absolute left-0 top-0 h-full w-1/2 bg-transparent z-0"
        aria-label="Previous"
        onClick={goPrev}
      />
      <button
        className="sm:hidden absolute right-0 top-0 h-full w-1/2 bg-transparent z-0"
        aria-label="Next"
        onClick={goNext}
      />
      {/* Pagination indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`${idx === current ? 'w-16 bg-black' : 'w-4 bg-black/30'} h-1 rounded-full transition-all`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;

