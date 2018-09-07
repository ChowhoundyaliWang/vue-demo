<template>
	<div class="page-content">
		<el-card class="box-card mb-16" shadow="always">
			<h3>申请人力资源</h3>
			<el-form label-width="120px">
				<el-form-item label="项目名称"> 
					<span>{{hrData.projectName}}</span>
				</el-form-item>
				<el-form-item label="项目号"> 
					<span>{{hrData.projectName}}</span>
				</el-form-item>
				<el-form-item label="工程师需求介绍"> 
					<el-input type='textarea' :rows='4' v-model='hrData.projectManager' class='inp-long' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="发送给"> 
					<el-select v-model='hrData.projectManager'>
						<el-option v-for='item in options' :key='item.value' :label='item.value' :value='item.value'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" v-show='!viewOnly'> 
					<el-button @click="toSave" type="success" class="el-icon-check">保存</el-button>
				</el-form-item>
			</el-form>	
		</el-card>
		<el-card class="box-card mb-16" shadow="always">
			<h3>人力资源反馈</h3>
			<el-form label-width='120px'>
				<el-form-item label="反馈内容"> 
					<el-input type='textarea' :rows='4' v-model='hrData.projectManager' class='inp-long' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="发送给"> 
					<el-select v-model='hrData.projectManager'>
						<el-option v-for='item in options' :key='item.value' :label='item.value' :value='item.value'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" v-show='!viewOnly'> 
					<el-button @click="toSave" type="success" class="el-icon-check">保存</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'HRApply',
	props:{
		hrData:{
			type: Object,
			required: true
		},
		viewOnly: {
			type: Boolean,
			default: false,
			required: true
		}
	},
	data () {
		return {
			options:[]
		}
	},
	mounted(){
		/*this.axios.get('/api/planPaper/get-quality-goal/list').then((res)=>{
			const data = res.data;
			if(data.code == 200){
				this.qualityTarget = data.model;
			}
		});*/
	},
	methods:{
		toSave(){
			let params = this.hrData;
			this.axios.post('/api/planPaper/save', params).then((res) =>{
				const data = res.data;
				const msg = data.message;
				if(data.code == 200){
					this.$alert(msg,'提示');
				}else{
					this.$alert(msg,'错误提示');
				}
			}).catch((res)=>{
				this.$alert('请求出错','错误提示');
			})
		}
	}
}
</script>

<style scoped>

</style>