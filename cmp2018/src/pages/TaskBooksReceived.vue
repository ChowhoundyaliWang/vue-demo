<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书接收</el-breadcrumb-item>
				<el-breadcrumb-item>已接收的项目任务书</el-breadcrumb-item>
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
					<el-table-column prop="operate" label="操作" width="100px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleView(scope.$index,scope.row)">接收</el-button>
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
						:current-page.sync="pageNum"
						:page-size="pageSize"
						layout="total,prev,pager,next"
						:total="totalNum"></el-pagination>
						<!-- current-change currentPage改变时会触发 -->
					</div>
				</div>
				

				<!-- 更新记录对话框 -->
				<el-dialog title="更新记录" :visible.sync="dialogVisible">
					<el-table :data="updateList" stripe border style="width:100%;" class="mb-16" height="300">
						<el-table-column prop="operate" label="操作" tooltip-effect='dark' width="210px"> 
							<template slot-scope="scope">
								<span v-if="scope.row.isNewest">最新版本</span>
								<span v-if="!scope.row.isNewest && scope.row.version !== 1">
									<el-button type="text" @click="contrastNewest(scope.$index,scope.row)">对比最新版本</el-button>
									<el-button type="text" @click="contrastPre(scope.$index,scope.row)">对比上一版本</el-button>
								</span>
								<span v-if="!scope.row.isNewest && scope.row.version == 1">
									<el-button type="text" @click="contrastNewest(scope.$index,scope.row)">对比最新版本</el-button>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="projectName" label="项目名称" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="remark" label="更新次数" show-overflow-tooltip> 
						</el-table-column>
						<el-table-column prop="status" label="状态" show-overflow-tooltip> 
						</el-table-column>
						<el-table-column prop="createName" label="创建人" show-overflow-tooltip> 
						</el-table-column>
						<el-table-column prop="createdOn" label="创建时间" width='200px' show-overflow-tooltip> 
						</el-table-column>
					</el-table>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="dialogVisible = false">确定</el-button>
					</div>
				</el-dialog>

                <!-- 对比更新区域 -->
                <el-dialog title="更新记录" :visible.sync="contrastVisible" width='92%'>
                	<contrast-update v-bind:tb-infos='tbInfos' v-bind:another='another' v-bind:ano-manager='anoProManagerList' v-bind:dept-list='proDeptList' v-bind:manager-list='proManagerList'></contrast-update>
                	<div slot="footer" class="dialog-footer">
                		<el-button type="primary" @click="contrastVisible = false">关闭</el-button>
                	</div>
                </el-dialog>
			</el-card>
		</div>
	</div>
</template>

<script>
import contrastUpdate from '../components/contrastUpdate'
export default {
	name: 'TaskBooksReceived',
	components:{
		"contrast-update": contrastUpdate
	},
	data () {
		return {
			tableData:[],
			totalNum:0,
			pageNum:0,
			pageSize:0,
			updateList:[],
			dialogVisible: false,
			contrastVisible: false,
			tbInfos:{},
			another:{},
			anoProManagerList:[],
			proDeptList:[],
			proManagerList:[]
		}
	},
	mounted (){
		// 0-待接收；1-已接收；2-TL已接收
		this.axios.get('/api/planPaper/task/list?status=1').then((res)=>{
			let data = res.data;
			if(data.code == 200){
				let model = data.model;
				this.tableData = model.data;
				this.totalNum = model.totalNum;
				this.pageNum = model.pageNum;
				this.pageSize = model.pageSize;
			}
		});
		this.axios.get('/api/pro-dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.proDeptList = model;
		});
	},
	methods:{
		//表格搜索过滤事件
		doFilter(){
			console.log('table过滤');
		},
		// 表格点击查看事件
		handleView(index,row){
            let curId = row.id;
            this.$router.push({
            	name:'TaskBookReceived', params:{ id: curId}
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
					this.updateList = model;
                }else{
                    //请求失败
                    this.$alert("请求失败", '提示');
                }
            }).catch((res)=>{
                //请求异常处理
            })
            this.dialogVisible = true;
            this.updateList = [];
		},
		// 对比最新版本
		contrastNewest(index, row){
			this.contrastVisible = true;
			let id = row.taskId;
			let version = row.version;
			this.axios.get("/api/task/compare/"+id+'?another=0&version='+ version, {headers:{'Content-Type':'application/json'} }).then((res)=>{
				let data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.tbInfos = model[0];
					this.another = model[1];
					this.axios.get('/api/pro-management/list',{params:{'id': this.tbInfos.proExecuteSubject}}).then((res)=>{
						const data = res.data;
						const model = data.model;
						this.proManagerList = model;
					});
					this.axios.get('/api/pro-management/list',{params:{'id': this.another.proExecuteSubject}}).then((res)=>{
						const data = res.data;
						const model = data.model;
						this.anoProManagerList = model;
					});
                }else{
                    //请求失败
                    this.$alert("请求失败", '提示');
                }
            }).catch((res)=>{
                //请求异常处理
            })
		},
		// 对比上一版本
		contrastPre(index, row){
			this.contrastVisible = true;
			let id = row.taskId;
			let version = row.version;
			this.axios.get("/api/task/compare/"+id+'?another='+ (version-1) +'&version='+ version, {headers:{'Content-Type':'application/json'} }).then((res)=>{
				let data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.tbInfos = model[0];
					this.another = model[1];
					this.axios.get('/api/pro-management/list',{params:{'id': this.tbInfos.proExecuteSubject}}).then((res)=>{
						const data = res.data;
						const model = data.model;
						this.proManagerList = model;
					});
					this.axios.get('/api/pro-management/list',{params:{'id': this.another.proExecuteSubject}}).then((res)=>{
						const data = res.data;
						const model = data.model;
						this.anoProManagerList = model;
					});
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
			this.axios.get('/api/task/list?pageNum='+val+'&status=2').then((res)=>{
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