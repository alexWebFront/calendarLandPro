<template>
  <div class="page">
    <div class="main-screen">
      <div class="control-buttons">
        <div class="control-buttons__container">
          <button class="control-btn control-buttons__left">
            <img src="../assets/images/left-arrow.svg" alt="">
          </button>
          <button class="control-btn control-buttons__right">
            <img src="../assets/images/right-arrow.svg" alt="">
          </button>
        </div>
      </div>
      <div class="top-content">
        <div class="top-content-container">
          <div class="top-content-title">
            <p class="top-content-text">Добро пожаловать в расписание {{ campInfo.name }} </p>
            <p class="top-content-text">Выберите нужный вам слот, нажав на него</p>
          </div>
        </div>
      </div>
      <Table
          :getAbsClass="getAbsClass"
          :transformedArr="transformedArr"
          :eventsInfo="eventsInfo"
          :dates="dates[activeDate]"
      />
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";
import moment from 'moment';
import {mapActions, mapGetters} from "vuex";

export default {
  components: {Table},
  data() {
    return {
      activeDate: 0,
      transformedArr: [],
      dates: []
    }
  },
  created() {
    this.getCampInfoHandler()
  },
  computed: {
    ...mapGetters(["campInfo", "hallsInfo", "eventsInfo"]),

    getAbsClass() {
      return false
    },
  },
  methods: {
    ...mapActions(["getCampInfo", "getHallsInfo", "getEventsInfo"]),

    getCampInfoHandler() {
      this.getCampInfo()
          .then(() => {
            this.getTransformedArr()
            this.setSortingDates()
          })
    },

    getTransformedArr() {
      let newArr = []

      for (let i = 0; i < this.campInfo.dates.length; i++) {
        const date = new Date(this.campInfo.dates[i].date)

        newArr.push({
          date: moment(date).locale('ru').format('DD.MM.YY dd')
        })
      }
      this.transformedArr = newArr
    },

    setSortingDates() {
      let list = this.campInfo.dates
      const chunkArr = (arr, size) => arr.reduceRight((r, i, _, s) => (r.push(s.splice(0, size)), r), []);
      this.dates = chunkArr(list, 3)
      console.log(chunkArr(list, 3));
    }
  },
}
</script>
