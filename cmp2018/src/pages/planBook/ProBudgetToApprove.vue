<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目审批</el-breadcrumb-item>
				<el-breadcrumb-item>待审批预算的项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16 search-page" shadow="always">
				<search :status='status' :search-url='searchUrl' v-on:tableDataChange='dataChange'></search>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData.data" stripe border class="mb-16" v-loading='isLoading' element-loading-text='数据加载中...'>
					<el-table-column prop="operate" label="操作" width="60px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleApprove(scope.$index,scope.row)">审批</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='320px'  show-overflow-tooltip>
						<template slot-scope='scope'>
							<span v-if="scope.row.updated">【<el-button type="text" v-on:click="viewUpdate(scope.row.planPaperId)">更新记录</el-button>】</span>{{scope.row.projectName}}
						</template>
					</el-table-column>
					<el-table-column prop="projectNo" label="项目号" width='170px' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="region" label="应用区域" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="creator" label="创建人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="budgetSubmitter" label="预算提交人" width='100px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="budgetCommitTime" label="提交时间" width='165px' show-overflow-tooltip> 
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
					<el-table-column prop="budgetAuditTime" label="审批时间" width='165px' show-overflow-tooltip> 
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

			<record-dialog></record-dialog>
		    <pb-contrast></pb-contrast>
		</div>
	</div>
</template>

<script>
import search from '../../components/Search.vue'
import recordDialog from '../../components/recordDialog.vue'
import pbContrast from '../../components/pbContrast.vue'
import { mapActions } from 'Vuex'
export default {
	name: 'ProBudgetToApprove',
	components:{
		'search': search,
		'record-dialog': recordDialog,
		"pb-contrast": pbContrast
	},
	data () {
		return {
			isLoading: true,
			status:3,
			searchUrl:'/api/projectBudget/list',
			tableData:{
				data:[],
				totalNum:0,
			    pageNum:0,
			    pageSize:0
			},
			listInfos:{
				curType: 'planPaper',
			}
		}
	},
	mounted (){
		this.axios.get('/api/projectBudget/list?status=3').then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.tableData = model;
			}else{
				this.$alert(data.message, '错误提示');
			}
			this.isLoading = false;
		});
	},
	methods:{
		...mapActions([
			'showUpdateList'
		]),
		//表格搜索过滤事件
		dataChange(data){
			this.tableData = data;
		},
		// 表格点击查看事件
		handleApprove(index,row){
            let curId = row.planPaperId;
            this.$router.push({
            	name:'ProBudgetApprove', params:{ id: curId, budgetId: row.projectBudgetId, taskId: row.taskId }
            })
		},
		viewUpdate(curId){
			this.axios.get("/api/planPaper/record/list?id="+ curId).then((res)=>{
				let data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.listInfos.updateList = model;
			        this.showUpdateList( this.listInfos );
				}else{
					this.$alert( data.message, '错误提示');
				}
			}).catch((res)=>{
				this.$alert("请求异常", '提示');
			})
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/projectBudget/list?status=3&pageNum='+val).then((res)=>{
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