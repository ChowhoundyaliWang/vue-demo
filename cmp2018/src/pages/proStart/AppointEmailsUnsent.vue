<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目启动</el-breadcrumb-item>
				<el-breadcrumb-item>项目经理任命书邮件</el-breadcrumb-item>
				<el-breadcrumb-item>未发送的任命书邮件</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content search-page">
			<el-card class="box-card mb-16" shadow="always">
				<search :is-adjust='isAdjust' :search-url='searchUrl' v-on:tableDataChange='dataChange'></search>
				<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
				<el-table :data="tableData.data" stripe border class="mb-16" v-loading='isLoading' element-loading-text='数据加载中...'>
					<el-table-column prop="" label="操作" width="60px" tooltip-effect='dark'> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleSend(scope.$index,scope.row)">发送</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='210px'  show-overflow-tooltip></el-table-column>
					<el-table-column prop="projectNo" label="项目号" width='145px' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="appField" label="应用区域" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="creator" label="创建人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createdTime" label="创建时间" width='170px' show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="sendStatus" label="发送状态" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="creator" label="发送人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="sendTime" label="发送时间" width='170px' show-overflow-tooltip> 
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
	name: 'AppointEmailsUnsent',
	components:{
		'search':search
	},
	data () {
		return {
			isLoading: true,
			isAdjust: 0,
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
		//isAdjust: 0-未发送，1—已发送
		this.axios.get('/api/manager-paper/list?isAdjust=0').then((res)=>{
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
		// 表格点击调整事件
		handleSend(index,row){
            let curId = row.id;
            this.$router.push({
            	name:'AppointEmail', params:{ emailId: curId}
            })
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			this.axios.get('/api/manager-paper/list?pageNum='+val+'&isAdjust=0').then((res)=>{
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