export const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

export const formatTime = (date) => {
  // 年月日时分秒
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${[year, month, day].map(formatNumber).join('/')} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(':')}`;
};

export const formatDate = (date) => {
  // 年月日
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
};
