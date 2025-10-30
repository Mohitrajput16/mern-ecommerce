// client/src/components/Footer.jsx
import React from 'react';
import Container from './Container';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <Container>
        <div className="py-6 text-center text-sm">
          <p>Copyright &copy; 2025 My E-Commerce App</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;