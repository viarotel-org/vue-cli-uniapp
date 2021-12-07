import colors from 'windicss/colors';
import preset from './src/configs/windicss/preset';

const useLineClamp = require('windicss/plugin/line-clamp');

export default {
  presets: [preset],
  extract: {
    include: ['./src/**/*.{vue,nvue}'],
  },
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        'theme-primary': '#2b9939',
      },
    },
  },
  plugins: [useLineClamp],
};
