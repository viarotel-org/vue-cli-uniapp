<template>
  <SvgIcon
    v-if="useSvg"
    :name="name"
    :deep-class="deepClass"
    @click="$emit('click')"
  />
  <FontIcon
    v-else
    :name="name"
    :deep-class="deepClass"
    @click="$emit('click')"
  />
</template>

<script>
import FontIcon from './FontIcon';
import SvgIcon from './SvgIcon';

export default {
  name: 'ViaIcon',
  components: {
    FontIcon,
    SvgIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    // 解决小程序无法穿透class的问题
    deepClass: {
      type: String,
      default: '',
    },
    // svg font
    useSvg: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
