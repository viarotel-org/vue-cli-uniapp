<template>
  <scroll-view
    @scrolltolower="
      !isFinished && ($emit('update:is-load', true), $emit('load', $event))
    "
    @refresherrefresh="
      $emit('update:is-refresh', true);
      $emit('refresh', $event);
    "
    :refresher-triggered="isRefresh"
    :style="[customStyle]"
    :refresher-enabled="refresherEnabled"
    scroll-y
    scroll-anchoring
    class="absolute inset-0"
  >
    <slot v-if="$slots.default"></slot>

    <template v-if="$slots.item">
      <slot
        name="item"
        v-for="(item, index) in value"
        :item="item"
        :index="index"
      ></slot>
    </template>

    <template v-if="_openEmpty">
      <slot name="empty">
        <view class="flex flex-col items-center justify-center h-full">
          <u-empty :text="emptyText" :mode="emptyType">
            <template #bottom>
              <view v-if="!!emptyButtonText" class="mt-4">
                <u-button
                  @click="$emit('empty-button', $event)"
                  size="medium"
                  :custom-style="{
                    backgroundColor: siteInfo.themeColor,
                    color: siteInfo.isDark ? '#000000' : '#ffffff',
                  }"
                  shape="circle"
                  type="success"
                  >{{ emptyButtonText }}</u-button
                >
              </view>
            </template>
          </u-empty>
        </view>
      </slot>
    </template>

    <view v-if="isData && !closeLoadmore" class="trigger py-4">
      <u-loadmore
        @click="
          !isFinished &&
            ($emit('update:is-load', true), this.$emit('load-more', $event))
        "
        :status="loadmoreType"
      />
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: "via-list",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    customStyle: {
      type: Object,
      default: () => {},
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
    isLoad: {
      type: Boolean,
      default: false,
    },
    isRefresh: {
      type: Boolean,
      default: false,
    },
    customStyle: {
      type: Object,
      default: () => {},
    },
    //开启空状态功能
    openEmpty: {
      type: Boolean,
      default: false,
    },
    emptyType: {
      type: String,
      default: "data",
    },
    emptyText: {
      type: String,
      default: "列表数据为空",
    },
    emptyButtonText: {
      type: String,
      default: "点击刷新",
    },
    //关闭下拉刷新
    closeRefresh: {
      type: Boolean,
      default: false,
    },
    //关闭下拉加载
    closeLoadmore: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    refresherEnabled() {
      return !this.closeRefresh && !this._openEmpty;
    },
    isData() {
      return !!this.value.length;
    },
    _openEmpty() {
      return !this.isData && this.openEmpty && this.emptyType;
    },
    siteInfo() {
      return this.$store.getters.siteInfo;
    },
    loadmoreType() {
      let tempStr = "";
      if (this.isFinished) {
        tempStr = "nomore";
      } else if (this.isLoad) {
        tempStr = "loading";
      } else {
        tempStr = "loadmore";
      }
      return tempStr;
    },
  },
  created() {
    // console.log("via-list", this);
  },
  methods: {
    /**
     * @desc 下拉刷新 上拉加载 数据封装
     * @param {Array} data 数组
     * @param {string} list 列表名称
     * @param {function} length 每次返回的数组长度
     */
    $loadUtils(data, { length = 10 } = {}) {
      if (this.isLoad) {
        this.$emit("input", [...this.value, ...data]);
        this.$emit("update:is-load", false);
      } else {
        this.$emit("input", [...data]);
        this.$emit("update:is-refresh", false);
      }
      if (data.length < length) {
        this.$emit("update:is-finished", true);
      } else {
        this.$emit("update:is-finished", false);
      }
    },
  },
};
</script>
<style></style>
