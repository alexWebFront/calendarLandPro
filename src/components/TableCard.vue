<template>
  <router-link :to="getCardLink" v-if="column.start">
    <div class="table__card" :style="{height: `${column.longTime * 193 - 15}px`}">
      <div class="table__card-time-range">{{ getTime(column.start) }} - {{ getTime(column.finish) }}</div>
      <div class="table__card-day-type">{{ column.name }}</div>
      <div class="table__card-day-des">{{ column.description }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: "",
    },

    column: {
      type: Number,
      default: 0,
    },
  },
  created() {
		if (this.column.start) {
			console.log(this.column, "this.column");
		}
   
  },
  computed: {
    getCardLink() {
      // return this.$route.path === '/' ? '/halls' : `/details/${item.id}`
      return this.$route.path === "/" ? "/halls" : `/details`;
    },
		getTime() {
			return ((time) => {
				return `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
			})
      
    },
  },
};
</script>
