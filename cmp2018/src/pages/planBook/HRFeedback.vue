<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>人力资源申请反馈</el-breadcrumb-item>
				<el-breadcrumb-item>已反馈的人力资源申请</el-breadcrumb-item>
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
				<el-table :data="tableData.data" stripe border class="mb-16">
					<el-table-column prop="operate" label="操作" width="100px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleView(scope.$index,scope.row)">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='320px'  show-overflow-tooltip> 
						<template slot-scope='scope'>
							<span v-if="scope.row.updated">【<el-button type="text" v-on:click="viewUpdate(scope.row.id)">更新记录</el-button>】</span>{{scope.row.projectName}}
						</template>
					</el-table-column>
					<el-table-column prop="projectNumber" label="项目号" width='170px' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="creator" label="反馈人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="creator" label="反馈内容" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="creator" label="反馈时间" width='160px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="creator" label="申请人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="creator" label="需求介绍" width='200px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createTime" label="申请时间" width='160px' show-overflow-tooltip> 
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
import recordDialog from '../../components/recordDialog.vue'
import taskContrast from '../../components/taskContrast.vue'
import { mapActions } from 'Vuex'
export default {
	name: 'HRNonFeedback',
	components:{
		"record-dialog": recordDialog,
		'task-contrast': taskContrast
	},
	data () {
		return {
			tableData:{
				data: [
				   { projectName: 'xasdasd', projectNumber: 'hb-1212', creator: 'ssad', createTime: '2017-02-01', hrId:'1'}
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
		doFilter(){
			console.log('table过滤');
		},
		// 表格点击查看事件
		handleView(index,row){
            let curId = row.hrId;
            this.$router.push({
            	name:'HRView', params:{ hrId: curId}
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