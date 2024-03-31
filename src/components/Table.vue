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
    <div class="table__item" v-for="item in timeList">
      <div class="table__item-time">{{ item.firstRange }}</div>
      <div class="table__item-column-container">
        <div class="table__item-column" v-for="column in 3">
          <TableCard
              :item="item"
              :column="column"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableCard from "@/components/TableCard";
import {mapGetters} from "vuex";

export default {
  components: {TableCard},
  props: {
    headList: {
      type: Array,
      default: []
    },
    timeList: {
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
    }
  },
  data() {
    return {
      title: "А/В тесты и рекламная монетизация",
      hallList: [],
    }
  },
  created() {
    // this.getTransformedArr()
    // console.log(this.$route.path)
  },
  computed: {
    ...mapGetters(["campInfo", "hallsInfo"]),

    getTableHeadContent() {
      return this.$route.path === '/'
    },

    getTableHeadArr() {
      return this.$route.path === '/' ? this.headList : this.hallList
    }
  },
  methods: {},
}
</script>
