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
    <div class="table__absolute-hall"></div>
    <div class="table__item" v-for="item in timeList">
      <div class="table__item-time">{{ item.firstRange }}</div>
    </div>
    <div class="table__card">
      <div class="table__card-time-range"></div>
      <div class="table__card-day-type"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headList: {
      type: Array,
      default: []
    },
    timeList: {
      type: Array,
      default: []
    },
  },
}
</script>
