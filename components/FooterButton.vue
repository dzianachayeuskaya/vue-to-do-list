<template>
  <button
    class="primary-button py-2 px-3 rounded-lg text-xs font-semibold"
    :class="{ active: mode === type }"
    @click="handleClick"
  >
    {{ type }}
  </button>
</template>

<script>
export default {
  name: 'FooterButton',
  props: {
    type: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    handleClick() {
      this.$emit('handleClick')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/main.scss';
.primary-button {
  &:hover {
    color: $primary-light-color;
    background-color: $active-blue-color;
    outline: unset;
  }

  &:active {
    opacity: 0.8;
  }

  &.active {
    color: $primary-light-color;
    background-color: $active-blue-color;

    &:focus-visible {
      outline: unset;
    }

    &:hover {
      outline: unset;
      opacity: 0.8;
    }

    &:active {
      opacity: 1;
    }
  }
}
</style>
