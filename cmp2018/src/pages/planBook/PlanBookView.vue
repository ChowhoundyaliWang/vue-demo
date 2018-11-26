<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>查看项目计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<steps :procedures = 'procedures'></steps>
		<plan-book  v-bind:plan-book='planBook' :view-only='viewOnly'></plan-book>
	</div>
</template>

<script>
import steps from '../../components/Steps.vue'
import PlanBook from '../../components/PlanBook.vue'
export default {
	name: 'PlanBookView',
	components: {
		"steps": steps,
		"plan-book": PlanBook
	},
	data () {
		return {
			procedures: [],
			planBook:{},
			curId: this.$route.params.id,
			taskId: this.$route.params.taskId,
			viewOnly: true
		}
	},
	mounted (){
		//获取项目任务书的步骤
		this.axios.get('/api/task/get/'+ this.taskId).then((res) => {
			const data = res.data;
			this.procedures = data.model.procedures;
		});
		this.axios.get('/api/planPaper/get/'+ this.curId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.planBook = model;
			}
		})
	}
}
</script>

<style scoped>

</style>
