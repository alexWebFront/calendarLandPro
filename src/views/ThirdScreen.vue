<template>
  <div class="page third-screen-page">
    <div class="third-screen">
      <div class="top-content">
        <div class="top-content-container">
          <router-link to="/halls" class="top-content__button-back">
            Назад
          </router-link>
        </div>
      </div>
      <div class="third-screen__content">
        <div class="third-screen__container">
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/check.svg" alt="">
            </div>
            <div class="third-screen__title third-screen__text">А/В тесты и рекламная монетизация</div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/calendar.svg" alt="">
            </div>
            <div class="third-screen__date third-screen__text">20.04.24 СБ, 14:30 - 14:40</div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/location.svg" alt="">
            </div>
            <div class="third-screen__hall third-screen__text">Зал Ярославль</div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/speaker.svg" alt="">
            </div>
            <div class="third-screen__speaker third-screen__text">Ижболдин Денис Валерьевич</div>
          </div>
          <div class="third-screen__item">
            <div class="third-screen__img">
              <img src="../assets/images/notes.svg" alt="">
            </div>
            <div class="third-screen__description third-screen__text">
              История развлечений для взрослых — монетизация и механики

              - чем порно отличается от эротики?
              - какие дейтинг приложения бывают по тематикам, например для геев?
              - сколько заработал Тиндер и сколько у него скачиваний. На какой фиче он зарабатывает больше всего?
              - какая посещаемость Порнхаба, как он зарабатывает и какая выручка у его владельца?
              - какая посещаемость Вебкам сайтов, какие способы монетизации есть?
              - в каком году появилась чат рулетка и как она зарабатывает?
              - как порно драйвит экономику и как оно изменило технологии?
              - в каких странах вас посадят за что — где запрещено снимать, смотреть, отправлять порно или секстинг?
              - порно игрушки — это игрушка или нет?
              - кто сделал первый секс шоп?

              Вот так вот все интересно!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  created() {
    this.getEventsInfoHandler()
  },
  computed: {
    ...mapGetters(["eventsInfo"]),
  },
  methods: {
    ...mapActions(['getEventsInfo']),
    getEventsInfoHandler() {
      this.getEventsInfo()
    }
  },
}
</script>
