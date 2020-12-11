// import jsencrypt from 'jsencrypt';
import jsencrypt from 'uni-jsencrypt';
import CryptoJS from 'crypto-js';
import { requestConfig } from '@/config';


const publicKey = requestConfig.encrypt.publicKey;
const iv = CryptoJS.enc.Utf8.parse(requestConfig.encrypt.iv);
const mode = CryptoJS.mode.CBC;
const padding = CryptoJS.pad.Pkcs7;

const isBase64 = requestConfig.encrypt.toBase64; //是否使用base64进行处理

const JSEncrypt = new jsencrypt();
JSEncrypt.setPublicKey(publicKey);
export const rsa = {
  encrypt(content) {
    return JSEncrypt.encrypt(content);
  }
};

export const aes = {
  encrypt(key, content) {

    content = JSON.stringify(content);
    content = CryptoJS.enc.Utf8.parse(content);
    key = CryptoJS.enc.Utf8.parse(key);
    content = CryptoJS.AES.encrypt(content, key, { iv, mode, padding }).toString();

    isBase64 && (content = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(content)));

    return content;
  },
  decrypt(key, content) {

    isBase64 && (content = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(content)));

    key = CryptoJS.enc.Utf8.parse(key);
    content = CryptoJS.AES.decrypt(content, key, { iv, mode, padding });
    content = CryptoJS.enc.Utf8.stringify(content);
    content = JSON.parse(content);

    return content;
  },
}

export function getKey(len = 16, radix = 16) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
};

export default {
  rsa,
  aes,
  getKey
}