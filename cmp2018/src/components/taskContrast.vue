<template>
	<!-- 对比更新 -->
	<el-dialog title="更新记录" width='97%' :visible="taskContrastShow" class='budget-inp' @close='closeDialog'>
	 	<div style="width:100%; height:460px;overflow-y: auto;" class="constrat">
			<div style="display: inline-block;width:49%;overflow-x: auto;vertical-align: top;">
				<div class="page-content" id="userCreate"> 
					<el-card class="box-card mb-16" shadow="always">
						<h3>任务书信息</h3>
						<el-form :model="one" label-width="150px">
							<el-form-item label="项目类型"  :class="{ changed: one.type !== another.type} ">
								<el-radio-group v-model="one.type">
									<el-radio :label="1" disabled>厂家</el-radio>
									<el-radio :label="2" disabled>三方</el-radio>
									<el-radio :label="3" disabled>设计</el-radio>
									<el-radio :label="4" disabled>软件</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="国内海外" v-if="one.type == 3" :class="{ changed: one.domesticOrOversea !== another.domesticOrOversea}">
								<el-radio-group v-model="one.domesticOrOversea">
									<el-radio :label="1" disabled>国内</el-radio>
									<el-radio :label="2" disabled>海外</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="项目名称" :class="{ changed: one.projectName !== another.projectName}">
								<span>{{one.projectName}}</span>
							</el-form-item>
							<el-form-item label="应用区域" :class="{ changed: one.appField !== another.appField}">
								<span>{{one.appField}}</span>
							</el-form-item>	
							<el-form-item label="项目号" :class="{ changed: one.projectNumber !== another.projectNumber}" v-show='one.projectNumber'>
								<span>{{one.projectNumber}}</span>  
							</el-form-item>	
							<el-form-item label="用户名称" :class="{ changed: one.userName !== another.userName}">
								<span>{{one.userName}}</span>
							</el-form-item>
							<el-form-item label="合同名称" class="inp-long" v-show="one.type !== 3"  :class="{ changed: one.contractName !== another.contractName}">
								<el-input v-model="one.contractName"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="项目负责人" v-if="one.type==3" :class="{ changed: one.projectManager !== another.projectManager}">
								<el-input v-model="one.projectManager"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="联系电话" v-if="one.type==3" :class="{ changed: one.managerPhone !== another.managerPhone}">
								<el-input v-model="one.managerPhone"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="市场归口人" :class="{ changed: one.marketUser !== another.marketUser}">
								<el-input v-model="one.marketUser"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="联系电话" :class="{ changed: one.marketPhone !== another.marketPhone}">
								<el-input v-model="one.marketPhone"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="投资金额类型" v-if="one.type==3"  :class="{ changed: one.billType !== another.billType}">
								<el-radio-group v-model="one.billType">
									<el-radio :label="1" disabled>运营商当期投资金额</el-radio>
									<el-radio :label="2" disabled>院方当期设计费</el-radio>
								</el-radio-group>
							</el-form-item>
							<div v-if="one.billType == 1 && one.type==3">
								<el-form-item label="投资金额" :class="{ changed: one.amountOfInvest !== another.amountOfInvest}">
									<el-input v-model="one.amountOfInvest"  readOnly='true'></el-input>
								</el-form-item>
								<el-form-item label="投资金额大写" :class="{ changed: one.desInstitute !== another.desInstitute}">
									<span>{{one.desInstitute}}</span>
								</el-form-item>
								<el-form-item label="取费标准" :class="{ changed: one.chargeStandard !== another.chargeStandard}">
									<el-input v-model="one.chargeStandard"  readOnly='true'></el-input>%
								</el-form-item>
							</div>
							<div v-if="one.billType ==2&&one.type==3">
								<el-form-item label="当期设计费" :class="{ changed: one.amountOfInvest !== another.amountOfInvest}">
									<el-input v-model="one.amountOfInvest"  readOnly='true'></el-input>
								</el-form-item>
								<el-form-item label="当期设计费大写" :class="{ changed: one.designChinesize !== another.designChinesize}">
									<span>{{one.designChinesize}}</span>
								</el-form-item>
							</div>
							<el-form-item label="分包比例" v-if='one.type==3' :class="{ changed: one.chargePercent !== another.chargePercent}">
								<el-input v-model="one.chargePercent"  readOnly='true'></el-input>%
							</el-form-item>	
							<el-form-item label="执行周期" :class="{ changed: JSON.stringify(one.executeCycle) !== JSON.stringify(another.executeCycle)}">
								<el-date-picker v-model="one.executeCycle" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
								</el-date-picker>
							</el-form-item>
							<el-form-item label="合同金额" :class="{ changed: one.contractBill !== another.contractBill}">
								<el-input  v-model="one.contractBill"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="合同金额大写" :class="{ changed: one.contractBillChinesize !== another.contractBillChinesize}">
								<span>{{one.contractBillChinesize}}</span>
							</el-form-item>
							<el-form-item label="金额备注" class="inp-long" :class="{ changed: one.contractBillRemark !== another.contractBillRemark}">
								<el-input v-model="one.contractBillRemark"  readOnly='true'></el-input>
							</el-form-item>
							<div  v-if=" one.billType == 2&&one.type==3">
								<el-form-item label="回款周期" :class="{ changed: one.returnBillRecycle !== another.returnBillRecycle}">
									<el-input v-model="one.returnBillRecycle"  readOnly='true'></el-input>
								</el-form-item>
								<el-form-item label="院方主管领导" :class="{ changed: one.jiaLeader !== another.jiaLeader}">
									<el-input v-model="one.jiaLeader"  readOnly='true'></el-input>
								</el-form-item>
								<el-form-item label="院方项目负责人" :class="{ changed: one.jiaManager !== another.jiaManager}">
									<el-input v-model="one.jiaManager"  readOnly='true'></el-input>
								</el-form-item>
							</div>
							<el-form-item label="相关附件">
								<el-upload action='' :file-list='one.files' disabled :on-preview='handlePreview'>
									<el-button size="default" type="primary">选择文件</el-button>
									<div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
								</el-upload>
							</el-form-item>
							<el-form-item label="发起人归属大区" v-show="one.type!==3" :class="{ changed: one.region !== another.region}">
								<span>{{one.region}}</span>
							</el-form-item>
							<el-form-item label="项目执行要求" :class="{ changed: one.proDemand !== another.proDemand}">
								<el-input type="textarea" style="width:400px;" v-model="one.proDemand" readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="备注" :class="{ changed: one.proDemandRemark !== another.proDemandRemark}">
								<el-input type="textarea" style="width:400px;" v-model="one.proDemandRemark" readOnly='true'></el-input>
							</el-form-item>
						</el-form>
					</el-card>
					<el-card class="box-card mb-16" shadow="always">
						<h3 :class="{ red: JSON.stringify(one.humanResources )!== JSON.stringify(another.humanResources)}">人力资源</h3>
						<el-table :data="one.humanResources" border style="width:100%;" class="mx-table hr-table" show-summary :summary-method="getSummaries">
							<el-table-column prop="gprs" label="网络制式">
							</el-table-column>
							<el-table-column prop="scale" label="级别">
							</el-table-column>
							<el-table-column prop="count" label="数量" width='50'>
							</el-table-column>
							<el-table-column prop="startTime" label="开始日期" width='160'>
								<template slot-scope="scope">
									<el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" disabled value-format="timestamp" class='date-inp'></el-date-picker>
								</template> 
							</el-table-column>
							<el-table-column prop="endTime" label="结束日期" width='160'>
								<template slot-scope="scope">
									<el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" disabled value-format="timestamp" class='date-inp'></el-date-picker>
								</template>  
							</el-table-column>
							<el-table-column prop="product" label="投入人天" width='60'> 
							</el-table-column>
							<el-table-column prop="average" label="折合人月" width='60'>
							</el-table-column>
							<el-table-column prop="remark" label="备注">
							</el-table-column>
						</el-table>
					</el-card>
					<el-card class="box-card mb-16" shadow="always">
						<h3 :class="{ red: JSON.stringify(one.carResources )!== JSON.stringify(another.carResources)}">车辆资源</h3>
						<el-table :data="one.carResources" border style="width:100%;" class="mx-table">
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
						<h3 :class="{ red: JSON.stringify(one.fixedAssets )!== JSON.stringify(another.fixedAssets)}">固定资产</h3>
						<el-table :data="one.fixedAssets" border style="width:100%;" class="mx-table">
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
						<h3 :class="{ red: JSON.stringify(one.lowExpend )!== JSON.stringify(another.lowExpend)}">低值易耗</h3>
						<el-table :data="one.lowExpend" border style="width:100%;" class="mx-table">
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
							<el-form-item label="项目执行主体"  :class="{ changed: one.proExecuteSubject !== another.proExecuteSubject}">
								<el-select placeholder="请选择" style="width:300px;" v-model="one.proExecuteSubject" disabled>
									<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="具体执行人"  :class="{ changed: one.proExecutePeople !== another.proExecutePeople}">
								<el-select placeholder="请选择" style="width:300px;" v-model='one.proExecutePeople' disabled>
									<el-option v-for="item in managerList" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-card>
					<el-card class="box-card mb-16 inp-middle" shadow="always" v-if='one.status !== 1'>
						<h3>任务书审核</h3>
						<el-form label-width="150px">
							<el-form-item label="审核意见">
								<el-input type='textarea' :rows='4' v-model='remark' readOnly='true' style="width: 80%;"></el-input>
							</el-form-item>
							<el-form-item label="审核结果">
								<span v-text="status == 2 ?'通过':'不通过'"></span>
							</el-form-item>
						</el-form>
					</el-card>
				</div>
			</div>
			<div style="display: inline-block;width:50%;overflow-x: auto;vertical-align: top;">
				<div class="page-content" id="userCreate"> 
					<el-card class="box-card mb-16" shadow="always">
						<h3>任务书信息</h3>
						<el-form :model="another" label-width="150px">
							<el-form-item label="项目类型" :class="{ changed: one.type !== another.type}">
								<el-radio-group v-model="another.type">
									<el-radio :label="1" disabled>厂家</el-radio>
									<el-radio :label="2" disabled>三方</el-radio>
									<el-radio :label="3" disabled>设计</el-radio>
									<el-radio :label="4" disabled>软件</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="国内海外" v-if="another.type == 3"  :class="{ changed: one.domesticOrOversea !== another.domesticOrOversea}">
								<el-radio-group v-model="one.domesticOrOversea">
									<el-radio :label="1" disabled>国内</el-radio>
									<el-radio :label="2" disabled>海外</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="项目名称" :class="{ changed: one.projectName !== another.projectName}">
								<span>{{another.projectName}}</span>
							</el-form-item>
							<el-form-item label="应用区域" :class="{ changed: one.appField !== another.appField}">
								<span>{{another.appField}}</span>
							</el-form-item>	
							<el-form-item label="项目号" :class="{ changed: one.projectNumber !== another.projectNumber}" v-show='another.projectNumber'>
								<span>{{another.projectNumber}}</span>
							</el-form-item>	
							<el-form-item label="用户名称" :class="{ changed: one.userName !== another.userName}">
								<span>{{another.userName}}</span>
							</el-form-item>
							<el-form-item label="合同名称" class="inp-long" v-show="another.type !== 3" :class="{ changed: one.contractName !== another.contractName}">
								<el-input v-model="another.contractName"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="项目负责人" v-if="another.type==3" :class="{ changed: one.projectManager !== another.projectManager}">
								<el-input v-model="another.projectManager"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="联系电话" v-if="another.type==3"  :class="{ changed: one.managerPhone !== another.managerPhone}">
								<el-input v-model="another.managerPhone"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="市场归口人"  :class="{ changed: one.marketUser !== another.marketUser}">
								<el-input v-model="another.marketUser"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="联系电话" :class="{ changed: one.marketPhone !== another.marketPhone}">
								<el-input v-model="another.marketPhone"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="投资金额类型" v-if="another.type==3"  :class="{ changed: one.billType !== another.billType}">
								<el-radio-group v-model="another.billType">
									<el-radio :label="1" disabled>运营商当期投资金额</el-radio>
									<el-radio :label="2" disabled>院方当期设计费</el-radio>
								</el-radio-group>
							</el-form-item>
							<div v-if="another.billType == 1 && another.type==3">
								<el-form-item label="投资金额" :class="{ changed: one.amountOfInvest !== another.amountOfInvest}">
									<el-input v-model="another.amountOfInvest"  readOnly='true'></el-input>
								</el-form-item>
								<el-form-item label="投资金额大写" :class="{ changed: one.desInstitute !== another.desInstitute}">
									<span>{{another.desInstitute}}</span>
								</el-form-item>
								<el-form-item label="取费标准" :class="{ changed: one.chargeStandard !== another.chargeStandard}">
									<el-input v-model="another.chargeStandard"  readOnly='true'></el-input>%
								</el-form-item>
							</div>
							<div v-if="another.billType ==2&&another.type==3">
								<el-form-item label="当期设计费" :class="{ changed: one.amountOfInvest !== another.amountOfInvest}">
									<el-input v-model="another.amountOfInvest"  readOnly='true'></el-input>
								</el-form-item>
								<el-form-item label="当期设计费大写" :class="{ changed: one.designChinesize !== another.designChinesize}">
									<span>{{another.designChinesize}}</span>
								</el-form-item>
							</div>
							<el-form-item label="分包比例" v-if='another.type==3' :class="{ changed: one.chargePercent !== another.chargePercent}">
								<el-input v-model="another.chargePercent"  readOnly='true'></el-input>%
							</el-form-item>	
							<el-form-item label="执行周期" :class="{ changed: JSON.stringify(one.executeCycle) !== JSON.stringify(another.executeCycle)}">
								<el-date-picker v-model="another.executeCycle" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
								</el-date-picker>
							</el-form-item>
							<el-form-item label="合同金额" :class="{ changed: one.contractBill !== another.contractBill}">
								<el-input  v-model="another.contractBill"  readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="合同金额大写" :class="{ changed: one.contractBillChinesize !== another.contractBillChinesize}">
								<span>{{another.contractBillChinesize}}</span>
							</el-form-item>
							<el-form-item label="金额备注" class="inp-long" :class="{ changed: one.contractBillRemark !== another.contractBillRemark}">
								<el-input v-model="another.contractBillRemark"  readOnly='true'></el-input>
							</el-form-item>
							<div  v-if=" another.billType == 2&&another.type==3">
								<el-form-item label="回款周期" :class="{ changed: one.returnBillRecycle !== another.returnBillRecycle}">
									<el-input v-model="another.returnBillRecycle"  readOnly='true'></el-input>
								</el-form-item>
								<el-form-item label="院方主管领导" :class="{ changed: one.jiaLeader !== another.jiaLeader}">
									<el-input v-model="another.jiaLeader"  readOnly='true'></el-input>
								</el-form-item>
								<el-form-item label="院方项目负责人" :class="{ changed: one.jiaManager !== another.jiaManager}">
									<el-input v-model="another.jiaManager"  readOnly='true'></el-input>
								</el-form-item>
							</div>
							<el-form-item label="相关附件">
								<el-upload action="" :file-list='another.files' disabled :on-preview='handlePreview'>
									<el-button size="default" type="primary">选择上传</el-button>
									<div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
								</el-upload>
							</el-form-item>
							<el-form-item label="发起人归属大区" v-show="another.type!==3" :class="{ changed: one.region !== another.region}">
								<span>{{another.region}}</span>
							</el-form-item>
							<el-form-item label="项目执行要求" :class="{ changed: one.proDemand !== another.proDemand}">
								<el-input type="textarea" style="width:400px;" v-model="another.proDemand" readOnly='true'></el-input>
							</el-form-item>
							<el-form-item label="备注" :class="{ changed: one.proDemandRemark !== another.proDemandRemark}">
								<el-input type="textarea" style="width:400px;" v-model="another.proDemandRemark" readOnly='true'></el-input>
							</el-form-item>
						</el-form>
					</el-card>
					<el-card class="box-card mb-16" shadow="always">
						<h3 :class="{ red: JSON.stringify(one.humanResources )!== JSON.stringify(another.humanResources)}">人力资源</h3>
						<el-table :data="another.humanResources" border style="width:100%;" class="mx-table hr-table" show-summary :summary-method="getSummaries">
							<el-table-column prop="gprs" label="网络制式">
							</el-table-column>
							<el-table-column prop="scale" label="级别">
							</el-table-column>
							<el-table-column prop="count" label="数量" width='50'>
							</el-table-column>
							<el-table-column prop="startTime" label="开始日期" width='160'>
								<template slot-scope="scope">
									<el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" disabled value-format="timestamp" class='date-inp'></el-date-picker>
								</template> 
							</el-table-column>
							<el-table-column prop="endTime" label="结束日期" width='160'>
								<template slot-scope="scope">
									<el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" disabled value-format="timestamp" class='date-inp'></el-date-picker>
								</template>  
							</el-table-column>
							<el-table-column prop="product" label="投入人天" width='60'> 
							</el-table-column>
							<el-table-column prop="average" label="折合人月" width='60'>
							</el-table-column>
							<el-table-column prop="remark" label="备注">
							</el-table-column>
						</el-table>
					</el-card>
					<el-card class="box-card mb-16" shadow="always">
						<h3 :class="{ red: JSON.stringify(one.carResources )!== JSON.stringify(another.carResources)}">车辆资源</h3>
						<el-table :data="another.carResources" border style="width:100%;" class="mx-table">
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
						<h3 :class="{ red: JSON.stringify(one.fixedAssets )!== JSON.stringify(another.fixedAssets)}">固定资产</h3>
						<el-table :data="another.fixedAssets" border style="width:100%;" class="mx-table">
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
						<h3 :class="{ red: JSON.stringify(one.lowExpend )!== JSON.stringify(another.lowExpend)}">低值易耗</h3>
						<el-table :data="another.lowExpend" border style="width:100%;" class="mx-table">
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
							<el-form-item label="项目执行主体" :class="{ changed: one.proExecuteSubject !== another.proExecuteSubject}">
								<el-select placeholder="请选择" style="width:300px;" v-model="another.proExecuteSubject" disabled>
									<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="具体执行人" :class="{ changed: one.proExecutePeople !== another.proExecutePeople}">
								<el-select placeholder="请选择" style="width:300px;" v-model='another.proExecutePeople' disabled>
									<el-option v-for="item in anoManager" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-card>
					<el-card class="box-card mb-16 inp-middle" shadow="always" v-if='another.status !== 1'>
						<h3>任务书审核</h3>
						<el-form label-width="150px">
							<el-form-item label="审核意见">
								<el-input type='textarea' :rows='4' v-model='anoRemark' readOnly='true' style="width: 80%;"></el-input>
							</el-form-item>
							<el-form-item label="审核结果">
								<span v-text="anoStatus == 2?'通过':'不通过'"></span>
							</el-form-item>
						</el-form>
					</el-card>
				</div>
			</div>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="closeDialog">关闭</el-button>
		</div>
	 </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'Vuex'
export default {
	name: 'taskContrast',
	data(){
		return {
			deptList:[]
		}
	},
	computed:{
		...mapState([
			'one', 'another', 'taskContrastShow'
		]),
		remark: function () {
			if(this.one.record){
				return this.one.record.remark;
			}
		},
		anoRemark: function(){
			if(this.another.record){
				return this.another.record.remark;
			}
		},
		status: function(){
			if(this.one.record){
				return this.one.record.status;
			}
		},
		anoStatus: function(){
			if(this.another.record){
				return this.another.record.status;
			}
		},
		managerList: function(){
			if(this.one.proExecuteSubject){
				this.axios.get('/api/pro-management/list',{params:{'id': this.one.proExecuteSubject}}).then((res)=>{
					const data = res.data;
					const model = data.model;
					return model;
				}); 
			}
		},
		anoManager: function(){
			if(this.another.proExecuteSubject){
				this.axios.get('/api/pro-management/list',{params:{'id': this.another.proExecuteSubject}}).then((res)=>{
					const data = res.data;
					const model = data.model;
					return model;
				}); 
			}
		}
	},
	mounted(){
		this.axios.get('/api/pro-dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.deptList = model;
		});
	},
	methods:{
		...mapActions([
			'initVersions'
		]),
		closeDialog(){
			this.initVersions();
		},
		getSummaries(param) {
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