// client/src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import Paginate from '../components/Paginate';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { keyword, pageNumber } = useParams();
  const navigate = useNavigate();

  // 1. Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('/api/products/categories');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // 2. Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `/api/products?pageNumber=${pageNumber || 1}`;
        
        if (keyword) url += `&keyword=${keyword}`;
        if (category) url += `&category=${category}`;
        if (minPrice) url += `&minPrice=${minPrice}`;
        if (maxPrice) url += `&maxPrice=${maxPrice}`;

        const { data } = await axios.get(url);
        
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);

  }, [keyword, pageNumber, category, minPrice, maxPrice]);

  const clearFiltersHandler = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    navigate('/shop'); // Navigate to shop, not home
  };

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        
        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Category</h4>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Price Range</h4>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 border-gray-300 rounded-md px-2 py-1"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 border-gray-300 rounded-md px-2 py-1"
                />
              </div>
            </div>

            <button
              onClick={clearFiltersHandler}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: PRODUCT GRID */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : products.length === 0 ? (
             <div className="text-center py-10">
               <p className="text-xl text-gray-500">No products found.</p>
             </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <Paginate 
                pages={pages} 
                page={page} 
                keyword={keyword ? keyword : ''} 
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductsPage;