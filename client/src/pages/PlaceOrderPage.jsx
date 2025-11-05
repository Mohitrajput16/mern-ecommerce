// client/src/pages/PlaceOrderPage.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCartItems } from '../store/cartSlice';
import axios from 'axios';
import Container from '../components/Container'; // <-- Import

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  // --- Calculate Prices ---
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number(0.15 * itemsPrice));
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  const placeOrderHandler = async () => {
    try {
      const res = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });
      dispatch(clearCartItems());
      navigate(`/order/${res.data._id}`);
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Review Your Order</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Column 1: Order Details (spans 2 columns on large screens) */}
        <div className="lg:col-span-2">
          {/* Shipping Details */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping</h2>
            <p className="text-gray-700">
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Method</h2>
            <p className="text-gray-700">
              <strong>Method: </strong>
              {paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Items</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0">
                        {/* <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" /> */}
                      </div>
                      <div>
                        <Link to={`/product/${item._id}`} className="font-medium text-gray-900 hover:text-indigo-600">
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
            )}
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
                <span className="font-medium text-gray-900">${shippingPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tax:</span>
                <span className="font-medium text-gray-900">${taxPrice}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
              className="w-full mt-6 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlaceOrderPage;