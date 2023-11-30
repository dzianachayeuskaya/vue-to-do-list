<template>
  <div class="flex items-center justify-between py-0.5 px-5">
    <div class="todo-item flex flex-1 items-center">
      <input
        v-model="isChecked"
        class="mr-2"
        type="checkbox"
        name="isTodoItemDone"
        :checked="isChecked"
        @change="handleCheckboxChange"
      />
      <input
        ref="input"
        v-model="inputValue"
        class="todo-item-input w-full text-sm leading-4"
        :disabled="isChecked"
        type="text"
        :readonly="!isEditing"
        @input="handleInput"
        @blur="disableInput"
        @keyup.enter="disableInput"
      />
    </div>
    <div class="flex">
      <button class="edit-btn mr-4" :disabled="isChecked" @click="editItem">
        <EditButton />
      </button>
      <button @click="deleteItem">
        <BinButton />
      </button>
    </div>
  </div>
</template>

<script>
import EditButton from '~/components/images/EditButton.vue'
import BinButton from '~/components/images/BinButton.vue'

export default {
  name: 'TodoItem',
  components: {
    EditButton,
    BinButton,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id,
      isChecked: this.item.isChecked,
      inputValue: this.item.value,
      isEditing: false,
    }
  },
  watch: {
    item: {
      handler(newItem) {
        this.isChecked = newItem.isChecked
        this.value = newItem.inputValue
      },
      deep: true,
    },
  },
  methods: {
    handleCheckboxChange(event) {
      this.isChecked = event.target.checked
      this.$emit('handleCheckboxChange', {
        id: this.id,
        isChecked: this.isChecked,
      })
    },
    handleInput(event) {
      this.inputValue = event.target.value
      this.$emit('handleInput', { id: this.id, newValue: this.inputValue })
    },
    disableInput() {
      this.isEditing = false
    },
    editItem() {
      this.isEditing = true
      this.$refs.input.focus()
    },
    deleteItem() {
      this.$emit('deleteItem', this.id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/main.scss';

.todo-item-input {
  cursor: default;

  &:disabled {
    background-color: transparent;
    color: $secondary-dark-color;
  }
}

.edit-btn {
  &:disabled {
    cursor: not-allowed;
  }
}
</style>
