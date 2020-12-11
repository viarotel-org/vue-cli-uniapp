<template>
  <view class="border-t-bar">
    <view class="">{{ demoData }}</view>
    <u-button @click="getDemoData" class="">点击测试请求</u-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      demoData: "",
    };
  },
  onLoad() {},
  methods: {
    async getDemoData() {
      this.demoData = await this.$req.getDemoData();
    },
  },
};
</script>

<style></style>
