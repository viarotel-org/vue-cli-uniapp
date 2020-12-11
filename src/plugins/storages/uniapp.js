export function setStorages(key, value) {
  uni.setStorageSync(key, value);
  return uni;
}

export function getStorages(key) {
  return uni.getStorageSync(key);
}

export function removeStorages(key) {
  if (key) {
    uni.removeStorageSync(key);
  } else {
    uni.clearStorageSync();
  }
  return uni;
}