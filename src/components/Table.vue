<template>
  <div class="table">
    <div class="table__head">
      <div class="table__head-container">
        <div v-if="getTableHeadContent" class="table__head-item" v-for="item in transformedArr">
          <div class="table__head-item-img">
            <img src="../assets/images/calendar.svg" alt="">
          </div>
          <div class="table__head-item-text">{{ item.date }}</div>
        </div>
        <div v-if="!getTableHeadContent" class="table__head-item" v-for="item in hallsInfo">
          <div class="table__head-item-img">
            <img src="../assets/images/hall.svg" alt="">
          </div>
          <div class="table__head-item-text">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div :class="['table__item table__item-abs', {'is-abs':getAbsClass}]">
      <div class="table__absolute-hall">
        <!--        <div class="table__absolute-hall-column"></div>-->
        <div v-if="range" class="table__absolute-hall-range">{{ range }}</div>
        <div v-if="title" class="table__absolute-hall-title">{{ title }}</div>
        <div v-if="speaker" class="table__absolute-hall-speaker">{{ speaker }}</div>
      </div>
      <div class="table__item-column-container" style="margin: 0;">
        <div class="table__item-column" v-for="i in 3"></div>
      </div>
    </div>
    <div class="table__item" v-for="time in timeList">
      <div class="table__item-time">{{ time.time }}</div>
      <div class="table__item-column-container">
        <div class="table__item-column" v-for="column in 3">
          <TableCard
              :time="time"
              :column="column"

          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableCard from "@/components/TableCard";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {TableCard},
  props: {
    eventsInfo: {
      type: Array,
      default: []
    },
    getAbsClass: {
      type: Boolean,
      default: false
    },
    cardLink: {
      type: String,
      default: ''
    },
    transformedArr: {
      type: Array,
      default: []
    },
    dates: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      title: "А/В тесты и рекламная монетизация",
      hallList: [],
      timeList: [
        {time: `08:00`, list: []},
        {time: `09:00`, list: []},
        {time: `10:00`, list: []},
        {time: `11:15`, list: []},
        {time: `11:30`, list: []},
        {time: `11:55`, list: []},
        {time: `12:00`, list: []},
        {time: `13:00`, list: []},
        {time: `14:00`, list: []},
        {time: `15:00`, list: []},
        {time: `16:00`, list: []},
        {time: `17:00`, list: []},
        {time: `18:00`, list: []},
      ]
    }
  },
  created() {
    this.getEventsInfoHandler()
  },
  computed: {
    ...mapGetters(["campInfo", "hallsInfo", "eventsInfo"]),

    getTableHeadContent() {
      return this.$route.path === '/'
    },

  },
  methods: {
    ...mapActions(["getEventsInfo"]),
    getEventsInfoHandler() {
      this.getEventsInfo()
          .then(() => {
            // this.eventsInfo.forEach((event) => {
            //   let hour = +(new Date(event.start).getHours()) <= 9 ? `0${new Date(event.start).getHours()}` : `${new Date(event.start).getHours()}`
            //   this.timeList.push({
            //     time: `${hour}:${new Date(event.start).getMinutes()}`,
            //     list: []
            //   })
            // })
            this.timeList.forEach((item) => {
              item.list = this.dates
            })

            this.eventsInfo.forEach((event) => {
              if (!this.checkDate(event)) {
                return
              }
              this.timeList.forEach((item) => {

                item.list.forEach((elem) => {
                  let hour = +(new Date(event.start).getHours()) <= 9 ? `0${new Date(event.start).getHours()}` : `${new Date(event.start).getHours()}`
                  console.log(`${hour}:${new Date(event.start).getMinutes()}`)
                  console.log(`${item.time} item time`)
                  if (item.time === `${hour}:${new Date(event.start).getMinutes()}`) {

                    // const startDate = `${new Date(event.start).getFullYear()}${new Date(event.start).getMonth()}${new Date(event.start).getDate()}`
                    // const finishDate = `${new Date(event.finish).getFullYear()}${new Date(event.finish).getMonth()}${new Date(event.finish).getDate()}`
                    // const currentDate = `${new Date(elem.date).getFullYear()}${new Date(elem.date).getMonth()}${new Date(elem.date).getDate()}`
                    // console.log(`${startDate}, ${currentDate}`)
                    // if (startDate === currentDate) {
                    //   elem = {...elem, ...event}
                    // }
                  }
                })
              })

            })
            console.log(this.timeList)
          })
    },
    checkDate(event) {
      let isChecked = false
      this.dates.forEach((date) => {
        const startDate = `${new Date(event.start).getFullYear()}${new Date(event.start).getMonth()}${new Date(event.start).getDate()}`
        const finishDate = `${new Date(event.finish).getFullYear()}${new Date(event.finish).getMonth()}${new Date(event.finish).getDate()}`
        const currentDate = `${new Date(date.date).getFullYear()}${new Date(date.date).getMonth()}${new Date(date.date).getDate()}`
        if (startDate === currentDate || finishDate === currentDate) {
          isChecked = true
        }
      })
      return isChecked
    }
  },
}
</script>
