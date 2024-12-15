/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif']
    },
    colors: {
      primary: {
        50: '#f5f3ff',
        100: '#ede9fe',
        600: '#4f46e5',
        700: '#4338ca'
      }
    }
  },
};
export const plugins = [];