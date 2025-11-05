// client/src/pages/CartPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { FaTrash } from 'react-icons/fa';
import Container from '../components/Container'; // <-- Import

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const updateQuantityHandler = (item, newQty) => {
    dispatch(addToCart({ ...item, qty: newQty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-700">Your cart is empty.</p>
          <Link 
            to="/" 
            className="mt-4 inline-block bg-gray-800 text-white py-2 px-5 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Column 1: Cart Items List (spans 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item._id} 
                  className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  {/* Image (placeholder) */}
                  <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                    {/* <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" /> */}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0 mb-2 sm:mb-0 sm:mr-4">
                    <Link 
                      to={`/product/${item._id}`} 
                      className="text-lg font-medium text-gray-900 hover:text-indigo-600 truncate"
                      title={item.name}
                    >
                      {item.name}
                    </Link>
                  </div>

                  {/* Price */}
                  <div className="w-full sm:w-auto sm:mx-4 mb-2 sm:mb-0">
                    <p className="text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="w-full sm:w-auto sm:mx-4 mb-2 sm:mb-0">
                    <select
                      value={item.qty}
                      onChange={(e) => updateQuantityHandler(item, Number(e.target.value))}
                      className="rounded border border-gray-300 p-2"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Remove Button */}
                  <div className="w-full sm:w-auto">
                    <button 
                      onClick={() => removeFromCartHandler(item._id)} 
                      className="text-red-600 hover:text-red-800 p-2 w-full sm:w-auto flex justify-center items-center"
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b">
                Order Summary
              </h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-gray-700">Subtotal ({totalItems} items)</span>
                <span className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CartPage;