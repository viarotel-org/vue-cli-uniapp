//请求配置
export const requestConfig = {
  //加密
  encrypt: {
    on: false,
    publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEOeG53JMdg9f5U4VZvxt0WACJjT+RGO0SF00l8BrlyCt0U6XEDLUI/aW1Ba2mXwYO7MJYgxhecQQTBrI5YYPFhuj0D7Pr5ztMytThdcWPpLP3E3TgvBmDb5Ef6r2/jGEeaMnmAGugNjaDdTlmGQsaYapfyhjFBZXOGjvWq0viHwIDAQAB',
    iv: '09538abe79a497cf',
    toBase64: false
  },
  //请求域名
  baseUrl: 'https://api.ipify.org/',
  // baseUrl: process.env.BASE_URL + 'api/',
  authorization: {
    // key: 'key',
    // prefix: '',
    key: 'Authorization',
    prefix: 'Bearer ',
  },
  //响应成功code值
  responseSuccessCode: 10000,
  //超时时间
  timeout: 20000
}

//导航栏配置
export const tabberConfig = {
  mode: 'custom', //native custom
  customHomePageName: 'home'
}

//数据字典配置
export const dictConfig = {
  //底部导航栏
  tabberArr: [
    { dictLabel: 'tab-0', dictValue: 'home' },
    { dictLabel: 'tab-1', dictValue: 'store' },
    { dictLabel: 'tab-2', dictValue: 'cart' },
    { dictLabel: 'tab-3', dictValue: 'user' },
  ],
}