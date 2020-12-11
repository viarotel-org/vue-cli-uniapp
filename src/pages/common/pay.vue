<template>
  <view class="absolute inset-0 flex flex-col items-stretch">
    <view class="overflow-y-scroll-smooth h-full flex-grow">
      <view class="rounded-xl m-4 p-4 shadow bg-white">
        <view class="flex flex-col items-center mt-4">
          <u-image
            width="100"
            height="100"
            :src="$getFileUrl('icon-pay.png')"
          ></u-image>
          <text class="mt-4">订单已生成,待支付</text>
          <view class="mt-4" :style="themeTextColorStyle"
            >￥
            <text class="text-2xl font-bold">{{ typeMap.price }}</text>
          </view>
        </view>
      </view>
      <view class="rounded-xl m-4 p-4 shadow bg-white">
        <view
          @click="payWayActive = iIndex"
          v-for="(i, iIndex) in typeMap.payWayArr"
          :key="iIndex"
          class="flex items-center justify-between"
        >
          <view class="flex items-center">
            <u-image width="80" height="80" :src="i.icon"></u-image>
            <text class="ml-2">{{ i.text }}</text>
          </view>
          <view v-if="i.showCheckbox" class="">
            <u-checkbox
              :value="payWayActive === iIndex"
              shape="circle"
              :active-color="siteInfo.themeColor"
              >{{ selectAllText }}</u-checkbox
            >
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 py-2 flex-shrink-0">
      <u-button
        @click="submit"
        :custom-style="{
          backgroundColor: siteInfo.themeColor,
          color: siteInfo.isDark ? '#000000' : '#ffffff',
        }"
        type="success"
        shape="circle"
        ripple
        >立即支付</u-button
      >
    </view>
  </view>
</template>

<script>
import { uuid, wait, tempImage, mixinUni } from "@/utils";
export default {
  mixins: [mixinUni],
  data() {
    return {
      isSetNavavigationBar: true,
      query: {},
      payWayActive: 0,
    };
  },
  computed: {
    payWayActiveObj() {
      return this.typeMap.payWayArr[this.payWayActive];
    },
    typeMap() {
      let tempObj = {
        price: this.query.price,
        payWayArr: [],
      };
      switch (this.query.type) {
        case "weapp":
          const payInfo = this.query.payInfo;
          tempObj = {
            ...tempObj,
            payWayArr: [
              {
                icon: this.$getFileUrl("icon-wx-round.png"),
                text: "微信支付",
                showCheckbox: true,
                payMixinParams: {
                  provider: "wxpay",
                  timeStamp: payInfo.timeStamp,
                  nonceStr: payInfo.nonceStr,
                  package: payInfo.package,
                  signType: payInfo.signType,
                  paySign: payInfo.paySign,
                },
              },
            ],
          };
          break;
      }
      return tempObj;
    },
    themeTextColorStyle() {
      return this.$store.getters["site/themeTextColorStyle"];
    },
  },
  onLoad() {
    // this.query = { type: "weapp", price: "28.88", payInfo: "" };
    this.query = this.$Route.query;
    console.log("this.query", this.query);
  },
  onReady() {},
  methods: {
    submit() {
      uni.requestPayment({
        ...this.payWayActiveObj.payMixinParams,
        success: (res) => {
          console.log("success:" + JSON.stringify(res));
          this.$Router.push({
            name: "pay-status",
            params: { type: "success" },
          });
        },
        fail: (err) => {
          console.log("fail:" + JSON.stringify(err));
          this.$Router.push({ name: "pay-status", params: { type: "fail" } });
        },
      });
    },
  },
};
</script>

<style></style>
