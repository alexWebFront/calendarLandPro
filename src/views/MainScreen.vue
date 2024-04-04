<template>
  <div class="page">
    <div class="main-screen">
      <app-buttons
        v-if="showButtons"
        :list="dates"
        :activePage="activePage"
        @nextPageHandler="nextPage"
        @prevPageHandler="prevPage"
      />

      <div class="top-content">
        <div class="top-content-container">
          <div class="top-content-title">
            <p class="top-content-text">
              Добро пожаловать в расписание {{ campInfo.name }}
            </p>
            <p class="top-content-text">Выберите нужный вам слот, нажав на него</p>
          </div>
        </div>
      </div>
      <app-table
        :headerList="dates[activePage]"
        :eventsInfo="eventsInfo"
        :timeList="timeList"
        @selectElementHandler="openSecondScreenHandler"
      />
    </div>
  </div>
</template>

<script>
import AppTable from "@/components/AppTable";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import AppButtons from "@/components/AppButtons.vue";

export default {
  components: { AppTable, AppButtons },
  data() {
    return {
      activePage: 0,
      dates: [],
      timeList: [
        {
          time: `08:00`,
          list: [
            {
              finish: "12:00",
              id: "1",
              name: "Утро",
              start: "08:00",
              longTime: 4,
              timeType: {
                name: "Утро",
                type: 1,
              },
            },
            {},
            {},
          ],
        },
        {
          time: `09:00`,
          list: [
            {},
            {
              finish: "12:00",
              id: "2",
              name: "Утро",
              start: "09:00",
              longTime: 3,
              timeType: {
                name: "Утро",
                type: 1,
              },
            },
            {
              finish: "12:00",
              id: "3",
              name: "Утро",
              start: "09:00",
              longTime: 3,
              timeType: {
                name: "Утро",
                type: 1,
              },
            },
          ],
        },
        { time: `10:00`, list: [{}, {}, {}] },
        { time: `11:00`, list: [{}, {}, {}] },
        {
          time: `12:00`,
          list: [
            {
              finish: "14:00",
              id: "1",
              name: "Обед",
              start: "12:00",
              longTime: 2,
              timeType: {
                name: "Обед",
                type: 2,
              },
            },
            {
              finish: "14:00",
              id: "2",
              name: "Обед",
              start: "12:00",
              longTime: 2,
              timeType: {
                name: "Обед",
                type: 2,
              },
            },
            {
              finish: "14:00",
              id: "3",
              name: "Обед",
              start: "12:00",
              longTime: 2,
              timeType: {
                name: "Обед",
                type: 2,
              },
            },
          ],
        },
        { time: `13:00`, list: [{}, {}, {}] },
        {
          time: `14:00`,
          list: [
            {
              finish: "18:00",
              id: "1",
              name: "День",
              start: "14:00",
              longTime: 4,
              timeType: {
                name: "День",
                type: 3,
              },
            },
            {
              finish: "18:00",
              id: "2",
              name: "День",
              start: "14:00",
              longTime: 4,
              timeType: {
                name: "День",
                type: 3,
              },
            },
            {
              finish: "18:00",
              id: "3",
              name: "День",
              start: "14:00",
              longTime: 4,
              timeType: {
                name: "День",
                type: 3,
              },
            },
          ],
        },
        { time: `15:00`, list: [{}, {}, {}] },
        { time: `16:00`, list: [{}, {}, {}] },
        { time: `17:00`, list: [{}, {}, {}] },
        { time: `18:00`, list: [] },
      ],
    };
  },
  created() {
    this.getCampInfoHandler();
  },
  computed: {
    ...mapGetters(["campInfo"]),

    /**
     * Показывать или нет кнопки переключения дат
     *
     * @returns {boolean} - показывать/не показывать
     */
    showButtons() {
      return this.campInfo?.dates?.length >= 4;
    },
  },
  methods: {
    ...mapActions(["getCampInfo"]),

    /**
     * Переключаемся на окно залов
     *
     * @returns {void}
     */
    openSecondScreenHandler(element) {
      this.$emit("openSecondScreenHandler", element);
    },

    /**
     * Меняем список дат на предыдущие
     *
     * @returns {void}
     */
    prevPage() {
      this.activePage -= 1;
    },

    /**
     * Меняем список дат на следующие
     *
     * @returns {void}
     */
    nextPage() {
      this.activePage += 1;
    },

    /**
     * Получение информации о кемпе
     *
     * @returns {void}
     */
    getCampInfoHandler() {
      this.getCampInfo().then(() => {
        //Переформатируем список дат в удобный нам
        this.setDates();
      });
    },

    /**
     * Переформатируем список дат в удобный нам
     *
     * @returns {void}
     */
    setDates() {
      let array = [];

      for (let i = 0; i < this.campInfo.dates.length; i++) {
        const date = new Date(this.campInfo.dates[i].date);

        array.push({
          date: {
            title: moment(date).locale("ru").format("DD.MM.YY dd"),
            time: moment(date).locale("ru").format("DD.MM.YY"),
          },
        });
      }

      //Делим список дат на списки по 3 элемента
      this.setSortingDates(array);
    },

    /**
     * Делим список дат на списки по 3 элемента
     * @param {array} list - список дат
     *
     * @returns {void}
     */
    setSortingDates(list) {
      const chunkArr = (arr, size) =>
        arr.reduceRight((r, i, _, s) => (r.push(s.splice(0, size)), r), []);
      this.dates = chunkArr(list, 3);

      this.dates.forEach((list) => {
        if (list.length == 1) {
          list.push({});
          list.push({});

          return;
        }

        if (list.length == 2) {
          list.push({});

          return;
        }
      });
    },
  },
};
</script>
