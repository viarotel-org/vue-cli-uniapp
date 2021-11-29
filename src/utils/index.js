/**
 * @description 二进制响应解析
 */
export const binaryParser = (response) => new Promise((resolve) => {
  let resData = '';
  let fileName;
  if (response.headers['content-disposition']) {
    fileName = response.headers['content-disposition']
      .split(';')[1]
      .split('=')[1];
  }
  const blob = response.data;
  if (!fileName) {
    const errorData = new FileReader();
    errorData.addEventListener('loadend', (data) => {
      try {
        resData = JSON.parse(data.target.result);
      } catch (e) {
        resData = '';
      }
      resolve(resData);
    });
    errorData.readAsText(blob);
  } else {
    resData = {
      fileName: window.decodeURIComponent(fileName),
      blob: response.data,
    };
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      const aEl = document.createElement('a');
      aEl.download = window.decodeURIComponent(resData.fileName);
      aEl.href = e.target.result;
      document.body.appendChild(aEl);
      aEl.click();
      document.body.removeChild(aEl);
      resData = {
        code: '0000',
        message: '成功',
      };
      resolve(resData);
    };
  }
});

/**
 *
 * @desc 对字典数据进行映射
 * @param {Array} data
 * @param {String} childrenName
 * @param {String} keyName
 * @param {String} valueName
 * @param {String} mapValue //自定义规则
 * @returns {Object}
 * @demo
 * input => [
    {
      id: "1",
      text: "一",
      children: [
        {
          id: "1-1",
          text: "一-一",
        },
      ],
    },
    {
      id: "2",
      text: "二",
      children: [
        {
          id: "2-1",
          text: "二-一",
        },
      ],
    },
  ];
  output => { '1': '一', '2': '二', '1-1': '一-一', '2-1': '二-一' }
 */
export const mapDicts = function (
  data,
  {
    childrenName = 'children',
    keyName = 'value',
    valueName = 'label',
    mapValue,
  } = {},
) {
  return data.reduce((obj, item) => {
    const key = item[keyName];
    const value = mapValue ? mapValue(item) : item[valueName];
    obj[key] = value;
    if (Array.isArray(item[childrenName])) {
      obj = {
        ...obj,
        ...mapDicts(item[childrenName], {
          childrenName,
          keyName,
          valueName,
          mapValue,
        }),
      };
    }
    return obj;
  }, {});
};

/**
 * @desc 使用async await 进项进行延时操作
 * @param {*} time
 */
export const delay = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(true), time));
