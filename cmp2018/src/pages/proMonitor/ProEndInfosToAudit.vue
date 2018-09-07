<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目监控</el-breadcrumb-item>
				<el-breadcrumb-item>项目结束通知</el-breadcrumb-item>
				<el-breadcrumb-item>待审核的项目结束通知</el-breadcrumb-item>
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
					<el-table-column prop="" label="操作" width="100px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleView(scope.$index,scope.row)">查看</el-button>
							<el-button type="text" @click="handleSend(scope.$index,scope.row)">重发</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='210px'  show-overflow-tooltip></el-table-column>
					<el-table-column prop="projectNo" label="项目号" width='145px' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="region" label="应用区域" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="creater" label="创建人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width='170px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditResult" label="审核结果" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditor" label="审核人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditTime" label="审核时间" width='170px' show-overflow-tooltip> 
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
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProEndInfosToAudit',
	data () {
		return {
			tableData:[],
			totalNum:0,
			pageNum:0,
			pageSize:0
		}
	},
	mounted (){
		this.axios.get('/api/projectBudget/list?status=4').then((res)=>{
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
		handleView(index,row){
            let curId = row.planPaperId;
            this.$router.push({
            	name:'AppointBookView', params:{ id: curId}
            })
		},
		// 表格点击调整事件
		handleSend(index,row){
            let curId = row.planPaperId;
            this.$router.push({
            	name:'AppointBookAdjust', params:{ id: curId}
            })
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/task/list?pageNum='+val+'&status=2').then((res)=>{
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