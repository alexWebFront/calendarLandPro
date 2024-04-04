<template>
  <div class="control-buttons">
    <div class="control-buttons__container">
      <button
        :disabled="isDisabledPrev"
        :class="[
          'control-buttons__button control-buttons__button--left',
          { disabled: isDisabledPrev },
        ]"
        @click="prevPageHandler()"
      >
        <img src="../assets/images/left-arrow.svg" alt="left-arrow" />
      </button>
      <button
        :disabled="isDisabledNext"
        :class="[
          'control-buttons__button control-buttons__button--right',
          { disabled: isDisabledNext },
        ]"
        @click="nextPageHandler()"
      >
        <img src="../assets/images/right-arrow.svg" alt="right-arrow" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activePage: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: [],
    },
  },
  computed: {
    /**
     * Отключаем/включаем кнопку переключения на предыдущий список
     *
     * @returns {boolean} - Отключаем/включаем кнопку
     */
    isDisabledPrev() {
      if (!this.list[this.activePage - 1]) {
        return true;
      }

      return !this.list[this.activePage - 1].length;
    },

    /**
     * Отключаем/включаем кнопку переключения на следующий список
     *
     * @returns {boolean} - Отключаем/включаем кнопку
     */
    isDisabledNext() {
      if (!this.list[this.activePage + 1]) {
        return true;
      }

      return !this.list[this.activePage + 1].length;
    },
  },
  methods: {
    /**
     * Переключаем на предыдущий список
     *
     * @returns {void}
     */
    prevPageHandler() {
      if (this.isDisabledPrev) {
        return;
      }

      this.$emit("prevPageHandler");
    },

    /**
     * Переключаем на следующий список
     *
     * @returns {void}
     */
    nextPageHandler() {
      if (this.isDisabledNext) {
        return;
      }

      this.$emit("nextPageHandler");
    },
  },
};
</script>
