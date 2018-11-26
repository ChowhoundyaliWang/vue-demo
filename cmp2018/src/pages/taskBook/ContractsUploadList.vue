<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>合同管理</el-breadcrumb-item>
				<el-breadcrumb-item>合同上传记录</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16 search-page" shadow="always">
				<!-- 工具条 -->
				<search :status='status' :search-url='searchUrl' v-on:tableDataChange='dataChange'></search>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData.data" stripe border class="mb-16">
					<el-table-column prop="operate" label="操作" width="100px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleView(scope.$index,scope.row)">查看</el-button>
							<el-button type="text" @click="handleDel(scope.$index,scope.row)">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='320px' show-overflow-tooltip> 
						<template slot-scope='scope'>
							<span v-if="scope.row.updated">【<el-button type="text" v-on:click="viewUpdate(scope.row.id)">更新记录</el-button>】</span>{{scope.row.projectName}}
						</template>
					</el-table-column>
					<el-table-column prop="projectNumber" label="项目号" width='170px' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="creator" label="项目进度" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="creator" label="上传次数" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createTime" label="是否足额" width='80px' show-overflow-tooltip> 
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
	name: 'ContractsUploadList',
	components:{
		"search": search,
		"record-dialog": recordDialog,
		'task-contrast': taskContrast
	},
	data () {
		return {
			status:2,
			searchUrl:'/api/planPaper/list',
			tableData:{
				data: [
				  { projectName: '111', projectNumber: 'hb-111', creator:'111', createTime: '2012-02=56'},
				  { projectName: '111', projectNumber: 'hb-111', creator:'111', createTime: '2012-02=56'},
				  { projectName: '111', projectNumber: 'hb-111', creator:'111', createTime: '2012-02=56'},

				],
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
		// 0-待接收；1-已接收；2-TL已接收
		/*this.axios.get('/api/planPaper/task/list?status=2').then((res)=>{
			let data = res.data;
			if(data.code == 200){
				let model = data.model;
				this.tableData = model;
			}
		});*/
	},
	methods:{
		...mapActions([
			'showUpdateList'
		]),
		//表格搜索过滤事件
		dataChange(data){
			this.tableData = data;
		},
		// 表格查看事件
		handleView(index,row){
            let curId = row.conId;
            this.$router.push({
            	name:'ContractView', params:{ id: curId}
            })
		},
		// 表格删除事件
		handleDel(index,row){
            let curId = row.id;
			this.$confirm('此操作将永久删除该合同，是否继续？','提示',{
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
		// 表格点击更新事件
		handleUpdate(index,row){
			let curId = row.id;
            this.$router.push({
            	name:'TaskBookUpdate', params:{ id: curId}
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
                    this.$alert( data.message, '提示');
                }
            }).catch((res)=>{
                this.$alert("请求异常", '提示');
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