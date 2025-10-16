import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productsSlice';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ gender: 'men' }));
  }, [dispatch]);

  const featuredProducts = products.slice(0, 8);
  const sampleProducts = [
    {
      _id: 'sample-1',
      name: 'Classic Oxford Shirt',
      category: 'Tops',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800',
    },
    {
      _id: 'sample-2',
      name: 'Slim Chinos',
      category: 'Bottoms',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800',
    },
    {
      _id: 'sample-3',
      name: 'Denim Jacket',
      category: 'Outerwear',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1516826957135-0b7b5e8a2ee1?w=800',
    },
    {
      _id: 'sample-4',
      name: 'Crew Neck Tee',
      category: 'Tops',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1520975916090-0b1c2fd94faf?w=800',
    },
    {
      _id: 'sample-5',
      name: 'Leather Sneakers',
      category: 'Accessories',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    },
    {
      _id: 'sample-6',
      name: 'Wool Overcoat',
      category: 'Outerwear',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    },
    {
      _id: 'sample-7',
      name: 'Tailored Blazer',
      category: 'Outerwear',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=800',
    },
    {
      _id: 'sample-8',
      name: 'Athletic Joggers',
      category: 'Bottoms',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1542219550-37153d387c47?w=800',
    },
  ];
  const trendingItems = featuredProducts.length > 0 ? featuredProducts : sampleProducts;

  return (
    <div className="page-transition">
      {/* Hero Banner */}
      <Banner />

      {/* Featured: Menswear only */}
      <section className="py-16 bg-white dark:bg-primary-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center text-primary-900 dark:text-white mb-12 animate-fade-in-up">
            Shop Menswear
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/shop?gender=men&category=clothing" className="group relative h-96 overflow-hidden rounded-lg hover-lift animate-fade-in-up delay-100">
              <img
                src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800"
                alt="Menswear Clothing"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end transition-all duration-300 group-hover:from-black/80">
                <div className="p-8 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-3xl font-display font-bold text-white mb-2">Clothing</h3>
                  <p className="text-white/90 group-hover:translate-x-2 transition-transform duration-300">Explore Menswear →</p>
                </div>
              </div>
            </Link>
            <Link to="/shop?gender=men&category=accessories" className="group relative h-96 overflow-hidden rounded-lg hover-lift animate-fade-in-up delay-200">
              <img
                src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=800"
                alt="Menswear Accessories"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end transition-all duration-300 group-hover:from-black/80">
                <div className="p-8 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-3xl font-display font-bold text-white mb-2">Accessories</h3>
                  <p className="text-white/90 group-hover:translate-x-2 transition-transform duration-300">Explore Menswear →</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-primary-50 dark:bg-primary-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary-900 dark:text-white">
              Trending Now
            </h2>
            <Link
              to="/shop?gender=men"
              className="text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-colors"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingItems.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Fallback message no longer needed because of sample products */}
        </div>
      </section>

      {/* Testimonials with vertical marquee */}
      <section className="py-16 bg-white dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center text-primary-900 dark:text-white mb-12">What our customers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0,1,2].map((col) => {
              const testimonials = [
                { name: 'Arjun', text: 'Great fit and quality. My go-to menswear store now.' },
                { name: 'Rahul', text: 'Fast delivery and the chinos are perfect for daily wear.' },
                { name: 'Karthik', text: 'Minimal designs, excellent fabrics. Highly recommend.' },
                { name: 'Vikram', text: 'The jackets are top-notch and very comfortable.' },
                { name: 'Neeraj', text: 'Customer support was quick and helpful.' },
                { name: 'Sameer', text: 'Great value for money. Will shop again!' },
              ];
              const loop = [...testimonials, ...testimonials];
              return (
                <div key={col} className="vertical-marquee h-80">
                  <div className={`vertical-marquee-inner ${col % 2 === 1 ? 'reverse' : ''}`}>
                    {loop.map((t, idx) => (
                      <div key={`${t.name}-${idx}`} className="p-6 rounded-xl border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900 shadow-sm">
                        <div className="text-primary-700 dark:text-primary-200">“{t.text}”</div>
                        <div className="mt-4 font-semibold text-primary-900 dark:text-white">— {t.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-900 dark:bg-primary-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-white/80 mb-8">
            Subscribe to get special offers, free giveaways, and exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white dark:bg-primary-800 text-primary-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

