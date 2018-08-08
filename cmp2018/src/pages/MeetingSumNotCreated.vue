<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目启动</el-breadcrumb-item>
				<el-breadcrumb-item>项目启动会议纪要</el-breadcrumb-item>
				<el-breadcrumb-item>未创建的会议纪要</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content search-page">
			<el-card class="box-card mb-16" shadow="always">
				<search :status='status' :search-url='searchUrl' v-on:tableDataChange='dataChange'></search>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData.data" stripe border class="mb-16">
					<el-table-column prop="" label="操作" width="60px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleCreate(scope.$index,scope.row)">创建</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='210px'  show-overflow-tooltip></el-table-column>
					<el-table-column prop="projectNo" label="项目号" width='145px' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="region" label="应用区域" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="creater" label="会议纪要创建人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createTime" label="会议纪要创建时间" width='170px' show-overflow-tooltip> 
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
export default {
	name: 'MeetingSumNotCreated',
	components:{
		'search':search
	},
	data () {
		return {
			status: 4,
			searchUrl: '/api/manager-paper/list',
			tableData:{
				data:[],
				totalNum:0,
			    pageNum:0,
			    pageSize:0
			}
		}
	},
	mounted (){
		this.axios.get('/api/projectBudget/list?status=4').then((res)=>{
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
		handleCreate(index,row){
            let curId = row.planPaperId;
            this.$router.push({
            	name:'MeetingSumCreate', params:{ id: curId}
            })
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/task/list?pageNum='+val+'&status=2').then((res)=>{
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