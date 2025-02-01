/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './server/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        floatCycle: 'floatCycle 5s linear infinite',
      },
      keyframes: {
        floatCycle: {
          '0%': { transform: 'translateY(-100%)' }, // Start poza ekranem
          '100%': { transform: 'translateY(100vh)' }, // Kończy poza ekranem
        },
      },
    },
  },
  plugins: [],
};

