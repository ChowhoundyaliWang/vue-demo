<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>待审核的项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content min-w" id="userCreate"> 
			<el-card class="box-card mb-16" shadow="always">
				<h3>任务书信息</h3>
				<el-form :model="tbInfos" label-width="150px">
					<el-form-item label="项目类型">
						<el-radio-group v-model="tbInfos.type">
							<el-radio :label="1" disabled>厂家</el-radio>
							<el-radio :label="2" disabled>三方</el-radio>
							<el-radio :label="3" disabled>设计</el-radio>
							<el-radio :label="4" disabled>软件</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="国内海外" v-if="tbInfos.type == 3">
						<el-radio-group v-model="tbInfos.domesticOrOversea">
							<el-radio :label="1" disabled>国内</el-radio>
							<el-radio :label="2" disabled>海外</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="项目名称">
						<span>{{tbInfos.projectName}}</span>
					</el-form-item>
					<el-form-item label="应用区域">
						<span>{{tbInfos.appField}}</span>
					</el-form-item>	
					<el-form-item label="项目号">
						<span>项目号参数待加</span>
					</el-form-item>	
					<el-form-item label="用户名称">
						<span>{{tbInfos.userName}}</span>
					</el-form-item>
					<el-form-item label="合同名称" class="inp-long" v-show="tbInfos.type !== 3">
						<el-input v-model="tbInfos.contractName"  readonly='true'></el-input>
					</el-form-item>
					<el-form-item label="项目负责人" v-if="tbInfos.type==3">
						<el-input v-model="tbInfos.projectManager"  readonly='true'></el-input>
					</el-form-item>
					<el-form-item label="联系电话" v-if="tbInfos.type==3">
						<el-input v-model="tbInfos.managerPhone"  readonly='true'></el-input>
					</el-form-item>
					<el-form-item label="市场归口人">
						<el-input v-model="tbInfos.marketUser"  readonly='true'></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input v-model="tbInfos.marketPhone"  readonly='true'></el-input>
					</el-form-item>
					<el-form-item label="投资金额类型" v-if="tbInfos.type==3">
						<el-radio-group v-model="tbInfos.billType">
							<el-radio :label="1" disabled>运营商当期投资金额</el-radio>
							<el-radio :label="2" disabled>院方当期设计费</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="tbInfos.billType == 1 && tbInfos.type==3">
						<el-form-item label="投资金额">
							<el-input v-model="tbInfos.amountOfInvest"  readonly='true'></el-input>
						</el-form-item>
						<el-form-item label="投资金额大写">
							<span>{{tbInfos.desInstitute}}</span>
						</el-form-item>
						<el-form-item label="取费标准">
							<el-input v-model="tbInfos.chargeStandard"  readonly='true'></el-input>%
						</el-form-item>
					</div>
					<div v-if="tbInfos.billType ==2&&tbInfos.type==3">
						<el-form-item label="当期设计费">
							<el-input v-model="tbInfos.amountOfInvest"  readonly='true'></el-input>
						</el-form-item>
						<el-form-item label="当期设计费大写">
							<span>{{tbInfos.designChinesize}}</span>
						</el-form-item>
					</div>
					<el-form-item label="分包比例" v-if='tbInfos.type==3'>
							<el-input v-model="tbInfos.chargePercent"  readonly='true'></el-input>%
						</el-form-item>	
					<el-form-item label="执行周期">
						<el-date-picker v-model="tbInfos.executeCycle" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="合同金额">
						<el-input  v-model="tbInfos.contractBill"  readonly='true'></el-input>
					</el-form-item>
					<el-form-item label="合同金额大写">
						<span>{{tbInfos.contractBillChinesize}}</span>
					</el-form-item>
					<el-form-item label="金额备注" class="inp-long">
						<el-input v-model="tbInfos.contractBillRemark"  readonly='true'></el-input>
					</el-form-item>
                    <div  v-if=" tbInfos.billType == 2&&tbInfos.type==3">
                    	<el-form-item label="回款周期">
						     <el-input v-model="tbInfos.returnBillRecycle"  readonly='true'></el-input>
					    </el-form-item>
					    <el-form-item label="院方主管领导">
						     <el-input v-model="tbInfos.jiaLeader"  readonly='true'></el-input>
					    </el-form-item>
					    <el-form-item label="院方项目负责人">
						     <el-input v-model="tbInfos.jiaManager"  readonly='true'></el-input>
					    </el-form-item>
                    </div>
					<el-form-item label="相关附件">
						<el-upload action="127.0.0.1:2000/ossUrl">
							<el-button size="default" type="primary">点击上传</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="发起人归属大区" v-show="tbInfos.type!==3">
                        <span>{{tbInfos.region}}</span>
					</el-form-item>
					<el-form-item label="项目执行要求">
						<el-input type="textarea" style="width:400px;" v-model="tbInfos.proDemand" readonly="true"></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" style="width:400px;" v-model="tbInfos.proDemandRemark" readonly="true"></el-input>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>人力资源</h3>
				<el-table :data="tbInfos.humanResources" border style="width:80%;" class="mx-table hr-table">
					<el-table-column prop="gprs" label="网络制式" width='180'>
							 
					</el-table-column>
					<el-table-column prop="scale" label="级别" width='180'>
					    
					</el-table-column>
					<el-table-column prop="count" label="数量" width='80'>
					    
					</el-table-column>
					<el-table-column prop="startTime" label="开始日期" width='180'>
					    <template slot-scope="scope">
					         <el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" disabled></el-date-picker>
						</template> 
					</el-table-column>
					<el-table-column prop="endTime" label="结束日期" width='180'>
					    <template slot-scope="scope">
					         <el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" disabled></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="product" label="投入人天" > 
					</el-table-column>
					<el-table-column prop="average" label="折合人月"> 
					</el-table-column>
					<el-table-column prop="remark" label="备注" width='180'>
					</el-table-column>
				</el-table>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>车辆资源</h3>
				<el-table :data="tbInfos.carResources" border style="width:80%;" class="mx-table">
					<el-table-column prop="scale" label="级别">
					</el-table-column>
					<el-table-column prop="count" label="数量">
					</el-table-column>
					<el-table-column prop="month" label="参与工期（月）"> 
					</el-table-column>
					<el-table-column prop="remark" label="备注">
					</el-table-column>
				</el-table>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>固定资产</h3>
				<el-table :data="tbInfos.fixedAssets" border style="width:80%;" class="mx-table">
					<el-table-column prop="type" label="设备类型">
					</el-table-column>
					<el-table-column prop="count" label="数量">
					</el-table-column>
					<el-table-column prop="month" label="参与工期（月）">
					</el-table-column>
					<el-table-column prop="remark" label="备注"> 
					</el-table-column>
				</el-table>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>低值易耗</h3>
				<el-table :data="tbInfos.lowExpend" border style="width:80%;" class="mx-table">
					<el-table-column prop="type" label="设备类型">
					</el-table-column>
					<el-table-column prop="count" label="数量">
					</el-table-column>
					<el-table-column prop="month" label="参与工期（月）">
					</el-table-column>
					<el-table-column prop="remark" label="备注"> 
					</el-table-column>
				</el-table>
			</el-card>
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>项目执行</h3>
				<el-form label-width="150px">
					<el-form-item label="项目执行主体">
						<el-select placeholder="请选择" style="width:300px;" v-model="tbInfos.proExecuteSubject" disabled>
							<el-option v-for="item in proDeptList"
							:key="item.id"
							:label="item.name"
							:value="item.id"> 
						    </el-option>
						</el-select>
				    </el-form-item>
				    <el-form-item label="具体执行人">
						<el-select placeholder="请选择" style="width:300px;" v-model='tbInfos.proExecutePeople' disabled>
							<el-option v-for="item in proManagerList"
							:key="item.id"
							:label="item.name"
							:value="item.id"> 
						    </el-option>
						</el-select>
				    </el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>任务书审核</h3>
				<el-form label-width="150px">
					<el-form-item label="审核意见">
						<el-input type='textarea' :rows='4' v-model='remark' style="width:40%;"></el-input>
				    </el-form-item>
				    <el-form-item label=" "> 
						<el-button type="primary" @click="pass" class="fl" icon="el-icon-circle-check-outline">通过</el-button>
						<el-button type="primary" @click="notPass" class="fl" icon="el-icon-circle-close-outline">不通过</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TaskBookAuditing',
	data () {
		return {
			tbInfos:{},
			proDeptList:[],
			proManagerList:[],
			remark:'',
			taskId: this.$route.params.id
		}
	},
	mounted (){
		this.axios.get('/api/pro-dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.proDeptList = model;
		});
		this.axios.get('/api/task/get/'+ this.taskId).then((res)=>{
			let data = res.data;
			if(data.code == 200){
				let model = data.model;
				console.log(model);
				this.tbInfos = model;
				this.axios.get('/api/pro-management/list',{params:{'id': this.tbInfos.proExecuteSubject}}).then((res)=>{
			       const data = res.data;
			       const model = data.model;
			       this.proManagerList = model;
		        });
			}
		});
	},
	methods:{
		pass(){
			this.$confirm('确定审核通过吗？','提示',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'info'
			}).then(()=>{
				let params = {};
				params.status = 2;
				params.taskId = this.taskId;
				params.remark = this.remark;
				this.axios.post('/api/task/audit',params).then((res)=>{
					let data = res.data;
					if(data.code == 200){
						this.$alert("审核成功！",'提示')
					}
				}).catch((error)=>{

				});
			}).catch(()=>{

			})
		},
		notPass(){
			this.$confirm('确定审核不通过吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'info'
			}).then(() => {
				let params = {};
				params.status = 4;
				params.taskId = this.taskId;
				params.remark = this.remark;
				this.axios.post('/api/task/audit',params).then((res)=>{
					let data = res.data;
					if(data.code == 200){
						this.$alert("审核成功！",'提示')
					}
				}).catch((error)=>{

				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消审核通过'
				});          
			});
			
		}
	}
}
</script>

<style scoped>

</style>
