/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Akaya": ["Akaya Kanadaka", "system-ui"],
        "Roboto": ["Roboto Slab", "serif"],
        "fontFamily": ['Poppins', 'sans-serif'],
        "PlayFair":["Playfair Display", "serif"]
      },
      colors: {
        skyblue: "#B6EADA",
        darkblue: '#03001C'
      },
    },
  },
  plugins: [
    function ({ addBase, addComponents, addUtilities }) {
      addBase({
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '4px',
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',  
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '2px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      });
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    },
  ],
}