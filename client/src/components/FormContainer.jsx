// client/src/components/FormContainer.jsx
import React from 'react';
import Container from './Container';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <div className="flex mt-12 justify-center">
        {/* Sets a max-width for the form, centers it, and adds padding */}
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl mt-8">
          {children}
        </div>
      </div>
    </Container>
  );
};

export default FormContainer;