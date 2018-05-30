<template>
	<el-menu :default-active="$route.path" class="mx-nav-menu" router>
		<el-submenu index="1">
			<template slot="title" class="menu-title first-title"><i class="el-icon-menu"></i>首页</template>
			<el-menu-item index="/cmp">我的首页</el-menu-item>
		</el-submenu>
		<el-submenu index="2">
			<template slot="title"  class="menu-title first-title"><i class="el-icon-document"></i>项目任务书</template>
			<el-submenu index="2-1">
				<template slot="title"  class="menu-title">项目任务书</template>
				<el-menu-item index="/TaskBookCreate">创建项目任务书</el-menu-item>
				<el-menu-item index="/TaskBookUnaudited">未审核的项目任务书</el-menu-item>
				<el-menu-item index="/TaskBookPassed">已通过的项目任务书</el-menu-item>
				<el-menu-item index="/TaskBookNotPassed">未通过的项目任务书</el-menu-item>
				<el-menu-item index="/TaskBooksView">查看项目任务书</el-menu-item>
				<el-menu-item index="2-1-6">执行主体为本部门的项目</el-menu-item>
				<el-menu-item index="2-1-7">设计类项目任务书</el-menu-item>
			</el-submenu>
			<el-submenu index="2-2">
				<template slot="title"  class="menu-title">项目任务书审核</template>
				<el-menu-item index="/TaskBookToBeAudited">待审核的项目任务书</el-menu-item>
				<el-menu-item index="/TaskBookAudited">已审核的项目任务书</el-menu-item>
			</el-submenu>
			<el-submenu index="2-3">
				<template slot="title"  class="menu-title">项目号分配</template>
				<el-menu-item index="2-3-1">待分配的项目任务书</el-menu-item>
				<el-menu-item index="2-3-2">已分配的项目任务书</el-menu-item>
			</el-submenu>
			<el-submenu index="2-4">
				<template slot="title"  class="menu-title">合同管理</template>
				<el-menu-item index="2-4-1">需上传合同的项目</el-menu-item>
				<el-menu-item index="2-4-2">合同上传记录</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title"  class="menu-title"><i class="el-icon-edit-outline"></i>项目计划书</template>
			<el-submenu index="3-1">
				<template slot="title"  class="menu-title">项目任务书接收</template>
				<el-menu-item index="3-1-1">待接收的项目任务书</el-menu-item>
				<el-menu-item index="3-1-2">已接收的项目任务书</el-menu-item>
				<el-menu-item index="3-1-3">TL已接收的项目任务书</el-menu-item>
			</el-submenu>
			<el-submenu index="3-2">
				<template slot="title"  class="menu-title">人力资源申请</template>
				<el-menu-item index="3-2-1">未反馈的人力资源申请</el-menu-item>
				<el-menu-item index="3-2-2">待接收的人力资源反馈</el-menu-item>
			</el-submenu>
			<el-submenu index="3-3">
				<template slot="title"  class="menu-title">人力资源申请反馈</template>
				<el-menu-item index="3-3-1">待反馈的人力资源申请</el-menu-item>
				<el-menu-item index="3-3-2">已反馈的人力资源申请</el-menu-item>
			</el-submenu>
			<el-submenu index="3-4">
				<template slot="title"  class="menu-title">项目计划书</template>
				<el-menu-item index="3-4-1">部门经理未审核的项目</el-menu-item>
				<el-menu-item index="3-4-2">执行副总未审核的项目</el-menu-item>
				<el-menu-item index="3-4-3">已通过的项目计划书</el-menu-item>
				<el-menu-item index="3-4-4">未通过的项目计划书</el-menu-item>
				<el-menu-item index="3-4-5">设计类项目计划书</el-menu-item>
			</el-submenu>
			<el-submenu index="3-5">
				<template slot="title"  class="menu-title">项目计划书审核</template>
				<el-menu-item index="3-5-1">待审核TL的项目计划书</el-menu-item>
				<el-menu-item index="3-5-2">已审核TL的项目计划书</el-menu-item>
				<el-menu-item index="3-5-3">待审核的项目计划书</el-menu-item>
				<el-menu-item index="3-5-4">已审核的项目计划书</el-menu-item>
			</el-submenu>
			<el-submenu index="3-6">
				<template slot="title"  class="menu-title">项目预算</template>
				<el-menu-item index="3-6-1">需提交预算的项目</el-menu-item>
				<el-menu-item index="3-6-2">已提交预算的项目</el-menu-item>
				<el-menu-item index="3-6-3">已通过预算审批的项目</el-menu-item>
				<el-menu-item index="3-6-4">未通过预算审批的项目</el-menu-item>
			</el-submenu>
			<el-submenu index="3-7">
				<template slot="title"  class="menu-title">预算审批</template>
				<el-menu-item index="3-7-1">待审批预算的项目计划书</el-menu-item>
				<el-menu-item index="3-7-2">已审批预算的项目计划书</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title"  class="menu-title"><i class="el-icon-star-on"></i>项目启动</template>
			<el-submenu index="4-1">
				<template slot="title"  class="menu-title">项目经理任命书</template>
				<el-menu-item index="4-1-1">待创建任命书的计划书</el-menu-item>
				<el-menu-item index="4-1-2">未修正的项目经理任命书</el-menu-item>
				<el-menu-item index="4-1-3">已修正的项目经理任命书</el-menu-item>
			</el-submenu>
			<el-submenu index="4-2">
				<template slot="title"  class="menu-title">项目经理任命书修正</template>
				<el-menu-item index="4-2-1">待修正的项目经理任命书</el-menu-item>
			</el-submenu>
			<el-submenu index="4-3">
				<template slot="title"  class="menu-title">项目经理任命书邮件</template>
				<el-menu-item index="4-3-1">未发送的任命书邮件</el-menu-item>
				<el-menu-item index="4-3-2">已发送的任命书邮件</el-menu-item>
			</el-submenu>
			<el-submenu index="4-4">
				<template slot="title"  class="menu-title">项目启动会议纪要</template>
				<el-menu-item index="4-4-1">未创建的会议纪要</el-menu-item>
				<el-menu-item index="4-4-2">已创建的会议纪要</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-submenu index="5">
			<template slot="title"  class="menu-title"><i class="el-icon-view"></i>项目监控</template>
			<el-submenu index="5-1">
				<template slot="title"  class="menu-title">合同落地提醒</template>
				<el-menu-item index="5-1-1">合同未落地的项目</el-menu-item>
				<el-menu-item index="5-1-2">第一次提醒（进度30%）</el-menu-item>
				<el-menu-item index="5-1-3">第二次提醒（进度50%）</el-menu-item>
				<el-menu-item index="5-1-4">合同已落地的项目</el-menu-item>
			</el-submenu>
			<el-submenu index="5-2">
				<template slot="title"  class="menu-title">上传满意度调查提醒</template>
				<el-menu-item index="5-2-1">需上传满意度调查的项目</el-menu-item>
			</el-submenu>
			<el-submenu index="5-3">
				<template slot="title"  class="menu-title">项目结束提醒</template>
				<el-menu-item index="5-3-1">项目即将结束（一个月）</el-menu-item>
			</el-submenu>
			<el-submenu index="5-4">
				<template slot="title"  class="menu-title">项目结束通知</template>
				<el-menu-item index="5-4-1">未审核的项目结束通知</el-menu-item>
				<el-menu-item index="5-4-2">已通过的项目结束通知</el-menu-item>
				<el-menu-item index="5-4-3">未通过的项目结束通知</el-menu-item>
			</el-submenu>
			<el-submenu index="5-5">
				<template slot="title"  class="menu-title">项目结束通知审核</template>
				<el-menu-item index="5-5-1">待审核的项目结束通知</el-menu-item>
				<el-menu-item index="5-5-2">已审核的项目结束通知</el-menu-item>
			</el-submenu>
			<el-submenu index="5-6">
				<template slot="title"  class="menu-title">项目关闭通知</template>
				<el-menu-item index="5-6-1">待创建关闭通知的项目</el-menu-item>
				<el-menu-item index="5-6-2">已创建的项目关闭通知</el-menu-item>
			</el-submenu>
			<el-submenu index="5-7">
				<template slot="title"  class="menu-title">设备归还情况</template>
				<el-menu-item index="5-7-1">需归还设备的项目</el-menu-item>
				<el-menu-item index="5-7-2">设备归还记录</el-menu-item>
			</el-submenu>
			<el-submenu index="5-8">
				<template slot="title"  class="menu-title">文件存档情况</template>
				<el-menu-item index="5-8-1">需创建文件存档的项目</el-menu-item>
				<el-menu-item index="5-8-2">文件存档记录</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-submenu index="6">
			<el-menu-item index="/UserManage">用户管理</el-menu-item>
			<template slot="title"  class="menu-title"><i class="el-icon-setting"></i>系统管理</template>
		</el-submenu>
	</el-menu>
</template>

<script>
export default {
	name: 'NavMenu',
	data () {
		return {
			menus:[]
		}
	}
}
</script>

<style scoped>
.menu-title.first-title{font-weight: bold;}
</style>
