<template>
  <div class="success">
    <button class="success__exit" @click="setDetailWindowHandler()">Выйти</button>
    <div class="success__wrapper">
      <div class="success__input-wrapper">
        <label class="success__label">Укажите email для отправки приглашения</label>
        <input type="email" class="success__input" v-model="email" />
        <p v-if="isError" class="success__error">{{ textError }}</p>
      </div>

      <div class="success__buttons success__buttons--fill">
        <button class="success__button" @click="sendEmailForCheck()">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    eventId: {
      type: Number,
      default: 0,
    },
    response: {
      type: Object,
      default: () => {},
    },
    chatId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      email: "",
      isError: false,
      textError: "",
    };
  },
  methods: {
    ...mapActions(["createSubscribeUser", "updateSubscribeUser"]),
    sendEmailForCheck() {
      if (this.email.length <= 2) {
        this.textError = "Минимальное количество символов 3";
        this.isError = true;

        return;
      }

      if (
        !String(this.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        this.textError = "Некорректная почта";
        this.isError = true;

        return;
      }

      this.textError = "";
      this.isError = false;

      if (
        this.response.lastUsedEmail &&
        this.response.isSubscriber &&
        !this.response.anotherSubscriptions
      ) {
        this.updateSubscribeUser({
          eventId: +this.eventId,
          chatId: this.chatId,
          email: this.email,
          updateAnotherSubscriptions: false,
        }).then((resp) => {
            this.$emit(
              "openInfoWindowHandler",
              `Событие "${this.name}" перенесено на почту ${this.email}!`
            );
         
        });

				return
      }

      if (
        this.response.lastUsedEmail &&
        this.response.isSubscriber &&
        this.response.anotherSubscriptions
      ) {
        this.$emit(
          "openChoiceWindowHandler",
      		{
      			text:  `У вас есть подписки на другие события. Желаете перенести события на указанную почту?`,
      			email: this.email,
      		}
        );

        return;
      }

      this.createSubscribeUser({
        eventId: +this.eventId,
        chatId: this.chatId,
        email: this.email,
      }).then((resp) => {
        if (!resp.data) {
          this.$emit(
            "openInfoWindowHandler",
            `Событие "${this.name}" добавлено в календарь по почте ${this.email}!`
          );
        }
      });
    },
    setDetailWindowHandler() {
      this.$emit("setDetailWindowHandler");
    },
  },
};
</script>
