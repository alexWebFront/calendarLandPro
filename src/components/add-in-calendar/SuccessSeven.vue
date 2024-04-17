<template>
  <div class="success">
    <div class="success__wrapper">
      <p class="success__text">
        Событие "{{ selectElement.name }}" добавлено в календарь по почте {{ email }}!
      </p>

      <div class="success__buttons success__buttons--center">
        <button class="success__button" @click="setDetailWindowHandler()">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: "",
    },
    selectElement: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    setDetailWindowHandler() {
      this.$emit("setDetailWindowHandler");
    },
  },
};
</script>
