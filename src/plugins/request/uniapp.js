import qs from "qs";
import { requestConfig } from "@/config";
import {
  isArray,
  isObject,
  debounce,
  parseParamUrl,
  isAttrs,
  isNullObject,
  uniDialog,
  uniGetAppId,
} from "@/utils";
import { loading, toast } from "@/plugins/modal/index.js";
import { getStorages, removeStorages } from "@/plugins/storages";
import uniRouter from "@/plugins/uniRouter";
import { mapRequest as MapRequest } from "./utils";

const baseUrl = requestConfig.baseUrl;
const timeout = requestConfig.timeout;

const headers = {
  "Content-Type": "application/json;charset=utf-8",
  appId: uniGetAppId(),
};
const statusCode = {
  "200": "服务器成功返回请求的数据。",
  "201": "新建或修改数据成功。",
  "202": "一个请求已经进入后台排队（异步任务）。",
  "204": "删除数据成功。",
  "400": "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  "401": "认证失败，无法访问系统资源",
  "403": "请重新登录",
  "404": "访问资源不存在",
  "406": "请求的格式不可得。",
  "410": "请求的资源被永久删除，且不会再得到的。",
  "422": "当创建一个对象时，发生一个验证错误。",
  "500": "服务器发生错误，请检查服务器。",
  "502": "网关错误。",
  "503": "服务不可用，服务器暂时过载或维护。",
  "504": "网关超时。",
  default: "系统未知错误，请反馈给管理员",
};

//请求拦截
const requestInterceptors = (
  params,
  { isToken, isUpload, isLoading, url = "" } = {}
) => {
  console.log(`请求拦截: url: ${url} params: ${JSON.stringify(params)}`);
  if (isLoading) {
    loading("请稍后...");
  }

  if (isToken) {
    headers[requestConfig.authorization.key] =
      requestConfig.authorization.prefix + getStorages("token");
  }

  if (isUpload) {
    headers["Content-Type"] = "multipart/form-data;";
    params = fileToFormData(params);

    function fileToFormData(fileObj) {
      if (!isObject(fileObj)) {
        return new Error("传入的文件不是对象格式");
      }
      const key = Object.keys(fileObj)[0];
      const value = fileObj[key];
      if (!value) {
        return new Error("传入的文件对象值键名所对应的值不能为空");
      }
      const formData = new FormData();
      if (isArray(value)) {
        value.forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value);
      }
      return formData;
    }
  }

  return params;
};

const clearLoading = debounce(loading); //清除定时器
const goLogin = debounce(async () => {
  const result = await uniDialog("该服务需要进行登录后才能正常使用,是否登录?", {
    isCancel: true,
  });
  result && uniRouter.push({ name: "account" });
});
//响应拦截
const responseInterceptors = async (
  data,
  { isLoading, isIntercept, url = "" } = {}
) => {
  console.log(`响应拦截: url: ${url} data: ${JSON.stringify(data)}`);
  // const { code,  msg } = data;
  const { code, message: msg } = data;

  if (isLoading) {
    clearLoading();
  }

  if (!isIntercept) {
    return data;
  }

  const message = statusCode[code] || msg || statusCode["default"];

  switch (code) {
    case 401:
      removeStorages("token");
      await toast(message);
      uniRouter.push({ name: "account" });
      break;
    case 403:
      removeStorages("token");
      goLogin();
      break;
    case 11001: //请求失败
      toast(message);
      break;
    case 500:
      toast(message);
      break;
    default:
      if (code === requestConfig.responseSuccessCode || code === 200) {
        return data;
      }
      break;
  }
};

//发起请求
export function request(
  url = "",
  params = {},
  {
    method = "post",
    isBody = true,
    isToken = true,
    isLoading = true,
    isIntercept = true,
    isUpload = false,
    ...moreOptions
  } = {}
) {
  url = baseUrl + url;

  if (!isBody) {
    let queryParams = null;
    if (params.query) {
      queryParams = params.query;
    } else if (
      params &&
      !isNullObject(params) &&
      !isAttrs(params, "body") &&
      !isAttrs(params, "query")
    ) {
      queryParams = params;
    }
    if (queryParams)
      url += "?" + qs.stringify(queryParams, { arrayFormat: "repeat" });

    params = params.body || {};
  }
  params = requestInterceptors(params, {
    url,
    method,
    isBody,
    isToken,
    isLoading,
    isIntercept,
    isUpload,
    ...moreOptions,
  });

  if (!params) {
    return Promise.reject("error");
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data: params,
      header: headers,
      method,
      timeout,
      success: ({ data }) => {
        data = responseInterceptors(data, {
          url,
          method,
          isBody,
          isToken,
          isLoading,
          isIntercept,
          isUpload,
          ...moreOptions,
        });
        if (!data) {
          reject("error");
        }
        resolve(data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

//请求辅助函数
export function mapRequest(arr, { ...moreOptions } = {}) {
  return MapRequest(arr, { ...moreOptions, request });
}

export default {
  install(Vue) {
    Vue.prototype.$req = request;
  },
  request,
};