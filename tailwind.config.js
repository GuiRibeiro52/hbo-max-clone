module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple100: '#5b1ce6',
        purple500: '#9E86FF',
        gray500: '#F0F0F0',
        gray200: '#999999',
        gray300: '#3C3C3C',
      },
      backgroundImage: {
        gradientBlue: 'linear-gradient(0deg, #1400FF, #72AAFF)',
        blueAlt: 'linear-gradient(0deg, #4710C1, #7857FF, #819BFD)',
        gradientPink: 'linear-gradient(1deg, #FC00C4, #FF8CE6)',
        gradientBanner: 'linear-gradient(to right, black, transparent, black)', // Gradiente personalizado
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sintony: ['Sintony', 'sans-serif'],
      },
      fontSize: {
        displayLargeRegular: ['48px', { fontWeight: '400' }],
        displayMediumRegular: ['32px', { fontWeight: '400' }],
        displaySmallRegular: ['22px', { fontWeight: '400' }],
        displayLargeBold: ['48px', { fontWeight: '700' }],
        displayMediumBold: ['32px', { fontWeight: '700' }],
        displaySmallBold: ['22px', { fontWeight: '700' }],
        textLargeRegular: ['16px', { fontWeight: '400' }],
        textMediumRegular: ['14px', { fontWeight: '400' }],
        textMediumSmall: ['10px', { fontWeight: '400' }],
        textLargeBold: ['16px', { fontWeight: '700' }],
        textMediumBold: ['14px', { fontWeight: '700' }],
        textMediumSmallBold: ['10px', { fontWeight: '700' }],
      },
    },
  },
  plugins: [],
};
