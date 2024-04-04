<template>
  <main-screen v-if="isMainScreen" @openSecondScreenHandler="openSecondScreen" />
  <second-screen
    v-else-if="isSecondScreen"
    :selectElement="selectElement"
    @openMainScreenHandler="openMainScreen"
    @openThirdScreenHandler="openThirdScreen"
  />
  <third-screen v-else-if="isThirdScreen" :selectElement="selectElement" @openSecondScreenHandler="openSecondScreen"/>
</template>

<script>
import MainScreen from "./MainScreen.vue";
import SecondScreen from "./SecondScreen.vue";
import ThirdScreen from "./ThirdScreen.vue";
export default {
  components: { MainScreen, SecondScreen, ThirdScreen },
  data() {
    return {
      selectElement: {},
      isMainScreen: true,
      isSecondScreen: false,
      isThirdScreen: false,
    };
  },
  methods: {
		/**
     * Открываем окно с датами
     *
     * @returns {void}
     */
    openMainScreen() {
      window.scrollTo(0, 0);
      this.isSecondScreen = false;
      this.isThirdScreen = false;
      this.isMainScreen = true;

      this.selectElement = {};
    },

		/**
     * Открываем окно с залами
		 * @param {object} element - данные о выбранном элементе расписания
     *
     * @returns {void}
     */
    openSecondScreen(element = null) {
      window.scrollTo(0, 0);
      this.isMainScreen = false;
      this.isThirdScreen = false;
      this.isSecondScreen = true;

			if (!element) {
				return
			}

      this.selectElement = element;
    },

		/**
     * Открываем окно с детальной информацией о элементе расписания
		 * @param {object} element - данные о выбранном элементе расписания
     *
     * @returns {void}
     */
    openThirdScreen(element) {
      window.scrollTo(0, 0);
      this.isMainScreen = false;
      this.isSecondScreen = false;
      this.isThirdScreen = true;

			this.selectElement = {...this.selectElement, ...element};
    },
  },
};
</script>
