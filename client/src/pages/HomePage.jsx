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
      // Just fetch page 1 to get the latest items
      const { data } = await axios.get('/api/products?pageNumber=1');
      // Take only the first 4 items for the homepage display
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

        {/* 3. Product Grid (Limited) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* 4. Features/Trust Section */}
        <div className="py-16 mt-16 border-t border-gray-100">
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