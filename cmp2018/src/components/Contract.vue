<template>
	<div class="page-content">
		<el-card class="box-card mb-16" shadow="always">
			<h3>合同信息</h3>
			<el-form label-width="120px">
				<el-form-item label="项目名称"> 
					<span>{{contract.projectName}}</span>
				</el-form-item>
				<el-form-item label="合同号"> 
					<el-input v-model='contract.projectManager' class='inp-mid' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="合同名称"> 
					<el-input v-model='contract.projectManager' class='inp-long' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="合同区域"> 
					<el-input v-model='contract.projectManager' class='inp-mid' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="发包方"> 
					<el-input v-model='contract.projectManager' class='inp-mid' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="签订日期"> 
					<el-date-picker v-model='contract.signDate' type='date' placeholder='选择日期'></el-date-picker>
				</el-form-item>
				<el-form-item label="网络类型"> 
					<el-input v-model='contract.projectManager' class='inp-normal' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="运营商名称"> 
					<el-input v-model='contract.projectManager' class='inp-mid' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="合同金额"> 
					<span>{{contract.projectManager}}</span>
				</el-form-item>
				<el-form-item label="累计金额"> 
					<span>{{contract.projectManager}}</span>
				</el-form-item>
				<el-form-item label="本次金额"> 
					<el-input v-model='contract.projectManager' class='inp-normal' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="是否足额"> 
					<span>{{contract.projectManager}}</span>
				</el-form-item>
				<el-form-item label="起止日期"> 
					<el-date-picker v-model='contract.signDate' type='daterange' start-placeholder='开始日期' end-placeholder='结束日期'></el-date-picker>
				</el-form-item>
				<el-form-item label="合同文件"> 
					<el-upload>
						<el-button size='small' type='primary'>上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="备注"> 
					<el-input v-model='contract.projectManager' class='inp-long' :readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="" v-show='!viewOnly'> 
					<el-button @click="toSave" type="success" class="el-icon-check">保存</el-button>
				</el-form-item>
			</el-form>	
		</el-card>
		<el-card class="box-card mb-16" shadow="always">
			<h3>该项目号的合同上传记录</h3>
			<el-table :data="contract.equipmentAllocation" border class="mx-table tb-inp" height='300'>
				<el-table-column prop="name" label="序号"></el-table-column>
				<el-table-column prop="version" label="本次金额"></el-table-column>
				<el-table-column prop="count" label="合同号"></el-table-column>
				<el-table-column prop="startTime" label="合同名称" width='180'></el-table-column>
				<el-table-column prop="endTime" label="合同区域" width='80'></el-table-column>
				<el-table-column prop="remark" label="发包方"></el-table-column>
				<el-table-column prop="remark" label="签订日期"></el-table-column>
				<el-table-column prop="remark" label="网络类型"></el-table-column>
				<el-table-column prop="remark" label="运营商名称"></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
				<el-table-column prop="remark" label="起止日期"></el-table-column>
				<el-table-column prop="remark" label="上传人"></el-table-column>
				<el-table-column prop="remark" label="上传时间" width='160px'></el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'Contract',
	props:{
		contract:{
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
			qualityTarget:[]
		}
	},
	mounted(){
		this.axios.get('/api/planPaper/get-quality-goal/list').then((res)=>{
			const data = res.data;
			if(data.code == 200){
				this.qualityTarget = data.model;
			}
		});
	},
	methods:{
		toSave(){
			let params = this.contract;
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