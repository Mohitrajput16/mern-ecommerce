// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all your components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
};