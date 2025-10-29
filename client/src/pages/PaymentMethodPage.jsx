// client/src/pages/PaymentMethodPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/cartSlice';

const PaymentMethodPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod: currentPaymentMethod } = cart;

  // If no shipping address, redirect to shipping page
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  // We'll just have PayPal for now
  const [paymentMethod, setPaymentMethod] = useState(currentPaymentMethod);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder'); // Go to the next step
  };

  return (
    <div>
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal or Credit Card
          </label>
        </div>

        {/* You could add more payment methods here like 'Stripe' */}

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default PaymentMethodPage;