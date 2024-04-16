<template>
  <button
    :class="[
      'table__card',
      {
        'table__card--fill': isFill,
      },
      {
        'table__card--half': isDoubleElement || isHalf,
      },
      {
        'table__card--half-fill':
          isDoubleElement || (column.list && column.list.length >= 2) || isAddedHalf,
      },
    ]"
    v-if="showCard"
    @click="selectElementHandler()"
    :style="`${blockStyleHeight}; ${blockTopPosition}`"
  >
    <div
      :class="[
        'table__card-wrapper',
        { half: isDoubleElement || isHalf },
        { 'fill-half': (column.list && column.list.length >= 2) || isAddedHalf },
        { small: isAddedClass(1) },
        { medium: isAddedClass(2) },
      ]"
    >
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
          v-for="(speaker, speakerIndex) in column.speakers"
          :key="speaker.id"
          v-show="speakerIndex <= 1"
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
    list: {
      type: Array,
      default: [],
    },
    timeList: {
      type: Array,
      default: [],
    },
    timeIndex: {
      type: Number,
      default: 0,
    },
    isDoubleElement: {
      type: Boolean,
      default: false,
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
     * Проверяем нужно добавить класс или нет если у элемента нету зала
     *
     * @returns {boolean}
     */
    isFill() {
      return this.column.is_fill && this.index == 0 && !this.column.timeType;
    },

    /**
     * Проверяем нужно добавить класс или нет если элемент пересекает другой
     *
     * @returns {boolean}
     */
    isHalf() {
      if (this.column.timeType || this.index != 0 || this.column.is_fill) {
        return false;
      }

      let list = this.timeList.filter((item, index) => this.timeIndex < index);

      if (!list?.length) {
        return false;
      }

      let arrayForFindIndex = [];

      for (var i = 0; i < list.length; i++) {
        arrayForFindIndex = arrayForFindIndex.concat(list[i].list[0]);
      }

      let index = arrayForFindIndex.findIndex((el) => el.is_fill);

      if (index < 0) {
        return false;
      }

      if (index == 0) {
        index = 2;
      } else {
        index = (index % 3) + 2;
      }

      return this.column.longTime > index;
    },

    /**
     * Проверяем нужно добавить класс или нет если элемент пересекает другой
     *
     * @returns {boolean}
     */
    isAddedHalf() {
      if (this.column.timeType || this.index != 0 || !this.column.is_fill) {
        return false;
      }

      let list = this.timeList.filter((item, index) => this.timeIndex > index);

      let data = list.filter((item, index) => item.list[0].longTime > this.timeIndex);

      return !!data[0];
    },

    /**
     * Проверяем нужно добавить класс или нет если элемент пересекает другой
     * @param {number} id - порядковый номер в массиве
     *
     * @returns {boolean}
     */
    isAddedClass() {
      return (id) => {
        if (!this.isFill) {
          return false;
        }

        let list = this.timeList.filter((item, index) => this.timeIndex > index);

        if (!list?.length) {
          return this.list[id]?.start;
        }

        let data = list.filter((item, index) => item.list[id].longTime > index);

        if (data[0]) {
          return true;
        }

        return !!this.list[id]?.start;
      };
    },

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
					isFill: this.column.is_fill,
        });
      }
    },
  },
};
</script>
