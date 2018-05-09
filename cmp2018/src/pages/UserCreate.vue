<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				<el-breadcrumb-item>新建用户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content" id="userCreate">
			<el-card class="box-card" shadow="always">
				<h3>用户信息</h3>
				<el-form ref="userData" :model="userData" label-width="100px">
					<el-form-item 
					label="类型" 
					prop="type" 
					:rules="[
					{required:true,message:'用户类型为必填项'}]">
						<el-select v-model="userData.type" clearable placeholder="请选择用户类型">
							<el-option label="普通用户" value="user"></el-option>
							<el-option label="管理员" value="admin"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="用户名" :rules="[
					{required:true,message:'用户名为必填项'}]"> 
						<el-input v-model="userData.userName"></el-input>
					</el-form-item>
					<el-form-item label="密码" :rules="[
					{required:true,message:'密码为必填项'}]">
						<el-input type="password" v-model="userData.password"></el-input>
					</el-form-item>
					<el-form-item label="姓名" :rules="[
					{required:true,message:'姓名为必填项'}]"> 
						<el-input v-model="userData.name"></el-input>
					</el-form-item>
					<el-form-item label="联系电话"> 
						<el-input v-model="userData.mobileNumber"></el-input>
					</el-form-item>
					<el-form-item label="职务" :rules="[
					{required:true,message:'职务为必填项'}]"> 
						<el-card>
							<el-tree :data="dutiesData" show-checkbox default-expand-all="true"></el-tree>
						</el-card>
					</el-form-item>
					<el-form-item label="权限" :rules="[
					{required:true,message:'权限为必填项'}]"> 
						<el-card>
							<el-tree :data="dutiesData" show-checkbox default-expand-all="true"></el-tree>
						</el-card>
					</el-form-item>
					<el-form-item label=" "> 
						<el-button type="primary" @click="createUser" class="fl"icon="el-icon-document">保存</el-button>
						<el-button type="primary" @click="createUser" class="fl"icon="el-icon-refresh">重置</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserCreate',
	created (){
		this.axios.get('/api/dept/list').then(function(res){
			var dutiesData = res.data.model;
			sessionStorage.setItem('dutiesData',JSON.stringify(dutiesData));
		});
	},
	data () {
		return {
			userData:{
				type:"user",
				userName:"",
				password:"",
				name:"",
				mobileNumber:""
			},
			dutiesData:[],
		}
	},
	mounted (){
		var data = sessionStorage.getItem('dutiesData');
		data = JSON.parse(data);
		this.dutiesData = data;
	}
}
</script>

<style scoped>

</style>
