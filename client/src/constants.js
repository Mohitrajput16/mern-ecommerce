// client/src/constants.js

// In production, we will fill this in with the Render URL.
// In development, we leave it empty so the proxy handles it.
export const BASE_URL = import.meta.env.MODE === 'development' ? '' : 'https://YOUR-RENDER-APP-NAME.onrender.com'; 

export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOAD_URL = '/api/upload';