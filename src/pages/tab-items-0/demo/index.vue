<template>
  <view class="p-3 bg-white">
    <DemoTitle />
    <DemoContent />
  </view>
</template>

<script>
import DemoTitle from './components/DemoTitle';
import DemoContent from './components/DemoContent';

export default {
  components: {
    DemoTitle,
    DemoContent,
  },
};
</script>

<style></style>
