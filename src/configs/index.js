const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  title: 'vue-cli-uniapp',
  logo: () => require('@/static/images/logo.png'),
  showMocks: () => isDevelopment,
  // 项目基础路径
  appBasePath: isProduction ? '' : '',
  // CDN 资源基础域名
  assetURL: '',
  // 请求 基础域名
  requsetURL: '',
};
