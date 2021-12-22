const isDevelopment = process.env.NODE_ENV === 'development';
const { requsetURL, proxyPath, useProxy } = require('./index');

let baseURL = '';
if (process.env.UNI_PLATFORM === 'h5' && useProxy) {
  baseURL = isDevelopment ? proxyPath : '';
} else {
  baseURL = requsetURL;
}

module.exports = {
  // 请求域名
  baseURL,
  // 响应成功code值
  responseSuccessCode: '0000',
  // 超时时间
  timeout: 20000,
  // 是否加密
  isEncrypt: false,
  // token名称
  tokenName: 'token',
  // token 前缀
  tokenPrefix: '',
};
