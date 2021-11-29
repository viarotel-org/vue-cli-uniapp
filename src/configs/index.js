const isDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
  title: 'vue-uniapp-cli',
  logo: () => require('@/static/images/logo.png'),
  showMocks: () => isDevelopment,
  // CDN 资源基础域名
  assetURL: '',
  // 请求 基础域名
  requsetURL: '',
};
