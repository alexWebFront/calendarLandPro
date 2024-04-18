<template>
  <div class="success">
    <div class="success__wrapper">
      <p class="success__text">Упс! Что-то пошло не так 😔 Попробуйте повторить попытку позже</p>

      <div class="success__buttons success__buttons--center">
        <button class="success__button" @click="setDetailWindowHandler()">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	methods: {
		setDetailWindowHandler() {
			this.$emit("setDetailWindowHandler");
		}
	},
};
</script>
