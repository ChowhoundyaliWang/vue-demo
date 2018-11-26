<template>
	<div class="page-content cur-page">
			<el-card class="box-card" shadow="always">
				<h3>销售合同</h3>
				<el-form :model="contract" label-width="120px">
					<el-form-item label="合同号" prop="title">
						<el-input v-model='contract.contractNum' class='inp-normal' readOnly></el-input>
					</el-form-item>
					<el-form-item label="送审日期"> 
						<el-date-picker v-model="contract.reviewTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format='yyyy-MM-dd' readonly></el-date-picker>
					</el-form-item>
					<el-form-item label="送审人"> 
						<el-input v-model="contract.name" class='inp-normal' readOnly></el-input>
					</el-form-item>
					<el-form-item label="联系电话"> 
						<el-input v-model="contract.phone" class='inp-normal' readOnly></el-input>
					</el-form-item>
					<el-form-item label="项目名称"> 
						<el-input v-model="contract.proName" class='inp-mid' readOnly></el-input>
					</el-form-item>
					<el-form-item label="用户名称"> 
						<el-input v-model="contract.username" class='inp-normal' readOnly></el-input>
					</el-form-item>
					<el-form-item label="合同金额"> 
						<el-input v-model="contract.contractMoney" class='inp-normal' type='Number' readOnly></el-input>
					</el-form-item>
					<el-form-item label="付款方式"> 
						<el-input v-model="contract.payWay" class='inp-normal' readOnly></el-input>
					</el-form-item>
					<el-form-item label="预计工期"> 
						 <el-date-picker v-model="contract.timeLimit" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format='timestamp' readonly></el-date-picker>
					</el-form-item>
					<el-form-item label="人员及设备需求"> 
						<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="contract.requirement" style='width: 60%;' readOnly></el-input>
					</el-form-item>
					<el-form-item label="附件">
						<el-upload action='11' :file-list='contract.files' disabled :on-preview='handlePreview'>
							<el-button size="default" type="primary">选择文件</el-button>
							<div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
						</el-upload>
					</el-form-item>
				</el-form>
			</el-card>
	</div>
</template>

<script>
export default {
	name: 'ContractCreate',
	props: {
		contractId:{
			type: Number
		}
	},
	data(){
		return {
			contract: {}
		}
	},
	mounted(){
		// 接口 获取销售合同详情
		this.axios.get('/api/contract-review/get/'+this.contractId).then((res)=>{
		    let data = res.data;
		    this.contract = data.model;
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
		}
	}
}
</script>

<style scoped>
</style>
