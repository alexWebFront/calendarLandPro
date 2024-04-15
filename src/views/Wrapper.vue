<template>
  <dates
    v-if="isDates"
    @openSecondScreenHandler="openHalls"
    @openErrorSchedulesHandler="openErrorSchedules"
  />
  <halls
    v-else-if="isHalls"
    :selectElement="selectElement"
    :countHours="countHours"
    @openMainScreenHandler="openDates"
    @openThirdScreenHandler="openDetailsInfo"
  />
  <details-info
    v-else-if="isDetailsInfo"
    :selectElement="selectElement"
    @openSecondScreenHandler="openHalls"
  />
  <add-in-calendar v-else-if="isAddInCalendar" />
  <error v-else-if="isError" :errorText="errorText" />
</template>

<script>
import Dates from "./Dates.vue";
import Halls from "./Halls.vue";
import DetailsInfo from "./DetailsInfo.vue";
import AddInCalendar from "./AddInCalendar.vue";
import Error from "./Error.vue";
export default {
  components: { Dates, Halls, DetailsInfo, AddInCalendar, Error },
  data() {
    return {
      selectElement: {},
      isDates: true,
      isHalls: false,
      isDetailsInfo: false,
      isAddInCalendar: false,
      isError: false,
      errorText: "Текущее расписание еще не объявлено",
    };
  },
  methods: {
    /**
     * Открываем окно с датами
     *
     * @returns {void}
     */
    openDates() {
      window.scrollTo(0, 0);
      this.isHalls = false;
      this.isDetailsInfo = false;
      this.isAddInCalendar = false;
      this.isDates = true;

      this.selectElement = {};
    },

    /**
     * Открываем окно с залами
     * @param {object} element - данные о выбранном элементе расписания
     *
     * @returns {void}
     */
    openHalls(element = null) {
      window.scrollTo(0, 0);
      this.isDates = false;
      this.isDetailsInfo = false;
      this.isAddInCalendar = false;
      this.isHalls = true;

      if (!element) {
        return;
      }

      this.selectElement = element;
    },

    /**
     * Открываем окно с детальной информацией о элементе расписания
     * @param {object} element - данные о выбранном элементе расписания
     *
     * @returns {void}
     */
    openDetailsInfo(element) {
      window.scrollTo(0, 0);
      this.isDates = false;
      this.isHalls = false;
      this.isAddInCalendar = false;
      this.isDetailsInfo = true;

      this.selectElement = { ...this.selectElement, ...element };
    },

    openErrorSchedules(text) {
      this.errorText = text || this.errorText;

      window.scrollTo(0, 0);
      this.isDates = false;
      this.isHalls = false;
      this.isAddInCalendar = false;
      this.isDetailsInfo = false;
      this.isError = true;
    },
  },
};
</script>
