<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目关闭通知</el-breadcrumb-item>
				<el-breadcrumb-item>查看项目关闭通知单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<close-list :close-list-id='closeListId'></close-list>
	</div>
</template>

<script>
import CloseList from '../../components/CloseList'
export default {
	name: 'CloseListView',
	components:{
		'close-list': CloseList
	},
	data () {
		return {
			closeListId: this.$route.params.id
		}
	}
}
</script>

<style scoped>
</style>

