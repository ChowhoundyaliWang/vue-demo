<template>
	<!-- 对比更新 -->
	<el-dialog title="更新记录" width='95%' :visible="budgetContrastShow" class='budget-inp' @close='closeDialog'>
		<div style="width:100%; height:400px;overflow-y: auto;" class="constrat">
			<div style="display: inline-block;width:49%;overflow-x: auto;vertical-align: top;">
				<div class="page-content" id="userCreate"> 
					<el-card class="box-card mb-16" shadow="always">
						<h3>项目预算</h3>
						<el-form :model="one" label-width="150px">
							<el-form-item label="项目名称" :class='{ changed: one.projectName !== another.projectName}'>
								<span>{{one.projectName}}</span>
							</el-form-item>
							<el-form-item label="合同金额" :class='{ changed: one.contractBill !== another.contractBill}'>
								<span>{{one.contractBill}}</span>
							</el-form-item>	
							<el-form-item label="合同金额大写" :class='{ changed: one.contractBillChinesize !== another.contractBillChinesize}'>
								<span>{{one.contractBillChinesize}}</span>
							</el-form-item>	
							<el-form-item label='人力成本' :class='{ changed: one.humanCost !== another.humanCost}'>
								<el-input v-model='one.humanCost'></el-input>
								<span class="text-gr">{{ humanPer }}</span>
							</el-form-item>
							<el-form-item label='车辆成本' :class='{ changed: one.carCost !== another.carCost}'>
								<el-input v-model='one.carCost'></el-input>
								<span class='text-gr'>{{ carPer }}</span>
							</el-form-item>
							<el-form-item label='其他费用'>
								<el-input v-model='one.otherCost' :class='{ changed: one.otherCost !== another.otherCost}'></el-input>
								<span class='text-gr'>{{ otherPer }}</span>
							</el-form-item>
						</el-form>
					</el-card>
				</div>
			</div>
			<div style="display: inline-block;width:50%;overflow-x: auto;vertical-align: top;">
				<div class="page-content" id="userCreate"> 
					<el-card class="box-card mb-16" shadow="always">
						<h3>项目预算</h3>
						<el-form :model="another" label-width="150px">
							<el-form-item label="项目名称" :class='{ changed: one.projectName !== another.projectName}'>
								<span>{{another.projectName}}</span>
							</el-form-item>
							<el-form-item label="合同金额" :class='{ changed: one.contractBill !== another.contractBill}'>
								<span>{{another.contractBill}}</span>
							</el-form-item>	
							<el-form-item label="合同金额大写" :class='{ changed: one.contractBillChinesize !== another.contractBillChinesize}'>
								<span>{{another.contractBillChinesize}}</span>
							</el-form-item>	
							<el-form-item label='人力成本' :class='{ changed: one.humanCost !== another.humanCost}'>
								<el-input v-model='another.humanCost'></el-input>
								<span class="text-gr">{{ anoHumanPer }}</span>
							</el-form-item>
							<el-form-item label='车辆成本' :class='{ changed: one.carCost !== another.carCost}'>
								<el-input v-model='another.carCost'></el-input>
								<span class='text-gr'>{{ anoCarPer }}</span>
							</el-form-item>
							<el-form-item label='其他费用' :class='{ changed: one.otherCost !== another.otherCost}'>
								<el-input v-model='another.otherCost'></el-input>
								<span class='text-gr'>{{ anoOtherPer }}</span>
							</el-form-item>
						</el-form>
					</el-card>
				</div>
			</div>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="closeDialog">关闭</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { mapState, mapActions } from 'Vuex'
export default {
	name: 'budgetContrast',
	data(){
		return { }
	},
	computed:{
		...mapState([
			'one', 'another', 'budgetContrastShow'
			]),
		humanPer: function () {
			return (this.one.humanCost/this.one.contractBill*100).toFixed(2)+'%';
		},
		carPer: function () {
			return (this.one.carCost/this.one.contractBill*100).toFixed(2)+'%';
		},
		otherPer:function () {
			//this 指向vm实例
			return (this.one.otherCost/this.one.contractBill*100).toFixed(2)+'%';
		},
		anoHumanPer: function () {
			return (this.another.humanCost/this.another.contractBill*100).toFixed(2)+'%';
		},
		anoCarPer: function () {
			return (this.another.carCost/this.another.contractBill*100).toFixed(2)+'%';
		},
		anoOtherPer:function () {
			//this 指向vm实例
			return (this.another.otherCost/this.another.contractBill*100).toFixed(2)+'%';
		}
	},
	methods:{
		...mapActions([
			'initVersions'
			]),
		closeDialog(){
			this.initVersions();
		}
	}
}
</script>

<style scoped>
.budget-inp .el-input__inner{ width: 100%; }
</style>