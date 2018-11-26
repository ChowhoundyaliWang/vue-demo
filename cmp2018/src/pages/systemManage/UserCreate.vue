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
					<el-form-item label="用户名" :rules="[{required:true,message:'用户名为必填项'}]"> 
						<el-input v-model="userData.userName" style='width: 200px;'></el-input>
					</el-form-item>
					<el-form-item label="密码" :rules="[{required:true,message:'密码为必填项'}]">
						<el-input type="password" v-model="userData.password"></el-input>
					</el-form-item>
					<el-form-item label="姓名" :rules="[{required:true,message:'姓名为必填项'}]"> 
						<el-input v-model="userData.name"></el-input>
					</el-form-item>
					<el-form-item label="联系电话"> 
						<el-input v-model="userData.phone"></el-input>
					</el-form-item>
					<el-form-item label="职务" :rules="[{required:true, message:'职务为必填项'}]"> 
						<el-card>
							<el-tree ref="dutyTree" :data="dutiesData" node-key="id" show-checkbox :default-expand-all="true" @node-click="handleNodeClick" @check-change="handleCheckChange"></el-tree>
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
						<el-select placeholder="请选择" v-model="userData.executeDeptId">
							<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="权限" :rules="[{required:true,message:'权限为必填项'}]"> 
						<el-card>
							<el-tree ref="authTree" :data="menuList" show-checkbox :default-expand-all="true" node-key='id'></el-tree>
						</el-card>
					</el-form-item>
					<el-form-item label=" "> 
						<el-button type="primary" @click="createUser" class="fl"icon="el-icon-document">保存</el-button>
						<el-button type="primary" @click="resetUser" class="fl"icon="el-icon-refresh">重置</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserCreate',
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
				executeDeptId:'',
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
		//职务列表
		this.axios.get('/api/dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;

			model.forEach((val, ind)=>{
				val.disabled = "true";
			})
			this.dutiesData = model;
			console.log(this.dutiesData);
		});
		//菜单 权限列表
		this.axios.get('/api/menu/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.menuList = model;
			console.log(this.menuList);
			let idArr = [1,94];
			this.$refs.authTree.setCheckedKeys(idArr, true);
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
		addMenu(addArr){
			let menuKeys = this.$refs.authTree.getCheckedKeys();
			let newMenu = new Set(menuKeys.concat(addArr));
			this.$refs.authTree.setCheckedKeys(newMenu);
		},
		cancleMenu(cancleArr){
			let menuKeys = this.$refs.authTree.getCheckedKeys();
			let newMenu = menuKeys.filter((val) => { 
				return cancleArr.indexOf(val) < 0;
			})
			this.$refs.authTree.setCheckedKeys(newMenu);
		},
		handleNodeClick(data, node, obj){
			// 点击节点时回调
		},
		handleCheckChange(data, checked, indeterminate){
			//节点选中状态发生变化时的回调
			// data —— 节点对应的对象
			// checked —— 节点本身是否被选中
			// indeterminate —— 节点的子树中是否有被选中的节点

			let dutyKeys = this.$refs.dutyTree.getCheckedKeys();
			//销售ID为11，销售总监ID为23
			if( dutyKeys.indexOf(11) > -1 || dutyKeys.indexOf(23) > -1 ){
				this.regionShowFlag = true;
			}
			if( dutyKeys.indexOf(11) < 0 && dutyKeys.indexOf(23) < 0 ){
				this.regionShowFlag = false;
			}
			// 执行TLID为13，执行部门经理ID为14
			if( dutyKeys.indexOf(13) > -1 || dutyKeys.indexOf(14) > -1 ){
				this.deptShowFlag = true;
			}
			if( dutyKeys.indexOf(13) < 0 && dutyKeys.indexOf(14) < 0 ){
				this.deptShowFlag = false;
			}

			//销售 11
			if(data.id == 11 ){
				const idArr = [33,34,35,36,100,101,104,105,97,99];
				if(checked){
				    this.addMenu(idArr);
				}else{
                    this.cancleMenu(idArr);
				}
			}
			//总监 23 
            if(data.id == 23){
            	const idArr = [33,34,35,36,100,101,104,105,38,97,99];
				if(checked){
				    this.addMenu(idArr);
				}else{
                    this.cancleMenu(idArr)
				}
			}
			//运作 12
			 if(data.id == 12){
            	const idArr = [43,95,73,74,10,21];
				if(checked){
				    this.addMenu(idArr);
				}else{
                    this.cancleMenu(idArr)
				}
			}
			//综合查询 20

			//执行TL 13
			if(data.id == 13){
            	const idArr = [47,48,54,55,56,57,69,72,75,76,19,22];
				if(checked){
				    this.addMenu(idArr);
				}else{
                    this.cancleMenu(idArr)
				}
			}
			//执行部门经理 14
			if(data.id == 14){
            	const idArr = [39,47,48,49,12,55,56,57,59,60,63,64,65,66,69,72,75,76,17,19,22];
				if(checked){
				    this.addMenu(idArr);
				}else{
                    this.cancleMenu(idArr)
				}
			}

			//人力 15

			//副总 16

			//执行副总 17
			if(data.id == 17){
            	const idArr = [61,62];
				if(checked){
				    this.addMenu(idArr);
				}else{
                    this.cancleMenu(idArr)
				}
			}
			//总经理 18
			if(data.id == 18){
            	const idArr = [41,42,67 ,68,102,103,9,18,98];
				if(checked){
				    this.addMenu(idArr);
				}else{
                    this.cancleMenu(idArr)
				}
			}

			//管理员 19
			if(data.id == 19){
            	const idArr = [31,6];
				if(checked){
				    this.addMenu(idArr);
				}else{
                    this.cancleMenu(idArr)
				}
			}
		},
		createUser(){
			this.userData.type = parseInt(this.userData.type);
			this.userData.dutyIds = this.$refs.dutyTree.getCheckedKeys();
			this.userData.pramsList = this.$refs.authTree.getCheckedKeys();
			let params = this.userData;
			this.axios.post("/api/user/save",params,{ headers:{'Content-Type':'application/json;charset=UTF-8'} }).then((res)=>{
				let data = res.data;
				let message = data.message;
				if(data.code == 200){
					this.$alert( message , '提示', {
						confirmButtonText: '确定',
						callback: action => {
							this.$router.push({
									path:'/UserManage'
							});
						}
					});
                }else{
					this.$alert( message , '错误提示');
                }
            }).catch((res)=>{
               //请求异常处理
            })
		},
		resetUser(){
			this.userData = {
				type: "2",
				userName:"",
				password:"",
				name:"",
				phone:"",
				dutyIds:[],
				regionId:"",
				executeDeptId:'',
				pramsList:[]
			}
		}
	}
}
</script>

<style scoped>

</style>
