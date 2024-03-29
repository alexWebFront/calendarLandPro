<template>
  <div class="table">
    <div class="table__head">
      <div class="table__head-container">
        <div class="table__head-item" v-for="item in headList">
          <div class="table__head-item-img">
            <img src="../assets/images/calendar.svg" alt="">
          </div>
          <div class="table__head-item-text">{{ item.text }}</div>
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
    }
  },
  data() {
    return {
      title: "А/В тесты и рекламная монетизация"
    }
  },
  created() {
    console.log(this.$route.path)
  },

  methods: {},
}
</script>
