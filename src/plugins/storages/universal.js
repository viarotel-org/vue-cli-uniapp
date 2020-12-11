import store from 'store';

export const storages = store;

export function setStorages(key, value) {
  return storages.set(key, value);
}

export function getStorages(key) {
  return storages.get(key);
}

export function removeStorages(key) {
  if (key) {
    storages.remove(key);
  } else {
    storages.clearAll();
  }
  return storages;
}