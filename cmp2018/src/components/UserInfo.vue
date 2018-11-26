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
						<el-input v-model="userData.userName" readOnly style='width: 200px;'></el-input>
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
					//销售ID为11，销售总监ID为21
					if(model.dutyIds.indexOf(11) > -1 || model.dutyIds.indexOf(21) > -1){
						this.regionShowFlag = true;
					}
					if(model.dutyIds.indexOf(13) > -1 || model.dutyIds.indexOf(14) > -1){
						this.deptShowFlag = true;
					}
				}
				this.userData = model;
			});
		},
		addMenu(addArr){
			let newMenu = new Set(this.userData.pramsList.concat(addArr));
			this.$refs.authTree.setCheckedKeys(newMenu);
		},
		cancleMenu(cancleArr){
			let newMenu = this.userData.pramsList.filter((val) => { 
				return cancleArr.indexOf(val) < 0;
			})
			this.$refs.authTree.setCheckedKeys(newMenu);
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
