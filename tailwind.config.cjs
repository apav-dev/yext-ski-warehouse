module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#ff9500",
        "dark-orange": "#db8000",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
