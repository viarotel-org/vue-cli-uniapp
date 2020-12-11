import { getStorages, setStorages, removeStorages } from "@/plugins/storages";
import request from "@/request";
export default {
  namespaced: true,
  state: () => ({
    userInfo: {},
    token: getStorages('token')
  }),
  getters: {},
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = { ...data };
    },
    removeToken(state) {
      state.token = '';
      removeStorages('token');
    },
    setToken(state, token) {
      state.token = token;
      setStorages('token', token);
    },
  },
  actions: {
    //获取用户详情
    getUserInfo({ commit, state }, { params = {}, options = {} } = {}) {
      return new Promise(async resolve => {
        const { result: { member_info: data } } = await request.getUserInfo(params, options);
        const info = {
          ...data,
          id: data.member_id,
          avatar: data.member_avatar,
          nickname: data.member_name,
          isBindPhoneNumber: data.member_mobilebind === 1 ? true : false,
          birthday: data.member_birthday,
          sex: data.member_sex, //0保密1男2女
          areaInfo: data.member_areainfo,
          phoneNumber: data.member_mobile,
          realname: data.member_truename,
          email: data.member_email,
        };
        commit('setUserInfo', info);
        resolve(state.userInfo);
      });
    },
  },
}