<template>
	<div>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>项目关闭单</h3>
				<el-form label-width="120px" id='userCreate'>
					<el-form-item label="项目名称"> 
						<span>{{closeList.projectName}}</span>
					</el-form-item>
					<el-form-item label="用户名称"> 
						<span>{{closeList.userName}}</span>
					</el-form-item>
					<el-form-item label="项目号"> 
						<span>{{closeList.projectNumber}}</span>
					</el-form-item>
					<el-form-item label="市场归口人"> 
						<span>{{closeList.marketUser}}</span>
					</el-form-item>
					<el-form-item label="联系电话"> 
						<span>{{closeList.marketPhone}}</span>
					</el-form-item>
					<el-form-item label="实际执行时间"> 
						<el-date-picker v-model="closeList.actualCycle[0]" type='date' placeholder='开始日期' disabled></el-date-picker>
						<span>至</span>
						<el-date-picker v-model="closeList.actualCycle[1]" type='date' placeholder='结束日期' disabled></el-date-picker> 
					</el-form-item>
					<el-form-item label="预测工作量">  <!-- 继承任务书的 合同金额 字段 -->
						<span>{{closeList.contractBill}}</span>
					</el-form-item>
					<el-form-item label="实际合同">  <!-- 显示大写金额 -->
						<span>{{closeList.actualBill}}</span>
					</el-form-item>
					<el-form-item label="已开票金额">  <!-- 显示大写金额 -->
						<span>{{closeList.invoicedBill}}</span>
					</el-form-item>
					<el-form-item label="已回款金额">  <!-- 显示大写金额 -->
						<span>{{closeList.receivedBill}}</span>
					</el-form-item>
					<el-form-item label="未报销费用说明">  <!-- 显示大写金额 （未报销费用含项目费、外包费用等） -->
						<el-input type="textarea" style="width:70%;" v-model="closeList.costExplain" :rows='8' readOnly></el-input>
					</el-form-item>
					<el-form-item label='附件'>
						<el-upload action='11' :file-list='closeList.files' disabled :on-preview='handlePreview'>
							<el-button size="default" type="primary">选择文件</el-button>
							<div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
						</el-upload>
					</el-form-item>
				</el-form>	
			</el-card>
			<el-card class="box-card mb-16 inp-middle" shadow="always" v-if='auditFlag'>
				<h3>项目关闭通知单审批</h3>	
				<el-form label-width="150px">
					<el-form-item label="审批意见">
						<el-input type='textarea' :rows='4' v-model='remark' style="width:70%;"></el-input>
					</el-form-item>
					<el-form-item label=" "> 
						<el-button type="primary" @click="handlePass" class="fl" icon="el-icon-circle-check-outline">通过</el-button>
						<el-button type="primary" @click="handleNotPass" class="fl" icon="el-icon-circle-close-outline">不通过</el-button>
					</el-form-item>
				</el-form>
			</el-card>
			<div v-if='closeList.record'>
				<el-card class="box-card mb-16 inp-middle" shadow="always">
					<h3>总经理审批</h3>
					<el-form label-width="150px">
						<el-form-item label="审批意见">
							<el-input type='textarea' :rows='4' v-model='budgetRemark' style="width:70%;" readOnly></el-input>
						</el-form-item>
						<el-form-item label="审批结果"> 
							<span>{{budgetStatus}}</span>
						</el-form-item>
					</el-form>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CloseList',
	props:{
		closeListId:{
			required: true
		},
		auditFlag: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	data () {
		return {
			closeList:{}
		}
	},
	mounted (){
		//获取项目关闭通知单详情
		this.axios.get('/api/project-close/get/'+this.closeListId).then((res) => {
			const data = res.data;
			this.closeList = data.model;
		})
	},
	methods:{
		handlePreview(file){
			let fileName = file.name;
			let url = file.url;
			let aLink = document.createElement('a');
			aLink.setAttribute('download', fileName);
			aLink.style.display = 'none';
			aLink.href = url;
			document.body.appendChild(aLink);
			aLink.click();
			document.body.removeChild(aLink);
		},
		handlePass(){},
		handleNotPass(){}
	}
}
</script>

<style scoped>
.sm-tip{ font-size: 12px; color:#67c23a; margin-left: 10px;}
.upload-demo{ display: inline-block; }
</style>
