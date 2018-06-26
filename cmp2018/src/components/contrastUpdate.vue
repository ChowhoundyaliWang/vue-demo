<template>
	<!-- 对比更新 -->
		<div style="width:100%; height:400px;overflow-y: auto;" class="constrat">
			<div style="display: inline-block;width:49%;overflow-x: auto;vertical-align: top;">
				<div class="page-content" id="userCreate"> 
					<el-card class="box-card mb-16" shadow="always">
						<h3>任务书信息</h3>
						<el-form :model="tbInfos" label-width="150px">
							<el-form-item label="项目类型"  :class="{ changed: tbInfos.type !== another.type} ">
								<el-radio-group v-model="tbInfos.type">
									<el-radio :label="1" disabled>厂家</el-radio>
									<el-radio :label="2" disabled>三方</el-radio>
									<el-radio :label="3" disabled>设计</el-radio>
									<el-radio :label="4" disabled>软件</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="国内海外" v-if="tbInfos.type == 3" :class="{ changed: tbInfos.domesticOrOversea !== another.domesticOrOversea}">
								<el-radio-group v-model="tbInfos.domesticOrOversea">
									<el-radio :label="1" disabled>国内</el-radio>
									<el-radio :label="2" disabled>海外</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="项目名称" :class="{ changed: tbInfos.projectName !== another.projectName}">
								<span>{{tbInfos.projectName}}</span>
							</el-form-item>
							<el-form-item label="应用区域" :class="{ changed: tbInfos.appField !== another.appField}">
								<span>{{tbInfos.appField}}</span>
							</el-form-item>	
							<el-form-item label="项目号">
								<span>项目号参数待加</span>
							</el-form-item>	
							<el-form-item label="用户名称" :class="{ changed: tbInfos.userName !== another.userName}">
								<span>{{tbInfos.userName}}</span>
							</el-form-item>
							<el-form-item label="合同名称" class="inp-long" v-show="tbInfos.type !== 3"  :class="{ changed: tbInfos.contractName !== another.contractName}">
								<el-input v-model="tbInfos.contractName"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="项目负责人" v-if="tbInfos.type==3" :class="{ changed: tbInfos.projectManager !== another.projectManager}">
								<el-input v-model="tbInfos.projectManager"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="联系电话" v-if="tbInfos.type==3" :class="{ changed: tbInfos.managerPhone !== another.managerPhone}">
								<el-input v-model="tbInfos.managerPhone"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="市场归口人" :class="{ changed: tbInfos.marketUser !== another.marketUser}">
								<el-input v-model="tbInfos.marketUser"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="联系电话" :class="{ changed: tbInfos.marketPhone !== another.marketPhone}">
								<el-input v-model="tbInfos.marketPhone"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="投资金额类型" v-if="tbInfos.type==3"  :class="{ changed: tbInfos.billType !== another.billType}">
								<el-radio-group v-model="tbInfos.billType">
									<el-radio :label="1" disabled>运营商当期投资金额</el-radio>
									<el-radio :label="2" disabled>院方当期设计费</el-radio>
								</el-radio-group>
							</el-form-item>
							<div v-if="tbInfos.billType == 1 && tbInfos.type==3">
								<el-form-item label="投资金额" :class="{ changed: tbInfos.amountOfInvest !== another.amountOfInvest}">
									<el-input v-model="tbInfos.amountOfInvest"  readonly='true'></el-input>
								</el-form-item>
								<el-form-item label="投资金额大写" :class="{ changed: tbInfos.desInstitute !== another.desInstitute}">
									<span>{{tbInfos.desInstitute}}</span>
								</el-form-item>
								<el-form-item label="取费标准" :class="{ changed: tbInfos.chargeStandard !== another.chargeStandard}">
									<el-input v-model="tbInfos.chargeStandard"  readonly='true'></el-input>%
								</el-form-item>
							</div>
							<div v-if="tbInfos.billType ==2&&tbInfos.type==3">
								<el-form-item label="当期设计费" :class="{ changed: tbInfos.amountOfInvest !== another.amountOfInvest}">
									<el-input v-model="tbInfos.amountOfInvest"  readonly='true'></el-input>
								</el-form-item>
								<el-form-item label="当期设计费大写" :class="{ changed: tbInfos.designChinesize !== another.designChinesize}">
									<span>{{tbInfos.designChinesize}}</span>
								</el-form-item>
							</div>
							<el-form-item label="分包比例" v-if='tbInfos.type==3' :class="{ changed: tbInfos.chargePercent !== another.chargePercent}">
								<el-input v-model="tbInfos.chargePercent"  readonly='true'></el-input>%
							</el-form-item>	
							<el-form-item label="执行周期" :class="{ changed: JSON.stringify(tbInfos.executeCycle) !== JSON.stringify(another.executeCycle)}">
								<el-date-picker v-model="tbInfos.executeCycle" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
								</el-date-picker>
							</el-form-item>
							<el-form-item label="合同金额" :class="{ changed: tbInfos.contractBill !== another.contractBill}">
								<el-input  v-model="tbInfos.contractBill"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="合同金额大写" :class="{ changed: tbInfos.contractBillChinesize !== another.contractBillChinesize}">
								<span>{{tbInfos.contractBillChinesize}}</span>
							</el-form-item>
							<el-form-item label="金额备注" class="inp-long" :class="{ changed: tbInfos.contractBillRemark !== another.contractBillRemark}">
								<el-input v-model="tbInfos.contractBillRemark"  readonly='true'></el-input>
							</el-form-item>
							<div  v-if=" tbInfos.billType == 2&&tbInfos.type==3">
								<el-form-item label="回款周期" :class="{ changed: tbInfos.returnBillRecycle !== another.returnBillRecycle}">
									<el-input v-model="tbInfos.returnBillRecycle"  readonly='true'></el-input>
								</el-form-item>
								<el-form-item label="院方主管领导" :class="{ changed: tbInfos.jiaLeader !== another.jiaLeader}">
									<el-input v-model="tbInfos.jiaLeader"  readonly='true'></el-input>
								</el-form-item>
								<el-form-item label="院方项目负责人" :class="{ changed: tbInfos.jiaManager !== another.jiaManager}">
									<el-input v-model="tbInfos.jiaManager"  readonly='true'></el-input>
								</el-form-item>
							</div>
							<el-form-item label="相关附件">
								<el-upload action='' :file-list='tbInfos.files' disabled :on-preview='handlePreview'>
									<el-button size="default" type="primary">选择文件</el-button>
									<div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
								</el-upload>
							</el-form-item>
							<el-form-item label="发起人归属大区" v-show="tbInfos.type!==3" :class="{ changed: tbInfos.region !== another.region}">
								<span>{{tbInfos.region}}</span>
							</el-form-item>
							<el-form-item label="项目执行要求" :class="{ changed: tbInfos.proDemand !== another.proDemand}">
								<el-input type="textarea" style="width:400px;" v-model="tbInfos.proDemand" readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="备注" :class="{ changed: tbInfos.proDemandRemark !== another.proDemandRemark}">
								<el-input type="textarea" style="width:400px;" v-model="tbInfos.proDemandRemark" readonly='true'></el-input>
							</el-form-item>
						</el-form>
					</el-card>
					<el-card class="box-card mb-16" shadow="always">
						<h3 :class="{ red: JSON.stringify(tbInfos.humanResources )!== JSON.stringify(another.humanResources)}">人力资源</h3>
						<el-table :data="tbInfos.humanResources" border style="width:100%;" class="mx-table hr-table" height='200px' show-summary :summary-method="getSummaries">
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
						<h3 :class="{ red: JSON.stringify(tbInfos.carResources )!== JSON.stringify(another.carResources)}">车辆资源</h3>
						<el-table :data="tbInfos.carResources" border style="width:100%;" class="mx-table" height='200px'>
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
						<h3 :class="{ red: JSON.stringify(tbInfos.fixedAssets )!== JSON.stringify(another.fixedAssets)}">固定资产</h3>
						<el-table :data="tbInfos.fixedAssets" border style="width:100%;" class="mx-table" height='200px'>
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
						<h3 :class="{ red: JSON.stringify(tbInfos.lowExpend )!== JSON.stringify(another.lowExpend)}">低值易耗</h3>
						<el-table :data="tbInfos.lowExpend" border style="width:100%;" class="mx-table" height='200px'>
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
							<el-form-item label="项目执行主体"  :class="{ changed: tbInfos.proExecuteSubject !== another.proExecuteSubject}">
								<el-select placeholder="请选择" style="width:300px;" v-model="tbInfos.proExecuteSubject" disabled>
									<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="具体执行人"  :class="{ changed: tbInfos.proExecutePeople !== another.proExecutePeople}">
								<el-select placeholder="请选择" style="width:300px;" v-model='tbInfos.proExecutePeople' disabled>
									<el-option v-for="item in managerList" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-card>
					<el-card class="box-card mb-16 inp-middle" shadow="always" v-if='tbInfos.status !== 1'>
						<h3>任务书审核</h3>
						<el-form label-width="150px">
							<el-form-item label="审核意见">
								<el-input type='textarea' :rows='4' v-model='tbInfos.record.remark' readonly='true' style="width: 80%;"></el-input>
							</el-form-item>
							<el-form-item label="审核结果">
								<span v-text="tbInfos.record.status == 2 ?'通过':'不通过'"></span>
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
							<el-form-item label="项目类型" :class="{ changed: tbInfos.type !== another.type}">
								<el-radio-group v-model="another.type">
									<el-radio :label="1" disabled>厂家</el-radio>
									<el-radio :label="2" disabled>三方</el-radio>
									<el-radio :label="3" disabled>设计</el-radio>
									<el-radio :label="4" disabled>软件</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="国内海外" v-if="another.type == 3"  :class="{ changed: tbInfos.domesticOrOversea !== another.domesticOrOversea}">
								<el-radio-group v-model="tbInfos.domesticOrOversea">
									<el-radio :label="1" disabled>国内</el-radio>
									<el-radio :label="2" disabled>海外</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="项目名称" :class="{ changed: tbInfos.projectName !== another.projectName}">
								<span>{{another.projectName}}</span>
							</el-form-item>
							<el-form-item label="应用区域" :class="{ changed: tbInfos.appField !== another.appField}">
								<span>{{another.appField}}</span>
							</el-form-item>	
							<el-form-item label="项目号">
								<span>项目号参数待加</span>
							</el-form-item>	
							<el-form-item label="用户名称" :class="{ changed: tbInfos.userName !== another.userName}">
								<span>{{another.userName}}</span>
							</el-form-item>
							<el-form-item label="合同名称" class="inp-long" v-show="another.type !== 3" :class="{ changed: tbInfos.contractName !== another.contractName}">
								<el-input v-model="another.contractName"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="项目负责人" v-if="another.type==3" :class="{ changed: tbInfos.projectManager !== another.projectManager}">
								<el-input v-model="another.projectManager"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="联系电话" v-if="another.type==3"  :class="{ changed: tbInfos.managerPhone !== another.managerPhone}">
								<el-input v-model="another.managerPhone"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="市场归口人"  :class="{ changed: tbInfos.marketUser !== another.marketUser}">
								<el-input v-model="another.marketUser"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="联系电话" :class="{ changed: tbInfos.marketPhone !== another.marketPhone}">
								<el-input v-model="another.marketPhone"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="投资金额类型" v-if="another.type==3"  :class="{ changed: tbInfos.billType !== another.billType}">
								<el-radio-group v-model="another.billType">
									<el-radio :label="1" disabled>运营商当期投资金额</el-radio>
									<el-radio :label="2" disabled>院方当期设计费</el-radio>
								</el-radio-group>
							</el-form-item>
							<div v-if="another.billType == 1 && another.type==3">
								<el-form-item label="投资金额" :class="{ changed: tbInfos.amountOfInvest !== another.amountOfInvest}">
									<el-input v-model="another.amountOfInvest"  readonly='true'></el-input>
								</el-form-item>
								<el-form-item label="投资金额大写" :class="{ changed: tbInfos.desInstitute !== another.desInstitute}">
									<span>{{another.desInstitute}}</span>
								</el-form-item>
								<el-form-item label="取费标准" :class="{ changed: tbInfos.chargeStandard !== another.chargeStandard}">
									<el-input v-model="another.chargeStandard"  readonly='true'></el-input>%
								</el-form-item>
							</div>
							<div v-if="another.billType ==2&&another.type==3">
								<el-form-item label="当期设计费" :class="{ changed: tbInfos.amountOfInvest !== another.amountOfInvest}">
									<el-input v-model="another.amountOfInvest"  readonly='true'></el-input>
								</el-form-item>
								<el-form-item label="当期设计费大写" :class="{ changed: tbInfos.designChinesize !== another.designChinesize}">
									<span>{{another.designChinesize}}</span>
								</el-form-item>
							</div>
							<el-form-item label="分包比例" v-if='another.type==3' :class="{ changed: tbInfos.chargePercent !== another.chargePercent}">
								<el-input v-model="another.chargePercent"  readonly='true'></el-input>%
							</el-form-item>	
							<el-form-item label="执行周期" :class="{ changed: JSON.stringify(tbInfos.executeCycle) !== JSON.stringify(another.executeCycle)}">
								<el-date-picker v-model="another.executeCycle" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
								</el-date-picker>
							</el-form-item>
							<el-form-item label="合同金额" :class="{ changed: tbInfos.contractBill !== another.contractBill}">
								<el-input  v-model="another.contractBill"  readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="合同金额大写" :class="{ changed: tbInfos.contractBillChinesize !== another.contractBillChinesize}">
								<span>{{another.contractBillChinesize}}</span>
							</el-form-item>
							<el-form-item label="金额备注" class="inp-long" :class="{ changed: tbInfos.contractBillRemark !== another.contractBillRemark}">
								<el-input v-model="another.contractBillRemark"  readonly='true'></el-input>
							</el-form-item>
							<div  v-if=" another.billType == 2&&another.type==3">
								<el-form-item label="回款周期" :class="{ changed: tbInfos.returnBillRecycle !== another.returnBillRecycle}">
									<el-input v-model="another.returnBillRecycle"  readonly='true'></el-input>
								</el-form-item>
								<el-form-item label="院方主管领导" :class="{ changed: tbInfos.jiaLeader !== another.jiaLeader}">
									<el-input v-model="another.jiaLeader"  readonly='true'></el-input>
								</el-form-item>
								<el-form-item label="院方项目负责人" :class="{ changed: tbInfos.jiaManager !== another.jiaManager}">
									<el-input v-model="another.jiaManager"  readonly='true'></el-input>
								</el-form-item>
							</div>
							<el-form-item label="相关附件">
								<el-upload action="" :file-list='another.files' disabled :on-preview='handlePreview'>
									<el-button size="default" type="primary">选择上传</el-button>
									<div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
								</el-upload>
							</el-form-item>
							<el-form-item label="发起人归属大区" v-show="another.type!==3" :class="{ changed: tbInfos.region !== another.region}">
								<span>{{another.region}}</span>
							</el-form-item>
							<el-form-item label="项目执行要求" :class="{ changed: tbInfos.proDemand !== another.proDemand}">
								<el-input type="textarea" style="width:400px;" v-model="another.proDemand" readonly='true'></el-input>
							</el-form-item>
							<el-form-item label="备注" :class="{ changed: tbInfos.proDemandRemark !== another.proDemandRemark}">
								<el-input type="textarea" style="width:400px;" v-model="another.proDemandRemark" readonly='true'></el-input>
							</el-form-item>
						</el-form>
					</el-card>
					<el-card class="box-card mb-16" shadow="always">
						<h3 :class="{ red: JSON.stringify(tbInfos.humanResources )!== JSON.stringify(another.humanResources)}">人力资源</h3>
						<el-table :data="another.humanResources" border style="width:100%;" class="mx-table hr-table" height='200px' show-summary :summary-method="getSummaries">
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
						<h3 :class="{ red: JSON.stringify(tbInfos.carResources )!== JSON.stringify(another.carResources)}">车辆资源</h3>
						<el-table :data="another.carResources" border style="width:100%;" class="mx-table" height='200px'>
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
						<h3 :class="{ red: JSON.stringify(tbInfos.fixedAssets )!== JSON.stringify(another.fixedAssets)}">固定资产</h3>
						<el-table :data="another.fixedAssets" border style="width:100%;" class="mx-table" height='200px'>
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
						<h3 :class="{ red: JSON.stringify(tbInfos.lowExpend )!== JSON.stringify(another.lowExpend)}">低值易耗</h3>
						<el-table :data="another.lowExpend" border style="width:100%;" class="mx-table" height='200px'>
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
							<el-form-item label="项目执行主体" :class="{ changed: tbInfos.proExecuteSubject !== another.proExecuteSubject}">
								<el-select placeholder="请选择" style="width:300px;" v-model="another.proExecuteSubject" disabled>
									<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="具体执行人" :class="{ changed: tbInfos.proExecutePeople !== another.proExecutePeople}">
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
								<el-input type='textarea' :rows='4' v-model='another.record.remark' readonly='true' style="width: 80%;"></el-input>
							</el-form-item>
							<el-form-item label="审核结果">
								<span v-text="another.record.status == 2?'通过':'不通过'"></span>
							</el-form-item>
						</el-form>
					</el-card>
				</div>
			</div>
		</div>
</template>

<script>
export default {
	name: 'contrastUpdate',
	data () {
		return {

		}
	},
	props:{
		tbInfos:{
			type: Object,
			required: true
		},
		another:{
			type: Object,
			required: true
		},
		anoManager:{
			type: Array,
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
	methods:{
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
