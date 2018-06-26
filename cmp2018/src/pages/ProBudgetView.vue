<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目预算</el-breadcrumb-item>
				<el-breadcrumb-item>已提交预算的项目</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<pro-budget  v-bind:params='planBook'></pro-budget>
	</div>
</template>

<script>
import ProBudget from '../components/ProBudget.vue'
export default {
	name: 'ProBudgetView',
	components: {
		"pro-budget": ProBudget
	},
	data () {
		return {
			planBook:{},
			curId: this.$route.params.id
		}
	},
	mounted (){
		this.axios.get('/api/projectBudget/get/'+ this.curId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.planBook = model;
			}
		});
	},
	methods:{
		
	}
}
</script>

<style scoped>

</style>
