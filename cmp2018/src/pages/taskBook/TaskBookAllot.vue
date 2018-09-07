<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>待分配的项目任务书</el-breadcrumb-item>
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

					<div v-if='chooseNum'>
						<el-form-item label="项目号">
							<el-radio-group v-model="numType">
								<el-radio :label="1">选择</el-radio>
								<el-radio :label="2">自定义输入</el-radio>
							</el-radio-group>
						</el-form-item>	
						<el-form-item label="" v-if='numType == 1'>
							<el-select placeholder="请选择" v-model="proNumber.num1">
								<el-option v-for="item in listFirst" :key="item.id" :label="item.label + ' ('+item.alias+')'" :value="item.label"></el-option>
							</el-select>
							<el-select placeholder="请选择" v-model="proNumber.num2">
								<el-option v-for="item in listSecond" :key="item.id" :label="item.label+ ' ('+item.alias+')'" :value="item.label"></el-option>
							</el-select>
							<el-select placeholder="请选择" v-model="proNumber.num3">
								<el-option v-for="item in listThird" :key="item.id" :label="item.label+ ' ('+item.alias+')'" :value="item.label"></el-option>
							</el-select>
							<el-select placeholder="请选择" v-model="proNumber.num4" @change='yearChange'>
								<el-option v-for="item in listFourth" :key="item.id" :label="item.label" :value="item.label"></el-option>
							</el-select>
							<el-select placeholder="请选择" v-model="proNumber.num5">
								<el-option v-for="item in listFifth" :key="item.value" :label="item.value" :value="item.value"></el-option>
							</el-select>
						</el-form-item>	
						<el-form-item label='' v-if="numType == 2">
							<el-input v-model='defNumber'></el-input>
						</el-form-item>
						<el-form-item label=''>
							<el-button type="success" @click='handleAllot()'><i class='el-icon-check'>分配</i></el-button>
						</el-form-item>
					</div>

					<el-form-item label="用户名称">
						<span>{{tbInfos.userName}}</span>
					</el-form-item>
					<el-form-item label="合同名称" class="inp-long" v-show="tbInfos.type !== 3">
						<el-input v-model="tbInfos.contractName"  readOnly='true'></el-input>
					</el-form-item>
					<el-form-item label="项目负责人" v-if="tbInfos.type==3">
						<el-input v-model="tbInfos.projectManager"  readOnly='true'></el-input>
					</el-form-item>
					<el-form-item label="联系电话" v-if="tbInfos.type==3">
						<el-input v-model="tbInfos.managerPhone"  readOnly='true'></el-input>
					</el-form-item>
					<el-form-item label="市场归口人">
						<el-input v-model="tbInfos.marketUser"  readOnly='true'></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input v-model="tbInfos.marketPhone"  readOnly='true'></el-input>
					</el-form-item>
					<el-form-item label="投资金额类型" v-if="tbInfos.type==3">
						<el-radio-group v-model="tbInfos.billType">
							<el-radio :label="1" disabled>运营商当期投资金额</el-radio>
							<el-radio :label="2" disabled>院方当期设计费</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="tbInfos.billType == 1 && tbInfos.type==3">
						<el-form-item label="投资金额">
							<el-input v-model="tbInfos.amountOfInvest"  readOnly='true'></el-input>
						</el-form-item>
						<el-form-item label="投资金额大写">
							<span v-text='tbInfos.investChinesize'></span>
						</el-form-item>
						<el-form-item label="取费标准">
							<el-input v-model="tbInfos.chargeStandard"  readOnly='true'></el-input>%
						</el-form-item>
					</div>
					<div v-if="tbInfos.billType ==2&&tbInfos.type==3">
						<el-form-item label="当期设计费">
							<el-input v-model="tbInfos.amountOfInvest"  readOnly='true'></el-input>
						</el-form-item>
						<el-form-item label="当期设计费大写">
							<span>{{tbInfos.investChinesize}}</span>
						</el-form-item>
					</div>
					<el-form-item label="分包比例" v-if='tbInfos.type==3'>
							<el-input v-model="tbInfos.chargePercent"  readOnly='true'></el-input>%
						</el-form-item>	
					<el-form-item label="执行周期">
						<el-date-picker v-model="tbInfos.executeCycle" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="合同金额">
						<el-input  v-model="tbInfos.contractBill"  readOnly='true'></el-input>
					</el-form-item>
					<el-form-item label="合同金额大写">
						<span v-text="tbInfos.contractBillChinesize"></span>
					</el-form-item>
					<el-form-item label="金额备注" class="inp-long">
						<el-input v-model="tbInfos.contractBillRemark"  readOnly='true'></el-input>
					</el-form-item>
                    <div  v-if=" tbInfos.billType == 2&&tbInfos.type==3">
                    	<el-form-item label="回款周期">
						     <el-input v-model="tbInfos.returnBillRecycle"  readOnly='true'></el-input>
					    </el-form-item>
					    <el-form-item label="院方主管领导">
						     <el-input v-model="tbInfos.jiaLeader"  readOnly='true'></el-input>
					    </el-form-item>
					    <el-form-item label="院方项目负责人">
						     <el-input v-model="tbInfos.jiaManager"  readOnly='true'></el-input>
					    </el-form-item>
                    </div>
					<el-form-item label="相关附件">
						<el-upload :file-list='tbInfos.files' disabled :on-preview='handlePreview'>
							<el-button size="default" type="primary">选择文件</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="发起人归属大区" v-show="tbInfos.type!==3">
                        <span>{{tbInfos.region}}</span>
					</el-form-item>
					<el-form-item label="项目执行要求">
						<el-input type="textarea" style="width:400px;" v-model="tbInfos.proDemand" readOnly='true'></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" style="width:400px;" v-model="tbInfos.proDemandRemark" readOnly='true'></el-input>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>人力资源</h3>
				<el-table :data="tbInfos.humanResources" border style="width:80%;" class="mx-table hr-table" show-summary :summary-method="getSummaries">
					<el-table-column prop="gprs" label="网络制式" width='180'>
							 
					</el-table-column>
					<el-table-column prop="scale" label="级别" width='180'>
					    
					</el-table-column>
					<el-table-column prop="count" label="数量" width='80'>
					    
					</el-table-column>
					<el-table-column prop="startTime" label="开始日期" width='180'>
					    <template slot-scope="scope">
					         <el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" disabled value-format="timestamp"></el-date-picker>
						</template> 
					</el-table-column>
					<el-table-column prop="endTime" label="结束日期" width='180'>
					    <template slot-scope="scope">
					         <el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" disabled value-format="timestamp"></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="product" label="投入人天">
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
			<el-card class="box-card mb-16 inp-middle" shadow="always" v-if='tbInfos.status !==1'>
				<h3>任务书审核</h3>
				<el-form label-width="150px">
					<el-form-item label="审核意见">
						<el-input type='textarea' :rows='4' v-model='tbInfos.record.remark' readOnly='true' style="width: 40%;"></el-input>
					</el-form-item>
					<el-form-item label="审核结果">
						<span v-text="tbInfos.record.status == 2?'通过':'不通过'"></span>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TaskBookAllot',
	data () {
		return {
			chooseNum:true,
			tbInfos:{
				record:{
					remark:'',
					status:''
				}
			},
			proDeptList:[],
			proManagerList:[],
			taskId: this.$route.params.id,
			numType: 1,
			proNumber:{
				num1:'',
				num2:'',
				num3:'',
				num4:'',
				num5:''
			},
			defNumber:'',
			listFirst:[],
			listSecond:[],
			listThird:[],
			listFourth:[],
			listFifth:[]
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
				this.tbInfos = model;
				this.axios.get('/api/pro-management/list',{params:{'id': this.tbInfos.proExecuteSubject}}).then((res)=>{
			       const data = res.data;
			       const model = data.model;
			       this.proManagerList = model;
		        });
			}
		});
		this.axios.get('/api/program/number/list?order=1').then((res) => {
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.listFirst = model;
			}
		});
		this.axios.get('/api/program/number/list?order=2').then((res) => {
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.listSecond = model;
			}
		});
		this.axios.get('/api/program/number/list?order=3').then((res) => {
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.listThird = model;
			}
		});
		this.axios.get('/api/program/number/list?order=4').then((res) => {
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.listFourth = model;
			}
		});
	},
	methods:{
		//附件文件下载
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
		yearChange(val){
			this.axios.get('/api/program/order/list?year='+val).then((res)=>{
				const data = res.data;
				const model = data.model;
				let list = [];
				for(let i=0;i<model.length;i++){
					let obj={};
					obj.value = model[i];
					list.push(obj)
				}
				this.listFifth = list;
				console.log(this.listFifth)
			});
		},		
		getSummaries(param){
			return this.tableSum(param);
		},
		handleAllot(){
			let params = {};
			params.id = this.taskId;
			if(this.chooseNum == 1){
				let proNumber = this.proNumber;
				params.projectNumber = proNumber.num1 +'-'+ proNumber.num2 +proNumber.num3+'-'+proNumber.num4+'-'+proNumber.num5;
			}else if(this.chooseNum == 2){
				params.projectNumber = defNumber;
			}
			this.axios.post('/api/program/number/allocation',params).then((res)=>{
                const data = res.data;
                const msg = data.message;
                if(data.code == 200){
                    this.$alert(msg,'提示', {
							confirmButtonText:'确定',
							callback: action => {
								this.$router.push({
									path:'/TaskBookAllocated'
								})
							}
						})
                }else{
                	this.$alert(msg,'错误提示');
                }  
			}).catch((error)=>{
               
			});
		}
	}
}
</script>

<style scoped>

</style>
