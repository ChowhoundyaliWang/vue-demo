<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目预算</el-breadcrumb-item>
				<el-breadcrumb-item>已通过预算审批的项目</el-breadcrumb-item>
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
					<el-table-column prop="operate" label="操作" width="60px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleView(scope.$index,scope.row)">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='210px'  show-overflow-tooltip></el-table-column>
					<el-table-column prop="projectNo" label="项目号" width='145px' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="region" label="应用区域" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="creator" label="创建人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="budgetSubmitter" label="预算提交人" width='100px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="budgetCommitTime" label="提交时间" width='170px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="contractBill" label="合同金额" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="humanCost" label="人力成本" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="carCost" label="车辆成本" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="otherCost" label="其他费用" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="budgetAuditResult" label="预算审批结果" width='110px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="budgetAuditor" label="审批人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="budgetAuditTime" label="审批时间" width='170px' show-overflow-tooltip> 
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
	name: 'ProBudgetPassed',
	data () {
		return {
			tableData:[],
			totalNum:0,
			pageNum:0,
			pageSize:0
		}
	},
	mounted (){
		this.axios.get('/api/projectBudget/list?status=1').then((res)=>{
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
		handleSubmit(index,row){
            let curId = row.id;
            this.$router.push({
            	name:'TaskBookReceived', params:{ id: curId}
            })
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/projectBudget/list?status=1&pageNum='+val).then((res)=>{
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