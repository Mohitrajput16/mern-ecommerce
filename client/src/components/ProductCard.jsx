// client/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// A simple star rating component (we'll add it to the card)
const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center">
      {/* We'll add star icons here later, for now just text */}
      <span className="text-yellow-500 mr-1">★</span>
      <span className="text-gray-600 text-sm">{text && text}</span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link to={`/product/${product._id}`}>
        {/* Placeholder for image */}
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-900 truncate" title={product.name}>
            {product.name}
          </h2>
        </Link>
        <div className="my-2">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;