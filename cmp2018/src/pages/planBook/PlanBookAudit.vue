<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目计划书审核</el-breadcrumb-item>
				<el-breadcrumb-item>待审核TL的项目计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<plan-book  v-bind:plan-book='planBook' :view-only='viewOnly' :audit-flag='auditFlag'></plan-book>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>计划书审核</h3>
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
import steps from '../../components/Steps.vue'
import PlanBook from '../../components/PlanBook.vue'
export default {
	name: 'PlanBookAudit',
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
			type: 1,
			viewOnly: true,
			auditFlag: true
		}
	},
	mounted (){
		//获取项目任务书的步骤
		this.axios.get('/api/task/get/'+ this.taskId).then((res) => {
			const data = res.data;
			this.procedures = data.model.procedures;
		}),
		this.axios.get('/api/planPaper/get/'+ this.curId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.planBook = model
			}
		});
	},
	methods:{
		pass(){
			this.$confirm('确定审核通过吗？','提示',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'info'
			}).then(()=>{
				let params = {};
				// 部门经理状态审核 通过 4， 执行副总审核 通过 3
				params.status = 4;
				params.planPaperId = this.curId;
				params.remark = this.remark;
				params.type = this.type;
				this.axios.post('/api/planPaper/audit',params).then((res)=>{
					let data = res.data;
					if(data.code == 200){
						this.$alert("审核成功！",'提示',{
							confirmButtonText:'确定',
							callback: action => {
								this.$router.push({
									path:'/TLPlanBooksAudited'
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
				// 部门经理状态审核 不通过 6， 执行副总审核 不通过 5
				params.status = 6;
				params.planPaperId = this.curId;
				params.remark = this.remark;
				params.type = this.type;
				this.axios.post('/api/planPaper/audit',params).then((res)=>{
					let data = res.data;
					if(data.code == 200){
						this.$alert("审核成功！",'提示', {
							confirmButtonText:'确定',
							callback: action => {
								this.$router.push({
									path:'/TLPlanBooksAudited'
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
