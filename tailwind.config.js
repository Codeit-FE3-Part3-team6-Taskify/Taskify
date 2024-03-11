/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      padding: {
        3.25: '0.8125rem',
        3.75: '0.9375rem',
        4.25: '1.0625rem',
        11: '2.75rem',
        57: '14.25rem',
        85: '21.25rem',
      },
      width: {
        30: '7.5rem',
      },
      height: {
        8.5: '2.125rem',
        9.5: '2.375rem',
        15: '3.75rem',
        17.5: '4.375rem',
      },
      colors: {
        black_000000: { DEFAULT: '#000000' },
        black_171717: { DEFAULT: '#171717' },
        black_333236: { DEFAULT: '#333236', 1: '#2순위컬러' },
        black_4B4B4B: { DEFAULT: '#4B4B4B' },
        gray_787486: { DEFAULT: '#787486' },
        gray_9FA6B2: { DEFAULT: '#9FA6B2' },
        gray_D9D9D9: { DEFAULT: '#D9D9D9' },
        gray_EEEEEE: { DEFAULT: 'EEEEEE' },
        gray_FAFAFA: { DEFAULT: '#FAFAFA' },
        white_FFFFFF: { DEFAULT: '#FFFFFF' },
      },
      screens: {
        sm: '375px',
        md: '744px',
        lg: '1920px',
      },
    },
  },
  plugins: [],
};
