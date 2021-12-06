const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

// @ts-ignore
const postcssPurgecss = () => require('@fullhuman/postcss-purgecss')({
  content: ['./public/**/*.html', './src/**/*.vue'],
  safelist: [
    /^uni-/,
    /^uicon-/,
    /^u-/,
    ...require('html-tags'),
    /-(leave|enter|appear)(|-(to|from|active))$/,
    /^(?!(|.*?:)cursor-move).+-move$/,
    /^router-link(|-exact)-active$/,
    /data-v-.*/,
  ],

  defaultExtractor(content) {
    const contentWithoutStyleBlocks = content.replace(
      /<style[^]+?<\/style>/gi,
      '',
    );
    return (
      contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g)
        || []
    );
  },
  blocklist: [],
  keyframes: false,
  fontFace: false,
});

module.exports = {
  parser: require('postcss-comment'),
  plugins: [
    require('postcss-import')({
      resolve(id, basedir, importOptions) {
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3));
        }
        if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2));
        }
        if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1));
        }
        return id;
      },
    }),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('postcss-uniapp-tailwindcss-compatible'),
    // 修复使用postcss-uniapp-tailwindcss对类名进行转换后无法正确清除未使用样式的问题
    ...(isProduction ? [postcssPurgecss()] : []),
    require('@dcloudio/vue-cli-plugin-uni/packages/postcss'),
    require('autoprefixer')({
      remove: process.env.UNI_PLATFORM !== 'h5',
    }),
  ],
};
