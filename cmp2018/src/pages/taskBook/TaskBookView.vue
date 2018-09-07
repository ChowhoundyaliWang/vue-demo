<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>查看项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<steps :procedures = 'procedures'></steps>
		<task-book  v-bind:tb-infos='tbInfos' v-bind:dept-list='proDeptList' v-bind:manager-list='proManagerList'></task-book>
	</div>
</template>

<script>
import steps from '../../components/Steps.vue'
import TaskBook from '../../components/TaskBook.vue'
export default {
	name: 'TaskBookView',
	components: {
		"steps": steps,
		"task-book": TaskBook
	},
	data () {
		return {
			tbInfos:{
				record:{
					remark:'',
					status:''
				}
			},
			procedures: [],
			proDeptList:[],
			proManagerList:[],
			taskId: this.$route.params.id
		}
	},
	mounted (){
		this.axios.get('/api/pro-dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.proDeptList = model;
		});
		this.axios.get('/api/task/get/'+ this.taskId).then((res)=>{
			let data = res.data;
			if(data.code == 200){
				let model = data.model;
				this.tbInfos = model;
				this.procedures = model.procedures;
				this.axios.get('/api/pro-management/list',{params:{'id': this.tbInfos.proExecuteSubject}}).then((res)=>{
			       const data = res.data;
			       const model = data.model;
			       this.proManagerList = model;
		        });
			}
		});
	},
	methods:{
		getSummaries(param){
			return this.tableSum(param);
		}
	}
}
</script>

<style scoped>

</style>
