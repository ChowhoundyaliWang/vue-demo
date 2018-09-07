<template>
	<div class="page-content" id="userCreate">
			<el-card class="box-card" shadow="always">
				<h3>用户信息</h3>
				<el-form :model="userData" label-width="120px">
					<el-form-item label="类型" prop="type">
						<el-select v-model="userData.type" :disabled='isDisabled' placeholder="请选择用户类型">
							<el-option v-for='item in roleList' :key='item.id' :label='item.name' :value='item.id'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="用户名"> 
						<el-input v-model="userData.userName" readOnly></el-input>
					</el-form-item>
					<el-form-item label="姓名"> 
						<el-input v-model="userData.name" :readOnly='isDisabled'></el-input>
					</el-form-item>
					<el-form-item label="联系电话"> 
						<el-input v-model="userData.phone" :readOnly='isDisabled'></el-input>
					</el-form-item>
					<el-form-item label="职务"> 
						<el-card v-loading='dutyLoading'>
							<el-tree ref="dutyTree" :data="dutyList" show-checkbox node-key="id" :default-checked-keys='userData.dutyIds' :default-expand-all="true" @node-click="handleNodeClick" @check-change="handleCheckChange"></el-tree>
						</el-card>
					</el-form-item>

					<!-- 职务选择销售会出现 销售所属大区-->
					<el-form-item label="销售所属大区" v-show="regionShowFlag">
						<el-select placeholder="请选择" v-model="userData.regionId" :disabled='isDisabled'>
							<el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					
					<!-- 职务选择执行会出现 具体执行部门-->
					<el-form-item label="具体执行部门" v-show="deptShowFlag">
						<el-select placeholder="请选择" v-model="userData.executeDeptId" :disabled='isDisabled'>
							<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="权限"> 
						<el-card v-loading='authLoading'>
							<el-tree ref="authTree" node-key="id" :data="authList" show-checkbox :default-expand-all="true" :default-checked-keys='userData.pramsList' :highlight-current='true'></el-tree>
						</el-card>
					</el-form-item>
					<el-form-item label="" v-if='!isDisabled'> 
						<el-button type="primary" @click="editUser" class="fl"icon="el-icon-document">保存</el-button>
						<el-button type="primary" @click="resetUser" class="fl"icon="el-icon-refresh">重置</el-button>
					</el-form-item>
				</el-form>
			</el-card>
	</div>
</template>

<script>
export default {
	name: 'UserInfo',
	props:{
		userId:{
			required: true
		},
		isDisabled:{
			type: Boolean,
			required: true
		}
	},
	data(){
		return {
			dutyLoading: true,
			authLoading: true,
			userData:{},
			roleList:[
			  { id: 1, name:"管理员"},
			  { id: 2, name:"普通用户"}
			],
			regionList:[],  //销售所属大区列表
			deptList:[],  //具体执行部门列表
			regionShowFlag: false,  //销售所属大区列表是否显示
			deptShowFlag: false, //执行部门列表是否显示
			dutyList:[],  //职务列表
			authList:[],   //权限列表
		}
	},
	mounted (){
		this.getUserData();
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
		this.axios.get('/api/dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			if(this.isDisabled){
				model.forEach((val, ind)=>{
					val.disabled = "true";
					let children = val.children;
					children.forEach((value, index)=>{
						value.disabled = 'true';
					})
				})
			}
			this.dutyList = model;
			this.dutyLoading = false;
		});
		this.axios.get('/api/menu/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			if(this.isDisabled){
				model.forEach((val, ind)=>{
					val.disabled = "true";
					let children = val.children;
					children.forEach((value, index)=>{
						value.disabled = 'true';
						if(value.children){
							let sChildren = value.children;
							if(sChildren.length>0){
								sChildren.forEach((sValue, sIndex)=>{
									sValue.disabled = 'true';
								})
							}
						}
					})
				})
			}
			this.authList = model;
			this.authLoading = false;
		});
	},
	methods:{
		getUserData(){
			this.axios.get('/api/user/get/'+ this.userId).then((res)=>{
				const data = res.data;
				const model = data.model;
				if(model.dutyIds && model.dutyIds.length > 0){
					if(model.dutyIds.indexOf(1) > -1){
						this.regionShowFlag = true;
					}
					if(model.dutyIds.indexOf(13) > -1 || model.dutyIds.indexOf(14) > -1){
						this.deptShowFlag = true;
					}
				}
				this.userData = model;
			});
		},
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
			
			//销售ID为11
			/*if(data.id == 11 && checked){
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
				this.$refs.authTree.setCheckedKeys(arrId, true);
			}*/
		},
		editUser(){
			this.userData.type = parseInt(this.userData.type);
			this.userData.dutyIds = this.$refs.dutyTree.getCheckedKeys();
			this.userData.pramsList = this.$refs.authTree.getCheckedKeys();
			let params = this.userData;
			this.axios.post("/api/user/modify",params,{ headers:{'Content-Type':'application/json;charset=UTF-8'} }).then((res)=>{
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
			this.getUserData();
		}
	}
}
</script>

<style scoped>

</style>
