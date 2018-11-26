<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目预算</el-breadcrumb-item>
				<el-breadcrumb-item>已提交预算的项目</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<steps :procedures = 'procedures'></steps>
		<pro-budget  :cur-id='curId' :view-only='viewOnly'></pro-budget>
	</div>
</template>

<script>
import steps from '../../components/Steps.vue'
import ProBudget from '../../components/ProBudget.vue'
export default {
	name: 'ProBudgetView',
	components: {
		"steps": steps,
		"pro-budget": ProBudget
	},
	data () {
		return {
			procedures:[],
			curId: this.$route.params.id,
			taskId: this.$route.params.taskId,
			viewOnly: true
		}
	},
	mounted(){
		//获取项目任务书的步骤
		this.axios.get('/api/task/get/'+ this.taskId).then((res) => {
			const data = res.data;
			this.procedures = data.model.procedures;
		})
	}
}
</script>

<style scoped>

</style>
