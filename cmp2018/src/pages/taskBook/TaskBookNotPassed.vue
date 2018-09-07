<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>未通过的项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16 search-page" shadow="always">
				<search :status='status' :search-url='searchUrl' v-on:tableDataChange='dataChange'></search>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData.data" stripe border class="mb-16" v-loading='isLoading' element-loading-text='数据加载中...'>
					<el-table-column prop="operate" label="操作" width="100px" tooltip-effect='dark'> 
						<template slot-scope="scope" width='60px'>
							<el-button type="text" @click="handleModify(scope.$index,scope.row)">修改</el-button>
							<el-button type="text" @click="handleDel(scope.$index,scope.row)">删除</el-button>
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
					<el-table-column prop="createTime" label="创建时间" width='180px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditResult" label="审核结果" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditor" label="审核人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="auditTime" label="审核时间" width='180px' show-overflow-tooltip> 
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
	name: 'TaskBookNotPassed',
	components:{
		'search': search,
		"record-dialog": recordDialog,
		'task-contrast': taskContrast
	},
	data () {
		return {
			status: 4,
			searchUrl:'/api/task/list',
			tableData:{
				data:[],
				totalNum:0,
			    pageNum:0,
			    pageSize:0
			},
			isLoading: true,
			listInfos:{
				curType: 'task',
			}
		}
	},
	mounted (){
		// 请求参数 status 1-未审核；2-已通过；3-；4-未通过
		this.axios.get('/api/task/list?status=4').then((res)=>{
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
		dataChange(data){
			this.tableData = data;
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
		viewUpdate(id){
			this.axios.get("/api/task/record/list?id="+id, {headers:{'Content-Type':'application/json'} }).then((res)=>{
				const data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.listInfos.updateList = model;
			        this.showUpdateList( this.listInfos );
                }else{
                    //请求失败
                    this.$alert( data.message, '提示');
                }
            }).catch((res)=>{
                this.$alert("请求异常", '提示');
            })
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/task/list?pageNum='+val+'&status=4').then((res)=>{
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
