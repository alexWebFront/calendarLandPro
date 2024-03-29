<template>
  <div class="page">
    <div class="main-screen">
      <div class="top-content">
        <div class="top-content-container">
          <div class="top-content-title">
            <p class="top-content-text">Добро пожаловать в расписание Product Camp! </p>
            <p class="top-content-text">Выберите нужный вам слот, нажав на него</p>
          </div>
        </div>
      </div>
      <Table
          :getAbsClass="getAbsClass"
          :headList="headList"
          :timeList="timeList"
      />
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";
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
    }
  },

  created() {
    this.getCampInfoHandler()
  },
  computed: {
    ...mapGetters(["campInfo"]),

    getAbsClass() {
      return false
    },
  },
  methods: {
    ...mapActions(["getCampInfo"]),

    getCampInfoHandler() {
      this.getCampInfo()
          .then(() => {
            console.log(this.campInfo)
          })
    }
  },
}
</script>
