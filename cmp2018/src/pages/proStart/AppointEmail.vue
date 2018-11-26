<template>
	<div class="page-content cur-page">
			<el-card class="box-card" shadow="always">
				<h3>邮件信息</h3>
				<el-form :model="emailData" label-width="120px">
					<el-form-item label="邮件标题" prop="title">
						<el-input v-model='emailData.title' readOnly></el-input>
					</el-form-item>
					<el-form-item label="电子邮箱地址"> 
						<el-input v-model="emailData.address"></el-input>
					</el-form-item>
					<el-form-item label="抄送">
						<el-input v-model="emailData.ccAddress"></el-input>
					</el-form-item>
					<el-form-item label="邮件正文"> 
						<el-input type="textarea" style="width:460px;" :rows='18' v-model="emailData.content"></el-input>
					</el-form-item>
					<el-form-item label="预计工期">
						<el-date-picker v-model="emailData.cycle" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="附件">
						<el-upload action="111" ref='upload' :auto-upload="false" :file-list='emailData.fileAddress' disabled  :on-preview='handlePreview'>
							<el-button size="default" type="primary">相关附件</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label=""> 
						<el-button type="primary" @click="handleSend" class="fl" icon="el-icon-check">发送</el-button>
					</el-form-item>
				</el-form>
			</el-card>
	</div>
</template>

<script>
export default {
	name: 'AppointEmail',
	data(){
		return {
			emailData: {},
			curId: this.$route.params.emailId
		}
	},
	mounted (){
		this.axios.get('/api/mail/get-message/'+this.curId).then((res)=>{
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
		},
		handleSend(){
			this.axios.get('/api/mail/send/' + this.curId).then((res) => {
				let data = res.data;
				let msg = data.message;
				this.$alert(msg, '提示', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push({
							path:'/AppointEmailsSent'
						});
					}
				})
			})
		}
	}
}
</script>

<style scoped>
.cur-page .el-input{ width: 460px; }
</style>
