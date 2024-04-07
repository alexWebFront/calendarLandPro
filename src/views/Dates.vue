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
          list: [{}, {}, {}],
        },
        {
          time: `09:00`,
          list: [{}, {}, {}],
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
    //Получение информации о расписании
    this.getCampInfoHandler();
  },
  computed: {
    ...mapGetters(["campInfo", "eventsInfo"]),

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
    ...mapActions(["getCampInfo", "getEventsInfo"]),

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

      //Устанавливаем динамический список Утро и Вечер
      this.setTimeList();
    },

    /**
     * Меняем список дат на следующие
     *
     * @returns {void}
     */
    nextPage() {
      this.activePage += 1;

      //Устанавливаем динамический список Утро и Вечер
      this.setTimeList();
    },

    /**
     * Получение информации о расписании
     *
     * @returns {void}
     */
    getCampInfoHandler() {
      this.getCampInfo().then(() => {
        //Переформатируем список дат в удобный нам
        this.setDates();

        //Запрос на получение элементов расписания
        this.getEventsInfoHandler();
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
        for (let index = 0; index < 3; index++) {
          if (!list[index]) {
            list[index] = {};
          }
        }
      });
    },

    /**
     * Запрос на получение элементов расписания
     *
     * @returns {void}
     */
    getEventsInfoHandler() {
      this.getEventsInfo().then(() => {
        //Устанавливаем динамический список Утро и Вечер
        this.setTimeList();
      });
    },

    /**
     * Устанавливаем динамический список Утро и Вечер
     *
     * @returns {void}
     */
    setTimeList() {
      let list = [];

      this.setDefaultTimeList();

      this.dates[this.activePage].forEach((date, index) => {
        let dates = [];

        this.eventsInfo.forEach((event) => {
          const dateStart = new Date(event.start);

          if (date.date?.time == moment(dateStart).locale("ru").format("DD.MM.YY")) {
            dates.push({ ...event, index: index });
          }
        });

        const start = dates
          .sort((a, b) => {
            return new Date(b.start).getTime() - new Date(a.start).getTime();
          })
          .reverse()[0];

        const finish = dates.sort((a, b) => {
          return new Date(b.finish).getTime() - new Date(a.finish).getTime();
        })[0];

        list.push([start, finish]);
      });

      let maxLongTimeArray = [];

      list.forEach((items) => {
        if (!items.length) {
          return;
        }

        //Обрабатываем самый ранний элемент расписание текущей даты
        if (items[0] && +new Date(items[0].start).getHours() < 12) {
          this.timeList.forEach((elem, index) => {
            if (index >= 4) {
              return;
            }

            let length = 12 - +this.getHour(items[0].start);
            let positionTop = 0;

            //Если элемент расписания начинается в 11:02 а у нас разметка по часу (08:00, 09:00) то делаем отступ сверху
            if (+this.getMinutes(items[0].start) >= 1) {
              let interest = 100 / (60 / +this.getMinutes(items[0].start));
              positionTop = 193 * (interest / 100);
            }

            //Заполняем элементы расписания
            if (elem.time.split(":")[0] == this.getHour(items[0].start)) {
              elem.list[items[0].index] = {
                finish: `12:00`,
                id: items[1].index,
                name: "Утро",
                start: `${this.getHour(items[0].start)}:${this.getMinutes(
                  items[0].start
                )}`,
                longTime: length,
                positionTop: positionTop,
                timeType: {
                  name: "Утро",
                  type: 1,
                },
              };
            }
          });
        }

        //Обрабатываем самый поздний элемент расписания текущей даты
        if (items[1] && +new Date(items[1].finish).getHours() > 18) {
          let length = +this.getHour(items[1].finish) - 18;

          if (this.getMinutes(items[1].finish) > 0) {
            length += 1;
          }

          let longTime = length;
          const residue = +moment(items[1].finish).locale("ru").format("mm") % 60;

          if (residue > 0) {
            let time = `${moment(new Date(items[1].start))
              .locale("ru")
              .format("YYYY-MM-DD")} 18:00:00`;
            longTime =
              (new Date(items[1].finish).getTime() - new Date(time).getTime()) /
              60000 /
              60;
          }

          maxLongTimeArray.push(length);

          this.timeList[10].list[items[1].index] = {
            finish: `${this.getHour(items[1].finish)}:${this.getMinutes(
              items[1].finish
            )}`,
            id: items[1].index,
            name: "Вечер",
            start: "18:00",
            longTime: longTime,
            timeType: {
              name: "Вечер",
              type: 4,
            },
          };

          for (let index = 0; index < 3; index++) {
            if (!this.timeList[10].list[index]) {
              this.timeList[10].list[index] = {};
            }
          }
        }
      });

      //Добавляем новый элементы расписания если они заканчиваются позже 18:00
      for (let index = 0; index < Math.max.apply(null, maxLongTimeArray); index++) {
        if (index == Math.max.apply(null, maxLongTimeArray) - 1) {
          this.timeList.push({ time: `${19 + index}:00`, list: [] });
        } else {
          this.timeList.push({ time: `${19 + index}:00`, list: [{}, {}, {}] });
        }
      }
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
     * Устанавливаем первоначальное состояние списка
     *
     * @returns {void}
     */
    setDefaultTimeList() {
      this.timeList = [
        {
          time: `08:00`,
          list: [{}, {}, {}],
        },
        {
          time: `09:00`,
          list: [{}, {}, {}],
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
      ];
    },
  },
};
</script>
