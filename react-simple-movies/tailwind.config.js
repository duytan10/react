/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { body: ["DM Sans, sans-serif"] },
      colors: { primary: "#FF3D71", secondary: "#6F5CF1" },
    },
  },
  plugins: [],
};
