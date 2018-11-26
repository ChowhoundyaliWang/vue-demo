<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目预算</el-breadcrumb-item>
				<el-breadcrumb-item>待审批预算的项目计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<steps :procedures = 'procedures'></steps>
		<plan-book  v-bind:plan-book='planBook' :view-only='viewOnly'></plan-book>
		<pro-budget  :cur-id='projectBudgetId' :view-only='viewOnly'></pro-budget>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>预算审批</h3>
				<el-form label-width="150px">
					<el-form-item label="审批意见">
						<el-input type='textarea' :rows='8' v-model='remark' style="width:70%;"></el-input>
					</el-form-item>
					<el-form-item label=" "> 
						<el-button type="success" @click="pass" class="fl" icon="el-icon-circle-check-outline">通过</el-button>
						<el-button type="danger" @click="notPass" class="fl" icon="el-icon-circle-close-outline">不通过</el-button>
						<el-button type="primary" @click="notPass('notSubmit')" class="fl" icon="el-icon-circle-close-outline">邮件预算尚未提交</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>


	</div>
</template>

<script>
import steps from '../../components/Steps.vue'
import PlanBook from '../../components/PlanBook.vue'
import ProBudget from '../../components/ProBudget.vue'
export default {
	name: 'ProBudgetApprove',
	components: {
		"steps": steps,
		"plan-book": PlanBook,
		"pro-budget": ProBudget
	},
	data () {
		return {
			procedures: [],
			remark:'',
			planBook:{},
			viewOnly: true,
			curId: this.$route.params.id,
			projectBudgetId: this.$route.params.budgetId,
			taskId: this.$route.params.taskId,
			type: 1
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
		});
	},
	methods:{
		pass(){
			this.$confirm('确定审批通过吗？','提示',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'info'
			}).then(()=>{
				let params = {};
				params.status = 1;
				params.projectBudgetId = this.projectBudgetId;
				params.remark = this.remark;
				this.axios.post('/api/projectBudget/audit',params).then((res)=>{
					let data = res.data;
					if(data.code == 200){
						this.$alert("审批成功！",'提示',{
							confirmButtonText:'确定',
							callback: action => {
								this.$router.push({
									path:'/ProBudgetApproved'
								});
							}
						})
					}else{
						this.$alert(data.message, '错误提示');
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
		notPass(str){
			this.$confirm('确定审批不通过吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'info'
			}).then(() => {
				let params = {};
				params.status = 2;
				params.projectBudgetId = this.projectBudgetId;
				params.remark = str == 'notSubmit'? '邮件预算尚未提交':this.remark;
				this.axios.post('/api/projectBudget/audit',params).then((res)=>{
					let data = res.data;
					if(data.code == 200){
						this.$alert("审批成功！",'提示', {
							confirmButtonText:'确定',
							callback: action => {
								this.$router.push({
									path:'/ProBudgetApproved'
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
