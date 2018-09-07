<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>查看项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<task-book  v-bind:tb-infos='tbInfos' v-bind:dept-list='proDeptList' v-bind:manager-list='proManagerList'></task-book>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>任务书接收</h3>
				<el-form label-width="120px">
					<el-form-item label=" "> 
						<el-button type="success" @click="" class="fl" icon="el-icon-star-off">申请人力资源</el-button>
						<el-button type="success" @click="toCreate" class="fl" icon="el-icon-circle-check-outline">创建项目计划书</el-button>
					</el-form-item>
				</el-form>	
			</el-card>
		</div>
	</div>
</template>

<script>
import TaskBook from '../../components/TaskBook.vue'
export default {
	name: 'TaskBookReceived',
	components: {
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
		},
		toCreate(){
			if(this.tbInfos.planPaperId){
				this.$router.push({
					name:'PlanBookUpdate', params:{ id: this.tbInfos.id,  planPaperId: this.tbInfos.planPaperId }
				})
			}else{
				this.$router.push({
					name:'PlanBookCreate', params:{ id: this.tbInfos.id }
				})
			}	 
		}
	}
}
</script>

<style scoped>

</style>
