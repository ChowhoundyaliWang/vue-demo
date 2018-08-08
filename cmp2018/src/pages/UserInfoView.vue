<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				<el-breadcrumb-item>新建用户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<user-info :user-data='userData' :role-list='roleList' :auth-list='authList' :duty-list ='dutyList' :region-list='regionList' :dept-list='deptList' :region-show-flag='regionShowFlag' :dept-show-flag='deptShowFlag' :is-disabled='isDisabled'></user-info>
	</div>
</template>

<script>
import UserInfo from '../components/UserInfo'
export default {
	name: 'UserInfoView',
	components:{
		'user-info': UserInfo
	},
	data () {
		return {
			userData:{},
			roleList:[
			  { id: 1, name:"管理员"},
			  { id: 2, name:"普通用户"}
			],
			authList:[],   //权限列表
			dutyList:[],  //职务列表
			regionList:[],  //销售所属大区列表
			deptList:[],  //具体执行部门列表
			regionShowFlag: false,  //大区列表是否显示
			deptShowFlag: false, //执行部门列表是否显示
			userId: this.$route.params.userId,
			isDisabled: true
		}
	},
	mounted (){
		this.axios.get('/api/dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			model.forEach((val, ind)=>{
				val.disabled = "true";
				let children = val.children;
				children.forEach((value, index)=>{
					value.disabled = 'true';
				})
			})
			this.dutyList = model;
		});
		this.axios.get('/api/menu/list').then((res)=>{
			const data = res.data;
			const model = data.model;
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
			this.authList = model;
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
		this.axios.get('/api/user/get/'+ this.userId).then((res)=>{
			const data = res.data;
			const model = data.model;
			model.roleIds = model.roleIds.split(',').map(Number);
			model.pramesList = model.pramesList.split(",").map(Number);
			this.userData = model;
		})
	}
}
</script>

<style scoped>

</style>
