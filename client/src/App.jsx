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
import Footer from './components/Footer';
import UserListPage from './pages/admin/userListPage.jsx';
import ProductListPage from './pages/admin/productListPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen py-6">
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
            <Route path="/admin/userlist" element={<UserListPage/>} />
            <Route path="/admin/productlist" element={<ProductListPage />} />
          </Route>
        </Routes>

      </main>
      <Footer />
      
    </BrowserRouter>
  );
};

export default App;