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
			<steps :procedures='procedures'></steps>
			<el-card class="box-card mb-16" shadow="always">
				<h3>任务书信息</h3>
				<el-form :model="tbInfos" :rules='rules' ref='ruleForm' label-width="150px">
					<el-form-item label="项目类型" prop='type'>
						<el-radio-group v-model="tbInfos.type" @change='emptyProName'>
							<el-radio :label="1">厂家</el-radio>
							<el-radio :label="2">三方</el-radio>
							<el-radio :label="3">设计</el-radio>
							<el-radio :label="4">软件</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="项目名称" v-if="tbInfos.type == 1" prop='proName'>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.facName">
							<el-option v-for="item in facFirstList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
						<el-cascader change-on-select :show-all-levels="false" :options="provincesList" v-model="tbInfos.typeForm.proName.city" filterable placeholder='试试搜索城市名'></el-cascader>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.operator">
							<el-option v-for="item in facThirdList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
						<el-input v-model="tbInfos.typeForm.proName.define"></el-input>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.proType">
							<el-option v-for="item in facFourthList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.year">
							<el-option v-for="item in yearList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
						<el-input v-model="tbInfos.typeForm.proName.defineEnd"></el-input>
					</el-form-item>
					<el-form-item label="项目名称" v-if="tbInfos.type == 2" prop='proName'>
						<el-cascader change-on-select :show-all-levels="false" :options="provincesList" v-model="tbInfos.typeForm.proName.city" filterable placeholder='试试搜索城市名'></el-cascader>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.operator">
							    <el-option v-for="item in triSecondList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
						        </el-option>
					    </el-select>
					    <el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.proType">
						        <el-option v-for="item in triThirdList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
					            </el-option>
				        </el-select>
				        <el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.year">
					            <el-option v-for="item in yearList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
				                </el-option>
			            </el-select>
				        <el-input v-model="tbInfos.typeForm.proName.defineEnd"></el-input>
					</el-form-item>
					<el-form-item label="国内海外" v-if="tbInfos.type == 3" prop='domesticOrOversea'>
						<el-radio-group v-model="tbInfos.domesticOrOversea" @change='emptyDesProName'>
							<el-radio :label="1">国内</el-radio>
							<el-radio :label="2">海外</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="项目名称" v-if="tbInfos.type == 3 && tbInfos.domesticOrOversea ==1" prop='proName'>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.desInstitute">
							<el-option v-for="item in desFirstList" :key="item.id" :label="item.name" :value="item.name"> 
							</el-option>
						</el-select>
						<el-cascader change-on-select :show-all-levels="false" :options="provincesList" v-model="tbInfos.typeForm.proName.city" filterable placeholder='试试搜索城市名'></el-cascader>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.operator">
							<el-option v-for="item in desThirdList" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.proType">
							<el-option v-for="item in desFourthList" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.year">
							<el-option v-for="item in yearList" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-input v-model="tbInfos.typeForm.proName.defineEnd"></el-input>
					</el-form-item>
					<el-form-item label="项目名称" v-if="tbInfos.type == 3 && tbInfos.domesticOrOversea ==2" prop='proName'>
						 <el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.desInstitute">
							<el-option v-for="item in desFirstList" :key="item.id" :label="item.name" :value="item.name"> 
							</el-option>
						</el-select>
						<el-select placeholder="请选择海外区域" v-model="tbInfos.typeForm.proName.oversea">
							<el-option v-for="item in desOverList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.proType">
							<el-option v-for="item in desFourthList" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.year">
							<el-option v-for="item in yearList" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-input v-model="tbInfos.typeForm.proName.defineEnd"></el-input>
					</el-form-item>
					<el-form-item label="项目名称" v-if="tbInfos.type == 4" prop='proName'>
						<el-cascader change-on-select :show-all-levels="false" :options="provincesList" v-model="tbInfos.typeForm.proName.city" filterable placeholder='试试搜索城市名'>
						</el-cascader>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.operator">
							<el-option v-for="item in sofSecondList" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.proType">
							<el-option v-for="item in sofThirdList" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.proName.year">
							<el-option v-for="item in yearList" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-input v-model="tbInfos.typeForm.proName.defineEnd"></el-input>
					</el-form-item>
					<el-form-item label="应用区域" prop='appField'>
						<el-select v-model="tbInfos.appField" filterable placeholder="试试搜索省份名">
							<el-option v-for="item in appAreaList" :key="item.id" :label="item.proName" :value="item.proName">
							</el-option>
						</el-select>
					</el-form-item>	
					<el-form-item label="用户名称" v-if="tbInfos.type == 1">
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.customer.company" class="inp-middle">
							<el-option v-for="item in facUserNameList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
						<el-input v-model="tbInfos.typeForm.customer.define"></el-input>
					</el-form-item>
					<el-form-item label="用户名称" v-if="tbInfos.type == 2">
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.customer.company" class="inp-middle">
							<el-option v-for="item in triUserNameList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
						<el-input  v-model="tbInfos.typeForm.customer.define"></el-input>
					</el-form-item>
					<el-form-item label="用户名称" v-if="tbInfos.type == 3">
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.customer.company" class="inp-middle">
							<el-option v-for="item in desUserNameList" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-input v-model="tbInfos.typeForm.customer.define"></el-input>
					</el-form-item>
					<el-form-item label="用户名称"  v-if="tbInfos.type == 4">
						<el-select placeholder="请选择" v-model="tbInfos.typeForm.customer.company" class="inp-middle">
							<el-option v-for="item in sofUserNameList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
						<el-input v-model="tbInfos.typeForm.customer.define"></el-input>
					</el-form-item>
					<el-form-item label="合同名称" class="inp-long" v-show="tbInfos.type !== 3" prop='contractName'>
						<el-input v-model="tbInfos.contractName"></el-input>
					</el-form-item>
					<el-form-item label="项目负责人" v-if="tbInfos.type==3">
						<el-input v-model="tbInfos.projectManager"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" v-if="tbInfos.type==3">
						<el-input v-model="tbInfos.managerPhone"></el-input>
					</el-form-item>
					<el-form-item label="市场归口人">
						<el-input v-model="tbInfos.marketUser" readOnly></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input v-model="tbInfos.marketPhone" readOnly></el-input>
					</el-form-item>
					<el-form-item label="投资金额类型" v-if="tbInfos.type==3">
						<el-radio-group v-model="tbInfos.billType">
							<el-radio :label="1">运营商当期投资金额</el-radio>
							<el-radio :label="2">院方当期设计费</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if="tbInfos.billType == 1 && tbInfos.type==3">
						<el-form-item label="投资金额">
							<el-input v-model="tbInfos.amountOfInvest" @blur='investHandleUppercase($event)'></el-input>
						</el-form-item>
						<el-form-item label="投资金额大写">
							<span v-text="tbInfos.investChinesize"></span>
						</el-form-item>
						<el-form-item label="取费标准">
							<el-input v-model="tbInfos.chargeStandard"></el-input>%
						</el-form-item>
					</div>
					<div v-if="tbInfos.billType ==2&&tbInfos.type==3">
						<el-form-item label="当期设计费">
							<el-input v-model="tbInfos.amountOfInvest" @blur='investHandleUppercase($event)'></el-input>
						</el-form-item>
						<el-form-item label="当期设计费大写">
							<span v-text="tbInfos.investChinesize"></span>
						</el-form-item>
					</div>
					<el-form-item label="分包比例" v-if='tbInfos.type==3'>
							<el-input v-model="tbInfos.chargePercent"></el-input>%
						</el-form-item>	
					<el-form-item label="执行周期" prop='executeCycle'>
						<el-date-picker v-model="tbInfos.executeCycle" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="合同金额" prop='contractBill'>
						<el-input  v-model="tbInfos.contractBill" min='0.01' step='0.01' @blur='handleUppercase($event)'></el-input>
					</el-form-item>
					<el-form-item label="合同金额大写">
						<span v-text='tbInfos.contractBillChinesize'></span>
					</el-form-item>
					<el-form-item label="金额备注" class="inp-long">
						<el-input v-model="tbInfos.contractBillRemark"></el-input>
					</el-form-item>
                    <div  v-if="tbInfos.billType ==2&&tbInfos.type==3">
                    	<el-form-item label="回款周期">
						     <el-input v-model="tbInfos.returnBillRecycle"></el-input>
					    </el-form-item>
					    <el-form-item label="院方主管领导">
						     <el-input v-model="tbInfos.jiaLeader"></el-input>
					    </el-form-item>
					    <el-form-item label="院方项目负责人">
						     <el-input v-model="tbInfos.jiaManager"></el-input>
					    </el-form-item>
                    </div>
					<el-form-item label="相关附件" prop='tbFile'>
						<!-- limit——限制上传文件的个数； -->
						<el-upload :action="uploadUrl()" ref='upload' :auto-upload="false" :file-list='fileList' :data='taskIdObj' :before-remove="beforeRemove">
							<el-button size="default" type="primary">选择文件</el-button>
							<div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
						</el-upload>
					</el-form-item>
					<el-form-item label="发起人归属大区" v-show="tbInfos.type!==3">
                        <span>{{tbInfos.region}}</span>
					</el-form-item>
					<el-form-item label="项目执行要求">
						<el-input type="textarea" style="width:400px;" v-model="tbInfos.proDemand"></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" style="width:400px;" v-model="tbInfos.proDemandRemark"></el-input>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>人力资源</h3>
				<el-table :data="tbInfos.humanResources" border style="width:80%;" class="mx-table hr-table" show-summary :summary-method="getSummaries">
					<el-table-column prop="gprs" label="网络制式" width='180'>
						<template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.gprs">
								<el-option v-for="item in gprsList" :key="item.id" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</template>	 
					</el-table-column>
					<el-table-column prop="scale" label="级别" width='180'>
					    <template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.scale">
								<el-option v-for="item in empGradeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</template>	
					</el-table-column>
					<el-table-column prop="count" label="数量" width='80'>
					    <template slot-scope="scope">
						    <el-input v-model='scope.row.count' @change='calInvest(scope.$index,scope.row)'></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="startTime" label="开始日期" width='180'>
					    <template slot-scope="scope">
					         <el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" :picker-options="pickStartDate" value-format="timestamp"  @change='calInvest(scope.$index,scope.row)'></el-date-picker>
						</template> 
					</el-table-column>
					<el-table-column prop="endTime" label="结束日期" width='180'>
					    <template slot-scope="scope">
					         <el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" :picker-options="pickEndDate" value-format="timestamp"  @change='calInvest(scope.$index,scope.row)'></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="product" label="投入人天"> 
					</el-table-column>
					<el-table-column prop="average" label="折合人月">
					</el-table-column>
					<el-table-column prop="remark" label="备注" width='180'>
						<template slot-scope='scope'>
							<el-input v-model='scope.row.remark'></el-input>
						</template> 
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="hrDelRow(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin-top:20px;width:80%;height:40px;position:relative;">
					<el-button @click="hrAddRow" type="primary" class="el-icon-plus" style="position:absolute;top:0;right:0;">添加</el-button>
				</div>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>车辆资源</h3>
				<el-table :data="tbInfos.carResources" border style="width:80%;" class="mx-table">
					<el-table-column prop="scale" label="级别">
					    <template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.scale">
								<el-option v-for="item in carList" :key="item.id" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</template>	
					</el-table-column>
					<el-table-column prop="count" label="数量">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.count'></el-input>
						</template> 
					</el-table-column>
					<el-table-column prop="month" label="参与工期（月）">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.month'></el-input>
						</template>  
					</el-table-column>
					<el-table-column prop="remark" label="备注">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.remark'></el-input>
						</template>  
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="carDelRow(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin-top:20px;width:80%;height:40px;position:relative;">
					<el-button @click="carAddRow" type="primary" class="el-icon-plus" style="position:absolute;top:0;right:0;">添加</el-button>
				</div>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>固定资产</h3>
				<el-table :data="tbInfos.fixedAssets" border style="width:80%;" class="mx-table">
					<el-table-column prop="type" label="设备类型">
					    <template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.type">
								<el-option v-for="item in fixList" :key="item.id" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</template>	
					</el-table-column>
					<el-table-column prop="count" label="数量">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.count'></el-input>
						</template> 
					</el-table-column>
					<el-table-column prop="month" label="参与工期（月）">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.month'></el-input>
						</template>  
					</el-table-column>
					<el-table-column prop="remark" label="备注">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.remark'></el-input>
						</template>  
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="fixDelRow(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin-top:20px;width:80%;height:40px;position:relative;">
					<el-button @click="fixAddRow" type="primary" class="el-icon-plus" style="position:absolute;top:0;right:0;">添加</el-button>
				</div>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>低值易耗</h3>
				<el-table :data="tbInfos.lowExpend" border style="width:80%;" class="mx-table">
					<el-table-column prop="type" label="设备类型">
					    <template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.type">
								<el-option v-for="item in lowList" :key="item.id" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</template>	
					</el-table-column>
					<el-table-column prop="count" label="数量">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.count'></el-input>
						</template> 
					</el-table-column>
					<el-table-column prop="month" label="参与工期（月）">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.month'></el-input>
						</template>  
					</el-table-column>
					<el-table-column prop="remark" label="备注">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.remark'></el-input>
						</template>  
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="lowDelRow(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin-top:20px;width:80%;height:40px;position:relative;">
					<el-button @click="lowAddRow" type="primary" class="el-icon-plus" style="position:absolute;top:0;right:0;">添加</el-button>
				</div>
			</el-card> 
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>项目执行</h3>
				<el-form label-width="150px">
					<el-form-item label="项目执行主体">
						<el-select placeholder="请选择" style="width:300px;" v-model="tbInfos.proExecuteSubject" @change="proDeptChange">
							<el-option v-for="item in proDeptList"
							:key="item.id"
							:label="item.name"
							:value="item.id"> 
						    </el-option>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="具体执行人">
						<el-select placeholder="请选择" style="width:300px;" v-model='tbInfos.proExecutePeople'>
							<el-option v-for="item in proManagerList"
							:key="item.id"
							:label="item.name"
							:value="item.id"> 
						    </el-option>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="">
						<el-button type="primary" class="el-icon-check" @click="taskBookSave">发送</el-button>
				    </el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
import steps from '../components/Steps.vue'
export default {
	name: 'TaskBookCreate',
	components:{
		"steps": steps
	},
	data () {
		return {
			procedures:[],
			rules:{
				/*type: [
				    {required:true, message:'项目类型为必填项'}
				],
				domesticOrOversea: [
				    {required:true,message:'国内海外为必填项'}
				],
				appField:[{required:true,message:'应用区域为必填项'}],
				contractName: [{required:true,message:'合同名称为必填项'}],
				executeCycle: [{required:true,message:'执行周期为必填项'}],
				contractBill: [{required:true,message:'合同金额为必填项'}],
				tbFile: [{ required:true, message:'相关附件不能为空'}]*/
			},
			taskIdObj:{
				taskId:''
			},
			fileList:[],
			tbInfos:{
                type:1, 
                typeForm:{
                	proName:{
                		facName:'',
                	    desInstitute:'',
                	    city:[],
                	    operator:'',
                	    define:'',
                	    oversea:'',
                	    proType:'',
                	    year:'',
                	    defineEnd:''
                	},
                	customer:{
                		company:'',
                		define:''
                	}
                },
                projectName:'',
                userName:'',
                appField:'',
                contractName:'',
                marketUser:'',  //市场归口人
                marketPhone:'', //联系电话
                executeCycle:[],
                contractBill:'',
                contractBillChinesize:'',
                contractBillRemark:'',
                region:'',
                proDemand:'',
                proDemandRemark:'',
                domesticOrOversea:1,
                projectManager:'', //项目负责人
                managerPhone:'',  //联系电话
                billType:1,
                amountOfInvest:'',  
                investChinesize:'',
                chargeStandard: '',
                chargePercent:'',
                returnBillRecycle:"",
                jiaLeader:'',
                jiaManager:'',
                humanResources:[],
                carResources:[],
                fixedAssets:[],
                lowExpend:[],
                proExecuteSubject:'',
                proExecutePeople:''
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
			desOverList:[],
			sofSecondList:[],
			sofThirdList:[],
			appAreaList:[],
			facUserNameList:[],
			triUserNameList:[],
			desUserNameList:[],
			sofUserNameList:[],
			gprsList:[],
			empGradeList:[],
			carList:[],
			fixList:[],
			lowList:[],
			proDeptList:[],  //项目执行主体列表
			proManagerList:[], //项目执行人列表
			pickStartDate:{
				disabledDate:(time)=>{
					// 开始日期只能选择结束日期之前的
					/*let endDateVal = 
					return time.getTime() > endDateVal;*/ 
				}
			},
			pickEndDate:{
				disabledDate:(time)=>{
					// 结束日期只能选择开始日期之后的
					/*let startDateVal = 
					return time.getTime() < startDateVal;*/
				}
			}
		}
	},
	mounted (){
		let userInfo = JSON.parse(localStorage.getItem('userInfo'));
		this.tbInfos.marketUser = userInfo.userName;
		this.tbInfos.marketPhone = userInfo.phone;
		this.tbInfos.region = userInfo.region;
		this.axios.get('/api/project/name/list?type=1&order=1').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.facFirstList = model;
		});
		this.axios.get('/api/provinces-district/list').then((res)=>{
			/* let 定义变量；const 定义常量，被设置就不能再修改 都是块级作用域*/
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				model.forEach((val,ind)=>{
					const cities = val.cities||[];
					let obj = {};
					obj.value = val.proName;
					obj.label = val.proName; 
					if(cities.length>0){
						obj.children = [];
						cities.forEach((value,index)=>{
							let cityObj = {};
							cityObj.value = value.name;
							cityObj.label = value.name;
							obj.children.push(cityObj);
						})
					}
					this.provincesList.push(obj);
				})
			}
		});
		this.axios.get('/api/project/name/list?type=1&order=3').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.facThirdList = model;
		});
		this.axios.get('/api/project/name/list?type=1&order=4').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.facFourthList = model;
		});
		this.axios.get('/api/project/name/list?type=1&order=5').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.yearList = model;
		});
		this.axios.get('/api/project/name/list?type=2&order=2').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.triSecondList = model;
		});
		this.axios.get('/api/project/name/list?type=2&order=3').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.triThirdList = model;
		});
		this.axios.get('/api/project/name/list?type=3&order=1').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.desFirstList = model;
		});
		this.axios.get('/api/project/name/list?type=3&order=3').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.desThirdList = model;
		});
		this.axios.get('/api/project/name/list?type=3&order=4').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.desFourthList = model;
		});
		this.axios.get('/api/project/name/list?type=4&order=2').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.sofSecondList = model;
		});
		this.axios.get('/api/project/name/list?type=4&order=3').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.sofThirdList = model;
		});
		this.axios.get('/api/provinces/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.appAreaList = model;
		});
		this.axios.get('/api/guest/name/list?type=1').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.facUserNameList = model;
		});
		this.axios.get('/api/guest/name/list?type=2').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.triUserNameList = model;
		});
		this.axios.get('/api/guest/name/list?type=3').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.desUserNameList = model;
		});
		this.axios.get('/api/guest/name/list?type=4').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.sofUserNameList = model;
		});
		this.axios.get('/api/network/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.gprsList = model;
		});
		this.axios.get('/api/emp-grade/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.empGradeList = model;
		});
		this.axios.get('/api/car/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.carList = model;
		});
		this.axios.get('/api/fixed-assets/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.fixList = model;
		});
		this.axios.get('/api/low-expend/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.lowList = model;
		});
		this.axios.get('/api/pro-dept/list').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.proDeptList = model;
		});
		this.axios.get('/api/project/name/list?type=3&order=2').then((res)=>{
			const data = res.data;
			const model = data.model;
			this.desOverList = model;
		});
	},
	beforeRouteLeave( to, from, next){
		//导航离开时清除定时器
		if(this.stepsTimer){
			clearInterval(this.stepsTimer);
		}
		next();
	},
	methods:{
		emptyProName(){
            this.tbInfos.typeForm.proName.city=[];
            this.tbInfos.typeForm.proName.facName='';
            this.tbInfos.typeForm.proName.desInstitute='';
            this.tbInfos.typeForm.proName.operator='';
            this.tbInfos.typeForm.proName.define='';
            this.tbInfos.typeForm.proName.oversea='';
            this.tbInfos.typeForm.proName.proType='';
            this.tbInfos.typeForm.proName.year='';
            this.tbInfos.typeForm.proName.defineEnd='';
            this.tbInfos.typeForm.customer.company='';
            this.tbInfos.typeForm.customer.define='';
		},
		emptyDesProName(){
            this.tbInfos.typeForm.proName.city=[];
            this.tbInfos.typeForm.proName.facName='';
            this.tbInfos.typeForm.proName.desInstitute='';
            this.tbInfos.typeForm.proName.operator='';
            this.tbInfos.typeForm.proName.define='';
            this.tbInfos.typeForm.proName.oversea='';
            this.tbInfos.typeForm.proName.proType='';
            this.tbInfos.typeForm.proName.year='';
            this.tbInfos.typeForm.proName.defineEnd='';
		},
		calInvest(index, row){
			row.product = (row.endTime && row.startTime && row.count)?((row.endTime - row.startTime)/(1000*60*60*24)+1)*row.count:0;
			row.average = row.product?(row.product/30).toFixed(2):0;
		},
		getSummaries(param) {
			return this.tableSum(param);
		},
		handleUppercase(e){
			// 校验输入的为金额——正数，整数部分不超过9位数，小数部分不超过两位小数
			let amount= this.tbInfos.contractBill;
            amount = this.amountInWords(amount);
			this.tbInfos.contractBillChinesize = amount;
		},
		investHandleUppercase(e){
			// 校验输入的为金额——正数，最多保留两位小数
			let amount= this.tbInfos.amountOfInvest; 
			amount = this.amountInWords(amount);
			this.tbInfos.investChinesize = amount;
		},
		beforeRemove(file,fileList){
			return this.$confirm('确定移除该文件?');
		},
		hrDelRow(index,row){
			this.tbInfos.humanResources.splice(index,1);
		},
		hrAddRow(){
			//往表格里添加数据
			let rowData = {gprs:"",scale:"",count:"", product:"", average:'', remark:""};
			let humanResources = this.tbInfos.humanResources;
			let startTime = '';
			let endTime = '';
			if(humanResources.length >= 1){
				startTime = humanResources[0].startTime;
				endTime = humanResources[0].endTime;
			}
			rowData.startTime = startTime;
			rowData.endTime = endTime;
			this.tbInfos.humanResources.push(rowData);
		},
		carDelRow(index,row){
			this.tbInfos.carResources.splice(index,1);
		},
		carAddRow(){
			//往表格里添加数据
			let rowData = {scale:"",count:"", month:"", remark:""};
			this.tbInfos.carResources.push(rowData);
		},
		fixDelRow(index,row){
			this.tbInfos.fixedAssets.splice(index,1);
		},
		fixAddRow(){
			//往表格里添加数据
			let rowData = {type:"",count:"", month:"", remark:""};
			this.tbInfos.fixedAssets.push(rowData);
		},
		lowDelRow(index,row){
			this.tbInfos.lowExpend.splice(index,1);
		},
		lowAddRow(){
			//往表格里添加数据
			let rowData = {type:"",count:"", month:"", remark:""};
			this.tbInfos.lowExpend.push(rowData);
		},
		proDeptChange(val){
			this.axios.get('/api/pro-management/list',{params:{'id': val}}).then((res)=>{
				const data = res.data;
				const model = data.model;
				this.proManagerList = model;
			});
		},
		uploadUrl(){
			/*return 'http://192.168.1.2:2000/api/upload-files';*/
			return 'http://163.53.91.130:5005/api/upload-files';
		},
		taskBookSave(){
			// 项目任务书提交
			let params={};
			let tbInfos = this.tbInfos;
			let proName = tbInfos.typeForm.proName;
			let str = '';
			str = proName.facName + proName.desInstitute + (proName.city.length > 0? proName.city[proName.city.length - 1]:'') + proName.operator+ (proName.define ?'（'+proName.define+'）':'')+ proName.oversea +proName.proType+proName.year+( proName.defineEnd?('（'+proName.defineEnd +'）'):'');
			tbInfos.projectName = str;
			let userName = tbInfos.typeForm.customer;
			tbInfos.userName = userName.company +(userName.define?("（"+ userName.define +"）"):'');
            params = tbInfos;
			this.axios.post('/api/task/add',params).then((res)=>{
                const data = res.data;
                const msg = data.message;
                if(data.code == 200){
                	let model = data.model;
                	this.taskIdObj.taskId = model;
                	this.$refs.upload.submit();
                    this.$alert(msg,'提示');
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
