// client/src/pages/PlaceOrderPage.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCartItems } from '../store/cartSlice';
import axios from 'axios';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // Redirect if shipping or payment method is missing
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  // --- Calculate Prices ---
  // Helper function to add decimals
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // Simple shipping logic
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  // Simple tax logic (15%)
  const taxPrice = addDecimals(Number(0.15 * itemsPrice));
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  // --- Submit Handler ---
  const placeOrderHandler = async () => {
    try {
      // Send the order to the backend
      const res = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        // Pass all price components
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });

      // On success, clear the cart
      dispatch(clearCartItems());

      // And redirect to the new order's page
      navigate(`/order/${res.data._id}`);
    } catch (error) {
      console.error('Failed to place order:', error);
      // We'll add user-facing error messages later
    }
  };

  return (
    <div>
      <h1>Place Order</h1>
      <div style={{ display: 'flex' }}>
        {/* Left Column: Details */}
        <div style={{ flex: 2, marginRight: '2rem' }}>
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {paymentMethod}
            </p>
          </div>

          <div>
            <h2>Order Items</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                    <span style={{ flex: 1 }}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </span>
                    <span style={{ flex: 1 }}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '1rem' }}>
          <h2>Order Summary</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Items:</span>
            <span>${itemsPrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Shipping:</span>
            <span>${shippingPrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax:</span>
            <span>${taxPrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>Total:</strong>
            <strong>${totalPrice}</strong>
          </div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={placeOrderHandler}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;