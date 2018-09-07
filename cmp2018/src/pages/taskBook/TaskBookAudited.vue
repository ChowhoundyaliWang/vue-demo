<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>已审核的项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16 search-page" shadow="always">
				<search :status='status' :search-url='searchUrl' v-on:tableDataChange='dataChange'></search>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData.data" stripe border class="mb-16" v-loading='isLoading' element-loading-text='数据加载中...'>
					<el-table-column prop="operate" label="操作" width="60px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleView(scope.$index,scope.row)">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='200px'  show-overflow-tooltip> 
						<template slot-scope='scope'>
							<span v-if="scope.row.updated">【<el-button type="text" v-on:click="viewUpdate(scope.row.id)">更新记录</el-button>】</span>{{scope.row.projectName}}
						</template>
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
						:current-page.sync="tableData.pageNum"
						:page-size="tableData.pageSize"
						layout="total,prev,pager,next"
						:total="tableData.totalNum"></el-pagination>
						<!-- current-change currentPage改变时会触发 -->
					</div>
				</div>
			</el-card>

			<record-dialog></record-dialog>
			<task-contrast></task-contrast>
		</div>
	</div>
</template>

<script>
import search from '../../components/Search.vue'
import recordDialog from '../../components/recordDialog.vue'
import taskContrast from '../../components/taskContrast.vue'
import { mapActions } from 'Vuex'
export default {
	name: 'TaskBookAudited',
	components:{
		'search': search,
		"record-dialog": recordDialog,
		'task-contrast': taskContrast
	},
	data () {
		return {
			isLoading: true,
			status: 6,
			searchUrl:'/api/task/list',
			tableData:{
				data:[],
				totalNum:0,
			    pageNum:0,
			    pageSize:0
			},
			listInfos:{
				curType: 'task',
			}
		}
	},
	mounted (){
		this.axios.get('/api/task/list?status=6').then((res)=>{
			const data = res.data;
			if(data.code == 200){
				let model = data.model;
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
		// 表格点击 审核任务书事件
		handleView(index,row){
            let curId = row.id;
            this.$router.push({
            	name:'TaskBookView', params:{ id: curId}
            })
		},
		viewUpdate(id){
			this.axios.get("/api/task/record/list?id="+id, {headers:{'Content-Type':'application/json'} }).then((res)=>{
				let data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.listInfos.updateList = model;
			        this.showUpdateList( this.listInfos );
                }else{
                    //请求失败
                    this.$alert("请求失败", '提示');
                }
            }).catch((res)=>{
                //请求异常处理
            })
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/task/list?pageNum='+val+'&status=6').then((res)=>{
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
