import colors from 'windicss/colors';

export default {
  presets: [require('./src/configs/windicss/preset')],
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
};
