<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class='box-card mb-16' shadow='always'>
				<!-- 工具条 -->
			<el-col :span="24" class="mx-tool-bar mb-16">
				<el-form :inline="true">
					<el-form-item label='关键字：'>
						<el-input v-model='keyword'></el-input>
					</el-form-item>
				    <el-form-item>
				    	<el-button type="primary" @click="dataChange" icon="el-icon-search">查询</el-button>
				    </el-form-item>
				    <el-form-item>
				    	<router-link to="/UserCreate"><el-button type="primary" class="fl"><i class="el-icon-plus"></i>新建用户</el-button></router-link>
				    </el-form-item>
				</el-form>
			</el-col>

			<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
			<el-table :data="tableData.data" stripe border class="mb-16" v-loading='isLoading' element-loading-text='数据加载中...'>
				<el-table-column prop="operate" label="操作" width="150px" tooltip-effect='dark'> 
					<template slot-scope="scope">
						<el-button type="text" @click="handleView(scope.$index, scope.row)">查看</el-button>
						<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="userName" label="用户名" show-overflow-tooltip> 
				</el-table-column>
				<el-table-column prop="type" label="用户类型" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="name" label="姓名" show-overflow-tooltip> 
				</el-table-column>
				<el-table-column prop="phone" label="联系电话" show-overflow-tooltip> 
				</el-table-column>
				<el-table-column prop="duties" label="职务" show-overflow-tooltip> 
				</el-table-column>
				<el-table-column prop="region" label="所属销售大区" show-overflow-tooltip> 
				</el-table-column>
				<el-table-column prop="executeDept" label="所属执行部门" show-overflow-tooltip> 
				</el-table-column>
			</el-table>
			<div>
				<div style="width:100%;text-align:center;">
					<el-pagination 
					background 
					@current-change="handleCurrentChange"
					:current-page.sync="tableData.pageNum"
					:page-size="tableData.pageSize"
					layout="total,prev,pager,next"
					:total="tableData.totalNum"></el-pagination>
					<!-- current-change currentPage改变时会触发 -->
				</div>
			</div>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserManage',
	data () {
		return {
			isLoading: true,
			keyword:'',
			tableData:{
				data:[],
				pageNum: 0,
			    pageSize: 0,
			    totalNum: 0
			}
		}
	},
	mounted(){
		this.getUserData();
	},
	methods:{
		getUserData(){
			this.axios.get('/api/user/find').then((res) =>{
			let data = res.data;
			if(data.code == 200){
				let model = data.model;
				this.tableData = model;
				this.isLoading = false;
			}else{
				this.$alert(data.message, '提示');
			}
		    })
		},
		dataChange(){
			this.axios.get( '/api/user/find?keyword='+ this.keyword).then((res)=>{
				const data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.tableData = model;
				}
			});
		},
		handleView(index, row){
			//查看用户
			let userId = row.userId;
			this.$router.push({
            	name:'UserInfoView', params:{ userId: userId}
            })
		},
		handleEdit(index, row){
			//编辑用户
			let userId = row.userId;
			this.$router.push({
            	name:'UserInfoEdit', params:{ userId: userId}
            })
		},
		handleDel(index, row){
			//删除用户
			this.$confirm('是否确认删除用户“'+row.name+'”？','提示',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'warning'
			}).then(()=>{
				// 删除用户的接口
				this.axios.get('/api/user/delete/' + row.userId).then((res)=>{
					let data = res.data;
					let msg = data.message;
					this.$alert(msg, '提示');
					this.getUserData();
				})
			}).catch(()=>{

			})
		},
		handleCurrentChange(val){
			this.axios.get('/api/user/find?pageNum='+val).then((res) =>{
				let data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.tableData = model;
				}else{
					this.$alert(data.message, '提示');
				}
			})
		}
	}
}
</script>

<style scoped>

</style>
