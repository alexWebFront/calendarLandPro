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
              <img
                src="../assets/images/check.svg"
                class="third-screen__img-check"
                alt="check"
              />
            </div>
            <div class="third-screen__title third-screen__text">
              {{ selectElement.name }}
            </div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img
                src="../assets/images/calendar.svg"
                class="third-screen__img-calendar"
                alt="calendar"
              />
            </div>
            <div class="third-screen__date third-screen__text" v-if="getTimeInterval">
              {{ selectElement.date.title }}, {{ getTimeInterval }}
            </div>
            <div class="third-screen__date third-screen__text" v-else>-</div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img
                src="../assets/images/location.svg"
                class="third-screen__img-location"
                alt="location"
              />
            </div>
            <div
              class="third-screen__hall third-screen__text"
              v-if="selectElement.hallName && !selectElement.isFill"
            >
              {{ selectElement.hallName }}
            </div>
            <div class="third-screen__hall third-screen__text" v-else>-</div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img
                src="../assets/images/speaker.svg"
                class="third-screen__img-speaker"
                alt="speaker"
              />
            </div>
            <div class="third-screen__speaker third-screen__text">
              {{ getSpeakers }}
            </div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img
                src="../assets/images/notes.svg"
                class="third-screen__img-notes"
                alt="notes"
              />
            </div>
            <div
              v-if="selectElement.description"
              class="third-screen__description third-screen__text"
              v-html="selectElement.description"
            ></div>
            <div v-else class="third-screen__description third-screen__text">-</div>
          </div>
        </div>
      </div>
      <div class="third-screen__buttons">
        <button class="third-screen__button" @click="openAddCalendarWindowHandler('add')">
          <img
            src="../assets/images/calendar.png"
            class="third-screen__button-img"
            alt="check"
          />
          Добавить в календарь
        </button>
        <button class="third-screen__button" @click="feedBackUserHandler()">
          <img
            src="../assets/images/like.png"
            class="third-screen__button-img"
            alt="check"
          />Оставить отзыв
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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

      if (!speakers.length) {
        return "-";
      }

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

      const momentStart = `${this.getHour(start)}:${this.getMinutes(start)}`;
      const momentFinish = `${this.getHour(finish)}:${this.getMinutes(finish)}`;

      return `${momentStart} - ${momentFinish}`;
    },
  },
  methods: {
    ...mapActions(["feedBackUser"]),
    feedBackUserHandler() {
      const tg = window.Telegram.WebApp;

      this.feedBackUser({
        eventId: +this.selectElement.id,
        chatId: tg.initDataUnsafe?.user?.id,
      }).finally(() => {
				tg.close();
			});
    },

    openAddCalendarWindowHandler(type) {
      this.$emit("openAddCalendarWindowHandler", type);
    },
    /**
     * Переключаемся на второе окно
     *
     * @returns {void}
     */
    openSecondScreenHandler() {
      this.$emit("openSecondScreenHandler");
    },

    /**
     * Получаем часы из даты
     * @param {string} time - дата
     *
     * @returns {string} - часы нужной нам даты
     */
    getHour(time) {
      return new Date(time).getHours() <= 9
        ? `0${new Date(time).getHours()}`
        : `${new Date(time).getHours()}`;
    },

    /**
     * Получаем минуты из даты
     * @param {string} time - дата
     *
     * @returns {string} - минуты нужной нам даты
     */
    getMinutes(time) {
      if (new Date(time).getMinutes() == "0") {
        return `${new Date(time).getMinutes()}0`;
      }

      return new Date(time).getMinutes();
    },
  },
};
</script>
