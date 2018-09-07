<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>查看人力资源申请</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<steps :procedures = 'procedures'></steps>
		<hr-apply :hr-data='hrData' :view-only='viewOnly'></hr-apply>
	</div>
</template>

<script>
import HRApply from '../../components/HRApply.vue'
export default {
	name: 'HRView',
	components: {
		"hr-apply": HRApply
	},
	data () {
		return {
			procedures: [],
			hrData: [],
			viewOnly: true
		}
	}
}
</script>

<style scoped>

</style>
