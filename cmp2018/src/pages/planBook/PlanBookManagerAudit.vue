<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目计划书审核</el-breadcrumb-item>
				<el-breadcrumb-item>待审核的项目计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<plan-book  v-bind:plan-book='planBook' :view-only='viewOnly'></plan-book>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>计划书审核</h3>
				<el-form label-width="150px">
					<el-form-item label="审核意见">
						<el-input type='textarea' :rows='4' v-model='remark' style="width:40%;"></el-input>
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
import PlanBook from '../../components/PlanBook.vue'
export default {
	name: 'PlanBookManagerAudit',
	components: {
		"plan-book": PlanBook
	},
	data () {
		return {
			planBook:{},
			viewOnly: true,
			curId: this.$route.params.id,
			type: 1,
			remark:''
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
			this.$confirm('确定审核通过吗？','提示',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'info'
			}).then(()=>{
				let params = {};
				params.status = 3;
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
									path:'/planBooksAudited'
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
				params.status = 5;
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
									path:'/planBooksAudited'
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
