<template>
  <div class="page">
    <div class="second-screen">
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
          <router-link to="/" class="top-content__button-back">
            Назад
          </router-link>
          <div class="top-content__date">
            <div class="top-content__date-wrapper">
              <div class="top-content__date-img">
                <img src="../assets/images/calendar.svg" alt="">
              </div>
              <p>20.04.24 СБ, <span>{{ dayType }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <Table :getAbsClass="getAbsClass" :timeList="timeList"/>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";
import {mapActions} from "vuex";

export default {
  components: {Table},
  props: {
    dayType: {
      type: String,
      default: 'Утро'
    },
  },
  data() {
    return {
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
    }
  },
  created() {
    this.getHallsInfoHandler()
  },
  computed: {
    getAbsClass() {
      return true
    }
  },
  methods: {
    ...mapActions(["getHallsInfo"]),
    getHallsInfoHandler() {
      this.getHallsInfo()
    }
  },
}
</script>
