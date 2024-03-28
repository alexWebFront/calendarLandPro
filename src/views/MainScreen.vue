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
      <Table :headList="headList" :timeList="timeList"/>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";

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
        {firstRange: '8:00'},
        {firstRange: '9:00'},
        {firstRange: '10:00'},
        {firstRange: '11:00'},
        {firstRange: '12:00'},
        {firstRange: '13:00'},
        {firstRange: '14:00'},
        {firstRange: '15:00'},
        {firstRange: '16:00'},
      ]

    }
  },
}
</script>
