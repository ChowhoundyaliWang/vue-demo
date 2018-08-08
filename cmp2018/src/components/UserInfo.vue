<template>
	<div class="page-content" id="userCreate">
			<el-card class="box-card" shadow="always">
				<h3>用户信息</h3>
				<el-form ref="copyUserData" :model="copyUserData" label-width="120px">
					<el-form-item label="类型" prop="type" :rules="[{required:true,message:'用户类型为必填项'}]">
						<el-select v-model="userData.type" :disabled='isDisabled' placeholder="请选择用户类型">
							<el-option v-for='item in roleList' :key='item.id' :label='item.name' :value='item.id'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="用户名" :rules="[
					{required:true,message:'用户名为必填项'}]"> 
						<el-input v-model="userData.userName" readOnly></el-input>
					</el-form-item>
					<el-form-item label="密码" :rules="[
					{required:true,message:'密码为必填项'}]">
						<el-input type="password" v-model="userData.password" :readOnly='isDisabled'></el-input>
					</el-form-item>
					<el-form-item label="姓名" :rules="[{required:true,message:'姓名为必填项'}]"> 
						<el-input v-model="userData.name" :readOnly='isDisabled'></el-input>
					</el-form-item>
					<el-form-item label="联系电话"> 
						<el-input v-model="userData.phone" :readOnly='isDisabled'></el-input>
					</el-form-item>
					<el-form-item label="职务" :rules="[{required:true, message:'职务为必填项'}]"> 
						<el-card>
							<!-- <el-tree ref="dutyTree" :data="dutyList" show-checkbox node-key="id" :default-checked-keys='userData.roleIds' :default-expand-all="true" @node-click="handleNodeClick" @check-change="handleCheckChange"></el-tree> -->
							<el-tree ref="dutyTree" :data="dutyList" show-checkbox node-key="id" :default-checked-keys='userData.roleIds' :default-expand-all="true"></el-tree>
						</el-card>
					</el-form-item>

					<!-- 职务选择销售会出现 销售所属大区-->
					<el-form-item label="销售所属大区" :rules="[{required:true,message:'职务为必填项'}]" v-show="regionShowFlag">
						<el-select placeholder="请选择" v-model="userData.regionId" :disabled='isDisabled'>
							<el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					
					<!-- 职务选择执行会出现 具体执行部门-->
					<el-form-item label="具体执行部门" :rules="[{required:true,message:'职务为必填项'}]" v-show="deptShowFlag">
						<el-select placeholder="请选择" v-model="userData.proDeptId" :disabled='isDisabled'>
							<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="权限" :rules="[
					{required:true,message:'权限为必填项'}]"> 
						<el-card>
							<el-tree ref="authorityTree" node-key="id" :data="authList" show-checkbox :default-expand-all="true" :default-checked-keys='userData.pramesList' :highlight-current='true'></el-tree>
						</el-card>
					</el-form-item>
					<el-form-item label="" v-if='!isDisabled'> 
						<el-button type="primary" @click="editUser" class="fl"icon="el-icon-document">保存</el-button>
						<el-button type="primary" @click="editUser" class="fl"icon="el-icon-refresh">重置</el-button>
					</el-form-item>
				</el-form>
			</el-card>
	</div>
</template>

<script>
export default {
	name: 'UserInfo',
	props:{
		userData:{
			type: Object,
			required: true
		},
		roleList:{
			type: Array,
			required: true
		},
		authList:{
			type: Array,
			required: true
		},
		dutyList:{
			type: Array,
			required:true
		},
		regionList:{
			type: Array,
			required: true
		},
		deptList:{
			type: Array,
			required: true
		},
		regionShowFlag:{
			type: Boolean,
			required: true
		},
		deptShowFlag:{
			type:Boolean,
			required: true
		},
		isDisabled:{
			type: Boolean,
			required: true
		}
	},
	data(){
		return {
			copyUserData: this.userData
		}
	},
	mounted (){
		
	},
	methods:{
		
	}
}
</script>

<style scoped>

</style>
