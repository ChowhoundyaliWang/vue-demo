<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>执行主体为本部门的项目</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16" shadow="always">
				<!-- 工具条 -->
				<el-col class="mx-tool-bar mb-16">
					<el-form :inline="true">
						<el-form-item>
							<el-input placeholder="请输入关键词"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="doFilter" icon="el-icon-search">查询</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData" stripe border class="mb-16">
					<el-table-column prop="operate" label="操作" width="100px" tooltip-effect='dark'> 
						<template slot-scope="scope" width='60px'>
							<el-button type="text" @click="handleModify(scope.$index,scope.row)">修改</el-button>
							<el-button type="text" @click="handleDel(scope.$index,scope.row)">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='200px'  show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="projectNumber" label="项目号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="appField" label="应用区域" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="creator" label="创建人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width='200px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditResult" label="审核结果" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditor" label="审核人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditTime" label="审核时间" width='200px' show-overflow-tooltip> 
					</el-table-column>
				</el-table>
				<div>
					<div style="width:100%;text-align:center;">
						<el-pagination 
						background 
						@current-change="handleCurrentChange"
						:current-page.sync="pageNum"
						:page-size="pageSize"
						layout="total,prev,pager,next"
						:total="totalNum"></el-pagination>
						<!-- current-change currentPage改变时会触发 -->
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProByDept',
	data () {
		return {
			tableData:[],
			totalNum:0,
			pageNum:0,
			pageSize:0
		}
	},
	mounted (){
		// 请求参数 status 1-未审核；2-已通过；3-；4-未通过
		this.axios.get('/api/task/list?status=4').then((res)=>{
			let data = res.data;
			if(data.code == 200){
				let model = data.model;
				this.tableData = model.data;
				this.totalNum = model.totalNum;
				this.pageNum = model.pageNum;
				this.pageSize = model.pageSize;
			}
		});
	},
	methods:{
		//表格搜索过滤事件
		doFilter(){
			console.log('table过滤');
		},
		// 表格点击查看事件
		handleModify(index,row){
            let curId = row.id;
            this.$router.push({
            	name:'TaskBookModify', params:{ id: curId}
            })
		},
		// 表格点击更新事件
		handleDel(index,row){
			let curId = row.id;
			this.$confirm('此操作将永久删除该项目任务书，是否继续？','提示',{
				confirmButtonText: '确定',
                cancelButtonText: '取消',
				type:'warning'
			}).then(()=>{
				this.axios.get('/api/task/delete/'+curId).then((res)=>{
						let data = res.data;
						if(data.code == 200){
							this.axios.get('/api/task/list?status=4').then((res)=>{
								let data = res.data;
								if(data.code == 200){
									let model = data.model;
									this.tableData = model.data;
									this.totalNum = model.totalNum;
									this.pageNum = model.pageNum;
									this.pageSize = model.pageSize;
								}
							});
						}
			    }).catch((error)=>{

			    });
			}).catch(()=>{

			})			
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/task/list?pageNum='+val+'&status=4').then((res)=>{
				let data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.tableData = model.data;
					this.totalNum = model.totalNum;
					this.pageNum = model.pageNum;
					this.pageSize = model.pageSize;
				}
			});
		}
	}
}
</script>

<style scoped>

</style>
