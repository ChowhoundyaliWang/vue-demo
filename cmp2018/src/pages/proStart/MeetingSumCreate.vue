<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目启动</el-breadcrumb-item>
				<el-breadcrumb-item>项目启动会议纪要</el-breadcrumb-item>
				<el-breadcrumb-item>创建会议纪要</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16" shadow="always">
				<h3>会议纪要</h3>
				<el-form :model='meetingSum' label-width='150px'>
					<el-form-item label='项目名称'>
						<span v-text='meetingSum.projectName'></span>
					</el-form-item>
					<el-form-item label='备注'>
						<el-input type='textarea' style='width: 500px;' :rows='5' v-model='meetingSum.remark'></el-input>
					</el-form-item>
					<el-form-item label='附件'>
						<el-upload action='http://192.168.102.59:5005/api/upload-files' :data='tokenObj' :on-error='uploadFail' :on-success='uploadSuccess' :before-remove="beforeRemove">
							<el-button size='default' type='primary'>选择文件</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label=''>
						<el-button type='primary' class='el-icon-document' @click='handleSave'>保存</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MeetingSumCreate',
	data () {
		return {
			meetingSum:{
				projectName: this.$route.params.name,
				managerId: this.$route.params.id,
				imgList: [],
				remark: ''
			},
			tokenObj: {}
		}
	},
	mounted (){
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
				let ind = this.meetingSum.imgList.findIndex((val) => val.fileAddress === url)
				this.meetingSum.imgList.splice(ind, 1);
			});
		},
		uploadFail(response, file, fileList){
			this.$alert('上传出错');
		},
		uploadSuccess(response, file, fileList){
			if(response.code == 200){
				this.meetingSum.imgList.push(file.response.model[0]);	
			}
		},
		handleSave(){
			let params = this.meetingSum;
			this.axios.post('/api/conference/add', params).then((res) => {
				const data = res.data;
				const msg = data.message;
				if(data.code == 200){
					this.$alert(msg, '提示',{
						confirmButtonText:'确定',
						callback: action => {
							this.$router.push({
								path:'/MeetingSummaryCreated'
							});
						}
					}).catch(()=>{

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

</style>