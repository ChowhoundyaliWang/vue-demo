<template>
		<div class="page-content min-w" id="userCreate"> 
			<el-card class="box-card mb-16" shadow="always">
				<h3>提交预算</h3>
				<el-form :model="planBook" label-width="150px">
					<el-form-item label="项目名称">
						<span>{{planBook.projectName}}</span>
					</el-form-item>
					<el-form-item label="合同金额">
						<span>{{planBook.contractBill}}</span>
					</el-form-item>	
					<el-form-item label="合同金额大写">
						<span>{{planBook.contractBillChinesize}}</span>
					</el-form-item>	
					<el-form-item label='人力成本'>
						<el-input v-model='planBook.humanCost' :readOnly='viewOnly'></el-input>
						<span class="text-gr">{{ humanPer }}</span>
					</el-form-item>
					<el-form-item label='车辆成本'>
						<el-input v-model='planBook.carCost' :readOnly='viewOnly'></el-input>
						<span class='text-gr'>{{ carPer }}</span>
					</el-form-item>
					<el-form-item label='其他费用'>
						<el-input v-model='planBook.otherCost' :readOnly='viewOnly'></el-input>
						<span class='text-gr'>{{ otherPer }}</span>
					</el-form-item>
					<el-form-item label='' v-if='!viewOnly'>
						<el-button type='success' @click='handleUpdate'>更新</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
</template>

<script>
export default {
	name: 'ProBudget',
	data () {
		return {
			planBook: {}
		}
	},
	props:{
		curId:{
			type: Number,
			required: true
		},
		viewOnly:{
			type: Boolean,
			required: true
		}
	},
	computed:{
		humanPer: function () {
			return (this.planBook.humanCost/this.planBook.contractBill*100).toFixed(2)+'%';
		},
		carPer: function () {
			return (this.planBook.carCost/this.planBook.contractBill*100).toFixed(2)+'%';
		},
		otherPer:function () {
			//this 指向vm实例
			return (this.planBook.otherCost/this.planBook.contractBill*100).toFixed(2)+'%';
		}
	},
	mounted () {
		this.axios.get('/api/projectBudget/get/'+ this.curId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.planBook = model;
			}
		});
	},
	methods:{
		handleUpdate(){
			this.axios.post('/api/projectBudget/save', this.planBook).then((res)=>{
				const data = res.data;
				if(data.code == 200){
					this.$alert(data.message, '提示');
				}else{
					this.$alert( data.message, '错误提示');
				}
			})
		}
	}
}
</script>

<style scoped>
span.text-gr{ color:#67c23a;}
</style>
