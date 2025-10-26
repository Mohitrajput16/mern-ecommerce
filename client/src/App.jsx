// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <h1>My E-Commerce App</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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