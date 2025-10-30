// client/src/components/Container.jsx
import React from 'react';

const Container = ({ children }) => {
  return (
    // max-w-7xl: Sets max-width to 1280px
    // mx-auto: Centers the content horizontally
    // px-4...: Adds responsive horizontal padding
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;