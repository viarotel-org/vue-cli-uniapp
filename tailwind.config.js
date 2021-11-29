const isProduction = process.env.NODE_ENV === 'production';
const colors = require('tailwindcss/colors');

module.exports = {
  presets: [require('./src/configs/tailwindcss/preset')],
  important: true,
  purge: {
    enabled: isProduction,
    preserveHtmlElements: true,
    content: [
      './src/pages/**/*.vue',
      './src/components/**/*.vue',
      './vue.config.js',
    ],
    options: {
      safelist: [/^el-/, /^u-/],
      blocklist: [],
      keyframes: false,
      fontFace: false,
    },
  },
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        orange: colors.orange,
        'theme-primary': '#2b9939',
      },
      fontSize: {
        '2xs': '10px',
      },
    },
    // 字体阴影 text-shadow-xs
    textShadow: {
      none: 'none',
      DEFAULT: '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)',
      sm: '1px 1px 3px rgb(36 37 47 / 25%)',
      md: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)',
      lg: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)',
      xl: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
      '2xl': '1px 1px 5px rgb(33 34 43 / 20%)',
      '3xl': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
    },
    // 文字截断 .clamp-1
    lineClamp: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
    },
  },
  variants: {
    textShadow: [],
    lineClamp: [],
    extend: {},
  },
  plugins: [
    require('tailwindcss-textshadow'), // 文字阴影
    require('@tailwindcss/line-clamp'), // 文字截断
  ],
};
