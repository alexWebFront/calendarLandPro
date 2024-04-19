<template>
  <div class="add-in-calendar">
    <input-email
      v-if="isInputWindow && isLoadRequest"
      :name="selectElement.name"
      :eventId="selectElement.id"
      :response="response"
      :chatId="chatId"
      @setDetailWindowHandler="setDetailWindowHandler"
      @openInfoWindowHandler="openInfoWindow"
      @openChoiceWindowHandler="openChoiceWindow"
    />
    <info-window
      v-else-if="isInfoWindow && isLoadRequest"
      :text="text"
      @setDetailWindowHandler="setDetailWindowHandler"
    />
    <choice-window
      v-else-if="isChoiceWindow && isLoadRequest"
      :text="text"
      @selectSuccessHandler="selectSuccess"
      @selectErrorHandler="selectError"
    />

    <have-subscribe
      v-else-if="isHaveSubscribeWindow && isLoadRequest"
      @setDetailWindowHandler="setDetailWindowHandler"
      @openInputWindowHandler="openInputWindow"
    />

    <error-request
      v-else-if="isError && isLoadRequest"
      @setDetailWindowHandler="setDetailWindowHandler"
    />
  </div>
</template>

<script>
import InfoWindow from "@/components/add-in-calendar/InfoWindow.vue";
import ChoiceWindow from "@/components/add-in-calendar/ChoiceWindow.vue";
import InputEmail from "@/components/add-in-calendar/InputEmail.vue";
import ErrorRequest from "@/components/add-in-calendar/ErrorRequest.vue";
import HaveSubscribe from "@/components/add-in-calendar/HaveSubscribe.vue";
import { mapActions } from "vuex";

export default {
  props: {
    selectElement: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "",
    },
  },
  components: { InfoWindow, ChoiceWindow, InputEmail, ErrorRequest, HaveSubscribe },
  data() {
    return {
      isLoadRequest: false,
      isError: false,
      isInfoWindow: false,
      isInputWindow: false,
      isChoiceWindow: false,
      isHaveSubscribeWindow: false,

      text: "",
      chatId: 1,
      email: "",
      response: {},
			isOpenChoiceWindow: false,
    };
  },
  created() {
    this.setChatId();
    this.checkSubscribeUserHandler();
  },
  methods: {
    ...mapActions(["checkSubscribeUser", "updateSubscribeUser", "createSubscribeUser"]),

    setChatId() {
      const tg = window.Telegram.WebApp;
      tg.expand();
      //this.chatId = tg.initDataUnsafe?.user?.id;
    },

    setDetailWindowHandler() {
      this.$emit("setDetailWindowHandler");
    },

    openInputWindow() {
      this.isChoiceWindow = false;
      this.isHaveSubscribeWindow = false;
      this.isInputWindow = true;
    },

    openInfoWindow(text = "") {
      this.text = text;

      this.isInputWindow = false;
      this.isInfoWindow = true;
    },

    openChoiceWindow(data) {
      this.text = data.text;
      this.email = data.email;

      this.isInputWindow = false;
      this.isInfoWindow = false;
      this.isChoiceWindow = true;
    },

    selectSuccess() {
      if (this.response.lastUsedEmail && !this.response.isSubscriber && this.isOpenChoiceWindow) {
				this.isOpenChoiceWindow = false;

        this.createSubscribeUser({
          eventId: +this.selectElement.id,
          chatId: this.chatId,
          email: this.response.lastUsedEmail,
        }).then((resp) => {
          if (!resp.data) {
            this.text = `Событие "${this.selectElement.name}" добавлено в календарь по почте ${this.response.lastUsedEmail}!<p class='success__text-small'>Приглашение может прийти в течении нескольких часов</p>`;

            this.isChoiceWindow = false;
            this.isInputWindow = false;
            this.isInfoWindow = true;
          }
        });

        return;
      }

      this.updateSubscribeUser({
        eventId: +this.selectElement.id,
        chatId: this.chatId,
        email: this.email,
        updateAnotherSubscriptions: true,
      }).then((resp) => {
        this.text = `Событие "${this.selectElement.name}" перенесено на почту ${this.email}!Остальные подписки обновлены <p class='success__text-small'>Обновление может прийти в течении нескольких часов</p>`;

        this.isChoiceWindow = false;
        this.isInputWindow = false;
        this.isInfoWindow = true;
      });

      return;
    },

    selectError() {
      if (this.response.lastUsedEmail && !this.response.isSubscriber && this.isOpenChoiceWindow) {
				this.isOpenChoiceWindow = false;
        this.openInputWindow();

        return;
      }

      this.updateSubscribeUser({
        eventId: +this.selectElement.id,
        chatId: this.chatId,
        email: this.email,
        updateAnotherSubscriptions: false,
      }).then((resp) => {
        this.text = `Событие "${this.selectElement.name}" перенесено на почту ${this.email}!<p class='success__text-small'>Обновление может прийти в течении нескольких часов</p>`;

        this.isChoiceWindow = false;
        this.isInputWindow = false;
        this.isInfoWindow = true;
      });

      return;
    },

    checkSubscribeUserHandler() {
      this.checkSubscribeUser({
        eventId: this.selectElement.id,
        chatId: this.chatId,
      })
        .then((resp) => {
          this.response = resp.data;

          if (resp.data.lastUsedEmail && !resp.data.isSubscriber) {
            this.text = `Вам выслать приглашение на этот адрес ${resp.data.lastUsedEmail}?`;
						this.isOpenChoiceWindow = true;

            this.isChoiceWindow = true;

            return;
          }

          if (!resp.data.isSubscriber) {
            this.openInputWindow();
          } else {
            this.isHaveSubscribeWindow = true;
          }
        })
        .catch(() => {
          this.isError = true;
        })
        .finally(() => {
          this.isLoadRequest = true;
        });
    },
  },
};
</script>
