<template>
  <div
    v-if="isExternalExe"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="deepClass"
    @click="$emit('click')"
  />
  <svg
    v-else
    class="svg-icon"
    aria-hidden="true"
    :class="deepClass"
    @click="$emit('click')"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'ViaSvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    deepClass: {
      type: [String, Object, Array],
      default: '',
    },
  },
  computed: {
    isExternalExe() {
      return this.isExternal(this.iconClass);
    },
    iconClass() {
      return this.name;
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
      };
    },
  },
  methods: {
    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    },
  },
};
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.25em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
