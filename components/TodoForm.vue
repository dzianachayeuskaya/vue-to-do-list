<template>
  <div>
    <form class="flex justify-center" @submit.prevent="submitForm">
      <input
        id="todo"
        v-model="inputValue"
        type="text"
        name="todo"
        class="todo-input flex-1 xl:flex-initial rounded-lg border-0 bg-transparent w-80 sm:max-w-md p-3 text-sm leading-4"
        placeholder="Add new todo..."
        @input="determineIsButtonActive"
      />
      <button
        v-if="isButtonActive"
        type="submit"
        class="submit-button rounded-lg ml-2 sm:ml-4 px-2 sm:px-4 py-3 text-sm leading-4 font-semibold text-white shadow-sm"
      >
        Submit
      </button>
    </form>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'TodoForm',
  data() {
    return {
      isButtonActive: false,
      inputValue: '',
      errorMessage: '',
    }
  },
  methods: {
    determineIsButtonActive() {
      if (this.inputValue) this.isButtonActive = true
      else this.isButtonActive = false
    },
    submitForm(event) {
      if (event.srcElement[0].value.trim().length < 4) {
        this.errorMessage = 'The task name is too short'
        return
      }
      const prevState = JSON.parse(localStorage.getItem('todoList')) || []
      const newState = [
        {
          id: nanoid(),
          value: event.srcElement[0].value,
          isChecked: false,
        },
        ...prevState,
      ]
      localStorage.setItem('todoList', JSON.stringify(newState))
      this.errorMessage = ''
      this.inputValue = ''
      this.isButtonActive = false
      this.$emit('changeList')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/main.scss';

.todo-input {
  outline: 1px solid $secondary-light-color;
  &::placeholder {
    color: $secondary-dark-color;
  }
  &:focus-visible {
    outline: 2px solid $active-blue-color;
  }
}

.submit-button {
  background-color: $active-blue-color;
  &:hover,
  &:focus-visible {
    opacity: 0.8;
    outline: unset;
  }
  &:active {
    opacity: 1;
  }
}
.error-message {
  color: $secondary-dark-color;
}
</style>
