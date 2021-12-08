<template>
  <view class="">
    <view
      class="flex flex-row items-center px-4 py-6 bg-theme-primary text-white"
    >
      <view class="flex flex-row items-center flex-1">
        <view
          class="w-16 h-16 overflow-hidden border-2 border-gray-200 rounded-full"
        >
          <image
            :src="avatar"
            class="w-full h-full"
          />
        </view>
        <view class="ml-3">
          <view class="w-64 text-base truncate">
            你好, {{ userData.userName
            }}{{ userData.sex === "1" ? "先生" : "女士" }}
          </view>
        </view>
      </view>
      <view class="flex-none hidden">
        <via-icon name="icon-arrow-backimg"></via-icon>
      </view>
    </view>
    <view class="mx-3 mt-8">
      <u-button
        type="error"
        ripple
        @click="handleLogout"
      >
        退出登录
      </u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatar: '',
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
  created() {
    this.avatar = this.$tempImage();
  },
  methods: {
    async handleLogout() {
      const result = await this.$dialog('确定要退出登录吗?', {
        isCancel: true,
      });
      if (result) {
        await this.$store.dispatch('user/logout');
        await this.$toast('退出成功', { icon: 'success' });
        this.$Router.replaceAll({
          path: '/pages/account/login/index',
          query: {
            redirect: this.$Route,
          },
        });
      }
    },
  },
};
</script>

<style></style>
