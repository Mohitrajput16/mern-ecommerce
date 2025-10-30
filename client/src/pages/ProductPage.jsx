// client/src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import axios from 'axios';
import Container from '../components/Container'; // <-- Import

// Simple Rating component (can be moved to its own file later)
const Rating = ({ value, text }) => (
  <div className="flex items-center">
    <span className="text-yellow-500">★</span>
    <span className="text-gray-600 text-sm ml-1">{text && text}</span>
  </div>
);

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (loading) return <Container><p>Loading...</p></Container>;
  if (error) return <Container><p className="text-red-500">{error}</p></Container>;

  return (
    <Container>
      <Link to="/" className="text-gray-600 hover:text-gray-800 mb-4 inline-block">
        &larr; Go Back
      </Link>
      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Image */}
          <div>
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image</span>
            </div>
            {/* <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" /> */}
          </div>

          {/* Column 2: Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="mb-4">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-4">${product.price}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            {/* Card for Price, Status, Qty, Button */}
            <div className="bg-white border rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">Price:</span>
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">Status:</span>
                <span className={product.countInStock > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              {product.countInStock > 0 && (
                <div className="flex justify-between items-center mb-4">
                  <label htmlFor="qty" className="text-lg font-medium text-gray-700">Qty:</label>
                  <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="rounded border border-gray-300 p-2"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductPage;