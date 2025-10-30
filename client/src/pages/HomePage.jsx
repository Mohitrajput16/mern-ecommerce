// client/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // <-- Import
import Container from '../components/Container'; // <-- Import

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Products</h1>

      {loading ? (
        <p>Loading...</p> // We'll replace this with a Loader component later
      ) : error ? (
        <p className="text-red-500">{error}</p> // We'll replace with Message component
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default HomePage;