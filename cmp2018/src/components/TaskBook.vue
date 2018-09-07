<template>
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
					<el-form-item label="项目号分配" v-if='tbInfos.projectNumber'>
						<span>已分配</span>
					</el-form-item>	
					<el-form-item label="项目号" v-if='tbInfos.projectNumber'>
						<span>{{tbInfos.projectNumber}}</span>
					</el-form-item>	
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
						<el-upload action='' :file-list='tbInfos.files' disabled :on-preview='handlePreview'>
							<el-button size="default" type="primary">选择文件</el-button>
							<div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
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
				<el-table :data="tbInfos.humanResources" border class="mx-table hr-table" show-summary :summary-method="getSummaries">
					<el-table-column prop="gprs" label="网络制式">
							 
					</el-table-column>
					<el-table-column prop="scale" label="级别" width='150'>
					    
					</el-table-column>
					<el-table-column prop="count" label="数量" width='80'>
					    
					</el-table-column>
					<el-table-column prop="startTime" label="开始日期" width='180'>
					    <template slot-scope="scope">
					         <el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" disabled value-format="timestamp" class='date-inp'></el-date-picker>
						</template> 
					</el-table-column>
					<el-table-column prop="endTime" label="结束日期" width='180'>
					    <template slot-scope="scope">
					         <el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" disabled value-format="timestamp" class='date-inp'></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="product" label="投入人天" width='80'>
					</el-table-column>
					<el-table-column prop="average" label="折合人月" width='80'>
					</el-table-column>
					<el-table-column prop="remark" label="备注" width='180'>
					</el-table-column>
				</el-table>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>车辆资源</h3>
				<el-table :data="tbInfos.carResources" border class="mx-table">
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
				<el-table :data="tbInfos.fixedAssets" border class="mx-table">
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
				<el-table :data="tbInfos.lowExpend" border class="mx-table">
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
							<el-option v-for="item in deptList"
							:key="item.id"
							:label="item.name"
							:value="item.id"> 
						    </el-option>
						</el-select>
				    </el-form-item>
				    <el-form-item label="具体执行人">
						<el-select placeholder="请选择" style="width:300px;" v-model='tbInfos.proExecutePeople' disabled>
							<el-option v-for="item in managerList"
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
</template>

<script>
export default {
	name: 'TaskBook',
	props:{
		tbInfos:{
			type: Object,
			required: true
		},
		deptList:{
			type: Array,
			required: true
		},
		managerList:{
			type: Array,
			required: true
		}
	},
	mounted () {
	},
	methods:{
		getSummaries(param){
			return this.tableSum(param);
		},
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

</style>
