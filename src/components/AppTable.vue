<template>
  <div class="table">
    <div class="table__head">
      <div class="table__head-container">
        <div class="table__head-item" v-for="(item, index) in headerList" :key="index">
          <div class="table__head-item-img">
            <img v-if="item.date" src="./../assets/images/calendar.svg" alt="calendar" />
            <img v-if="item.name" src="./../assets/images/hall.svg" alt="hall" />
          </div>
          <div v-if="item.date" class="table__head-item-text">{{ item.date.title }}</div>
          <div v-else class="table__head-item-text">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div
      :class="[
        'table__item table__item-abs',
        { 'is-abs': blankFieldList && Object.keys(blankFieldList).length },
      ]"
    >
      <button
        class="table__absolute-hall table__absolute-hall--fill"
        v-for="item in getDatesHallsList"
        :key="item.id"
        v-show="item.roomId == i"
				@click="selectElementHandlerBlankFieldList({}, item,)"
      >
				<div class="table__absolute-hall-title-wrapper">
        	<p class="table__absolute-hall-title">{{ item.name }}</p>
				</div>
      </button>
      <div class="table__item-column-container" style="margin: 0">
        <div class="table__item-column" v-for="i in 3" :key="i">
          <button
            class="table__absolute-hall"
            v-for="item in getDatesList"
            :key="item.id"
            v-show="item.roomId == i"
						@click="selectElementHandlerBlankFieldList(headerList[i - 1], item)"
          >
            <div class="table__absolute-hall-title">{{ item.name }}</div>
          </button>
        </div>
      </div>
    </div>
    <div class="table__item" v-for="time in timeList" :key="time.time">
      <div class="table__item-time">{{ time.time }}</div>
      <div class="table__item-column-container">
        <div
          class="table__item-column"
          v-for="(column, index) in time.list"
          :key="column.id"
        >
          <app-table-card
            :time="time.time"
						:index="index"
            :column="column"
            :headerItem="headerList[index]"
            @selectElementHandler="selectElementHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppTableCard from "@/components/AppTableCard";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { AppTableCard },
  props: {
    eventsInfo: {
      type: Array,
      default: [],
    },
    cardLink: {
      type: String,
      default: "",
    },
    headerList: {
      type: Array,
      default: [],
    },
    timeList: {
      type: Array,
      default: [],
    },
    blankFieldList: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["campInfo", "hallsInfo", "eventsInfo"]),

    getDatesList() {
      return this.blankFieldList?.dates || [];
    },
    getDatesHallsList() {
      return this.blankFieldList?.datesHalls || [];
    },
  },
  methods: {
    ...mapActions(["getEventsInfo"]),

    /**
     * Выбираем элемент из таблицы
     * @param {object} element - данные элемента расписания
     *
     * @returns {void}
     */
    selectElementHandler(element) {
      this.$emit("selectElementHandler", element);
    },

		/**
     * Выбираем элемент из таблицы
     *
     * @returns {void}
     */
		 selectElementHandlerBlankFieldList(headerItem, item) {
			//Если мы выбрали в таблице с датами
      if (headerItem.date) {
        this.$emit("selectElementHandler", {
          timeType: item.timeType,
          date: { ...headerItem.date },
        });
      } else {
				this.$emit("selectElementHandler", {
					description: item.description,
					name: item.name,
					speakers: item.speakers,
					start: item.start,
					finish: item.finish,
					hallName: headerItem?.name || "-",
				});
      }
    },
  },
};
</script>
