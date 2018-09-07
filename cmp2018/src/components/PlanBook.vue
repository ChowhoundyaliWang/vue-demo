<template>
	<div class="page-content">
		<el-card class="box-card mb-16 inp-middle" shadow="always">
			<h3>项目计划书</h3>
			<el-form label-width="120px">
				<el-form-item label="项目名称"> 
					<span>{{planBook.projectName}}</span>
				</el-form-item>
				<el-form-item label="项目经理"> 
					<el-input v-model='planBook.projectManager' :readOnly='viewOnly'></el-input>
					<span class="sm-tip">（多个项目经理，用中文逗号分隔）</span>
				</el-form-item>
			</el-form>	
		</el-card>
		<el-card  class="box-card mb-16 inp-middle" shadow="always">
			<h3>质量目标</h3>
			<el-row :gutter='50'>
				<el-col :span="12">
						<p class='p-hei'>按照公司TL9000质量体系部门质量目标：分管部门必须完成基准目标值，作为考核部门日常项目管理工作的依据。</p>
						<h4 class='tb-title'>目标执行中心</h4>
						<el-table :data="qualityTarget" border class="mx-table">
							<el-table-column prop="name" label="目标名称" width='220px'></el-table-column>
							<el-table-column prop="standardGoal" label="基准目标">
								<template slot-scope="scope">
									<span v-text='scope.row.standardGoal'></span>%
								</template>
							</el-table-column>
							<el-table-column prop="challengeGoal" label="挑战目标">
								<template slot-scope="scope">
									<span v-text='scope.row.challengeGoal'></span>%
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				<el-col :span="12" class='inp-mini'>
					<p class='p-hei'>按照公司TL9000质量体系，本项目质量目标由部门经理制定。</p>
					<h4 class='tb-title'>本项目</h4>
					<el-table :data="planBook.qualityTarget" border class="mx-table">
						<el-table-column prop="name" label="目标名称" width='220px'></el-table-column>
						<el-table-column prop="standardGoal" label="基准目标">
							<template slot-scope="scope">
								<el-input v-model='scope.row.standardGoal' type="text" :readOnly='viewOnly'></el-input>%
							</template>
						</el-table-column>
						<el-table-column prop="challengeGoal" label="挑战目标">
							<template slot-scope="scope">
								<el-input v-model='scope.row.challengeGoal' type="text" :readOnly='viewOnly'></el-input>%
							</template>
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card mb-16 inp-middle" shadow="always">
			<h3>进度、要求、资源</h3>
			<el-form label-width="120px">
				<el-form-item label="项目进度">
					<el-input type='textarea' :rows='4' v-model='planBook.projectSchedule' 
					:readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="项目要求">
					<el-input type='textarea' :rows='4' v-model='planBook.projectDemand' 
					:readOnly='viewOnly'></el-input>
				</el-form-item>
				<el-form-item label="项目资源">
					<el-input type='textarea' :rows='4' v-model='planBook.projectResource' 
					:readOnly='viewOnly'></el-input>
				</el-form-item>
			</el-form>	
		</el-card>
		<el-card class="box-card mb-16" shadow="always">
			<h3>人员配备</h3>
			<el-table :data="planBook.personalAllocation" border  class="mx-table tb-inp">
				<el-table-column prop="name" label="参与人员"></el-table-column>
				<el-table-column prop="dept" label="部门"></el-table-column>
				<el-table-column prop="category" label="工程师类别" width='120'></el-table-column>
				<el-table-column prop="grade" label="工程师级别"></el-table-column>
				<el-table-column prop="treatment" label="待遇级别"></el-table-column>
				<el-table-column prop="startTime" label="参与周期开始" width='160'>
					<template slot-scope='scope'>
						<el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' :readOnly='viewOnly' class='date-inp'></el-date-picker>
					</template>  
				</el-table-column>
				<el-table-column prop="endTime" label="参与周期结束" width='160'>
					<template slot-scope='scope'>
						<el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' :readOnly='viewOnly' class='date-inp'></el-date-picker>
					</template>  
				</el-table-column>
				<el-table-column prop="division" label="职责分工" width='140'></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
			</el-table>
		</el-card>
		<el-card class="box-card mb-16" shadow="always">
			<h3>设备配备</h3>
			<el-table :data="planBook.equipmentAllocation" border class="mx-table tb-inp">
				<el-table-column prop="name" label="设备名称"></el-table-column>
				<el-table-column prop="version" label="型号"></el-table-column>
				<el-table-column prop="count" label="数量"></el-table-column>
				<el-table-column prop="startTime" label="参与周期开始" width='160'>
					<template slot-scope='scope'>
						<el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' :readOnly='viewOnly' class='date-inp'></el-date-picker>
					</template>  
				</el-table-column>
				<el-table-column prop="endTime" label="参与周期结束" width='160'>
					<template slot-scope='scope'>
						<el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' :readOnly='viewOnly' class='date-inp'></el-date-picker>
					</template>  
				</el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
			</el-table>
		</el-card>
		<el-card class="box-card mb-16 inp-middle" shadow="always">
			<h3>创建</h3>
			<el-form label-width="120px">
				<el-form-item label="部门经理">
					<el-input readOnly='true' v-model='planBook.deptManager'></el-input>
				</el-form-item>
				<el-form-item label="发送给">
					<el-input readOnly='true' v-model='planBook.sendToUser'></el-input>
				</el-form-item>
				<el-form-item label="" v-show='!viewOnly'>
					<el-button @click="toUpdate" type="success" class="el-icon-check">更新</el-button>
				</el-form-item>
			</el-form>	
		</el-card>
		<div v-show='viewOnly'>
			<el-card class="box-card mb-16 inp-middle" shadow="always" v-show='managerAuditFlag'> 
				<h3>执行部门经理审核</h3>
				<el-form label-width="150px">
					<el-form-item label="审核意见">
						<el-input type='textarea' :rows='4' v-model='managerRemark' style="width:40%;" readOnly></el-input>
					</el-form-item>
					<el-form-item label="审核结果"> 
						<span>{{managerStatus}}</span>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card mb-16 inp-middle" shadow="always" v-show='executeAuditFlag'>
				<h3>执行副总审核</h3>
				<el-form label-width="150px">
					<el-form-item label="审核意见">
						<el-input type='textarea' :rows='4' v-model='excuteRemark' style="width:40%;" readOnly></el-input>
					</el-form-item>
					<el-form-item label="审核结果"> 
						<span>{{executeStatus}}</span>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card mb-16 inp-middle" shadow="always" v-show='budgetAuditFlag'>
				<h3>预算审批</h3>
				<el-form label-width="150px">
					<el-form-item label="审批意见">
						<el-input type='textarea' :rows='4' v-model='budgetRemark' style="width:40%;" readOnly></el-input>
					</el-form-item>
					<el-form-item label="审批结果"> 
						<span>{{budgetStatus}}</span>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PlanBook',
	props:{
		planBook:{
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
	computed: {
	    // 后台传过来的数据规则是： 三个审核字段都会返回，当没审核时，字段值为空对象{}
	    managerAuditFlag: function(){
	    	if( !(JSON.stringify(this.planBook.managerAuditRecord) =='{}' || !this.planBook.managerAuditRecord )){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    managerRemark: function(){
	    	if( !(JSON.stringify(this.planBook.managerAuditRecord) =='{}' || !this.planBook.managerAuditRecord )){
	    		return this.planBook.managerAuditRecord.remark;
	    	}
	    },
	    managerStatus: function(){
	    	if( !(JSON.stringify(this.planBook.managerAuditRecord) =='{}' || !this.planBook.managerAuditRecord )){
	    		return this.planBook.managerAuditRecord.status == 3?'通过':'不通过';
	    	}
	    },
		executeAuditFlag: function(){
			if(!(JSON.stringify(this.planBook.executeAuditRecord) == '{}' || !this.planBook.executeAuditRecord)){
				return true;
			}else{
				return false;
			}
		},
		excuteRemark: function(){
			if(!(JSON.stringify(this.planBook.executeAuditRecord) == '{}' || !this.planBook.executeAuditRecord)){
				return this.planBook.executeAuditRecord.remark;
			}
		},
		executeStatus: function(){
			if(!(JSON.stringify(this.planBook.executeAuditRecord) == '{}' || !this.planBook.executeAuditRecord)){
				return this.planBook.executeAuditRecord.status == 3?'通过':'不通过';
			}
		},
		budgetAuditFlag: function(){
			if(!(JSON.stringify(this.planBook.budgetAuditRecord) == '{}' || !this.planBook.budgetAuditRecord)){
				return true;
			}else{
				return false;
			}
		},
		budgetRemark: function(){
			if(!(JSON.stringify(this.planBook.budgetAuditRecord) == '{}' || !this.planBook.budgetAuditRecord)){
				return this.planBook.budgetAuditRecord.remark;
			}
		},
		budgetStatus: function(){
			if(!(JSON.stringify(this.planBook.budgetAuditRecord) == '{}' || !this.planBook.budgetAuditRecord)){
				return this.planBook.budgetAuditRecord.status == 3?'通过':'不通过';
			}
		}
	},
	methods:{
		toUpdate(){
			let params = this.planBook;
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
.sm-tip{ font-size: 12px; color:#67c23a; margin-left: 10px;}
.upload-demo{ display: inline-block; }
.half-width{ width: 40%; }
</style>
