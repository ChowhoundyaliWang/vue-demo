<template>
	<!-- 对比更新 -->
		<div style="width:100%; height:400px;overflow-y: auto;" class="constrat">
			<div style="display: inline-block;width:49%;overflow-x: auto;vertical-align: top;">
				<plan-book :plan-book='one' :view-only='viewOnly'></plan-book>
			</div>
			<div style="display: inline-block;width:50%;overflow-x: auto;vertical-align: top;">
				<plan-book :plan-book='another' :view-only='viewOnly'></plan-book>
			</div>
		</div>
</template>

<script>
import planBook from 'PlanBook.vue'
export default {
	name: 'planBookContrast',
	components:{
		'plan-book': planBook
	},
	props:{
		onePb: Object,
		anotherPb: Object
	},
	data () {
		return {
			one: {},
			another: {},
			viewOnly: true
		}
	},
	watch: {
		onePb(val){
			this.one = val;
		},
		anotherPb(val){
			this.another = val;
		}
	},
	methods:{
		
	}
}
</script>

<style scoped>
</style>
