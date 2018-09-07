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
						<span v-text='meetingSum.proName'></span>
					</el-form-item>
					<el-form-item label='备注'>
						<el-input type='textarea' style='width: 500px;' :rows='5' v-model='meetingSum.remark'></el-input>
					</el-form-item>
					<el-form-item label='附件'>
						<el-upload :action='uploadUrl()' ref='upload' :auto-upload='false' :file-list='fileList' :data='idObj' :before-remove='beforeRemove'>
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
				proName:'',
				remark:''
			},
			fileList:[],
			idObj:{}
		}
	},
	mounted (){
		
	},
	methods:{
		uploadUrl(){
			return 'http://163.53.91.130:5005/api/upload-files';
		},
		beforeRemove(){
			console.log('table过滤');
		},
		handleSave(){

		}
	}
}
</script>

<style scoped>

</style>