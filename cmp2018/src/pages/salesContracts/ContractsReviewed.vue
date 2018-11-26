<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>销售合同评审记录表</el-breadcrumb-item>
				<el-breadcrumb-item>已评审的销售合同</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16 search-page" shadow="always">
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
				<el-table :data="tableData.data" stripe border class="mb-16" v-loading='isLoading' element-loading-text='数据加载中...'>
					<el-table-column prop="" label="操作" width="60px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleView(scope.$index,scope.row)">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="proName" label="项目名称" width='320px'  show-overflow-tooltip></el-table-column>
					<el-table-column prop="contractNum" label="合同号" width='170px' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="username" label="用户名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="reviewTime" label="送审日期" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="name" label="送审人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="phone" label="联系电话" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createdOn" label="销售合同创建时间" width='170px' show-overflow-tooltip> 
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
	name: 'ContractsReviewed',
	components:{
		'search':search
	},
	data () {
		return {
			status: 4,
			searchUrl: '/api/contract-review/list?status=1',
			tableData:{
				data:[],
				totalNum:0,
			    pageNum:0,
			    pageSize:0
			},
			isLoading: true
		}
	},
	mounted (){
		this.axios.get(this.searchUrl).then((res)=>{
			let data = res.data;
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
		// 表格点击查看事件
		handleView(index, row){
            let curId = row.contractId;
            this.$router.push({
            	name:'salesContractView', params:{ id: curId}
            })
		},
		//表格搜索过滤事件
		doFilter(){
			console.log('table过滤');
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get(this.searchUrl+ '&pageNum='+val).then((res)=>{
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