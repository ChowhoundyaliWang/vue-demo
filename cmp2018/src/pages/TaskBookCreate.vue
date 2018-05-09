<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>创建项目任务书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content min-w" id="userCreate">
			<el-card class="box-card mb-16" shadow="always">
				<h3>任务书信息</h3>
				<el-form :model="tbInfos" label-width="150px">
					<el-form-item label="项目类型">
						<el-radio-group v-model="tbInfos.type" @change="radioChange">
							<el-radio :label="1">厂家</el-radio>
							<el-radio :label="2">三方</el-radio>
							<el-radio :label="3">设计</el-radio>
							<el-radio :label="4">软件</el-radio>
						</el-radio-group>
					</el-form-item>
					<div ref="factory" v-if="tbInfos.type == 1">
						<el-form-item label="项目名称">
							<el-select placeholder="请选择" v-model="tbInfos.facForm.proName.facName">
								<el-option v-for="item in facFirstList"
								:key="item.id"
								:label="item.name"
								:value="item.name"> 
							    </el-option>
						    </el-select>
						    <el-cascader 
						    change-on-select
						    :show-all-levels="false"
						    :options="provincesList"
						    v-model="tbInfos.facForm.proName.city">
						    </el-cascader>
					        <el-select placeholder="请选择" v-model="tbInfos.facForm.proName.operator">
						        <el-option v-for="item in facThirdList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
					            </el-option>
				            </el-select>
				            <el-input v-model="tbInfos.facForm.proName.define"></el-input>
				            <el-select placeholder="请选择" v-model="tbInfos.facForm.proName.proType">
					            <el-option v-for="item in facFourthList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
				                </el-option>
			                </el-select>
			                <el-select placeholder="请选择" v-model="tbInfos.facForm.proName.year">
					            <el-option v-for="item in yearList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
				                </el-option>
			                </el-select>
			                <el-input v-model="tbInfos.facForm.proName.defineEnd"></el-input>
						</el-form-item>
						<el-form-item label="应用区域">
                            <el-select placeholder="请选择" v-model="tbInfos.facForm.appField">
					            <el-option v-for="item in appAreaList"
								:key="item.id"
								:label="item.proName"
								:value="item.proName">
				                </el-option>
			                </el-select>
						</el-form-item>
						<el-form-item label="用户名称">
							<el-select placeholder="请选择" v-model="tbInfos.facForm.customer.company" class="inp-middle">
					            <el-option v-for="item in facUserNameList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
				                </el-option>
			                </el-select>
			                <el-input v-model="tbInfos.facForm.customer.define"></el-input>
						</el-form-item>
						<el-form-item label="合同名称" class="inp-long" v-model="tbInfos.facForm.contractName">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="市场归口人" v-model="tbInfos.facForm.marketUser">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="联系电话" v-model="tbInfos.facForm.marketPhone">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="执行周期" v-model="tbInfos.facForm.executeCycle">
							<el-date-picker
							v-model="value6"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						    </el-date-picker>
					    </el-form-item>
						<el-form-item label="合同金额" v-model="tbInfos.facForm.contractBill">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="合同金额大写" v-model="tbInfos.facForm.contractBillChinesize">
							无
						</el-form-item>
						<el-form-item label="金额备注" class="inp-long" v-model="tbInfos.facForm.contractBillRemark">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="相关附件">
							<el-upload 
							:on-preview="handlePreview" 
							:on-remove="handleRemove" 
							:before-remove="beforeRemove">
								<el-button size="default" type="primary">点击上传</el-button>
							</el-upload>
						</el-form-item>
						<el-form-item label="发起人归属大区" v-model="tbInfos.facForm.region">

						</el-form-item>
						<el-form-item label="项目执行要求" v-model="tbInfos.facForm.proDemand">
							<el-input type="textarea" style="width:400px;"></el-input>
						</el-form-item>
						<el-form-item label="备注" v-model="tbInfos.facForm.proDemandRemark">
							<el-input type="textarea" style="width:400px;"></el-input>
						</el-form-item>
					</div>
					<div ref="tripartite" v-if="tbInfos.type == 2">
						<el-form-item label="项目名称">
							<el-cascader 
						    change-on-select
						    :show-all-levels="false"
						    :options="provincesList"
						    v-model="tbInfos.triForm.proName.city">
						    </el-cascader>
						    <el-select placeholder="请选择" v-model="tbInfos.triForm.proName.operator">
							    <el-option v-for="item in triSecondList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
						        </el-option>
					        </el-select>
					        <el-select placeholder="请选择" v-model="tbInfos.triForm.proName.proType">
						        <el-option v-for="item in triThirdList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
					            </el-option>
				            </el-select>
				            <el-select placeholder="请选择" v-model="tbInfos.triForm.proName.year">
					            <el-option v-for="item in yearList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
				                </el-option>
			                </el-select>
				            <el-input></el-input>
						</el-form-item>
						<el-form-item label="应用区域">
                            <el-select placeholder="请选择" v-model="tbInfos.triForm.appField">
					            <el-option v-for="item in appAreaList"
								:key="item.id"
								:label="item.proName"
								:value="item.proName">
				                </el-option>
			                </el-select>
						</el-form-item>
						<el-form-item label="用户名称">
							<el-select placeholder="请选择" v-model="tbInfos.triForm.customer.company" class="inp-middle">
					            <el-option v-for="item in triUserNameList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
				                </el-option>
			                </el-select>
			                <el-input  v-model="tbInfos.triForm.customer.define"></el-input>
						</el-form-item>
						<el-form-item label="合同名称" class="inp-long">
							<el-input  v-model="tbInfos.triForm.contractName"></el-input>
						</el-form-item>
						<el-form-item label="市场归口人">
							<el-input  v-model="tbInfos.triForm.marketUser"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input  v-model="tbInfos.triForm.managerPhone"></el-input>
						</el-form-item>
						<el-form-item label="执行周期" v-model="tbInfos.triForm.executeCycle">
							<el-date-picker
							v-model="value6"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						    </el-date-picker>
					    </el-form-item>
						<el-form-item label="合同金额">
							<el-input  v-model="tbInfos.triForm.contractBill"></el-input>
						</el-form-item>
						<el-form-item label="合同金额大写">
							<span v-model="tbInfos.triForm.contractBillChinesize"></span>
						</el-form-item>
						<el-form-item label="金额备注" class="inp-long">
							<el-input v-model="tbInfos.triForm.contractBillRemark"></el-input>
						</el-form-item>
						<el-form-item label="相关附件">
							<el-upload 
							:on-preview="handlePreview" 
							:on-remove="handleRemove" 
							:before-remove="beforeRemove">
								<el-button size="default" type="primary">点击上传</el-button>
							</el-upload>
						</el-form-item>
						<el-form-item label="发起人归属大区">
							<span v-model="tbInfos.triForm.region"></span>
						</el-form-item>
						<el-form-item label="项目执行要求">
							<el-input type="textarea" style="width:400px;" v-model="tbInfos.triForm.proDemand"></el-input>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" style="width:400px;" v-model="tbInfos.triForm.proDemandRemark"></el-input>
						</el-form-item>
					</div>
					<div ref="design" v-if="tbInfos.type == 3">
						<el-form-item label="项目类型">
							<el-radio-group v-model="tbInfos.desForm.domesticOrOversea">
								<el-radio :label="1">国内</el-radio>
								<el-radio :label="2">海外</el-radio>
							</el-radio-group>
						</el-form-item>
						<div v-if="tbInfos.desForm.domesticOrOversea ==1">
							<el-form-item label="项目名称">
								<el-select placeholder="请选择" v-model="tbInfos.domProName.desInstitute">
									<el-option v-for="item in desFirstList"
								    :key="item.id"
								    :label="item.name"
								    :value="item.id"> 
							        </el-option>
						        </el-select>
						        <el-cascader change-on-select :show-all-levels="false" :options="provincesList" v-model="tbInfos.domProName.city"></el-cascader>
						        <el-select placeholder="请选择" v-model="tbInfos.domProName.operator">
							        <el-option v-for="item in desThirdList" :key="item.id" :label="item.name" :value="item.name">
						            </el-option>
					            </el-select>
					            <el-select placeholder="请选择" v-model="tbInfos.domProName.proType">
						            <el-option v-for="item in desFourthList" :key="item.id" :label="item.name" :value="item.name">
					                </el-option>
				                </el-select>
				                <el-select placeholder="请选择" v-model="tbInfos.domProName.year">
					                <el-option v-for="item in yearList" :key="item.id" :label="item.name" :value="item.name">
				                    </el-option>
			                    </el-select>
				                <el-input v-model="tbInfos.domProName.defineEnd"></el-input>
						    </el-form-item>
						</div>
						<div v-if="tbInfos.desForm.domesticOrOversea ==2">
							<el-form-item label="项目名称">
								<el-select placeholder="请选择" v-model="tbInfos.oveProName.desInstitute">
									<el-option v-for="item in desFirstList"
								    :key="item.id"
								    :label="item.name"
								    :value="item.id"> 
							        </el-option>
						        </el-select>
						        <el-select placeholder="请选择" v-model="tbInfos.oveProName.desInstitute">
									<el-option v-for="item in desFirstList"
								    :key="item.id"
								    :label="item.name"
								    :value="item.id"> 
							        </el-option>
						        </el-select>
					            <el-select placeholder="请选择" v-model="tbInfos.oveProName.proType">
						            <el-option v-for="item in desFourthList" :key="item.id" :label="item.name" :value="item.name">
					                </el-option>
				                </el-select>
				                <el-select placeholder="请选择" v-model="tbInfos.oveProName.year">
					                <el-option v-for="item in yearList" :key="item.id" :label="item.name" :value="item.name">
				                    </el-option>
			                    </el-select>
				                <el-input v-model="tbInfos.oveProName.defineEnd"></el-input>
						    </el-form-item>
						</div>
						
						<el-form-item label="应用区域">
                            <el-select placeholder="请选择" v-model="tbInfos.desForm.appField">
					            <el-option v-for="item in appAreaList"
								:key="item.id"
								:label="item.proName"
								:value="item.proName">
				                </el-option>
			                </el-select>
						</el-form-item>
						<el-form-item label="用户名称">
							<el-select placeholder="请选择" v-model="tbInfos.desForm.customer.company" class="inp-middle">
					            <el-option v-for="item in desUserNameList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
				                </el-option>
			                </el-select>
			                <el-input v-model="tbInfos.desForm.customer.defineEnd"></el-input>
						</el-form-item>
						<el-form-item label="项目负责人">
							<el-input v-model="tbInfos.desForm.customer.projectManager"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input v-model="tbInfos.desForm.customer.managerPhone"></el-input>
						</el-form-item>
						<el-form-item label="市场归口人">
							<el-input v-model="tbInfos.desForm.customer.marketUser"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input v-model="tbInfos.desForm.customer.marketPhone"></el-input>
						</el-form-item>
						<el-form-item label="投资金额类型">
							<el-radio-group v-model="tbInfos.desForm.billType">
								<el-radio :label="1">运营商当期投资金额</el-radio>
								<el-radio :label="2">院方当期设计费</el-radio>
							</el-radio-group>
						</el-form-item>
						<div v-if="tbInfos.desForm.billType == 1">
							<el-form-item label="投资金额">
								<el-input v-model="tbInfos.desForm.investBill.amountOfInvest"></el-input>
							</el-form-item>
							<el-form-item label="投资金额大写">
								<span v-model="tbInfos.desForm.investBill.investChinesize"></span>
							</el-form-item>
							<el-form-item label="取费标准">
								<el-input v-model="tbInfos.desForm.investBill.chargeStandard"></el-input>%
							</el-form-item>
						</div>
						<div v-if="tbInfos.desForm.billType ==2">
							<el-form-item label="当期设计费">
								<el-input v-model="tbInfos.desForm.designBill.amountOfdesign"></el-input>
							</el-form-item>
							<el-form-item label="当期设计费大写">
								<span v-model="tbInfos.desForm.designBill.designChinesize"></span>
							</el-form-item>
						</div>
						<el-form-item label="分包比例">
							<el-input v-model="tbInfos.desForm.chargePercent"></el-input>%
						</el-form-item>
						<el-form-item label="执行周期">
							<el-date-picker
							v-model="tbInfos.desForm.executeCycle"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						    </el-date-picker>
					    </el-form-item>
						<el-form-item label="合同金额">
							<el-input v-model="tbInfos.desForm.contractBill"></el-input>
						</el-form-item>
						<el-form-item label="合同金额大写">
							<span v-model="tbInfos.desForm.contractBillChinesize"></span>
						</el-form-item>
						<el-form-item label="金额备注" class="inp-long">
							<el-input v-model="tbInfos.desForm.contractBillRemark"></el-input>
						</el-form-item>
						<el-form-item label="回款周期">
							<el-input v-model="tbInfos.desForm.returnBillRecycle"></el-input>
						</el-form-item>
						<el-form-item label="院方主管领导">
							<el-input v-model="tbInfos.desForm.jiaLeader"></el-input>
						</el-form-item>
						<el-form-item label="院方项目负责人">
							<el-input v-model="tbInfos.desForm.jiaManager"></el-input>
						</el-form-item>
						<el-form-item label="相关附件">
							<el-upload 
							:on-preview="handlePreview" 
							:on-remove="handleRemove" 
							:before-remove="beforeRemove">
								<el-button size="default" type="primary">点击上传</el-button>
							</el-upload>
						</el-form-item>
						<el-form-item label="项目执行要求">
							<el-input type="textarea" style="width:400px;" v-model="tbInfos.desForm.proDemand"></el-input>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" style="width:400px;" v-model="tbInfos.desForm.proDemandRemark"></el-input>
						</el-form-item>
					</div>
					<div ref="software" v-if="tbInfos.type == 4">
						<el-form-item label="项目名称">
							<el-cascader 
						    change-on-select
						    :show-all-levels="false"
						    :options="provincesList"
						    v-model="tbInfos.sofForm.proName.city">
						    </el-cascader>
						    <el-select placeholder="请选择" v-model="tbInfos.sofForm.proName.operator">
							    <el-option v-for="item in sofSecondList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
						        </el-option>
					        </el-select>
					        <el-select placeholder="请选择" v-model="tbInfos.sofForm.proName.proType">
						        <el-option v-for="item in sofThirdList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
					            </el-option>
				            </el-select>
				            <el-select placeholder="请选择" v-model="tbInfos.sofForm.proName.year">
					            <el-option v-for="item in yearList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
				                </el-option>
			                </el-select>
				            <el-input v-model="tbInfos.sofForm.proName.defineEnd"></el-input>
						</el-form-item>
						<el-form-item label="应用区域">
                            <el-select placeholder="请选择" v-model="tbInfos.sofForm.appField">
					            <el-option v-for="item in appAreaList"
								:key="item.id"
								:label="item.proName"
								:value="item.proName">
				                </el-option>
			                </el-select>
						</el-form-item>
						<el-form-item label="用户名称">
							<el-select placeholder="请选择" v-model="tbInfos.sofForm.customer.company" class="inp-middle">
					            <el-option v-for="item in sofUserNameList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
				                </el-option>
			                </el-select>
			                <el-input v-model="tbInfos.sofForm.customer.define"></el-input>
						</el-form-item>
						<el-form-item label="合同名称" class="inp-long">
							<el-input v-model="tbInfos.sofForm.contractName"></el-input>
						</el-form-item>
						<el-form-item label="市场归口人">
							<el-input v-model="tbInfos.sofForm.marketUser"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input v-model="tbInfos.sofForm.managerPhone"></el-input>
						</el-form-item>
						<el-form-item label="执行周期">
							<el-date-picker
							v-model="tbInfos.sofForm.executeCycle"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						    </el-date-picker>
					    </el-form-item>
						<el-form-item label="合同金额">
							<el-input v-model="tbInfos.sofForm.contractBill"></el-input>
						</el-form-item>
						<el-form-item label="合同金额大写">
							<span v-model="tbInfos.sofForm.contractBillChinesize"></span>
						</el-form-item>
						<el-form-item label="金额备注" class="inp-long">
							<el-input v-model="tbInfos.sofForm.contractBillRemark"></el-input>
						</el-form-item>
						<el-form-item label="相关附件">
							<el-upload 
							:on-preview="handlePreview" 
							:on-remove="handleRemove" 
							:before-remove="beforeRemove">
								<el-button size="default" type="primary">点击上传</el-button>
							</el-upload>
						</el-form-item>
						<el-form-item label="发起人归属大区">
							<span v-model="tbInfos.sofForm.region"></span>
						</el-form-item>
						<el-form-item label="项目执行要求">
							<el-input type="textarea" style="width:400px;" v-model="tbInfos.sofForm.proDemand"></el-input>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" style="width:400px;" v-model="tbInfos.sofForm.proDemandRemark"></el-input>
						</el-form-item>
					</div>
				</el-form>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>人力资源</h3>
				<el-table :data="tableData" border style="width:80%;">
					<el-table-column prop="networkMode" label="网络制式"> 
					</el-table-column>
					<el-table-column prop="level" label="级别"> 
					</el-table-column>
					<el-table-column prop="number" label="数量"> 
					</el-table-column>
					<el-table-column prop="beginTime" label="开始时间"> 
					</el-table-column>
					<el-table-column prop="endTime" label="结束时间"> 
					</el-table-column>
					<el-table-column prop="investDay" label="投入人天" > 
					</el-table-column>
					<el-table-column prop="investMonth" label="折合人月"> 
					</el-table-column>
					<el-table-column prop="remarks" label="备注"> 
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="tbDelRow(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin-top:20px;width:80%;height:40px;position:relative;">
					<el-button @click="addRow" type="primary" class="el-icon-plus" style="position:absolute;top:0;right:0;">添加</el-button>
				</div>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>车辆资源</h3>
				<el-table :data="carTbData" border style="width:80%;">
					<el-table-column prop="level" label="级别"> 
					</el-table-column>
					<el-table-column prop="number" label="数量"> 
					</el-table-column>
					<el-table-column prop="workMonths" label="参与工期（月）"> 
					</el-table-column>
					<el-table-column prop="remarks" label="备注"> 
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="tbDelRow(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin-top:20px;width:80%;height:40px;position:relative;">
					<el-button @click="addRow" type="primary" class="el-icon-plus" style="position:absolute;top:0;right:0;">添加</el-button>
				</div>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>固定资产</h3>
				<el-table :data="assetTbData" border style="width:80%;">
					<el-table-column prop="deviceType" label="设备类型"> 
					</el-table-column>
					<el-table-column prop="number" label="数量"> 
					</el-table-column>
					<el-table-column prop="workMonths" label="参与工期（月）">
					</el-table-column>
					<el-table-column prop="remarks" label="备注"> 
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="tbDelRow(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin-top:20px;width:80%;height:40px;position:relative;">
					<el-button @click="addRow" type="primary" class="el-icon-plus" style="position:absolute;top:0;right:0;">添加</el-button>
				</div>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>低值易耗</h3>
				<el-table :data="consumeTbData" border style="width:80%;">
					<el-table-column prop="deviceType" label="设备类型"> 
					</el-table-column>
					<el-table-column prop="number" label="数量"> 
					</el-table-column>
					<el-table-column prop="workMonths" label="参与工期（月）">
					</el-table-column>
					<el-table-column prop="remarks" label="备注"> 
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="tbDelRow(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin-top:20px;width:80%;height:40px;position:relative;">
					<el-button @click="addRow" type="primary" class="el-icon-plus" style="position:absolute;top:0;right:0;">添加</el-button>
				</div>
			</el-card>
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>项目执行</h3>
				<el-form label-width="150px">
					<el-form-item label="项目执行主体">
						<el-select placeholder="请选择" style="width:300px;">
							<el-option v-for="item in facFirstList"
							:key="item.value"
							:label="item.label"
							:value="item.value"> 
						    </el-option>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="具体执行人">
						<el-select placeholder="请选择" style="width:300px;">
							<el-option v-for="item in facFirstList"
							:key="item.value"
							:label="item.label"
							:value="item.value"> 
						    </el-option>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="">
						<el-button type="primary" class="el-icon-check" @click="taskBookSave">添加</el-button>
				    </el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TaskBookCreate',
	data () {
		return {
			okType:1,
			tbInfos:{
                type:1, 
                facForm:{
                	proName:{
                		facName:'',
                		city:[],
                		operator:'',
                		define:'',
                		proType:'',
                		year:'',
                		defineEnd:''
                	},
                	appField:'',
                	customer:{
                		company:'',
                		define:''
                	},
                	contractName:'',
                	marketUser:'',
                	marketPhone:'',
                	executeCycle:[ "2018-05-08T16:00:00.000Z", "2018-06-12T16:00:00.000Z" ],
                	contractBill:'',
                	contractBillChinesize:'',
                	contractBillRemark:'',
                	region:'发起人归属大区',
                	proDemand:'',
                	proDemandRemark:''
                },
                triForm:{
                	proName:{
                		city:[],
                		operator:'',
                		proType:'',
                		year:'',
                		defineEnd:''
                	},
                	appField:'',
                	customer:{
                		company:'',
                		define:''
                	},
                	contractName:'',
                	marketUser:'',
                	marketPhone:'',
                	executeCycle:[ "2018-05-08T16:00:00.000Z", "2018-06-12T16:00:00.000Z" ],
                	contractBill:'',
                	contractBillChinesize:'',
                	contractBillRemark:'',
                	region:'发起人归属大区',
                	proDemand:'',
                	proDemandRemark:''
                },
                desForm:{
                	domesticOrOversea:1,
                	domProName:{
                		desInstitute:'江苏院-',
                		city:[],
                		operator:'',
                		proType:'',
                		year:'',
                		defineEnd:''
                	},
                	oveProName:{
                		desInstitute:'江苏院-',
                		oversea:'',  // 后台 加接口 设计-海外-项目名称-海外区域
                		proType:'',
                		year:'',
                		defineEnd:''
                	},
                	appField:'',
                	customer:{
                		company:'',
                		define:''
                	},
                	projectManager:'', //项目负责人
                	managerPhone:'',  //联系电话
                	marketUser:'用户名',
                	marketPhone:'用户手机号',
                	billType:1, //1-运营商当期投资金额，2-院方当期设计费
                	investBill:{
                		amountOfInvest:10.0,
                		investChinesize:'',  // 后台 加投资金额大写
                		chargeStandard: 59.6
                	},
                	designBill:{
                		amountOfdesign:100,  // 后台 加当期设计费
                		designChinesize:''  // 后台 加当期设计费大写
                	},
                	chargePercent:12.2,
                	executeCycle:[ "2018-05-08T16:00:00.000Z", "2018-06-12T16:00:00.000Z" ],
                	contractBill:100.0,
                	contractBillChinesize:'',
                	contractBillRemark:'',
                	returnBillRecycle:'',
                	jiaLeader:'',
                	jiaManager:'',
                	proDemand:'',
                	proDemandRemark:''	
                },
                sofForm:{
                	proName:{
                		city:[],
                		operator:'',
                		proType:'',
                		year:'',
                		defineEnd:''
                	},
                	appField:'',
                	customer:{
                		company:'',
                		define:''
                	},
                	contractName:'',
                	marketUser:'',
                	marketPhone:'',
                	executeCycle:[ "2018-05-08T16:00:00.000Z", "2018-06-12T16:00:00.000Z" ],
                	contractBill:'',
                	contractBillChinesize:'',
                	contractBillRemark:'',
                	region:'发起人归属大区',
                	proDemand:'',
                	proDemandRemark:''
                },
			},
			facFirstList:[],
			facThirdList:[],
			facFourthList:[],
			yearList:[],
			provincesList:[],
			triSecondList:[],
			triThirdList:[],
			desFirstList:[],
			desThirdList:[],
			desFourthList:[],
			sofSecondList:[],
			sofThirdList:[],
			appAreaList:[],
			facUserNameList:[],
			triUserNameList:[],
			desUserNameList:[],
			sofUserNameList:[],
			tableData:[{
				networkMode:'传输',
				level:"中级",
				number:"1",
				beginTime:"2017-01-16",
				endTime:"2017-12-31",
				investDay:"350",
				investMonth:'11.67',
		        remarks:"这是备注"
			}],
			carTbData:[{
				level:"1",
				number:"2",
				workMonths:"11",
				remarks:"这是备注"
			}],
			assetTbData:[{
				deviceType:"1",
				number:"20",
				workMonths:"222",
				remarks:"这是备注"
			}],
			consumeTbData:[{
				deviceType:"1",
				number:"20",
				workMonths:"222",
				remarks:"这是备注"
			}]
		}
	},
	mounted (){
		this.axios.get('/api/factory/first/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.facFirstList = model;
		});
		this.axios.get('/api/provinces-district/list').then((res)=>{
			/* let 定义变量；const 定义常量，被设置就不能再修改 都是块级作用域*/
			const data = res.data;
			const model = data.model;
			model.forEach((val,ind)=>{
				const cities = val.cities||[];
				let obj = {};
				obj.value = val.id;
				obj.label = val.proName; 
				if(cities.length>0){
					obj.children = [];
					cities.forEach((value,index)=>{
						let cityObj = {};
						cityObj.value = value.id;
						cityObj.label = value.name;
						obj.children.push(cityObj);
					})
				}
				this.provincesList.push(obj);
			})
		});
		this.axios.get('/api/factory/third/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.facThirdList = model;
			console.log(this.facThirdList);
		});
		this.axios.get('/api/factory/fourth/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.facFourthList = model;
		});
		this.axios.get('/api/factory/fifth/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.yearList = model;
			console.log(this.yearList);
		});
		this.axios.get('/api/three/second/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.triSecondList = model;
			console.log(this.triSecondList);
		});
		this.axios.get('/api/three/third/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.triThirdList = model;
		});
		this.axios.get('/api/design/first/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.desFirstList = model;
		});
		this.axios.get('/api/design/third/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.desThirdList = model;
		});
		this.axios.get('/api/design/fourth/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.desFourthList = model;
		});
		this.axios.get('/api/software/second/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.sofSecondList = model;
		});
		this.axios.get('/api/software/third/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.sofThirdList = model;
		});
		this.axios.get('/api/provinces/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.appAreaList = model;
		});
		this.axios.get('/api/name/factory/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.facUserNameList = model;
		});
		this.axios.get('/api/name/three/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.triUserNameList = model;
		});
		this.axios.get('/api/name/design/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.desUserNameList = model;
		});
		this.axios.get('/api/name/software/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.sofUserNameList = model;
		});
	},
	methods:{
		radioChange(value){
		    this.okType = value	
		},
		handleRemove(file,fileList){

		},
		handlePreview(file){

		},
		handleExceed(files,fileList){

		},
		beforeRemove(file,fileList){
			return this.$confirm('确定移除${file.name}?');
		},
		tbDelRow(index,row){
			console.log(index);
			console.log(row);
			console.log(this.tableData);
		},
		taskBookSave(){
			// 项目任务书提交
			console.log("项目任务书提交");
		}
	}
}
</script>

<style scoped>

</style>
