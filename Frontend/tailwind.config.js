/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
       "Akaya": ["Akaya Kanadaka", "system-ui"],
       "Roboto": ["Roboto Slab", "serif"]
      },
        colors: {
          skyblue: "#B6EADA",
          darkblue:'#03001C'
        },
      },
  },
  plugins: [],
}

