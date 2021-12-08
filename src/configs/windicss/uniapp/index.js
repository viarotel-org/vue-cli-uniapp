const defaultTheme = require('windicss/defaultTheme');
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
  important: true,
  theme: {
    ...theme,
    extend: {},
  },
};
