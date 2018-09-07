<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>合同管理</el-breadcrumb-item>
				<el-breadcrumb-item>上传合同</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<steps :procedures = 'procedures'></steps>
		
		<contract :contract='contract' :view-only='viewOnly'></contract>
	</div>
</template>

<script>
import steps from '../../components/Steps.vue'
import contract from '../../components/Contract.vue'
export default {
	name: 'ContractView',
	components: {
		"steps": steps,
		'contract': contract
	},
	data () {
		return {
			procedures: [],
			contract: {
				projectName: '1111',
				projectManager: '1111',
				equipmentAllocation: [
				   { name: '1111',version: '111',count: '111',startTime: '1111', endTime: '1111', remark: '111'},
				   { name: '1111',version: '111',count: '111',startTime: '1111', endTime: '1111', remark: '111'},
				]
			},
			viewOnly: true
		}
	},
	mounted (){
		console.log("加载contractUpload");
	},
	methods:{
		
	}
}
</script>

<style scoped>

</style>
