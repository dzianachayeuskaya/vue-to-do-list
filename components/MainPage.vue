<template>
  <div
    class="layout relative flex items-top justify-center px-4 sm:px-10 min-h-screen items-center sm:pt-0"
  >
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <div
      class="content flex flex-col max-h-full justify-between bg-white shadow rounded-3xl w-11/12 xl-w-2/4 my-8 py-8 px-8 sm:px-32 xl:px-40"
    >
      <div class="flex justify-center mb-2 sm:mb-8 xl:mb-12">
        <MainImage />
      </div>
      <h2
        class="flex justify-center text-base md:text-xl xl:text-2xl xl:leading-7 font-bold mb-2 sm:mb-8 xl:mb-12"
      >
        Today I need to
      </h2>
      <div class="mb-2 sm:mb-6 xl:mb-10">
        <TodoForm @changeList="changeList" />
      </div>
      <div class="list-wrapper overflow-y-auto mb-6 xl:mb-8">
        <TodoList :list="determineList" @changeList="changeList" />
      </div>
      <div
        v-if="list.length"
        class="flex justify-between items-stretch gap-x-3 sm:gap-x-7 mb-2 sm:mb-6 xl:mb-8"
      >
        <TaskBlock
          :all-tasks-count="list.length"
          :filtered-tasks-count="returnCompletedTaskCount"
          title="Completed"
        />
        <TaskBlock
          :all-tasks-count="list.length"
          :filtered-tasks-count="returnActiveTaskCount"
          title="To be finished"
        />
      </div>

      <div
        v-if="list.length"
        class="flex flex-wrap items-center sm:flex-nowrap grid sm:grid-cols-9"
      >
        <div
          class="order-1 sm:order-2 sm:col-span-5 flex"
          :class="getAllBtnGroupClass"
        >
          <FooterButton :mode="mode" type="All" @handleClick="setModeAll" />
          <FooterButton
            v-if="returnActiveTaskCount && returnCompletedTaskCount"
            :mode="mode"
            type="Active"
            @handleClick="onActiveClick"
          />
          <FooterButton
            v-if="returnActiveTaskCount && returnCompletedTaskCount"
            :mode="mode"
            type="Completed"
            @handleClick="onCompletedClick"
          />
        </div>
        <div class="order-2 sm:order-1 sm:col-span-2">
          <FooterButton
            v-if="returnActiveTaskCount"
            type="Check all"
            @handleClick="onCheckAll"
          />
        </div>
        <div class="order-3 sm:col-span-2">
          <FooterButton
            v-if="returnCompletedTaskCount"
            type="Clear completed"
            @handleClick="onClear"
          />
        </div>
      </div>

      <div v-if="!list.length" class="flex justify-center items-center">
        <FooterImage />
        <span class="footer-message text-sm leading-4"
          >Congrat, you have no more tasks to do</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import MainImage from '~/components/images/MainImage.vue'
import FooterImage from '~/components/images/FooterImage.vue'
import TodoForm from '~/components/TodoForm.vue'
import TodoList from '~/components/TodoList.vue'
import TaskBlock from '~/components/TaskBlock.vue'
import FooterButton from '~/components/FooterButton.vue'

export default {
  name: 'MainPage',
  components: {
    MainImage,
    FooterImage,
    TodoForm,
    TodoList,
    TaskBlock,
    FooterButton,
  },
  data() {
    return {
      list: JSON.parse(localStorage.getItem('todoList')) || [],
      mode: localStorage.getItem('mode') || 'All',
    }
  },
  computed: {
    determineList() {
      switch (this.mode) {
        case 'Completed':
          return this.list.filter((item) => item.isChecked)
        case 'Active':
          return this.list.filter((item) => !item.isChecked)
        default:
          return this.list
      }
    },
    returnActiveTaskCount() {
      return this.list.filter((item) => !item.isChecked).length
    },
    returnCompletedTaskCount() {
      return this.list.filter((item) => item.isChecked).length
    },
    getAllBtnGroupClass() {
      return !this.returnActiveTaskCount || !this.returnCompletedTaskCount
        ? 'justify-center'
        : 'justify-between'
    },
  },
  methods: {
    changeList() {
      this.list = JSON.parse(localStorage.getItem('todoList')) || []
      if (!this.returnActiveTaskCount || !this.returnCompletedTaskCount) {
        this.setModeAll()
      }
    },
    onCheckAll() {
      this.list.map((item) => {
        item.isChecked = true
        return item
      })
      localStorage.setItem('todoList', JSON.stringify(this.list))
      this.setModeAll()
    },
    setModeAll() {
      this.mode = 'All'
      localStorage.setItem('mode', this.mode)
    },
    onActiveClick() {
      this.list.filter((item) => !item.isChecked)
      this.mode = 'Active'
      localStorage.setItem('mode', this.mode)
    },
    onCompletedClick() {
      this.list.filter((item) => item.isChecked)
      this.mode = 'Completed'
      localStorage.setItem('mode', this.mode)
    },
    onClear() {
      this.list = this.list.filter((item) => !item.isChecked)
      localStorage.setItem('todoList', JSON.stringify(this.list))
      this.setModeAll()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/main.scss';

.layout {
  background: linear-gradient(
    to bottom right,
    $light-blue-color,
    $light-iris-color
  );
}

.content {
  height: 720px;
  max-width: 730px;
}

.list-wrapper {
  margin-left: -20px;
  width: calc(100% + 40px);

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba($primary-dark-color, 0.1);
  }
}

.footer-message {
  color: $secondary-dark-color;
}
</style>
