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
				<el-form ref="userData" :model="userData" label-width="120px">
					<el-form-item label="类型" prop="type" :rules="[{required:true,message:'用户类型为必填项'}]">
						<el-select v-model="userData.type" clearable placeholder="请选择用户类型">
							<el-option label="普通用户" value="2"></el-option>
							<el-option label="管理员" value="1"></el-option>
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
						<el-input v-model="userData.phone"></el-input>
					</el-form-item>
					<el-form-item label="职务" :rules="[{required:true,message:'职务为必填项'}]"> 
						<el-card>
							<el-tree ref="dutyTree" :data="dutiesData" show-checkbox node-key="id" :default-expand-all="true" @node-click="handleNodeClick" @check-change="handleCheckChange"></el-tree>
						</el-card>
					</el-form-item>

					<!-- 职务选择销售会出现 销售所属大区-->
					<el-form-item label="销售所属大区" :rules="[{required:true,message:'职务为必填项'}]" v-show="regionShowFlag">
						<el-select placeholder="请选择" v-model="userData.regionId">
							<el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					
					<!-- 职务选择执行会出现 具体执行部门-->
					<el-form-item label="具体执行部门" :rules="[{required:true,message:'职务为必填项'}]" v-show="deptShowFlag">
						<el-select placeholder="请选择" v-model="userData.proDeptId">
							<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="权限" :rules="[
					{required:true,message:'权限为必填项'}]"> 
						<el-card>
							<el-tree ref="authorityTree" node-key="id" :data="menuList" show-checkbox :default-expand-all="true"></el-tree>
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
		/*sessionStorage.setItem('0',1);*/
	},
	data () {
		return {
			userData:{
				type: "2",
				userName:"",
				password:"",
				name:"",
				phone:"",
				dutyIds:[],
				regionId:"",
				proDeptId:'',
				pramsList:[]
			},
			menuList:[],
			dutiesData:[],
			regionList:[],
			deptList:[],
			regionShowFlag: false,
			deptShowFlag: false
		}
	},
	mounted (){
		this.axios.get('/api/dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			model.forEach((val, ind)=>{
				val.disabled = "true";
			})
			this.dutiesData = model;
		});
		this.axios.get('/api/menu/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.menuList = model;
		});
		
		this.axios.get('/api/region/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.regionList = model;
		});
		this.axios.get('/api/pro-dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.deptList = model;
		});
	},
	methods:{
		handleNodeClick(data, node, obj){
			// 点击节点时回调
			/*console.log(data);
			console.log(node);
			console.log(obj);*/
		},
		handleCheckChange(data, checked, indeterminate){
			//节点选中状态发生变化时的回调
			// data —— 节点对应的对象
			// checked —— 节点本身是否被选中
			// indeterminate —— 节点的子树中是否有被选中的节点
			console.log(data);
			console.log(checked);
			//销售ID为11
			if(data.id == 11 && checked){
				this.regionShowFlag = true;
			}
			if(data.id == 11 && !checked){
				this.regionShowFlag = false;
			}

			// 项目执行中心ID为3
			if(data.id == 3 && this.deptShowFlag){
				this.deptShowFlag = false;
			}
			if(data.id == 3 && !this.deptShowFlag){
				this.deptShowFlag = true;
			}

			//总经理ID为18
			if(data.id == 18 && checked){
				let arrId = [1,94,9,41,42,18,67,68];
				this.$refs.authorityTree.setCheckedKeys(arrId, true);
			}
		},
		createUser(){
			this.userData.type = parseInt(this.userData.type);
			this.userData.dutyIds = this.$refs.dutyTree.getCheckedKeys();
			this.userData.pramsList = this.$refs.authorityTree.getCheckedKeys();
			console.log(this.userData);
			let params = this.userData;
			this.axios.post("/api/user/save",params,{ headers:{'Content-Type':'application/json;charset=UTF-8'} }).then((res)=>{
				let data = res.data;
				if(data.code == 200){
					//待做 增加提示框，提示添加成功
					let message = data.message;
                }else{
                    //请求失败
                    console.log("请求失败");
                }
            }).catch((res)=>{
               //请求异常处理
            })
		}
	}
}
</script>

<style scoped>

</style>
