<template>
  <div class="success">
		<button class="success__exit" @click="setDetailWindowHandler()">Выйти</button>
    <div class="success__wrapper">
      <p class="success__text">Вы уже подписаны на это событие. Хотите перенести это событие на другую почту?</p>

      <div class="success__buttons success__buttons--center">
        <button class="success__button" @click="openInputWindowHandler()">Да</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	methods: {
		setDetailWindowHandler() {
			this.$emit("setDetailWindowHandler");
		},
		openInputWindowHandler() {
			this.$emit("openInputWindowHandler");
		},
	},
};
</script>
