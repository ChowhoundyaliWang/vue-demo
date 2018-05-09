<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<!-- 工具条 -->
			<el-col :span="24" class="mx-tool-bar mb-16">
				<el-form :inline="true">
					<el-form-item>
						<el-input placeholder="请输入关键词"></el-input>
					</el-form-item>
				    <el-form-item>
				    	<el-button type="primary" @click="doFilter" icon="el-icon-search">查询</el-button>
				    </el-form-item>
				    <el-form-item>
				    	<router-link to="/UserCreate"><el-button type="primary" @click="createUser" class="fl"><i class="el-icon-plus"></i>新建用户</el-button></router-link>
				    </el-form-item>
				</el-form>
			</el-col>

			<!-- 表格 -->
			<el-table :data="tableData" border style="width:100%;">
				<el-table-column prop="data" ></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserManage',
	data () {
		return {
			
		}
	},
	methods:{
		doFilter(){
			console.log("查询，代码待补充")
		},
		createUser(){
			console.log("新建用户，代码待补充")
		}
	}
}
</script>

<style scoped>

</style>
