<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目预算</el-breadcrumb-item>
				<el-breadcrumb-item>需提交预算的项目</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<steps :procedures = 'procedures'></steps>
		<div class="page-content min-w" id="userCreate"> 
			<el-card class="box-card mb-16" shadow="always">
				<h3>提交预算</h3>
				<el-form :model="params" label-width="150px">
					<el-form-item label="项目名称">
						<span v-text = 'params.projectName'></span>
					</el-form-item>
					<el-form-item label="合同金额">
						<span>{{params.contractBill}}</span>
					</el-form-item>	
					<el-form-item label="合同金额大写">
						<span>{{params.contractBillChinesize}}</span>
					</el-form-item>	
					<el-form-item label='人力成本'>
						<el-input v-model='params.humanCost' @change='calHumanCost' type='number'></el-input>
						<span v-text='humanPer' class="text-gr"></span>
					</el-form-item>
					<el-form-item label='车辆成本'>
						<el-input v-model='params.carCost' @change='calCarCost' type='number'></el-input>
						<span v-text='carPer' class='text-gr'></span>
					</el-form-item>
					<el-form-item label='其他费用'>
						<el-input v-model='params.otherCost' @change='calOtherCost' type='number'></el-input>
						<span v-text='otherPer' class='text-gr'></span>
					</el-form-item>
					<el-form-item label=''>
						<el-button type='success' @click='handleSubmit()'>提交</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
import steps from '../../components/Steps.vue'
export default {
	name: 'ProBudgetSubmit',
	components: {
		"steps": steps
	},
	data () {
		return {
			procedures: [],
			taskId: this.$route.params.taskId,
			params:{
				planPaperId: this.$route.params.id,
				projectName:'',
				contractBill:'',
				contractBillChinesize:'',
				humanCost:'',
				carCost:'',
				otherCost:''
			},
			humanPer:'0.00%',
			carPer:'0.00%',
			otherPer:'0.00%'
		}
	},
	mounted () {
		//获取项目任务书的步骤
		this.axios.get('/api/task/get/'+ this.taskId).then((res) => {
			const data = res.data;
			this.procedures = data.model.procedures;
		}),
		this.axios.get('/api/projectBudget/getParameters/'+ this.params.planPaperId).then((res)=>{
			let data = res.data;
			if(data.code == 200){
				let model = data.model;
				this.params.projectName = model.projectName;
				this.params.contractBill = model.contractBill;
				this.params.contractBillChinesize = model.contractBillChinesize;
			}
		}).catch((res)=>{

		})
	},
	methods:{
        calHumanCost(val){
        	this.humanPer = (parseInt(val)/this.params.contractBill*100).toFixed(2)+'%';
        },
        calCarCost(val){
        	this.carPer = (parseInt(val)/this.params.contractBill*100).toFixed(2)+'%';
        },
        calOtherCost(val){
        	this.otherPer = (parseInt(val)/this.params.contractBill*100).toFixed(2)+'%';
        },
		handleSubmit(){
			let params = this.params;
			this.axios.post('/api/projectBudget/add', params).then((res)=>{
				let data = res.data;
				let msg = data.message;
				if(data.code == 200){
					this.$alert(msg,'提示',{
						confirmButtonText:'确定',
						callback: action => {
							this.$router.push({
								path:'/ProBudgetSumbitted'
							});
						}
					})
				}else{
					this.$alert(msg, '错误提示');
				}
			}).catch((res)=>{

			})
		}
	}
}
</script>

<style scoped>
span.text-gr{ color:#67c23a; }
</style>
