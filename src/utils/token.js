import storage from '@/utils/storages';

export const setToken = (data) => {
  storage.set('token', data);
};

export const getToken = () => storage.get('token');

export const removeToken = () => {
  storage.remove('token');
};
