<template>
  <button
    :class="[
      'table__card',
      {
        'table__card--fill': !column.roomId && index == 0 && !column.timeType,
      },
    ]"
    v-if="showCard"
    @click="selectElementHandler()"
    :style="`${blockStyleHeight}; ${blockTopPosition}`"
  >
    <div class="table__card-wrapper">
      <template v-if="column.longTime >= 1 && blockHeight >= 90">
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
      <p
        :class="[
          'table__card-day-type',
          {
            'table__card-day-type--no-standard-height':
              column.longTime <= 0.6 || blockHeight <= 89,
          },
        ]"
      >
        {{ column.name }}
      </p>
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
      blockHeight: ``,
      blockStyleHeight: ``,
      blockTopPosition: `top: 3px`,
    };
  },
  created() {
		//Устанавливаем высоту элемента расписания
    this.setBlockHeight();

		//Устанавливаем отступ от начала блока с элементом расписания
    this.setBlockTopPosition();

    window.addEventListener("resize", () => {
			//Устанавливаем высоту элемента расписания
      this.setBlockHeight();

			//Устанавливаем отступ от начала блока с элементом расписания
      this.setBlockTopPosition();
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

        let minutes =
          new Date(time).getMinutes() == "0"
            ? `${new Date(time).getMinutes()}0`
            : new Date(time).getMinutes();

        return `${new Date(time).getHours()}:${minutes}`;
      };
    },

    /**
     * Показывать элемент расписания или нет
     *
     * @returns {boolean} - показывать/скрыть
     */
    showCard() {
      return (
        this.column.start &&
        (this.column.roomId ||
          (!this.column.roomId && this.index == 0) ||
          this.column.timeType)
      );
    },
  },
  methods: {
    /**
     * Устанавливаем отступ от начала блока с элементом расписания
     *
     * @returns {void}
     */
    setBlockTopPosition() {
      let size = this.column.positionTop || 3;

      if (window.innerWidth >= 1400) {
        this.blockTopPosition = `top: ${size}px`;

        return;
      }

      this.blockTopPosition = `top: ${(size / 1399) * 100}vw`;
    },

    /**
     * Устанавливаем высоту элемента расписания
     *
     * @returns {void}
     */
    setBlockHeight() {
      this.blockHeight = this.column.longTime * 193 - 15 - (this.column.positionTop || 0);

      if (window.innerWidth >= 1400) {
        this.blockStyleHeight = `height: ${
          this.column.longTime * 193 - 15 - (this.column.positionTop || 0)
        }px`;

        return;
      }

      this.blockStyleHeight = `height: ${
        (this.column.longTime * 193 - 15 - (this.column.positionTop || 0)) / 14
      }vw`;
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
