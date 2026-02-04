// client/src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import axios from 'axios';
import Container from '../components/Container';

// Simple Rating Component
const Rating = ({ value, text }) => (
  <div className="flex items-center mb-4">
    <span className="text-yellow-500 text-lg">{'★'.repeat(Math.round(value || 0))}</span>
    <span className="text-gray-400 text-lg">{'★'.repeat(5 - Math.round(value || 0))}</span>
    <span className="text-gray-600 text-sm ml-2">{text && text}</span>
  </div>
);

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // <--- New State
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Main Product
        const { data: productData } = await axios.get(`/api/products/${productId}`);
        setProduct(productData);

        // 2. Fetch Related Products (Nested request to ensure we have the main product first)
        // Note: You can also do this in parallel, but this is safer for now
        const { data: relatedData } = await axios.get(`/api/products/${productId}/related`);
        setRelatedProducts(relatedData);

        setLoading(false);
      } catch (err) {
        setError('Product not found');
        setLoading(false);
      }
    };

    fetchProductData();
    // Reset Qty when product changes
    setQty(1);
    // Scroll to top when switching products
    window.scrollTo(0, 0);
  }, [productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (loading) return <Container><div className="text-center py-10">Loading...</div></Container>;
  if (error) return <Container><div className="text-red-500 text-center py-10">{error}</div></Container>;

  return (
    <Container>
      <Link to="/shop" className="text-gray-600 hover:text-indigo-600 mb-6 inline-block font-medium">
        &larr; Back to Shop
      </Link>
      
      {product && (
        <>
          {/* --- Main Product Section --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Image Column */}
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full rounded-xl shadow-lg border border-gray-100" 
              />
            </div>

            {/* Details Column */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              
              <p className="text-4xl font-bold text-gray-900 mb-6">${product.price}</p>
              
              <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-200 pb-8">
                {product.description}
              </p>

              {/* Add to Cart Box */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span className={product.countInStock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {product.countInStock > 0 && (
                  <div className="flex justify-between items-center mb-6">
                    <label className="font-semibold text-gray-700">Quantity:</label>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="border-gray-300 rounded-md shadow-sm p-2 w-20 text-center"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {product.countInStock === 0 ? 'Out Of Stock' : 'Add To Cart'}
                </button>
              </div>
            </div>
          </div>

          {/* --- Related Products Section --- */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                  <div key={related._id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                    <Link to={`/product/${related._id}`}>
                      <div className="h-48 bg-gray-100 w-full">
                        <img 
                          src={related.image} 
                          alt={related.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2 truncate">{related.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-indigo-600 font-bold">${related.price}</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {related.rating} ★
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductPage;