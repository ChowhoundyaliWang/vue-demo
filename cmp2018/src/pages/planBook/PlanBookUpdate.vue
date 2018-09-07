<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>更新项目计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<plan-book  v-bind:plan-book='planBook'></plan-book>
	</div>
</template>

<script>
import PlanBook from '../../components/PlanBook.vue'
export default {
	name: 'PlanBookView',
	components: {
		"plan-book": PlanBook
	},
	data () {
		return {
			planBook:{},
			curId: this.$route.params.id,
			viewOnly: true
		}
	},
	mounted (){
		this.axios.get('/api/planPaper/get/'+ this.curId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.planBook = model;
			}
		});
	}
}
</script>

<style scoped>

</style>