// client/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  // 1. Set up state to hold your products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch data when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // We can use '/api/products' because of the proxy
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
  }, []); // The empty array means this runs once on mount

  // 3. Render loading/error states or the product list
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Latest Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <a href={`/product/${product._id}`}>
              {/* We'll add images later, just show name for now */}
              <h2>{product.name}</h2>
            </a>
            <p>{product.description}</p>
            <h3>${product.price}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;