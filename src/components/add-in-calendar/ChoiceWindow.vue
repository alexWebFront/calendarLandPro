<template>
  <div class="success">
		<button class="success__exit"  @click="setDetailWindowHandler()">Выйти</button>
    <div class="success__wrapper">
      <p class="success__text">{{ text }}</p>

      <div class="success__buttons">
        <button class="success__button" @click="selectSuccessHandler()">Да</button>
        <button class="success__button" @click="selectErrorHandler()">Нет</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: "",
		},
	},
	methods: {
		setDetailWindowHandler() {
			this.$emit("setDetailWindowHandler");
		},
		selectSuccessHandler() {
			this.$emit("selectSuccessHandler");
		},
		selectErrorHandler() {
			this.$emit("selectErrorHandler");
		},
	},
};
</script>
