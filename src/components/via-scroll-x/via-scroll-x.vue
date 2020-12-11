<template>
  <view class="overflow-x-scroll-smooth flex items-center">
    <view
      @click="$emit('click-item', i)"
      v-for="(i, iIndex) in list"
      :key="iIndex"
      class="flex-shrink-0 py-3"
      :style="[iIndex === list.length - 1 ? {} : { paddingRight: _gap }]"
    >
      <slot :item="i"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "via-scroll-x",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    gap: String,
  },
  computed: {
    _gap() {
      return this.gap || "14px";
    },
  },
};
</script>

<style></style>
