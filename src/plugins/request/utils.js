//请求辅助函数
export function mapRequest(
  arr,
  { keyName = "key", valueName = "value", request } = {}
) {
  return arr.reduce(
    (
      obj,
      { [keyName]: key, [valueName]: value, params: p = {}, options: o = {} }
    ) => {
      obj[key] = (params = {}, options = {}) =>
        request(value, { ...p, ...params }, { ...o, ...options });
      return obj;
    },
    {}
  );
}