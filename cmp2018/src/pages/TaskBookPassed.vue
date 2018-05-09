<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>已通过的项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16" shadow="always">
				<!-- 工具条 -->
				<el-col style="width:80%;" class="mx-tool-bar mb-16">
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
				<el-table :data="tableData" stripe height="550" border style="width:80%;" class="mb-16">
					<el-table-column prop="operate" label="操作" width="100px"> 
						<template slot-scope="scope">
							<el-button type="text" @click="handleView(scope.$index,scope.row)">查看</el-button>
							<el-button type="text" @click="handleUpdate(scope.$index,scope.row)">更新</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="proName" label="项目名称"> 
					</el-table-column>
					<el-table-column prop="proNumber" label="项目号">
					</el-table-column>
					<el-table-column prop="appField" label="应用区域"> 
					</el-table-column>
					<el-table-column prop="creater" label="创建人"> 
					</el-table-column>
					<el-table-column prop="startTime" label="创建时间"> 
					</el-table-column>
					<el-table-column prop="auditResult" label="审核结果"> 
					</el-table-column>
					<el-table-column prop="auditor" label="审核人"> 
					</el-table-column>
					<el-table-column prop="auditTime" label="审核时间"> 
					</el-table-column>
				</el-table>
				<div style="width:80%;">
					<div style="width:100%;text-align:center;">
						<el-pagination 
						background 
						@current-change="handleCurrentChange"
						:current-page.sync="currentPage"
						:page-size="10"
						layout="total,prev,pager,next"
						:total="totalPage"></el-pagination>
						<!-- current-change currentPage改变时会触发 -->
					</div>
				</div>
				
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TaskBookPassed',
	data () {
		return {
			okType:1,
			taskBookInfos:{
                type:1,
                domesticOrOversea:1
			},
			manufactorList:[{
				value:"1",
				label:"111"
			}],
			tableData:[{
				proName:'传输',
				proNumber:"中级",
				appField:"1",
				creater:"2017-01-16",
				startTime:"2017-12-31",
				auditResult:"350",
				auditor:'11.67',
		        auditTime:"这是备注"
			},{
				proName:'传输',
				proNumber:"中级",
				appField:"1",
				creater:"2017-01-16",
				startTime:"2017-12-31",
				auditResult:"350",
				auditor:'11.67',
		        auditTime:"这是备注"
			},{
				proName:'传输',
				proNumber:"中级",
				appField:"1",
				creater:"2017-01-16",
				startTime:"2017-12-31",
				auditResult:"350",
				auditor:'11.67',
		        auditTime:"这是备注"
			},{
				proName:'传输',
				proNumber:"中级",
				appField:"1",
				creater:"2017-01-16",
				startTime:"2017-12-31",
				auditResult:"350",
				auditor:'11.67',
		        auditTime:"这是备注"
			}],
			totalPage:120,
			currentPage:5
		}
	},
	mounted (){
		/*this.axios.get('/pro-name/first/list').then(function(res){
			console.log(res);
		});*/
	},
	methods:{
		//表格搜索过滤事件
		doFilter(){
			console.log('table过滤');
		},
		// 表格点击查看事件
		handleView(index,row){
            console.log(index,row);
		},
		// 表格点击更新事件
		handleUpdate(index,row){
			console.log(index,row);
		},
		// 翻页 表格当前页码改变触发事件
		handleCurrentChange(val){
			console.log( val);
		}
	}
}
</script>

<style scoped>

</style>
