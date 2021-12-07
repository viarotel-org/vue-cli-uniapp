const defaultTheme = require('windicss/defaultTheme');
const {
  resolveConfig: resolveSafeClassNames,
} = require('./resolveSafeClassNames');

const theme = [
  'spacing',
  'width',
  'height',
  'inset',
  'margin',
  'padding',
  'maxWidth',
  'minWidth',
  'maxHeight',
  'minHeight',
  'borderWidth',
  'translate',
  'space',
  'divideWidth',
  'ringWidth',
].reduce((obj, key) => {
  obj[key] = resolveSafeClassNames(defaultTheme[key]);
  return obj;
}, {});

console.log('space', theme.divideWidth);

module.exports = {
  separator: '_',
  important: true,
  theme: {
    ...theme,
    extend: {},
  },
};
