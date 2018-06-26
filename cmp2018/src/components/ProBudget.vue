<template>
		<div class="page-content min-w" id="userCreate"> 
			<el-card class="box-card mb-16" shadow="always">
				<h3>提交预算</h3>
				<el-form :model="params" label-width="150px" v-if='params'>
					<el-form-item label="项目名称">
						<span>{{params.projectName}}</span>
					</el-form-item>
					<el-form-item label="合同金额">
						<span>{{params.contractBill}}</span>
					</el-form-item>	
					<el-form-item label="合同金额大写">
						<span>{{params.contractBillChinesize}}</span>
					</el-form-item>	
					<el-form-item label='人力成本'>
						<el-input v-model='params.humanCost' readOnly></el-input>
						<span class="text-gr">{{ humanPer }}</span>
					</el-form-item>
					<el-form-item label='车辆成本'>
						<el-input v-model='params.carCost' readOnly></el-input>
						<span class='text-gr'>{{ carPer }}</span>
					</el-form-item>
					<el-form-item label='其他费用'>
						<el-input v-model='params.otherCost' readOnly></el-input>
						<span class='text-gr'>{{ otherPer }}</span>
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
			
		}
	},
	props:{
		params:{
			type: Object,
			required: true
		}
	},
	computed:{
		humanPer: function () {
			return (this.params.humanCost/this.params.contractBill*100).toFixed(2)+'%';
		},
		carPer: function () {
			return (this.params.carCost/this.params.contractBill*100).toFixed(2)+'%';
		},
		otherPer:function () {
			//this 指向vm实例
			return (this.params.otherCost/this.params.contractBill*100).toFixed(2)+'%';
		}
	},
	created () {
	},
	mounted () {
		
	},
	methods:{
	}
}
</script>

<style scoped>
span.text-gr{ color:#67c23a;}
</style>
