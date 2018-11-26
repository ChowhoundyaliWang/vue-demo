<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目关闭</el-breadcrumb-item>
				<el-breadcrumb-item>创建项目关闭单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
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
						<el-date-picker v-model="closeList.actualCycle[0]" type='date' placeholder='开始日期'></el-date-picker>
						<span>至</span>
						<el-date-picker v-model="closeList.actualCycle[1]" type='date' placeholder='结束日期'></el-date-picker> 
					</el-form-item>
					<el-form-item label="预测工作量">  <!-- 继承任务书的 合同金额 字段 -->
						<span>{{closeList.contractBill}}</span>
					</el-form-item>
					<el-form-item label="实际合同">  <!-- 显示大写金额 -->
						<el-input v-model='closeList.actualBill'></el-input>
					</el-form-item>
					<el-form-item label="已开票金额">  <!-- 显示大写金额 -->
						<el-input v-model='closeList.invoicedBill'></el-input>
					</el-form-item>
					<el-form-item label="已回款金额">  <!-- 显示大写金额 -->
						<el-input v-model='closeList.receivedBill'></el-input>
					</el-form-item>
					<el-form-item label="未报销费用说明">  <!-- 显示大写金额 （未报销费用含项目费、外包费用等） -->
						<el-input type="textarea" style="width:70%;" v-model="closeList.costExplain" :rows='8'></el-input>
					</el-form-item>
					<el-form-item label='附件'>
						<el-upload action="http://39.105.14.188:5005/api/upload-files" :auto-upload='true' :data='tokenObj' :on-error='uploadFail' :on-success='uploadSuccess' :before-remove="beforeRemove">
							<el-button size="default" type="primary">选择文件</el-button>
							<!-- <div slot="tip" class="el-upload__tip">文件大小不超过5M</div> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="">
						<el-button @click="toModify" type="success" class="el-icon-check">修改</el-button>
					</el-form-item>
				</el-form>	
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CloseListModify',
	data () {
		return {
			closeList:{
				projectName:'',
				userName:'',
				projectNumber:'',
				marketUser:'',
				marketPhone:"",
				actualCycle:[],
				contractBill:'',
				actualBill:'',
				invoicedBill:'',
				receivedBill:'',
				costExplain:"",
				imgList: [],
				taskId: this.$route.params.id
			},
			tokenObj:{
				Authorization:''
			}
		}
	},
	mounted (){
		//获取项目关闭单详情
	},
	methods:{
		beforeRemove(file,fileList){
			return this.$confirm('确定移除该文件?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>{
				let url = file.url;
				let ind = this.closeList.imgList.findIndex((val) => val.fileAddress === url)
				this.closeList.imgList.splice(ind, 1);
			});
		},
		uploadFail(response, file, fileList){
			this.$alert('上传出错');
		},
		uploadSuccess(response, file, fileList){
			if(response.code == 200){
				this.closeList.imgList.push(file.response.model[0]);	
			}
		},
		toModify(){
			let params = this.closeList;
			this.axios.post('/api/project-close/add', params).then((res) =>{
				const data = res.data;
				const msg = data.message;
				if(data.code == 200){
					this.$alert(msg, '提示',{
						confirmButtonText:'确定',
						callback: action => {
							this.$router.push({
								path:'/ProCloseListCreated'
							});
						}
					})
				}else{
					this.$alert(msg,'错误提示');
				}
			}).catch((res)=>{
				console.log(res);
			})
		}
	}
}
</script>

<style scoped>
.sm-tip{ font-size: 12px; color:#67c23a; margin-left: 10px;}
.upload-demo{ display: inline-block; }
.href_font{ color: #ffffff; }
</style>
