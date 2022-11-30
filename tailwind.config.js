module.exports = {
  content: ["./app/**/*.{html,ejs}"],
  theme: {
    extend: {
      screens: {
        'md': '768px',
        // => @media (min-width: 768px) 
      },
    },
    container: {
      padding: "32px",
      center: true,
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
