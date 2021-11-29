const { requsetURL } = require('./index');

module.exports = {
  // 端口号
  port: 7777,
  // 是否使用代理
  useProxy: true,
  // 代理路径
  proxyPath: '/api',
  // 代理地址
  proxyURL: requsetURL,
};
