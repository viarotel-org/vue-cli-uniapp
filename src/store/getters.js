export default {
  token: (state) => state.user.token,
  siteData: (state) => state.site.siteData,
  userData: (state) => state.user.userData,
  userId: (state) => state.user.userData.id,
};
