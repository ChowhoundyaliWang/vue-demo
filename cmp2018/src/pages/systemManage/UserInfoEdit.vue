<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				<el-breadcrumb-item>编辑用户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<user-info :user-id='userId' :is-disabled='isDisabled'></user-info>
	</div>
</template>

<script>
import userInfo from '../../components/UserInfo.vue'
export default {
	name: 'UserInfoEdit',
	components:{
		"user-info": userInfo
	},
	data () {
		return {
			userId: this.$route.params.userId,
			isDisabled: false
		}
	}
}
</script>

<style scoped>

</style>
