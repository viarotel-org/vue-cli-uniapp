const colors = require('tailwindcss/colors');
const corePlugins = require('./corePlugins');

const emptyVariants = corePlugins.reduce((obj, item) => {
  obj[item] = [];
  return obj;
}, {});

module.exports = {
  corePlugins,
  theme: {
    screens: false,
    extend: {
      colors: {
        gray: colors.gray,
        orange: colors.orange,
      },
      fontSize: {
        '2xs': '20rpx',
      },
    },
  },
  variants: {
    ...emptyVariants,
    extend: {},
  },
  plugins: [],
};
