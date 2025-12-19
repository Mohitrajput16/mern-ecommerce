// client/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // <-- Import useParams
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import Paginate from '../components/Paginate'; // <-- Import Paginate

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);       // <-- State for current page
  const [pages, setPages] = useState(1);     // <-- State for total pages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get keyword and pageNumber from URL
  const { keyword, pageNumber } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Build the query string based on whether keyword or pageNumber exists
        let url = `/api/products?pageNumber=${pageNumber || 1}`;
        if (keyword) {
          url += `&keyword=${keyword}`;
        }

        const { data } = await axios.get(url);
        
        // Update state based on new API response structure
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
        
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, [keyword, pageNumber]); // <-- Re-run when URL params change

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
      </h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          {/* Add Pagination Component at the bottom */}
          <Paginate 
            pages={pages} 
            page={page} 
            keyword={keyword ? keyword : ''} 
          />
        </>
      )}
    </Container>
  );
};

export default HomePage;