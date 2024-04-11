<template>
  <div class="page third-screen-page">
    <div class="third-screen">
      <div class="top-content">
        <div class="top-content-container">
          <button class="top-content__button-back" @click="openSecondScreenHandler()">
            Назад
          </button>
        </div>
      </div>
      <div class="third-screen__content">
        <div class="third-screen__container">
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/check.svg" class="third-screen__img-check" alt="check" />
            </div>
            <div class="third-screen__title third-screen__text">
              {{ selectElement.name }}
            </div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/calendar.svg" class="third-screen__img-calendar"  alt="calendar" />
            </div>
            <div class="third-screen__date third-screen__text" v-if="getTimeInterval">
              {{ selectElement.date.title }}, {{ getTimeInterval }}
            </div>
            <div class="third-screen__date third-screen__text" v-else>
              -
            </div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/location.svg" class="third-screen__img-location" alt="location" />
            </div>
            <div class="third-screen__hall third-screen__text">
              {{ selectElement.hallName }}
            </div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/speaker.svg" class="third-screen__img-speaker" alt="speaker" />
            </div>
            <div class="third-screen__speaker third-screen__text">
              {{ getSpeakers }}
            </div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/notes.svg"  class="third-screen__img-notes" alt="notes" />
            </div>
            <div class="third-screen__description third-screen__text">
              {{ selectElement.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    selectElement: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    /**
     * Выводим список спикеров
     *
     * @returns {string} - спикеры
     */
    getSpeakers() {
      const speakers = this.selectElement.speakers.map((speaker) => speaker.name);

      return speakers.join(", ");
    },

    /**
     * Получаем временный интервал в формате hh:mm - hh:mm
     *
     * @returns {string} - временный интервал
     */
    getTimeInterval() {
			if (!new Date(this.selectElement.start).getTime()) {
				return "";
			}

      const start = new Date(this.selectElement.start);
      const finish = new Date(this.selectElement.finish);

      const momentStart = moment(start).locale("ru").format("hh:mm");
      const momentFinish = moment(finish).locale("ru").format("hh:mm");

      return `${momentStart} - ${momentFinish}`;
    },
  },
  methods: {
    /**
     * Переключаемся на второе окно
     *
     * @returns {void}
     */
    openSecondScreenHandler() {
      this.$emit("openSecondScreenHandler");
    },
  },
};
</script>
