/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 3px 6px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
