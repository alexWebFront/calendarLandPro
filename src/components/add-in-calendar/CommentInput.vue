<template>
  <div class="success">
    <button class="success__exit" @click="setDetailWindowHandler()">Выйти</button>
    <div class="success__wrapper">
      <div class="success__input-wrapper">
        <label class="success__label">Укажите email для отправки приглашения</label>
        <input type="text" class="success__input" v-model="email"/>
      </div>

      <div class="success__buttons success__buttons--fill">
        <button class="success__button" @click="openIsAddedHandler()">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			email: ""
		}
	},
	methods: {
		openIsAddedHandler() {
			this.$emit("openIsAddedHandler", this.email);
		},
		setDetailWindowHandler() {
			this.$emit("setDetailWindowHandler");
		},
	},
};
</script>
