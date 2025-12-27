// client/src/pages/admin/ProductListPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // <-- Import useParams
import { useSelector } from 'react-redux';
import axios from 'axios';
import Container from '../../components/Container';
import Paginate from '../../components/Paginate'; // <-- Import Paginate
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ProductListPage = () => {
  const { pageNumber } = useParams(); // <-- Get page number from URL

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetch specific page
      const { data } = await axios.get(`/api/products?pageNumber=${pageNumber || 1}`);
      
      setProducts(data.products);
      setPage(data.page);
      setPages(data.pages);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate, pageNumber]); // <-- Add pageNumber dependency

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const createProductHandler = async () => {
    try {
      const { data: createdProduct } = await axios.post('/api/products', {});
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } catch (err) {
      alert(err.response ? err.response.data.message : err.message);
    }
  };

  if (loading) return <Container><p>Loading...</p></Container>;
  if (error) return <Container><p className="text-red-500">{error}</p></Container>;

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          onClick={createProductHandler}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Create Product
        </button>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">NAME</th>
              <th className="py-3 px-4 text-left">PRICE</th>
              <th className="py-3 px-4 text-left">CATEGORY</th>
              <th className="py-3 px-4 text-left">BRAND</th>
              <th className="py-3 px-4 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{product._id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{product.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">₹{product.price}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{product.category}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{product.brand}</td>
                <td className="py-3 px-4 text-sm flex space-x-3">
                  <Link to={`/admin/product/${product._id}/edit`} className="text-gray-600 hover:text-gray-900">
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => deleteHandler(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Pagination Buttons */}
      <Paginate pages={pages} page={page} isAdmin={true} />
    </Container>
  );
};

export default ProductListPage;