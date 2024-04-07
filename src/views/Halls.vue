<template>
  <div class="page">
    <div class="second-screen">
      <app-buttons
        v-if="showButtons"
        :list="hallsList"
        :activePage="activePage"
        @nextPageHandler="nextPage"
        @prevPageHandler="prevPage"
      />

      <div class="top-content">
        <div class="top-content-container">
          <button class="top-content__button-back" @click="openMainScreenHandler()">
            Назад
          </button>
          <div class="top-content__date">
            <div class="top-content__date-wrapper">
              <div class="top-content__date-img">
                <img src="../assets/images/calendar.svg" alt="calendar" />
              </div>
              <p>
                {{ getDate }}, <span>{{ getTimeType }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <app-table
        :headerList="hallsList[activePage]"
        :timeList="timeList"
        :blankFieldList="blankFieldList"
        @selectElementHandler="openThirdScreenHandler"
      />
    </div>
  </div>
</template>

<script>
import AppTable from "@/components/AppTable";
import { mapActions, mapGetters } from "vuex";
import AppButtons from "@/components/AppButtons.vue";
import moment from "moment";

export default {
  components: { AppTable, AppButtons },
  props: {
    dayType: {
      type: String,
      default: "Утро",
    },
    selectElement: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      timeList: [],
      blankFieldList: {
        dates: [],
        halls: [],
        datesHalls: [],
      },
      hallsList: [],
      activePage: 0,
    };
  },
  created() {
    //Устанавливаем список с часами
    this.setTimeList();

    //Получаем информацию о залах
    this.getHallsInfoHandler();
  },
  computed: {
    ...mapGetters(["hallsInfo", "eventsInfo"]),

    /**
     * Дата с днем недели
     *
     * @returns {string} - дата  с днем недели
     */
    getDate() {
      return this.selectElement?.date?.title?.toUpperCase() || "";
    },

    /**
     * Тип времени (Утро Обед День)
     *
     * @returns {string} - тип времени
     */
    getTimeType() {
      return this.selectElement?.timeType?.name || "";
    },

    /**
     * Показывать или нет кнопки переключения залов
     *
     * @returns {boolean} - показывать/не показывать
     */
    showButtons() {
      return this.hallsList?.length >= 2;
    },
  },
  methods: {
    ...mapActions(["getHallsInfo"]),

    /**
     * Устанавливаем список с часами
     *
     * @returns {void}
     */
    setTimeList() {
      if (this.selectElement.timeType.type == 1) {
        this.timeList = this.setHoursList(8, 12);

        return;
      }

      if (this.selectElement.timeType.type == 2) {
        this.timeList = this.setHoursList(12, 14);

        return;
      }

      if (this.selectElement.timeType.type == 3) {
        this.timeList = this.setHoursList(14, 18);
      }

      if (this.selectElement.timeType.type == 4) {
        this.timeList = this.setHoursList(18, 24);
      }
    },

    /**
     * Меняем список дат на предыдущие
     *
     * @returns {void}
     */
    prevPage() {
      this.activePage -= 1;
      this.setScheduleItems();
    },

    /**
     * Меняем список дат на следующие
     *
     * @returns {void}
     */
    nextPage() {
      this.activePage += 1;
      this.setScheduleItems();
    },

    /**
     * Переключаемся на главный экран
     *
     * @returns {void}
     */
    openMainScreenHandler() {
      this.$emit("openMainScreenHandler");
    },

    /**
     * Переключаемся на детальную элемента расписания
     *
     * @returns {void}
     */
    openThirdScreenHandler(element) {
      this.$emit("openThirdScreenHandler", element);
    },

    /**
     * Получаем информацию о залах
     *
     * @returns {void}
     */
    getHallsInfoHandler() {
      this.getHallsInfo().then(() => {
				// Делим список дат на списки по 3 элемента
        this.setSortingHalls();

				//Устанавливаем список элементов расписания
        this.setScheduleItems();
      });
    },

    /**
     * Получаем список часов с интервалом 15 минут
     * @param {number} min - начальный час
     * @param {number} max - конечный час
     *
     * @returns {array} - список часов с интервалом 15 минут
     */
    setHoursList(min, max) {
      const maxHour = max;
      let hours = min;
      let minutes = 0;
      let array = [];

      array.push({
        time: `${hours <= 9 ? "0" + hours : hours}:${minutes == 0 ? "00" : minutes}`,
        list: [{}, {}, {}],
      });

      while (hours != maxHour) {
        minutes += 15;

        if (minutes == 60) {
          minutes = 0;
          hours += 1;
        }

        array.push({
          time: `${hours <= 9 ? "0" + hours : hours}:${minutes == 0 ? "00" : minutes}`,
          list: [{}, {}, {}],
        });
      }

      return array;
    },

    /**
     * Устанавливаем список элементов расписания
     *
     * @returns {void}
     */
    setScheduleItems() {
      let array = [];

      this.blankFieldList.dates = [];
      this.blankFieldList.halls = [];
      this.blankFieldList.datesHalls = [];

      this.eventsInfo.forEach((event) => {
        const date = new Date(event.start);
        const momentDate = moment(date).locale("ru").format("DD.MM.YY");

        if (!event.roomId && !event.start) {
          this.blankFieldList.datesHalls.push(event);

          return;
        }

        if (!event.start) {
          this.blankFieldList.dates.push(event);

          return;
        }

        if (!event.roomId) {
          this.blankFieldList.halls.push(event);
        }

        if (momentDate == this.selectElement.date.time) {
          array.push(event);
        }
      });

      this.timeList.forEach((item, i) => {
        this.timeList[i].list = new Array(...this.hallsList[this.activePage]);
      });

      //Список для проверки на дублирующиеся элементы
      let recurrenceCheckList = [];

      this.timeList.forEach((item, index) => {
        item.list.forEach((elem, i) => {
          let date = array.filter((event) => {
            const momentDate = `${moment(event.start)
              .locale("ru")
              .format("YYYY-MM-DD")} ${item.time}:00`;

            const isSuccessTime =
              new Date(momentDate).getTime() < new Date(event.finish).getTime() &&
              new Date(momentDate).getTime() >= new Date(event.start).getTime() &&
              new Date(event.finish).getTime() - new Date(event.start).getTime() >=
                900000;

            return (
              (item.time ==
                `${this.getHour(event.start)}:${this.getMinutes(event.start)}` ||
                isSuccessTime) &&
              (event.roomId == elem.id || !event.roomId)
            );
          })[0];

          if (!date) {
            return;
          }

          recurrenceCheckList.push(date);

          let filterRecurrenceCheckList = recurrenceCheckList.filter(
            (item) =>
              item.start == date.start &&
              item.finish == date.finish &&
              item.roomId == date.roomId
          );

          //Если элемент уже добавлен в список то новый не добавляем
          if (filterRecurrenceCheckList.length > 1) {
            return;
          }

          let positionTop = 0;

          //Если элемент расписания начинается в 11:07 а у нас разметка по 15 минут (08:15, 08:30) то делаем отступ сверху
          if (
            +this.getMinutes(date.start) >= 1 &&
            +this.getMinutes(date.start) % 15 >= 1
          ) {
            let interest = 100 / (15 / +this.getMinutes(date.start));
            positionTop = 193 * (interest / 100);
          }

          this.timeList[index].list[i] = {
            ...elem,
            ...date,
            longTime: this.getLongTimeElement(date),
            positionTop: positionTop,
          };
        });
      });
    },

    /**
     * Получаем число на которое нужно умножить высоту элемента расписания
     * @param {string} data - элемент расписания
     *
     * @returns {number} - число на которое нужно умножить высоту элемента расписания
     */
    getLongTimeElement(date) {
      let length = 0;

      this.timeList.forEach((item) => {
        const momentDate = `${moment(date.start).locale("ru").format("YYYY-MM-DD")} ${
          item.time
        }:00`;

        //Если дата попадает в промежуток от начала до конца элемента расписания до добавляем высоту элементу распивания
        if (
          new Date(momentDate).getTime() < new Date(date.finish).getTime() &&
          new Date(momentDate).getTime() >= new Date(date.start).getTime() &&
          new Date(date.finish).getTime() - new Date(date.start).getTime() >= 900000
        ) {
          length += 1;
        }
      });

      const residue = +moment(date.finish).locale("ru").format("mm") % 15;

      if (length == 0 || residue > 0) {
        return (
          (new Date(date.finish).getTime() - new Date(date.start).getTime()) / 60000 / 15
        );
      }

      return length;
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

    /**
     * Делим список дат на списки по 3 элемента
     * @param {array} list - список дат
     *
     * @returns {void}
     */
    setSortingHalls() {
      const chunkArr = (arr, size) =>
        arr.reduceRight((r, i, _, s) => (r.push(s.splice(0, size)), r), []);
      this.hallsList = chunkArr(this.hallsInfo, 3);

      this.hallsList.forEach((list) => {
        for (let index = 0; index < 3; index++) {
          if (!list[index]) {
            list[index] = {};
          }
        }
      });
    },
  },
};
</script>
