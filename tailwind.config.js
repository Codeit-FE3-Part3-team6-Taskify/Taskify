/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black_000000: { DEFAULT: '#000000' },
        black_171717: { DEFAULT: '#171717' },
        black_333236: { DEFAULT: '#333236' },
        black_4B4B4B: { DEFAULT: '#4B4B4B' },
        gray_787486: { DEFAULT: '#787486' },
        gray_9FA6B2: { DEFAULT: '#9FA6B2' },
        gray_D9D9D9: { DEFAULT: '#D9D9D9' },
        gray_EEEEEE: { DEFAULT: 'EEEEEE' },
        gray_FAFAFA: { DEFAULT: '#FAFAFA' },
        white_FFFFFF: { DEFAULT: '#FFFFFF' },
        violet_5534DA: { DEFAULT: '#5534DA' },
        'violet_8%': { DEFAULT: '#F1EFFD' },
        red_D6173A: { DEFAULT: '#D6173A' },
        green_7AC555: { DEFAULT: '#7AC555' },
        purple_760DDE: { DEFAULT: '#760DDE' },
        orange_FFA500: { DEFAULT: '#FFA500' },
        blue_76A6EA: { DEFAULT: '#76A5EA' },
        blue_5534DA: { DEFAULT: '#5534DA' },
        pink_E876EA: { DEFAULT: '#E876EA' },
      },
      screens: {
        sm: '320px',
        md: '768px',
        lg: '1024px',
      },
    },
  },
  plugins: [],
};
