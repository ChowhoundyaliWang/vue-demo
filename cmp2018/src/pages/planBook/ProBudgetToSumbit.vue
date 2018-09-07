<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目预算</el-breadcrumb-item>
				<el-breadcrumb-item>需提交预算的项目</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content search-page">
			<el-card class="box-card mb-16" shadow="always">
				<search :is-budget='isBudget' :search-url='searchUrl' v-on:tableDataChange='dataChange'></search>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData.data" stripe border class="mb-16" v-loading='isLoading' element-loading-text='数据加载中...'>
					<el-table-column prop="operate" label="操作" width="100px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleSubmit(scope.$index,scope.row)">提交</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='200px'  show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="projectNo" label="项目号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="region" label="应用区域" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="createdUser" label="创建人" show-overflow-tooltip> 
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
import search from '../../components/Search.vue'
export default {
	name: 'ProBudgetToSumbit',
	components:{
		'search': search
	},
	data () {
		return {
			isLoading: true,
			isBudget: true,
			searchUrl:'/api/projectBudget/planPaper/list',
			tableData:{
				data:[],
				totalNum:0,
			    pageNum:0,
			    pageSize:0
			}
		}
	},
	mounted (){
		this.axios.get('/api/projectBudget/planPaper/list').then((res)=>{
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
		//表格搜索过滤事件
		dataChange(data){
			this.tableData = data;
		},
		// 表格点击提交事件
		handleSubmit(index,row){
            let curId = row.planPaperId;
            this.$router.push({
            	name:'ProBudgetSubmit', params:{ id: curId}
            })
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/projectBudget/planPaper/list?pageNum='+val).then((res)=>{
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