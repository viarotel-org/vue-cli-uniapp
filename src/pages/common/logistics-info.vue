<template>
  <view class="absolute inset-0 flex flex-col items-stretch">
    <view class="flex-shrink-0 border-b-px-10 border-gray-100">
      <view class="p-4 flex justify-between">
        <text class="">快递公司:</text>
        <text class="">{{ logisticsInfo.name }}</text>
      </view>
      <view class="p-4 flex justify-between border-t border-gray-100">
        <text class="">单号:</text>
        <view class="flex items-center">
          <text class="flex items-center text-gray"
            >{{ logisticsInfo.orderNumber }}
          </text>
          <text
            @click="uniClipboardData(logisticsInfo.orderNumber)"
            class="ml-4"
            :style="themeTextColorStyle"
            >复制</text
          >
        </view>
      </view>
    </view>
    <view class="overflow-y-scroll-smooth flex-grow h-full">
      <view class="p-8">
        <u-time-line>
          <u-time-line-item
            v-for="(i, iIndex) in logisticsInfo.statusArr"
            :key="iIndex"
          >
            <!-- <template v-slot:node>
              <view class="u-node" style="background: #19be6b;">
                <u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
              </view>
            </template> -->

            <!-- 此处没有自定义左边的内容，会默认显示一个点 -->
            <template v-slot:content>
              <view class="">
                <!-- <view class="u-order-title">{{ i.title }}</view> -->
                <view class="">{{ i.content }}</view>
                <view class="">{{ i.time }}</view>
              </view>
            </template>
          </u-time-line-item>
        </u-time-line>
      </view>
    </view>
    <view class="px-8 py-2 flex-shrink-0">
      <u-button
        @click="getLogisticsInfo"
        :custom-style="{
          backgroundColor: siteInfo.themeColor,
          color: siteInfo.isDark ? '#000000' : '#ffffff',
        }"
        type="success"
        shape="circle"
        ripple
        >刷新物流状态</u-button
      >
    </view>
  </view>
</template>

<script>
import { mixinUni, uniClipboardData } from "@/utils";
export default {
  mixins: [mixinUni],
  data() {
    return {
      isSetNavavigationBar: true,
      orderId: "",
      logisticsInfo: {
        name: "",
        orderNumber: "",
        statusArr: [],
      },
    };
  },
  computed: {
    themeTextColorStyle() {
      return this.$store.getters["site/themeTextColorStyle"];
    },
  },
  onLoad() {
    const { orderId } = this.$Route.query;
    this.orderId = orderId;
    this.getLogisticsInfo();
  },
  methods: {
    uniClipboardData,
    async getLogisticsInfo() {
      const { result: data } = await this.$req.goodsOrderLogisticsInfo({
        order_id: this.orderId,
      });

      this.logisticsInfo = {
        name: data.express_name,
        orderNumber: data.shipping_code,
        statusArr: data.deliver_info.map((i) => ({
          // title: "",
          content: i.AcceptStation,
          time: i.AcceptTime,
        })),
      };
    },
  },
};
</script>

<style>
.u-node {
  width: 44rpx;
  height: 44rpx;
  border-radius: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d0d0d0;
}

.u-order-title {
  color: #333333;
  font-weight: bold;
  font-size: 32rpx;
}

.u-order-desc {
  color: rgb(150, 150, 150);
  font-size: 28rpx;
  margin-bottom: 6rpx;
}

.u-order-time {
  color: rgb(200, 200, 200);
  font-size: 26rpx;
}
</style>
