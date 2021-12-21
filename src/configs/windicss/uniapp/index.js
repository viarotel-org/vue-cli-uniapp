const defaultTheme = require('windicss/defaultTheme');
const { transform } = require('windicss/helpers');
const useLineClamp = require('windicss/plugin/line-clamp');

const useTextShadow = transform('tailwindcss-textshadow');

const safeClassNames = require('./resolveSafeClassNames');

const theme = [
  'spacing',
  'width',
  'height',
  'margin',
  'padding',
  'inset',
  'maxWidth',
  'minWidth',
  'maxHeight',
  'minHeight',
  'translate',
  'space',
  'gap',
  'perspective',
].reduce((obj, key) => {
  obj[key] = safeClassNames.resolve(defaultTheme[key]);
  return obj;
}, {});

// console.log('theme', theme);

module.exports = {
  separator: '_',
  // 小程序不需要可以关闭基础样式 不过即使打开不支持的css语法也会被postcss的uniapp插件转换所以也不会有问题
  // preflight: false,
  important: true,
  theme: {
    ...theme,
    extend: {},
  },
  plugins: [useLineClamp, useTextShadow],
};
