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
          :headList="headList"
          :timeList="timeList"
          :transformedArr="transformedArr"
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
      headList: [
        {
          text: '19.04.24 ПТ',
        },
        {
          text: '20.04.24 СБ',
        },
        {
          text: '21.04.24 ВС',
        },
      ],
      timeList: [
        {
          firstRange: '8:00',
          list: [
            {
              id: "100",
              name: "Крещение единорога",
              description: "Таинственный обряд, во время которого предполагается, что одинокий единорог, символ чистоты и добродетели, принимает крещение в святой воде или источнике. По преданию, крещение единорога сопровождается невероятными явлениями: светящимися огнями, ароматами цветов, пение птиц и шепотом леса. В момент крещения сам единорог, согласно легенде, погружается в святую воду и восходит из нее преображенным, обретая еще большую свою чистоту и силу.",
              roomId: 1,
              start: "2023-08-20 11:15:00",
              finish: "2023-08-20 11:30:00",
              speakers: [
                {
                  id: 1001,
                  name: "Древний мудрец"
                },
                {
                  id: 1002,
                  name: "Жрец"
                }
              ]
            },
          ]
        },
        {firstRange: '9:00'},
        {firstRange: '10:00'},
        {firstRange: '11:00'},
        {firstRange: '12:00'},
        {firstRange: '13:00'},
        {firstRange: '14:00'},
        {firstRange: '15:00'},
        {firstRange: '16:00'},
        {firstRange: '17:00'},
      ],
      transformedArr: []
    }
  },
  created() {
    this.getCampInfoHandler()
    this.getHallsInfoHandler()
    this.getEventsInfoHandler()
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
          })
    },
    getHallsInfoHandler() {
      this.getHallsInfo()
    },
    getEventsInfoHandler() {
      this.getEventsInfo()
    },
    getTransformedArr() {
      let newArr = []

      for (let i = 0; i < this.campInfo.dates.length; i++) {
        const date = new Date(this.campInfo.dates[i].date)

        newArr.push({
          date: moment(date).format('DD.MM.YY')
        })
      }
      this.transformedArr = newArr
    },
  },
}
</script>
