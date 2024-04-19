<template>
  <div class="success">
    <div class="success__wrapper">
      <p class="success__text" v-html="text">
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
    text: {
      type: String,
      default: "",
    },
  },
  methods: {
    setDetailWindowHandler() {
      this.$emit("setDetailWindowHandler");
    },
  },
};
</script>
