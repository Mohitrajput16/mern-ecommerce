// client/src/pages/OrderPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '../components/Container'; // <-- Import
import { useSelector } from 'react-redux'; // <-- Import this

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handler for marking as delivered
  const deliverHandler = async () => {
    try {
      await axios.put(`/api/orders/${orderId}/deliver`, {});
      // Reload page data to reflect changes
      window.location.reload(); 
    } catch (err) {
      alert('Error updating order');
    }
  };

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

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  if (loading) return <Container><p>Loading...</p></Container>;
  if (error) return <Container><p className="bg-red-100 text-red-700 p-4 rounded">{error}</p></Container>;

  // Calculate itemsPrice from the order data
  const itemsPrice = addDecimals(
    order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Details</h1>
      <p className="text-lg text-gray-600 mb-8">Order ID: {order._id}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Order Details */}
        <div className="lg:col-span-2">
          {/* Shipping Details */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping</h2>
            <p className="text-gray-700 mb-1">
              <strong>Name: </strong> {order.user.name}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Email: </strong> <a href={`mailto:${order.user.email}`} className="text-indigo-600 hover:underline">{order.user.email}</a>
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg">
                Delivered on {new Date(order.deliveredAt).toLocaleString()}
              </div>
            ) : (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                Not Delivered
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Method</h2>
            <p className="text-gray-700 mb-4">
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg">
                Paid on {new Date(order.paidAt).toLocaleString()}
              </div>
            ) : (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                Not Paid
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Items</h2>
            <div className="divide-y divide-gray-200">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0">
                      {/* <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" /> */}
                    </div>
                    <div>
                      <Link to={`/product/${item.product}`} className="font-medium text-gray-900 hover:text-indigo-600">
                        {item.name}
                      </Link>
                    </div>
                  </div>
                  <div className="text-gray-700">
                    {item.qty} x ${item.price.toFixed(2)} = 
                    <span className="font-semibold text-gray-900"> ${addDecimals(item.qty * item.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Items:</span>
                <span className="font-medium text-gray-900">${itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping:</span>
                <span className="font-medium text-gray-900">${order.shippingPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tax:</span>
                <span className="font-medium text-gray-900">${order.taxPrice}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
                <span>Total:</span>
                <span>${order.totalPrice}</span>
              </div>
            </div>

            {/* Payment button will go here */}
            {/* Admin: Mark As Delivered Button */}
  {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
    <div className="mt-4">
      <button
        onClick={deliverHandler}
        className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900"
      >
        Mark As Delivered
      </button>
    </div>
  )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderPage;