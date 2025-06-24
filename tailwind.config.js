/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    darkMode: 'class',
    extend: {
      colors: {
        primary: {
          DEFAULT: '#222831',    // blue-700
        },
        secondary: '#10B981',    // green-500
        accent: '#F59E0B',       // amber-500
        neutral: '#374151',      // gray-700
        background: '#F9FAFB',   // light background
        surface: '#1F2937',      // gray-800 (for dark cards)
      },
    },
  },
  plugins: [],
}
