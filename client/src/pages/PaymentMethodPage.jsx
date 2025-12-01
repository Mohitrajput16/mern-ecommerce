// client/src/pages/PaymentMethodPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/cartSlice';
import FormContainer from '../components/FormContainer'; // <-- Import

const PaymentMethodPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod: currentPaymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState(currentPaymentMethod);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Payment Method</h1>
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend className="text-base font-medium text-gray-900">Select Method</legend>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                id="PayPal"
                name="paymentMethod"
                type="radio"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor="PayPal" className="ml-3 block text-sm font-medium text-gray-700">
                PayPal or Credit Card
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="CashonDelivery"
                name="paymentMethod"
                type="radio"
                value="CashonDelivery"
                checked={paymentMethod === 'CashonDelivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor="CashonDelivery" className="ml-3 block text-sm font-medium text-gray-700">
                Cash on Delivery
              </label>
            </div>
            
            {/* Add other payment methods here if you want */}
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 mt-6"
        >
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentMethodPage;