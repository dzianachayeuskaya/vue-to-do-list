<template>
  <div class="task-block flex flex-col flex-1 justify-between rounded-lg p-4">
    <div class="flex flex-col">
      <span class="counter mb-1 font-semibold sm:text-xs">
        {{ counter }}
      </span>
      <span class="mb-3 font-bold text-xs sm:text-sm leading-4">
        {{ title }}
      </span>
    </div>
    <div class="range">
      <div
        class="range-active"
        :class="getRangeColorClass"
        :style="{ width: tasksProportion }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskBlock',
  props: {
    title: {
      type: String,
      required: true,
    },
    allTasksCount: {
      type: Number,
      required: true,
    },
    filteredTasksCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    tasksProportion() {
      return (this.filteredTasksCount / this.allTasksCount) * 100 + '%'
    },
    counter() {
      return `${this.filteredTasksCount} ${
        this.filteredTasksCount === 1 ? 'task' : 'tasks'
      }`
    },
    getRangeColorClass() {
      return this.title === 'Completed' ? 'iris' : 'fuchsia'
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/main.scss';

.task-block {
  background-color: rgba($primary-dark-color, 0.05);
}

.counter {
  font-size: 10px;
  color: $secondary-dark-color;
}

.range {
  width: 100%;
  height: 4px;
  border-radius: 8px;
  background-color: rgba($primary-dark-color, 0.1);
}

.range-active {
  height: 100%;
  border-radius: 8px;
  transition: width 0.1s linear;
}

.iris {
  background-color: $active-iris-color;
}

.fuchsia {
  background-color: $active-fuchsia-color;
}
</style>
