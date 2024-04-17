<template>
  <div class="add-in-calendar">
    <comment-input v-if="isInput" @openIsAddedHandler="openIsAdded"  @setDetailWindowHandler="setDetailWindowHandler"/>
    <success-seven  v-else-if="isAdded" :selectElement="selectElement" :email="email" @setDetailWindowHandler="setDetailWindowHandler"/>
    <!--<has-subscribe v-else-if="isAdded" />-->
  </div>
</template>

<script>
import SuccessSeven from "@/components/add-in-calendar/SuccessSeven.vue";
import HasSubscribe from "@/components/add-in-calendar/HasSubscribe.vue";
import CommentInput from '@/components/add-in-calendar/CommentInput.vue';


export default {
	props: {
		selectElement: {
			type: Object,
			default: () => {},
		},
	},
  components: { SuccessSeven, HasSubscribe, CommentInput },
	data() {
		return {
			isInput: true,
			isAdded: false,
			email: "",
		}
	},
	methods: {
		openIsAdded(email) {
			this.email = email;
			this.isInput = false;
			this.isAdded = true;
		},
		setDetailWindowHandler() {
			this.$emit("setDetailWindowHandler");
		},
	},
};
</script>
