const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'regular-12': ['12px', { lineHeight: '18px' }],
        'regular-14': ['14px', { lineHeight: '21px' }],
        'regular-16': ['16px', { lineHeight: '19.2px' }],
        'medium-18': ['18px', { lineHeight: '21.6px' }],
        'semibold-22': [
          '22px',
          { lineHeight: '33px', letterSpacing: '0.36px' },
        ],
        'semibold-26': [
          '26px',
          { lineHeight: '39px', letterSpacing: '0.36px' },
        ],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
      },
      colors: {
        buttonPurple: '#8E2BFF',
        inputBorder: '#7676801F',
        inputBackground: '#EFEFF0',
        label: '#181818',
      },
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '7px',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '9px',
    },
  },
  plugins: [],
});
