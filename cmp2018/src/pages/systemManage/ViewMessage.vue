<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>我的消息</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class='box-card mb-16' shadow='always'>
				<!-- 工具条 -->
			<el-col :span="24" class="mx-tool-bar mb-16">
				<el-form :inline="true">
					<el-form-item label='关键字：'>
						<el-input v-model='searchData.keyword'></el-input>
					</el-form-item>
					<el-form-item label='状态：'>
						<el-select style='width: 120px;' v-model="searchData.status" placeholder="请选择">
							<el-option v-for='item in statusList' :key='item.status' :label='item.name' :value='item.status'></el-option>
						</el-select>
					</el-form-item>
				    <el-form-item>
				    	<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				    </el-form-item>
				</el-form>
			</el-col>

			<!-- el-table中定义了height属性，即可实现固定表头的表格 -->
			<el-table :data="tableData.data" stripe border class="mb-16" v-loading='isLoading' element-loading-text='数据加载中...'>
				<el-table-column prop="operate" label="操作" width="60px" tooltip-effect='dark'> 
					<template slot-scope="scope">
						<el-button type="text" @click="handleView(scope.row )">详情</el-button>
					</template>
				</el-table-column>
				<el-table-column label="消息内容" show-overflow-tooltip> 
					<template slot-scope='scope'>
						<span :class="{readClass: scope.row.status=='已读'}">{{scope.row.content}}</span>
					</template>
				</el-table-column>
				<el-table-column width='80' label="发送人" show-overflow-tooltip>
					<template slot-scope='scope'>
						<span :class="{readClass: scope.row.status=='已读'}">{{scope.row.creator}}</span>
					</template>
				</el-table-column>
				<el-table-column width='200' label="发送时间" show-overflow-tooltip> 
					<template slot-scope='scope'>
						<span :class="{readClass: scope.row.status=='已读'}">{{scope.row.sentTime}}</span>
					</template>
				</el-table-column>
				<el-table-column width='80' label="状态" show-overflow-tooltip> 
					<template slot-scope='scope'>
						<span :class="[ (scope.row.status=='已读') ? 'readClass': 'unreadClass' ]">{{scope.row.status}}</span>
					</template>
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

		<!-- 对话框 -->
		<el-dialog title='消息详情' :visible.sync='dialogVisible' width='40%'>
			<router-link :to='dialogUrl'>{{dialogMsg}}</router-link>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'ViewMessage',
	data () {
		return {
			isLoading: true,
			searchUrl: '/api/message/find',
			searchData: {
				keyword: '',
				status: ''
			},
			statusList: [
			    { name: '未读', status: 0 },
			    { name: '已读', status: 1 }
			],
			tableData:{
				data:[],
				pageNum: 0,
			    pageSize: 0,
			    totalNum: 0
			},
			dialogMsg: '',
			dialogUrl: '',
			dialogVisible: false,
			unreadClass: ''
		}
	},
	mounted(){
		this.getList();
	},
	methods:{
		getList(){
			this.axios.get(this.searchUrl).then((res) =>{
				let data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.tableData = model;
					this.isLoading = false;
				}else{
					this.$alert(data.message, '提示');
				}
		    })
		},
		handleQuery(){
			this.axios.get(this.searchUrl + '?status='+ this.searchData.status +'&keyword=' + this.searchData.keyword).then((res) => {
				const data = res.data;
				if(data.code == 200){
					this.tableData = data.model;
				}else{
					this.$alert(data.message, '提示');
				}
			})
		},
		handleView(row){
			//只要一点击查看详情,该条消息记录状态显示为已读
			this.axios.get('/api/message/update/' + row.id).then((res) => {
				const data = res.data;
				if(data.code == 200){
					this.getList();
				}
				//跳转到详情页面
				this.dialogVisible = true;
				this.dialogMsg = row.content;
				this.dialogUrl = '/' + row.url;
			})
		},
		handleCurrentChange(val){
			this.axios.get(this.searchUrl +'?pageNum='+val+ '&status='+ this.searchData.status +'&keyword=' + this.searchData.keyword).then((res) =>{
				let data = res.data;
				if(data.code == 200){
					this.tableData = data.model;
				}else{
					this.$alert(data.message, '提示');
				}
			})
		}
	}
}
</script>

<style scoped>
span.readClass{ color: #acb0b7; }
span.unreadClass{ color: red; }
</style>
