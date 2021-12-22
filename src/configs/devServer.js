const {
  requsetURL, useProxy, proxyPort, proxyPath,
} = require('./index');

module.exports = {
  // 端口号
  proxyPort,
  // 是否使用代理
  useProxy,
  // 代理路径
  proxyPath,
  // 代理地址
  proxyURL: requsetURL,
};
