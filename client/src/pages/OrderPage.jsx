// client/src/pages/OrderPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// We'll create this component next for loading/error messages
// import Loader from '../components/Loader';
// import Message from '../components/Message';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/orders/${orderId}`);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading...</p>; // Replace with <Loader />
  if (error) return <p>{error}</p>; // Replace with <Message variant="danger">{error}</Message>

  // Helper function to add decimals
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  // Calculate prices *from the order data*
  const itemsPrice = addDecimals(
    order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  return (
    <div>
      <h1>Order {order._id}</h1>
      <div style={{ display: 'flex' }}>
        {/* Left Column: Details */}
        <div style={{ flex: 2, marginRight: '2rem' }}>
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <p style={{ color: 'green' }}>Delivered on {order.deliveredAt}</p>
            ) : (
              <p style={{ color: 'red' }}>Not Delivered</p>
            )}
          </div>

          <div>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <p style={{ color: 'green' }}>Paid on {order.paidAt}</p>
            ) : (
              <p style={{ color: 'red' }}>Not Paid</p>
            )}
          </div>

          <div>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <p>Order is empty</p>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                    <span style={{ flex: 1 }}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </span>
                    <span style={{ flex: 1 }}>
                      {item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}
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
            <span>${order.shippingPrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax:</span>
            <span>${order.taxPrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>Total:</strong>
            <strong>${order.totalPrice}</strong>
          </div>

          {/* --- THIS IS WHERE THE PAYMENT BUTTON WILL GO --- */}
          {!order.isPaid && (
            <div>
              <p>Payment button will go here (Stripe/PayPal).</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;