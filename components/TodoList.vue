<template>
  <draggable v-model="draggableList" handle=".handle" @end="onDragEnd">
    <div v-for="item in draggableList" :key="item.id" class="todo-item-wrapper">
      <div class="todo-item relative">
        <button class="handle">
          <HandleButton />
        </button>
        <TodoItem
          :item="item"
          @deleteItem="onDelete"
          @handleInput="onEdit"
          @handleCheckboxChange="onCheck"
        />
      </div>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import TodoItem from '~/components/TodoItem.vue'
import HandleButton from '~/components/images/HandleButton.vue'

export default {
  name: 'TodoList',
  components: {
    draggable,
    TodoItem,
    HandleButton,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      draggableList: this.list,
    }
  },
  watch: {
    list: {
      handler(newList) {
        this.draggableList = newList
      },
      deep: true,
    },
  },
  methods: {
    localChangeList(newList) {
      localStorage.setItem('todoList', JSON.stringify(newList))
      this.$emit('changeList')
    },
    onDragEnd() {
      this.localChangeList(this.draggableList)
    },
    onCheck(targetItem) {
      const currentList = JSON.parse(localStorage.getItem('todoList'))
      currentList.map((item) => {
        if (item.id === targetItem.id) item.isChecked = targetItem.isChecked
        return item
      })
      this.localChangeList(currentList)
    },
    onEdit(targetItem) {
      const currentList = JSON.parse(localStorage.getItem('todoList'))
      currentList.map((item) => {
        if (item.id === targetItem.id) item.value = targetItem.newValue
        return item
      })
      this.localChangeList(currentList)
    },
    onDelete(itemId) {
      const currentList = JSON.parse(localStorage.getItem('todoList'))
      this.localChangeList(currentList.filter((item) => item.id !== itemId))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/main.scss';

.todo-item-wrapper:not(:last-child) {
  margin-bottom: 8px;
}

.handle {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: block;

  &:focus {
    outline: unset;
  }
}

@media (min-width: 640px) {
  .todo-item-wrapper:not(:last-child) {
    margin-bottom: 16px;
  }
}

@media (min-width: 768px) {
  .handle {
    display: none;
  }

  .todo-item:hover {
    .handle {
      display: block;
    }
  }
}
</style>
