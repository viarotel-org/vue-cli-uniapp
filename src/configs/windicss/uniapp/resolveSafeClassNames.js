const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';
/**
 * 默认替换规则
 */
const defaultRules = [
  // w-1/2
  {
    pattern: /\//g,
    replacement: '_',
  },
  // w-0.5
  {
    pattern: /\./g,
    replacement: '-',
  },
];

/**
 * 转义工作
 */
const escape = (str, rules = defaultRules) => rules.reduce(
  (acc, { pattern, replacement }) => acc.replace(pattern, replacement),
  str,
);

/**
 * 遍历并转义配置
 */
const resolve = (data, rules) => {
  if (!isObject(data)) {
    return data;
  }

  return Object.entries(data).reduce((obj, [key, value]) => {
    obj[escape(key, rules)] = resolve(value, rules);
    return obj;
  }, {});
};

module.exports = {
  defaultRules,
  escape,
  resolve,
};
