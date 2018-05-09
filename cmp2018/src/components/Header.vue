<template>
	<div class="header">
		<div class="mx-log">
			<img src="../assets/logoMx.png" alt="Image Error!">
			<span class="mx-title">{{mxTitle}}</span>
		</div>
		<div class="userInfo">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link name-span">
					{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<!-- command 指令事件 -->
					<el-dropdown-item>我的消息</el-dropdown-item>
					<el-dropdown-item>修改密码</el-dropdown-item>
					<el-dropdown-item>退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Header',
	data () {
		return {
			mxTitle: '明讯网络项目流程控制平台CMPv1.0',
			userName:'Admin'
		}
	}
}
</script>

<style scoped>
.header{color: #ffffff;}
.header>div{display: inline-block;}
.mx-log img{height: 50px;padding: 5px 0;display: inline-block;margin-left: 14px;}
span.mx-title{ padding:0 32px;font-weight: 500;font-size: 23px;height: 60px;line-height: 60px;text-shadow: 1px 1px 2px #b1b5bb;display: inline-block;vertical-align: top;}
.userInfo{float: right;}
.userInfo .name-span{color: #ffffff;font-size: 18px;}
</style>
