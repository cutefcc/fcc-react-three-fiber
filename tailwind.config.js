/** @type {import('tailwindcss').Config} */
const customPx = Array(2000)
  .fill('1')
  .map((item, index) => ({ [index]: `${index}px` }))
  .reduce((pre, curr) => ({ ...pre, ...curr }));
const customText = Array(2000)
  .fill('1')
  .map((item, index) => ({ [`text-${index}`]: `${index}px` }))
  .reduce((pre, curr) => ({ ...pre, ...curr }));
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.html'],
  darkMode: true,
  theme: {
    // Customizing Spacing
    // customizimg 0 - 0px  1 - 1px  ... ... 999 - 999px
    spacing: customPx,
    extend: {
      colors: {
        animation: {
          'spin-slow': 'spin 2s linear infinite',
        },
      },
    },
  },
  fontSize: customText,
  plugins: [],
};
