// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import Header from './components/Header.jsx';
import CartPage from './pages/CartPage.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import ShippingPage from './pages/ShippingPage';
import PaymentMethodPage from './pages/PaymentMethodPage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="" element={<ProtectedRoute />}>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentMethodPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} /> {/* <-- ADD THIS */}
            <Route path="/order/:id" element={<OrderPage />} />      {/* <-- ADD THIS */}
          </Route>
        </Routes>

      </main>
      <footer>
        <p>Copyright &copy; 2025 My E-Commerce App</p>
      </footer>
    </BrowserRouter>
  );
};

export default App;