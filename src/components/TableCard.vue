<template>
  <router-link :to="getCardLink">
    <div v-show="item.firstRange === '8:00' && column === 1" class="table__card">
      <div class="table__card-time-range">8:00 - 12:00</div>
      <div class="table__card-day-type">Утро</div>
    </div>
  </router-link>

</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: 0
    },
    column: {
      type: Number,
      default: 0
    },
  },
  computed: {
    getCardLink() {
      return this.$route.path === '/' ? '/halls' : '/details'
    }
  },
}
</script>
