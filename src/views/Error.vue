<template>
  <div class="success">
    <div class="success__wrapper">
      <p class="success__text">{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		errorText: {
			type: String,
			default: "",
		},
	},
};
</script>
