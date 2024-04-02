<template>
  <div class="table">
    <div class="table__head">
      <div class="table__head-container">
        <div
          v-if="getTableHeadContent"
          class="table__head-item"
          v-for="(item, index) in transformedArr"
          :key="index"
        >
          <div class="table__head-item-img">
            <img src="../assets/images/calendar.svg" alt="calendar" />
          </div>
          <div class="table__head-item-text">{{ item.date }}</div>
        </div>
        <div
          v-if="!getTableHeadContent"
          class="table__head-item"
          v-for="(item, index) in hallsInfo"
          :key="index"
        >
          <div class="table__head-item-img">
            <img src="../assets/images/hall.svg" alt="" />
          </div>
          <div class="table__head-item-text">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div :class="['table__item table__item-abs', { 'is-abs': getAbsClass }]">
      <div class="table__absolute-hall">
        <!--        <div class="table__absolute-hall-column"></div>-->
        <div v-if="range" class="table__absolute-hall-range">{{ range }}</div>
        <div v-if="title" class="table__absolute-hall-title">{{ title }}</div>
        <div v-if="speaker" class="table__absolute-hall-speaker">{{ speaker }}</div>
      </div>
      <div class="table__item-column-container" style="margin: 0">
        <div class="table__item-column" v-for="i in 3" :key="i"></div>
      </div>
    </div>
    <div class="table__item" v-for="time in timeList" :key="time.time">
      <div class="table__item-time">{{ time.time }}</div>
      <div class="table__item-column-container">
        <div class="table__item-column" v-for="column in time.list" :key="column.id">
          <TableCard :time="time.time" :column="column" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableCard from "@/components/TableCard";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { TableCard },
  props: {
    eventsInfo: {
      type: Array,
      default: [],
    },
    getAbsClass: {
      type: Boolean,
      default: false,
    },
    cardLink: {
      type: String,
      default: "",
    },
    transformedArr: {
      type: Array,
      default: [],
    },
    dates: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      title: "А/В тесты и рекламная монетизация",
      hallList: [],
      timeList: [
        { time: `08:00`, list: [] },
        { time: `09:00`, list: [] },
        { time: `10:00`, list: [] },
        { time: `11:15`, list: [] },
        { time: `11:16`, list: [] },
        { time: `11:16`, list: [] },
        { time: `11:16`, list: [] },
        { time: `11:16`, list: [] },
        { time: `11:30`, list: [] },
        { time: `11:45`, list: [] },
        { time: `11:55`, list: [] },
        { time: `12:00`, list: [] },
        { time: `12:15`, list: [] },
				{ time: `12:17`, list: [] },
				{ time: `12:17`, list: [] },
        { time: `12:30`, list: [] },
        { time: `13:00`, list: [] },
        { time: `14:00`, list: [] },
        { time: `15:00`, list: [] },
        { time: `16:00`, list: [] },
        { time: `17:00`, list: [] },
        { time: `18:00`, list: [] },
      ],
    };
  },
  created() {
    this.getEventsInfoHandler();
  },
  computed: {
    ...mapGetters(["campInfo", "hallsInfo", "eventsInfo"]),

    getTableHeadContent() {
      return this.$route.path === "/";
    },
  },
  methods: {
    ...mapActions(["getEventsInfo"]),
    getHour(time) {
      return new Date(time).getHours() <= 9
        ? `0${new Date(time).getHours()}`
        : `${new Date(time).getHours()}`;
    },
    getMinutes(time) {
      return new Date(time).getMinutes();
    },
    getFullDate(time) {
      return `${new Date(time).getFullYear()}-${new Date(time).getMonth() + 1}-${new Date(
        time
      ).getDate()}`;
    },
    getEventsInfoHandler() {
      this.getEventsInfo().then(() => {
        this.timeList.forEach((item, i) => {
          this.timeList[i].list = new Array();

          this.dates.forEach((date) => {
            this.timeList[i].list.push({ date: date.date });
          });
        });

        this.timeList.forEach((item, index) => {
          item.list.forEach((elem, i) => {
            let date = this.eventsInfo.filter((event) => {
              return (
                item.time ==
                  `${this.getHour(event.start)}:${this.getMinutes(event.start)}` &&
                this.getFullDate(event.start) == this.getFullDate(elem.date)
              );
            })[0];

            if (!date) {
              return;
            }

            this.timeList[index].list[i] = {
              ...elem,
              ...date,
              longTime: this.getLongTimeElement(date),
            };
          });
        });
      });
    },
    getLongTimeElement(date) {
      let isAddLength = false;
      let length = 0;

      this.timeList.forEach((item) => {
        if (isAddLength) {
          length += 1;
        }

        if (item.time == `${this.getHour(date.start)}:${this.getMinutes(date.start)}`) {
          isAddLength = true;
        }

        if (item.time == `${this.getHour(date.finish)}:${this.getMinutes(date.finish)}`) {
          isAddLength = false;
        }
      });

      return length;
    },

    checkDate(event) {
      let isChecked = false;

      this.dates.forEach((date) => {
        if (
          this.getFullDate(event.start) === this.getFullDate(date.date) ||
          this.getFullDate(event.finish) === this.getFullDate(date.date)
        ) {
          isChecked = true;
        }
      });
      return isChecked;
    },
  },
};
</script>
