<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>未审核的项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content search-page">
			<el-card class="box-card mb-16" shadow="always">
				<!-- 按条件搜索图表 -->
				<el-col class="mx-tool-bar mb-16">
					<el-form :inline="true">
						<el-form-item label='开始时间：'>
							<el-date-picker v-model='searchData.startTime' type='date' placeholder='选择开始时间' format='yyyy-MM-dd' value-format='yyyy-MM-dd'></el-date-picker>
						</el-form-item>
						<el-form-item label='结束时间：'>
							<el-date-picker v-model='searchData.endTime' type='date' placeholder='选择结束时间' format='yyyy-MM-dd' value-format='yyyy-MM-dd'></el-date-picker>
						</el-form-item>
						<br>
						<el-form-item label='应用区域：'>
							<el-input v-model='searchData.appField' placeholder=""></el-input>
						</el-form-item>
						&nbsp;
						<el-form-item label='关 键 字：'>
							<el-input v-model='searchData.keyword' placeholder=""></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="doFilter" icon="el-icon-search">查询</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData" stripe fit border class="mb-16">
					<el-table-column prop="operate" label="操作" width="60px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleModify(scope.$index,scope.row)">修改</el-button>
							<!-- <el-button type="text" @click="handleUpdate(scope.$index,scope.row)">更新</el-button> -->
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width="200px" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="projectNumber" label="项目号">
					</el-table-column>
					<el-table-column prop="appField" label="应用区域"> 
					</el-table-column>
					<el-table-column prop="creator" label="创建人"> 
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width='200px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditResult" label="审核结果"> 
					</el-table-column>
					<el-table-column prop="auditor" label="审核人"> 
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
	name: 'TaskBookUnaudited',
	data () {
		return {
			status: 1,
			searchData:{
				startTime:"",
				endTime:"",
				appField:"",
				keyword:""
			},
			tableData:[],
			totalNum: 0,
			pageNum: 0,
			pageSize: 0
		}
	},
	mounted (){
		// 请求参数 status 1-未审核；2-已通过；3-；4-未通过
		this.axios.get('/api/task/list?status='+ this.status).then((res)=>{
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
			this.axios.get('/api/task/list?status='+ this.status +'&startTime='+this.searchData.startTime+'&endTime='+this.searchData.endTime+'&keyword='+this.searchData.keyword+'&appField='+this.searchData.appField).then((res)=>{
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
		// 表格点击查看事件
		handleModify(index,row){
            let curId = row.id;
            this.$router.push({
            	name:'TaskBookModify', params:{ id: curId}
            })
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/task/list?pageNum='+val+'&status=1').then((res)=>{
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
