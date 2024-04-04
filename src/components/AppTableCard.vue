<template>
  <button
    :class="['table__card', {'table__card--fill' : !this.column.roomId && this.index == 0 && !this.column.timeType}]"
    v-if="showButton"
    @click="selectElementHandler()"
    :style="`--block-height: ${column.longTime * 193 - 15}px; ${blockHeight}`"
  >
    <div class="table__card-wrapper">
      <template v-if="column.longTime >= 1">
        <p
          class="table__card-time-range"
          v-if="getTime(column.start) && getTime(column.finish)"
        >
          {{ getTime(column.start) }} - {{ getTime(column.finish) }}
        </p>
        <p class="table__card-time-range" v-else>
          {{ column.start }} - {{ column.finish }}
        </p>
      </template>
      <p class="table__card-day-type">{{ column.name }}</p>
      <div class="table__card-day-des-wrapper" v-if="column.longTime >= 2">
        <p
          class="table__card-day-des"
          v-for="speaker in column.speakers"
          :key="speaker.id"
        >
          {{ speaker.name }}
        </p>
      </div>
    </div>
  </button>
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
    index: {
      type: Number,
      default: 0,
    },
    headerItem: {
      type: Object,
      default: () => {},
    },
  },
	data() {
		return {
			blockHeight: '',
		}
	},
	created () {
		this.setBlockHeight();
		window.addEventListener('resize', () => {
			this.setBlockHeight();
		});
	},
  computed: {
    /**
     * Получаем время в формате hh:mm
     * @param {string} time - время
     *
     * @returns {string}
     */
    getTime() {
      return (time) => {
        if (!new Date(time).getTime()) {
          return "";
        }

        return `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
      };
    },

    showButton() {
      return (
        this.column.start &&
        (this.column.roomId ||
          (!this.column.roomId && this.index == 0) ||
          this.column.timeType)
      );
    },
  },
  methods: {
		setBlockHeight() {
			if (window.innerWidth >= 1400) {
				this.blockHeight = "";

				return;
			}

			this.blockHeight = `height: ${(this.column.longTime * 193 - 15) / 14 }vw`
		},

    /**
     * Выбираем элемент из таблицы
     *
     * @returns {void}
     */
    selectElementHandler() {
      //Если мы выбрали в таблице с датами
      if (this.headerItem.date) {
        this.$emit("selectElementHandler", {
          timeType: this.column.timeType,
          date: { ...this.headerItem.date },
        });
      } else {
        this.$emit("selectElementHandler", {
          description: this.column.description,
          name: this.column.name,
          speakers: this.column.speakers,
          start: this.column.start,
          finish: this.column.finish,
          hallName: this.headerItem.name,
        });
      }
    },
  },
};
</script>
