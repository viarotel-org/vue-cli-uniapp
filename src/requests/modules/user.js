// import request from '@/utils/request';
import { mockRequest } from './base';
/**
 * @description 用户登录
 */

export const userLogin = () => mockRequest({
  mockData: {
    token: 'mock-token',
  },
});

/**
 * @description 获取用户数据
 */

export const getUserData = () => mockRequest({
  mockData: {
    id: '1',
    userName: 'viarotel',
    sex: '1',
  },
});
