<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目预算</el-breadcrumb-item>
				<el-breadcrumb-item>待审批预算的项目计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<plan-book  v-bind:plan-book='planBook' :view-only='viewOnly'></plan-book>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>预算审批</h3>
				<el-form label-width="150px">
					<el-form-item label="审批意见">
						<el-input type='textarea' :rows='4' v-model='remark' style="width:40%;"></el-input>
					</el-form-item>
					<el-form-item label=" "> 
						<el-button type="success" @click="pass" class="fl" icon="el-icon-circle-check-outline">通过</el-button>
						<el-button type="danger" @click="notPass" class="fl" icon="el-icon-circle-close-outline">不通过</el-button>
						<el-button type="primary" @click="notSubmit" class="fl" icon="el-icon-circle-close-outline">邮件预算尚未提交</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
import PlanBook from '../../components/PlanBook.vue'
export default {
	name: 'ProBudgetApprove',
	components: {
		"plan-book": PlanBook
	},
	data () {
		return {
			remark:'',
			planBook:{},
			viewOnly: true,
			curId: this.$route.params.id,
			projectBudgetId: this.$route.params.budgetId,
			type: 1
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
		notPass(){
			this.$confirm('确定审批不通过吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'info'
			}).then(() => {
				let params = {};
				params.status = 2;
				params.projectBudgetId = this.projectBudgetId;
				params.remark = this.remark;
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
		},
		notSubmit(){

		}
	}
}
</script>

<style scoped>

</style>
