// client/src/pages/CartPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the cart object from the Redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Handler to update quantity
  const updateQuantityHandler = (item, newQty) => {
    dispatch(addToCart({ ...item, qty: newQty }));
  };

  // Handler to remove item
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handler for checkout
  const checkoutHandler = () => {
    // We'll build the shipping page next
    navigate('/shipping');
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Go Back</Link>
        </p>
      ) : (
        <div style={{ display: 'flex' }}>
          {/* Cart Items List */}
          <div style={{ flex: 2 }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  {/* We'll add images later */}
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </div>
                <div style={{ flex: 1 }}>${item.price}</div>
                <div style={{ flex: 1 }}>
                  <select
                    value={item.qty}
                    onChange={(e) => updateQuantityHandler(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <button onClick={() => removeFromCartHandler(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div style={{ flex: 1, marginLeft: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
            <h2>Subtotal ({totalItems}) items</h2>
            <h3>${subtotal.toFixed(2)}</h3>
            <button onClick={checkoutHandler} disabled={cartItems.length === 0}>
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;