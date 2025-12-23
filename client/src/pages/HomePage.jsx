// client/src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';

const HomePage = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      const { data } = await axios.get('/api/products?pageNumber=1');
      setLatestProducts(data.products.slice(0, 4));
    };
    fetchLatest();
  }, []);

  return (
    <div>
      {/* 1. Hero Banner */}
      <Hero />

      <Container>
        {/* 2. Featured Section Title */}
        <div className="flex justify-between items-end mb-6 mt-12 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Latest Arrivals</h2>
          <Link to="/shop" className="text-indigo-600 hover:text-indigo-800 font-medium">
            View All &rarr;
          </Link>
        </div>

        {/* 3. Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* --- NEW SECTION: PROMO BANNER --- */}
        <div className="bg-indigo-900 rounded-2xl p-8 md:p-16 text-center text-white my-20 relative overflow-hidden">
            {/* Background decoration circle */}
            <div className="absolute top-0 left-0 -mt-10 -ml-10 w-40 h-40 bg-indigo-700 rounded-full opacity-50 blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Unlock 20% Off Your First Order
              </h2>
              <p className="text-indigo-200 mb-8 max-w-2xl mx-auto text-lg">
                Join our community of developers and tech enthusiasts. Sign up today to get exclusive deals, early access to new drops, and expert reviews.
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  to="/register" 
                  className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
                >
                  Join Now
                </Link>
                <Link 
                  to="/shop" 
                  className="border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-indigo-900 transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
        </div>
        {/* ---------------------------------- */}

        {/* 4. Features/Trust Section */}
        <div className="py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your gear in record time.</p>
            </div>
            <div>
              <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment gateways.</p>
            </div>
            <div>
              <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">↩️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600">Not satisfied? Return it easily.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;