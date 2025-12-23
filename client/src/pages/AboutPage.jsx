import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const AboutPage = () => {
  return (
    <div>
      {/* 1. Hero Section (Full Width) */}
      <div className="bg-gray-900 text-white py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Empowering Developers, <br />
              <span className="text-indigo-500">One Gadget at a Time.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              We believe that the right tools can change the way you build the future. 
              Our mission is to provide high-quality, reliable tech for creators and professionals.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* 2. Our Story Section */}
        <div className="flex flex-col md:flex-row items-center my-16 gap-12">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Team working" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-indigo-600 mb-6"></div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2025, we started with a simple idea: tech gear shouldn't just work; 
              it should inspire. As developers ourselves, we were tired of unreliable peripherals 
              and overpriced components.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What began as a small project in a university dorm has grown into a community of 
              tech enthusiasts. We carefully curate every product in our catalog to ensure it meets 
              our high standards for performance and durability.
            </p>
          </div>
        </div>

        {/* 3. Stats Section */}
        <div className="bg-indigo-50 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">5K+</h3>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">200+</h3>
              <p className="text-gray-600 font-medium">Premium Products</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">24/7</h3>
              <p className="text-gray-600 font-medium">Support Team</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">100%</h3>
              <p className="text-gray-600 font-medium">Secure Payment</p>
            </div>
          </div>
        </div>

        {/* 4. Team / Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-3xl">
                💎
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We don't sell junk. Every item is tested and verified by our team.
              </p>
            </div>
            {/* Value 2 */}
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-3xl">
                🚚
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                We know you need your gear fast. We ship within 24 hours.
              </p>
            </div>
            {/* Value 3 */}
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-3xl">
                ❤️
              </div>
              <h3 className="text-xl font-bold mb-2">Customer First</h3>
              <p className="text-gray-600">
                Our support team is real people, ready to help you anytime.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Bottom CTA */}
        <div className="text-center mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to upgrade your setup?</h3>
          <Link 
            to="/shop" 
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            Browse Our Shop
          </Link>
        </div>

      </Container>
    </div>
  );
};

export default AboutPage;
