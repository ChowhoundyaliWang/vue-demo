<template>
	<el-form :model="emailData" label-width="120px">
		<el-form-item label="邮件标题" prop="title">
			<el-input v-model='emailData.title' readOnly></el-input>
		</el-form-item>
		<el-form-item label="电子邮箱地址"> 
			<el-input v-model="emailData.address" readOnly></el-input>
		</el-form-item>
		<el-form-item label="抄送">
			<el-input v-model="emailData.ccAddress" readOnly></el-input>
		</el-form-item>
		<el-form-item label="邮件正文"> 
			<el-input type="textarea" style="width:460px;" :rows='18' v-model="emailData.content" readOnly></el-input>
		</el-form-item>
		<el-form-item label="预计工期">
			<el-date-picker v-model="emailData.cycle" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
			</el-date-picker>
		</el-form-item>
		<el-form-item label="附件">
			<el-upload action="" ref='upload' :auto-upload="false" :file-list='emailData.fileAddress' disabled  :on-preview='handlePreview'>
				<el-button size="default" type="primary">相关附件</el-button>
			</el-upload>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	name: 'AppointBookEmail',
	props:{
		emailId:{
			required: true
		}
	},
	data(){
		return {
			emailData: {}
		}
	},
	mounted(){
		this.axios.get('/api/mail/get-message/'+this.emailId).then((res)=>{
			let data = res.data;
			this.emailData = data.model;
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
.cur-page .el-input{ width: 460px; }
</style>
