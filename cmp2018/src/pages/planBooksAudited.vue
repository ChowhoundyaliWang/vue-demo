<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目计划书审核</el-breadcrumb-item>
				<el-breadcrumb-item>已审核的项目计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content search-page">
			<el-card class="box-card mb-16" shadow="always">
				<search :status='status' :search-url='searchUrl' :select-show='selectShow' v-on:tableDataChange='dataChange'></search>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData.data" stripe border class="mb-16">
					<el-table-column prop="operate" label="操作" width="100px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleView(scope.$index,scope.row)">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='200px'  show-overflow-tooltip></el-table-column>
					<el-table-column prop="projectNumber" label="项目号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="region" label="应用区域" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createdUser" label="创建人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createdTime" label="创建时间" width='200px' show-overflow-tooltip> 
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
						:current-page.sync="tableData.pageNum"
						:page-size="tableData.pageSize"
						layout="total,prev,pager,next"
						:total="tableData.totalNum"></el-pagination>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import search from '../components/Search.vue'
import contrastUpdate from '../components/contrastUpdate'
export default {
	name: 'planBooksAudited',
	components:{
		'search': search,
		"contrast-update": contrastUpdate
	},
	data () {
		return {
			status:8,
			searchUrl: '/api/planPaper/list',
			selectShow: true,
			tableData:{
				data:[],
				totalNum:0,
			    pageNum:0,
			    pageSize:0
			}
		}
	},
	mounted (){
		this.axios.get('/api/planPaper/list?status=8').then((res)=>{
			let data = res.data;
			if(data.code == 200){
				let model = data.model;
				this.tableData = model;
			}
		});
	},
	methods:{
		//表格搜索过滤事件
		dataChange(data){
			this.tableData = data;
		},
		// 表格点击查看事件
		handleView(index,row){
            let curId = row.planPaperId;
            this.$router.push({
            	name:'PlanBookView', params:{ id: curId}
            })
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/planPaper/list?pageNum='+val+'&status=8').then((res)=>{
				let data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.tableData = model;
				}
			});
		}
	}
}
</script>

<style scoped>

</style>