<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>待审核的项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<steps :procedures = 'procedures'></steps>
		<task-book  v-bind:tb-infos='tbInfos' v-bind:dept-list='proDeptList' v-bind:manager-list='proManagerList'></task-book>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>任务书审核</h3>
				<el-form label-width="150px">
					<el-form-item label="审核意见">
						<el-input type='textarea' :rows='8' v-model='remark' style="width:70%;"></el-input>
					</el-form-item>
					<el-form-item label=" "> 
						<el-button type="primary" @click="pass" class="fl" icon="el-icon-circle-check-outline">通过</el-button>
						<el-button type="primary" @click="notPass" class="fl" icon="el-icon-circle-close-outline">不通过</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
import TaskBook from '../../components/TaskBook'
import steps from '../../components/Steps.vue'
export default {
	name: 'TaskBookAuditing',
	components:{
		"steps": steps,
		"task-book": TaskBook
	},
	data () {
		return {
			tbInfos:{
				record:{
					remark:'',
					status:''
				},
				executeCycle: []
			},
			procedures:[],
			proDeptList:[],
			proManagerList:[],
			remark:'',
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
		getSummaries(param) {
			return this.tableSum(param);
		},
		pass(){
			this.$confirm('确定审核通过吗？','提示',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'info'
			}).then(()=>{
				let params = {};
				params.status = 2;
				params.taskId = this.taskId;
				params.remark = this.remark;
				this.axios.post('/api/task/audit',params).then((res)=>{
					let data = res.data;
					if(data.code == 200){
						this.$alert("审核成功！",'提示',{
							confirmButtonText:'确定',
							callback: action => {
								this.$router.push({
									path:'/TaskBookAudited'
								});
							}
						})
					}
				}).catch((error)=>{

				});
			}).catch(()=>{
				this.$message({
					type: 'info',
					message: '已取消审核'
				}); 
			})
		},
		notPass(){
			this.$confirm('确定审核不通过吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'info'
			}).then(() => {
				let params = {};
				params.status = 4;
				params.taskId = this.taskId;
				params.remark = this.remark;
				this.axios.post('/api/task/audit',params).then((res)=>{
					let data = res.data;
					if(data.code == 200){
						this.$alert("审核成功！",'提示', {
							confirmButtonText:'确定',
							callback: action => {
								this.$router.push({
									path:'/TaskBookAudited'
								})
							}
						})
					}
				}).catch((error)=>{

				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消审核'
				});          
			});
			
		}
	}
}
</script>

<style scoped>

</style>
