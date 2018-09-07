<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目预算</el-breadcrumb-item>
				<el-breadcrumb-item>已提交预算的项目</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<pro-budget  :cur-id='curId' :view-only='viewOnly'></pro-budget>
	</div>
</template>

<script>
import ProBudget from '../../components/ProBudget.vue'
export default {
	name: 'ProBudgetUpdate',
	components: {
		"pro-budget": ProBudget
	},
	data () {
		return {
			curId: this.$route.params.id,
			viewOnly: false
		}
	}
}
</script>

<style scoped>

</style>
