// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import Header from './components/Header.jsx';
import CartPage from './pages/CartPage.jsx';

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
          {/* Add more routes here later, e.g., /login, /cart */}
        </Routes>
      </main>
      <footer>
        <p>Copyright &copy; 2025 My E-Commerce App</p>
      </footer>
    </BrowserRouter>
  );
};

export default App;