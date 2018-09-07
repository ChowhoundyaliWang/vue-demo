<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				<el-breadcrumb-item>查看用户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<user-info :user-id='userId' :is-disabled='isDisabled'></user-info>
	</div>
</template>

<script>
import UserInfo from '../../components/UserInfo'
export default {
	name: 'UserInfoView',
	components:{
		'user-info': UserInfo
	},
	data () {
		return {
			userId: this.$route.params.userId,
			isDisabled: true  // true表示用户信息只读；false表示用户信息可以编辑
		}
	}
}
</script>

<style scoped>

</style>
