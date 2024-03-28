<template>
  <div class="page">
    <div class="second-screen">
      <div class="top-content">
        <div class="top-content-container">
          <div class="top-content__date">
            <div class="top-content__date-wrapper">
              <div class="top-content__date-img">
                <img src="../assets/images/calendar.svg" alt="">
              </div>
              <p>20.04.24 СБ, <span>{{dayType}}</span></p>
            </div>
          </div>
          <router-link to="/" class="top-content__button-back">
            Назад
          </router-link>
        </div>
      </div>
      <Table/>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";
export default {
  components: {Table},
  props: {
    dayType: {
      type: String,
      default: 'Утро'
    },
  },
}
</script>
