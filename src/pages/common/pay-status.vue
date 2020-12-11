<template>
  <view class="">
    <view
      class="rounded-full absolute left-1_2 transform -translate-x-1_2"
      :style="{
        width: '1500rpx',
        height: '1500rpx',
        top: '-1100rpx',
        zIndex: '-1',
        backgroundColor: siteInfo.themeColor,
      }"
    >
    </view>
    <view class="text-white text-2xl font-bold text-center mt-12">
      {{ typeMap.title }}
    </view>
    <view class="flex justify-center mt-18">
      <u-image
        width="280"
        height="280"
        shape="circle"
        :src="typeMap.icon"
        class=""
      ></u-image>
    </view>

    <view class="mt-22">
      <view v-if="type === 'success'" class="flex justify-around mt-22">
        <u-button
          @click="$uniTabberAdapterSkip('tab-0', {}, { isReplaceAll: true })"
          size="medium"
          shape="circle"
          >回到首页</u-button
        >
        <u-button
          @click="
            $Router.replace({
              name: 'goods-order',
              params: { tabsIIActive: 2 },
            })
          "
          size="medium"
          shape="circle"
          :custom-style="{
            backgroundColor: siteInfo.themeColor,
            color: siteInfo.isDark ? '#000000' : '#ffffff',
          }"
          type="success"
          >查看订单</u-button
        >
      </view>
      <view v-if="type === 'fail'" class="px-8">
        <u-button
          @click="$Router.back(1)"
          shape="circle"
          :custom-style="{
            backgroundColor: siteInfo.themeColor,
            color: siteInfo.isDark ? '#000000' : '#ffffff',
          }"
          type="success"
          >返回</u-button
        >
      </view>
    </view>

    <!-- <view v-if="type === 'success'" class="m-4 p-4 bg-white">
      <view class="flex items-center justify-between">
        <text class="">订单号</text>
        <text class="text-gray">111111111111111</text>
      </view>
      <view class="flex items-center justify-between mt-4">
        <text class="">下单时间</text>
        <text class="text-gray">2020/9/11 10:49:51</text>
      </view>
      <view class="flex items-center justify-between mt-4">
        <text class="">支付方式 </text>
        <text class="text-gray">微信支付</text>
      </view>
    </view> -->
  </view>
</template>

<script>
import { uuid, wait, tempImage, mixinUni } from "@/utils";
export default {
  mixins: [mixinUni],
  components: {},
  data() {
    return {
      isSetNavavigationBar: true,
      type: "success", // success error
    };
  },
  computed: {
    themeBgColorStyle() {
      return this.$store.getters["site/themeBgColorStyle"];
    },
    typeMap() {
      let tempObj = {};
      switch (this.type) {
        case "success":
          tempObj = {
            title: "支付成功",
            icon: this.$getFileUrl("pay-success.png"),
          };
          break;
        case "fail":
          tempObj = {
            title: "支付失败",
            icon: this.$getFileUrl("pay-error.png"),
          };
          break;
      }
      return tempObj;
    },
  },
  onReady() {
    this.setNavigationBarTitle(this.typeMap.title);
  },
  onLoad() {
    const { type } = this.$Route.query;
    this.type = type;
  },
  methods: {
    setNavigationBarTitle(title) {
      uni.setNavigationBarTitle({
        title,
      });
    },
  },
};
</script>

<style></style>
