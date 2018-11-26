<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>销售合同评审记录表</el-breadcrumb-item>
				<el-breadcrumb-item>未评审的销售合同</el-breadcrumb-item>
				<el-breadcrumb-item>评审销售合同</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<sales-contract :contract-id='contractId' class= 'mb-16'></sales-contract>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>评审内容及意见</h3>
				<el-form label-width="150px">
					<el-form-item label="市场营销中心">
						<el-checkbox v-model="records.scRecord.checked1" :disabled='scFlag'>合同与谈判结果是否一致</el-checkbox> <br>
						<el-checkbox v-model="records.scRecord.checked2" :disabled='scFlag'>与以前表述不一致的要求是否已予解决</el-checkbox> <br>
						<el-input v-model='records.scRecord.opinion' style="width: 80%;" placeholder='其他意见' :readOnly='scFlag' class='mb-16'></el-input> 
						<div v-show='records.scRecord.date !=="" '>
							评审日期：<el-date-picker v-model="records.scRecord.date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format='timestamp' readonly class='inp-normal'></el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="技术支持中心">
						<el-checkbox v-model="records.jszcRecord.checked" :disabled='jszcFlag'>合同文本与应标书文本是否一致</el-checkbox> <br>
						<el-input v-model='records.jszcRecord.opinion' style="width: 80%;" placeholder='其他意见' :readOnly='jszcFlag'></el-input>
						<div v-show='records.jszcRecord.date !=="" '>
							评审日期：<el-date-picker v-model="records.zjlRecord.date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format='timestamp' readonly class='inp-normal'></el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="项目执行中心">
						<el-checkbox v-model="records.xmRecord.checked1" :disabled='xmFlag'>验收标准是否明确</el-checkbox> <br>
						<el-checkbox v-model="records.xmRecord.checked2" :disabled='xmFlag'>能否满足客户需求和相关流程</el-checkbox> <br>
						<el-checkbox v-model="records.xmRecord.checked3" :disabled='xmFlag'>项目风险是否在可控范围内</el-checkbox> <br>
						<el-input v-model='records.xmRecord.opinion' style="width: 80%;" placeholder='其他意见' :readOnly='xmFlag'></el-input>
						<div v-show='records.xmRecord.date !=="" '>
							评审日期：<el-date-picker v-model="records.xmRecord.date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format='timestamp' readonly class='inp-normal'></el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="运作管理部">
						<el-checkbox v-model="records.yzRecord.checked" :disabled='yzFlag'>设备和软件是否能满足需求</el-checkbox> <br>
						<el-input v-model='records.yzRecord.opinion' style="width: 80%;" placeholder='其他意见' :readOnly='yzFlag'></el-input>
						<div v-show='records.yzRecord.date !=="" '>
							评审日期：<el-date-picker v-model="records.yzRecord.date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format='timestamp' readonly class='inp-normal'></el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="人力资源部">
						<el-checkbox v-model="records.hrRecord.checked" :disabled='hrFlag'>人员数量及技能能否满足需求</el-checkbox> <br>
						<el-input v-model='records.hrRecord.opinion' style="width: 80%;" placeholder='其他意见' :readOnly='yzFlag'></el-input>
						<div v-show='records.hrRecord.date !=="" '>
							评审日期：<el-date-picker v-model="records.hrRecord.date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format='timestamp' readonly class='inp-normal'></el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="财务部">
						<el-checkbox v-model="records.cwbRecord.checked1" :disabled='cwbFlag'>付款方式是否合理</el-checkbox> <br>
						<el-checkbox v-model="records.cwbRecord.checked2" :disabled='cwbFlag'>能否满足项目资金需求</el-checkbox> <br>
						<el-input v-model='records.cwbRecord.opinion' style="width: 80%;" placeholder='其他意见' :readOnly='cwbFlag'></el-input>
						<div v-show='records.cwbRecord.date !=="" '>
							评审日期：<el-date-picker v-model="records.cwbRecord.date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format='timestamp' readonly class='inp-normal'></el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="总经理">
						<el-input type='textarea' rows='4' v-model='records.zjlRecord.opinion' style="width: 80%;" :readOnly='zjlFlag'></el-input>
						<div v-show='records.zjlRecord.date !=="" '>
							评审日期：<el-date-picker v-model="records.zjlRecord.date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format='timestamp' readonly class='inp-normal'></el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="handleSubmit" class="fl" icon="el-icon-check">提交</el-button>
					</el-form-item>
				</el-form>
			</el-card>	
		</div>
	</div>
</template>

<script>
import salesContract from '../../components/salesContract'
export default {
	name: 'ContractReview',
	components: {
		'sales-contract': salesContract
	},
	data(){
		return {
			contractId: this.$route.params.id,
			records: {
				contractId: this.$route.params.id,
				scRecord: {
					checked1: false,
					checked2: false,
					opinion: '',
					date: '1537286400000'
				},
				jszcRecord: {
					checked: false,
					opinion: '',
					date: ''
				},
				xmRecord: {
					checked1: false,
					checked2: false,
					checked3: false,
					opinion: '',
					date: ''
				},
				yzRecord: {
					checked: false,
					opinion: '',
					date: ''
				},
				hrRecord: {
					checked: false,
					opinion: '',
					date: ''
				},
				cwbRecord: {
					checked1: false,
					checked2: false,
					opinion: '',
					date: ''
				},
				zjlRecord: {
					opinion: '',
					date: ''
				}
			},
			scFlag: true,
			jszcFlag: true,
			xmFlag: true,
			yzFlag: true,
			hrFlag: true,
			cwbFlag: true,
			zjlFlag: true
		}
	},
	mounted (){
		// 接口 获取销售合同详情
		this.axios.get('/api/contract-review/get/'+this.contractId).then((res)=>{
		    let data = res.data;
		    this.records = data.model.records;
		})
		let roleIds = JSON.parse(localStorage.getItem('userInfo')).roleIds.split(',');
		// 判断用户的角色，来确定用户可编辑的内容，当boolean值为false时可编辑
		this.scFlag = roleIds.indexOf('11') < 0;
		this.jszcFlag = roleIds.indexOf('21') < 0;
		this.xmFlag = roleIds.indexOf('13') < 0 && roleIds.indexOf('14') < 0;
		this.yzFlag = roleIds.indexOf('12') < 0 && roleIds.indexOf('20') < 0;
		this.hrFlag = roleIds.indexOf('15') < 0;
		this.cwbFlag = roleIds.indexOf('22') < 0;
		this.zjlFlag = roleIds.indexOf('18') < 0;
	},
	methods:{
		handleSubmit(){
			// 提交评审内容
			this.axios.post(''+ this.records).then((res) => {
				const data = res.data;
				const msg = data.message;
                if(data.code == 200){
                	this.$alert(msg,'提示', {
                		confirmButtonText:'确定',
                		callback: action => {
                			this.$router.push({
                				path:'/ContractsReviewed'
                			})
                		}
                	})
                }else{
                	this.$alert(msg,'错误提示');
                } 
			}).catch()
		}
	}
}
</script>

<style scoped>
/* .cur-page .el-input{ width: 200px; } */
</style>
