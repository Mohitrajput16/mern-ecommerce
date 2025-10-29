// client/src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import axios from 'axios';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id: productId } = useParams(); // Get the product ID from the URL
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
  // ADD THIS LINE FOR DEBUGGING:
  console.log('ATTEMPTING TO ADD:', { ...product, qty });

  dispatch(addToCart({ ...product, qty }));
  navigate('/cart');
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {product && (
        <>
          <h1>{product.name}</h1>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>

          {/* Quantity Selector */}
          {product.countInStock > 0 && (
            <div>
              <label htmlFor="qty">Qty: </label>
              <select
                id="qty"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
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
          >
            Add To Cart
          </button>
        </>
      )}
    </div>
  );
};

export default ProductPage;