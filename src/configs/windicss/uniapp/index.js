const defaultTheme = require('windicss/defaultTheme');
const {
  resolveConfig: resolveSafeClassNames,
} = require('./resolveSafeClassNames');

module.exports = {
  separator: '_',
  important: true,
  theme: {
    ...resolveSafeClassNames(defaultTheme),
    extend: {},
  },
};
