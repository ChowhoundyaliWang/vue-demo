<template>
	<div>
		<!-- 按条件搜索图表 -->
		<el-col class="mx-tool-bar mb-16">
			<el-form :inline="true">
				<el-form-item label='开始时间：' v-show='!isBudget'>
					<el-date-picker v-model='searchData.startTime' type='date' placeholder='选择开始时间' format='yyyy-MM-dd' value-format='yyyy-MM-dd'></el-date-picker>
				</el-form-item>
				<el-form-item label='结束时间：' v-show='!isBudget'>
					<el-date-picker v-model='searchData.endTime' type='date' placeholder='选择结束时间' format='yyyy-MM-dd' value-format='yyyy-MM-dd'></el-date-picker>
				</el-form-item>
				<br>
				<el-form-item label='应用区域：' v-show='!isBudget'>
					<el-input v-model='searchData.appField' placeholder=""></el-input>
				</el-form-item>&nbsp;
				<el-form-item label='关 键 字：'>
					<el-input v-model='searchData.keyword' placeholder=""></el-input>
				</el-form-item>
				<el-form-item label='是否通过：' v-if='selectShow'>
					<el-select v-model='searchData.auditResult' placeholder='请选择'>
						<el-option value='3' label='通过'></el-option>
						<el-option value='5' label='不通过'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="doFilter" icon="el-icon-search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</div>
</template>

<script>
export default {
	name: 'Search',
	props:{
		// /api/task/list   1-未审核， 2-已通过，3-已分配，4-未通过，5-待审核，6-已审核，7-待分配  
		// /api/planPaper/task/list   0-待接收的项目任务书；1-已接收的项目任务书；2-TL已接收的项目任务书
		//  /api/planPaper/list   项目计划书 1-部门经理未审核的项目；2-执行副总未审核的项目； 3-已通过的项目计划书; 4-未通过的项目计划书; 5-待审核TL的项目计划书; 6-已审核TL的项目计划书; 7-待审核的项目计划书; 8-已审核的项目计划书
		//  /api/projectBudget/list  项目预算 0-已提交预算的项目, 1-已通过预算审批的项目, 2-未通过预算审批的项目，3-待审批预算的项目计划书，4-已审批预算的项目计划书, 5-已创建任命书的计划书
		//  /api/manager-paper/list  isAdjust: 0-未发送的任命书邮件，1—已发送的任命书邮件
		status,
		isAdjust: Number,  
		searchUrl: String,
		selectShow: Boolean,
		isBudget: Boolean
	},
	data(){
		return {
			searchData:{
				startTime:"",
				endTime:"",
				appField:"",
				keyword:"",
				auditResult:''
			}
		}
	},
	methods:{
		//表格搜索过滤事件
		doFilter(){
			this.axios.get( this.searchUrl +'?status='+ this.status +'&isAdjust='+ this.isAdjust +'&startTime=' + this.searchData.startTime +'&endTime=' + this.searchData.endTime +'&keyword='+ this.searchData.keyword +'&appField=' + this.searchData.appField + '&auditResult=' + this.searchData.auditResult).then((res)=>{
				let data = res.data;
				if(data.code == 200){
					let model = data.model;
					this.$emit('tableDataChange', model);
				}
			});
		}
	}
}
</script>

<style scoped>
</style>