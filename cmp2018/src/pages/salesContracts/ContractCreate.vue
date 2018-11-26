<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>销售合同评审记录表</el-breadcrumb-item>
				<el-breadcrumb-item>创建销售合同</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content cur-page">
			<el-card class="box-card" shadow="always">
				<h3>销售合同</h3>
				<el-form :model="contract" label-width="120px">
					<el-form-item label="合同号" prop="title">
						<el-input v-model='contract.contractNum' class='inp-normal'></el-input>
					</el-form-item>
					<el-form-item label="送审日期"> 
						<el-date-picker v-model="contract.reviewTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format='timestamp'></el-date-picker>
					</el-form-item>
					<el-form-item label="送审人"> 
						<el-input v-model="contract.name" class='inp-normal' readOnly></el-input>
					</el-form-item>
					<el-form-item label="联系电话"> 
						<el-input v-model="contract.phone" class='inp-normal' readOnly></el-input>
					</el-form-item>
					<el-form-item label="项目名称"> 
						<el-input v-model="contract.proName" class='inp-mid'></el-input>
					</el-form-item>
					<el-form-item label="用户名称"> 
						<el-input v-model="contract.username" class='inp-normal'></el-input>
					</el-form-item>
					<el-form-item label="合同金额"> 
						<el-input v-model="contract.contractMoney" class='inp-normal' type='Number'></el-input>
					</el-form-item>
					<el-form-item label="付款方式"> 
						<el-input v-model="contract.payWay" class='inp-normal'></el-input>
					</el-form-item>
					<el-form-item label="预计工期"> 
						<el-date-picker v-model="contract.timeLimit" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format='timestamp'></el-date-picker>
					</el-form-item>
					<el-form-item label="人员及设备需求"> 
						<el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="contract.requirement" style='width: 70%;'></el-input>
					</el-form-item>
					<el-form-item label="附件">
						<el-upload action="http://192.168.102.59:5005/api/upload-files" :auto-upload='true' :data='tokenObj' :on-error='uploadFail' :on-success='uploadSuccess' :before-remove="beforeRemove">
							<el-button size="default" type="primary">选择文件</el-button>
							<div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
						</el-upload>
					</el-form-item>
					<el-form-item label=""> 
						<el-button type="primary" @click="handleCreate" class="fl" icon="el-icon-check">创建</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ContractCreate',
	data(){
		return {
			contract: {
				contractNum: '',
				reviewTime: '',
				name: '',
				phone: '',
				proName: '',
				username: '',
				contractMoney: '',
				payWay: '',
				timeLimit: '',
				requirement: '',
				imgList: []
			},
			tokenObj: {
				Authorization: ''
			},
			editFlag: true
		}
	},
	mounted (){
		let userInfo = JSON.parse(localStorage.getItem('userInfo'));
		this.contract.name = userInfo.name;
		this.contract.phone = userInfo.phone;
		this.tokenObj.Authorization = localStorage.getItem('token');
	},
	methods:{
		beforeRemove(file,fileList){
			return this.$confirm('确定移除该文件?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>{
				let url = file.url;
				let ind = this.contract.imgList.findIndex((val) => val.fileAddress === url)
				this.contract.imgList.splice(ind, 1);
			});
		},
		uploadFail(response, file, fileList){
			this.$alert('上传出错');
		},
		uploadSuccess(response, file, fileList){
			if(response.code == 200){
				this.contract.imgList.push(file.response.model[0]);	
			}
		},
		handleCreate(){
			this.axios.post('/api/contract-review/add', this.contract).then((res) => {
				const data = res.data;
				const msg = data.message;
                if(data.code == 200){
                	this.$alert(msg,'提示', {
                		confirmButtonText:'确定',
                		callback: action => {
                			this.$router.push({
                				path:'/ContractsToReview'
                			})
                		}
                	})
                }else{
                	this.$alert(msg,'错误提示');
                } 
			})
		}
	}
}
</script>

<style scoped>
/* .cur-page .el-input{ width: 200px; } */
</style>
