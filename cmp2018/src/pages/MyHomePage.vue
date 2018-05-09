<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>首页</el-breadcrumb-item>
				<el-breadcrumb-item>我的首页</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card" shadow="always" :model="userInfo">
				<h3>个人信息</h3>
				<div class="user-info">姓名：{{userInfo.userName}}</div>
				<div class="user-info">类型：{{userInfo.userType}}</div>
				<div class="user-info">部门：{{userInfo.department}}</div>
				<div class="user-info">职务：{{userInfo.userPost}}</div>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MyHomePage',
	created () {
		/*this.$ajax.get('').then((response)=>{

		}).catch((response)=>{
			
		})*/
	},
	data () {
		return {
			userInfo:{
				userName:"Admin",
				userType:"管理员",
				department:"",
				userPost:"管理员"
			}
		}
	}
}
</script>

<style scoped>
.page-content .box-card{ width: 440px;color:#48576a;}
.page-content h3{ border-bottom: 1px solid #e6e6e6; margin: 0 0 10px 0;padding-bottom: 10px;}
.page-content .user-info{ height: 30px;line-height: 30px; }
</style>
