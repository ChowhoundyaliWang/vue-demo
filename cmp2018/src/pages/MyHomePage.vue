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
				<div class="user-info">姓名：<span>{{userInfo.userName}}</span></div>
				<div class="user-info">类型：<span>{{userInfo.type}}</span></div>
				<div class="user-info">部门：<span>{{userInfo.executeDept}}</span></div>
				<div class="user-info">职务：<span>{{userInfo.duties}}</span></div>
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
			userInfo:{}
		}
	},
	mounted(){
		let userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if( userInfo.type == 1){
			userInfo.type = '管理员'
		}else if(userInfo.type == 2){
			userInfo.type = '普通用户';
		}
		this.userInfo = userInfo;
	}
}
</script>

<style scoped>
.page-content .box-card{ width: 440px;color:#48576a;}
.page-content h3{ border-bottom: 1px solid #e6e6e6; margin: 0 0 10px 0;padding-bottom: 10px;}
.page-content .user-info{ height: 30px;line-height: 30px;}
.page-content .user-info span{ font-weight: 600px; }
</style>
