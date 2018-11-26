<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>项目任务书接收</el-breadcrumb-item>
				<el-breadcrumb-item>待接收的项目任务书</el-breadcrumb-item>
				<el-breadcrumb-item>创建项目计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<steps :procedures = 'procedures'></steps>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>项目计划书</h3>
				<el-form label-width="120px">
					<el-form-item label="项目名称"> 
						<span>{{planBook.projectName}}</span>
					</el-form-item>
					<el-form-item label="项目经理"> 
						<el-input v-model='planBook.projectManager'></el-input>
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
						<el-table :data="qualityTarget" border class="mx-table view-table">
							<el-table-column prop="name" label="目标名称" width='260px'></el-table-column>
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
						<el-table :data="planBook.qualityTarget" border class="mx-table edit-table">
							<el-table-column prop="name" label="目标名称" width='260px'></el-table-column>
							<el-table-column prop="standardGoal" label="基准目标">
								<template slot-scope="scope">
									<el-input v-model='scope.row.standardGoal' type="text"></el-input>%
								</template>
							</el-table-column>
							<el-table-column prop="challengeGoal" label="挑战目标">
								<template slot-scope="scope">
									<el-input v-model='scope.row.challengeGoal' type="text"></el-input>%
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
						<el-input type='textarea' :rows='8' style="width: 70%;" v-model='planBook.projectSchedule'></el-input>
					</el-form-item>
					<el-form-item label="项目要求">
						<el-input type='textarea' :rows='8' style="width: 70%;" v-model='planBook.projectDemand'></el-input>
					</el-form-item>
					<el-form-item label="项目资源">
						<el-input type='textarea' :rows='8' style="width: 70%;" v-model='planBook.projectResource'></el-input>
					</el-form-item>
				</el-form>	
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>人员配备</h3>
				<el-table :data="curPerAllocation" border class="mx-table tb-inp">
					<el-table-column prop="name" label="参与人员">
						<template slot-scope='scope'>
							<el-input v-model='scope.row.name'></el-input>
						</template> 
					</el-table-column>
					<el-table-column prop="dept" label="部门" width='150'>
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.dept'></el-input>
						</template> 
					</el-table-column>
					<el-table-column prop="category" label="工程师类别" width='180'>
					    <template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.category">
								<el-option v-for="item in catList" :key="item.id" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</template>	  
					</el-table-column>
					<el-table-column prop="grade" label="工程师级别" width='130'>
					    <template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.grade">
								<el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</template>	 
					</el-table-column>
					<el-table-column prop="treatment" label="待遇级别">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.treatment'></el-input>
						</template>  
					</el-table-column>
					<el-table-column prop="startTime" label="参与周期开始" width='160'>
					    <template slot-scope='scope'>
							<el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' class='date-inp'></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="endTime" label="参与周期结束" width='160'>
					    <template slot-scope='scope'>
							<el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' class='date-inp'></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="division" label="职责分工" width='140'>
					    <template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.division">
								<el-option v-for="item in divList" :key="item.id" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</template>	
					</el-table-column>
					<el-table-column prop="remark" label="备注">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.remark'></el-input>
						</template>  
					</el-table-column>
					<el-table-column label="操作" width='80px'>
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="delRow(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="width:100%;text-align:right;" v-if='planBook.personalAllocation.length > 10'>
					<el-pagination 
					background 
					@current-change="perHandleCurChange"
					:current-page.sync="perPageNum"
					:page-size="pageSize"
					layout="total,prev,pager,next"
					:total="perTotalNum"></el-pagination>
				</div>
				<div style="margin-top:20px;width:100%;height:40px;position:relative;">
					<div style="position:absolute;top:0;right:0;">
						<el-button @click="download" type="primary" class="el-icon-download">下载模板</el-button>
						<el-upload :action='uploadUrl()' class="upload-demo" :limit="1" :on-success="batchImport" :show-file-list='false' :before-upload='beforeLoad' :headers= 'headers'>
                            <el-button type="success" class="el-icon-document" auto-upload='false'>批量导入</el-button>
                        </el-upload>
					    <el-button @click="addRow" type="success" class="el-icon-plus">添加</el-button>
					</div>
				</div>
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>设备配备</h3>
				<el-table :data="curEqAllocation" border class="mx-table tb-inp">
					<el-table-column prop="name" label="设备名称">
					    <template slot-scope="scope">
							<el-input v-model='scope.row.name'></el-input>
						</template>	
					</el-table-column>
					<el-table-column prop="version" label="型号">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.version'></el-input>
						</template> 
					</el-table-column>
					<el-table-column prop="count" label="数量">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.count'></el-input>
						</template>  
					</el-table-column>
					<el-table-column prop="startTime" label="参与周期开始" width='160'>
					    <template slot-scope='scope'>
							<el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' class='date-inp'></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="endTime" label="参与周期结束" width='160'>
					    <template slot-scope='scope'>
							<el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' class='date-inp'></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="remark" label="备注">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.remark'></el-input>
						</template>  
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="delRow2(scope.$index,scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="width:100%;text-align:right;" v-if='planBook.equipmentAllocation.length > 10'>
					<el-pagination 
					background 
					@current-change="eqHandleCurChange"
					:current-page.sync="eqPageNum"
					:page-size="pageSize"
					layout="total,prev,pager,next"
					:total="eqTotalNum"></el-pagination>
				</div>
				<div style="margin-top:20px;width:100%;height:40px;position:relative;">
					<div style="position:absolute;top:0;right:0;">
						<el-button @click="download2" type="primary" class="el-icon-download">下载模板</el-button>
						<el-upload :action='uploadUrl2()' class="upload-demo" :limit="1" :on-success="batchImport2" :show-file-list='false' :headers='headers'>
                            <el-button type="success" class="el-icon-document" auto-upload='false'>批量导入</el-button>
                        </el-upload>
					    <el-button @click="addRow2" type="success" class="el-icon-plus">添加</el-button>
					</div>
				</div>
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
					<el-form-item label="">
						<el-button @click="toCreate" type="success" class="el-icon-check">发送</el-button>
					</el-form-item>
				</el-form>	
			</el-card>
		</div>
	</div>
</template>

<script>
import steps from '../../components/Steps.vue'
export default {
	name: 'PlanBookCreate',
	components: {
		"steps": steps
	},
	data () {
		return {
			procedures: [],
			planBook:{
				projectName:'',
				projectManager:'',
				qualityTarget:[],
				projectSchedule:'',
				projectDemand:"",
				projectResource:'',
				personalAllocation:[],
				equipmentAllocation:[],
				deptManager:'',
				sendToUser:"",
				taskId: this.$route.params.id,
				isCreatePlanPaper: this.$route.params.isCreated
			},
			qualityTarget:[],
			catList:[],
			gradeList:[],
			divList:[],
			headers:{
				Authorization: ''
			},
			planPaperId: this.$route.params.planPaperId,
			taskId: this.$route.params.id,
			perPageNum: 1,
			eqPageNum: 1,
			pageSize: 10,
			curPerAllocation: [],
			curEqAllocation: []
		}
	},
	computed:{
		perTotalNum: function(){
			return this.planBook.personalAllocation.length;
		},
		eqTotalNum: function(){
			return this.planBook.equipmentAllocation.length;
		}
	},
	mounted (){
		this.$el.parentNode.scrollTop = 0;
		//获取项目任务书的步骤
		this.axios.get('/api/task/get/'+ this.taskId).then((res) => {
			const data = res.data;
			this.procedures = data.model.procedures;
		}),
		this.headers.Authorization = localStorage.getItem('token');
		if(this.planPaperId){
			this.axios.get('/api/planPaper/get/'+ this.planPaperId).then((res)=>{
				const data = res.data;
				if(data.code == 200){
					const model = data.model;
					this.planBook = model;
				}
			});
		}
		this.axios.get('/api/planPaper/get-quality-goal/list').then((res)=>{
			const data = res.data;
			if(data.code == 200){
				this.qualityTarget = data.model;
				this.planBook.qualityTarget = JSON.parse(JSON.stringify(data.model));
			}
		});
		this.axios.get('/api/planPaper/get-name/'+ this.planBook.taskId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.planBook.projectName = model.projectName;
				this.planBook.deptManager = model.deptManager;
				this.planBook.sendToUser = model.sendToUser;
			}
		});
		this.axios.get('/api/planPaper/personal/parameter/list?type=1').then((res)=>{
			const data = res.data;
			if(data.code == 200){
				this.catList = data.model;
			}
		});
		this.axios.get('/api/planPaper/personal/parameter/list?type=2').then((res)=>{
			const data = res.data;
			if(data.code == 200){
				this.gradeList = data.model;
			}
		});
		this.axios.get('/api/planPaper/personal/parameter/list?type=3').then((res)=>{
			const data = res.data;
			if(data.code == 200){
				this.divList = data.model;
			}
		})
	},
	methods:{
		getSummaries(param){
			return this.tableSum(param);
		},
		handleCurrentChange(){
			//设备管理数据翻页
		},
		download(){
			let url = "http://39.105.14.188:5005/api/download-file?fileName=4B96B8347F44E777DBEB8BB859ECD96A.xlsx";
			let aLink = document.createElement('a');
			aLink.style.display = 'none';
			aLink.href = url;
			document.body.appendChild(aLink);
			aLink.click();
			document.body.removeChild(aLink);
		},
		beforeLoad(file){
			if(this.planBook.personalAllocation.length > 0){
				this.$confirm('将清空已录入的信息，确定吗？','提示',{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type:'warning'
				}).then(() => {
					
				}).catch(() => {

				})
			}
		},
		uploadUrl(){
			//上线要换线上地址
			return 'http://39.105.14.188:5005/api/excel/personal/import';
		},
		batchImport(response, file, fileList){
			if(response.code == 200){
				const data = response.model;
				this.planBook.personalAllocation = data;
				if(data.length > 10){
				   this.curPerAllocation = data.slice(0, this.pageSize);
				}else{
				   this.curPerAllocation = data;
				}
			}else{
				const msg = response.message;
				this.$alert(msg,'错误提示');
			}
		},
		perHandleCurChange(val){
			this.perPageNum = val;
			this.curPerAllocation = this.planBook.personalAllocation.slice((val-1)*this.pageSize, val*this.pageSize);
		},
		addRow(){
			//往表格里添加数据
			let startTime = '';
			let endTime = '';
			if(this.planBook.personalAllocation.length > 0){
				const example = this.planBook.personalAllocation[0];
				startTime = example.startTime;
				endTime = example.endTime;
			}
			let rowData = {name:"",dept:"", category:"", grade:"", treatment:'', startTime: startTime, endTime: endTime, division:'', remark:'' };
			this.planBook.personalAllocation.push(rowData);
			this.perPageNum = Math.ceil(this.planBook.personalAllocation.length/this.pageSize);
			this.curPerAllocation = this.planBook.personalAllocation.slice((this.perPageNum-1)*this.pageSize, this.perPageNum*this.pageSize);
		},
		delRow(index, row){
			this.planBook.personalAllocation.splice(index,1);
			this.curPerAllocation = this.planBook.personalAllocation.slice((this.perPageNum-1)*this.pageSize, this.perPageNum*this.pageSize);
		},
		download2(){
			let url = "http://39.105.14.188:5005/api/download-file?fileName=27056679854D01E943861F1DF827514B.xlsx";
			let aLink = document.createElement('a');
			aLink.style.display = 'none';
			aLink.href = url;
			document.body.appendChild(aLink);
			aLink.click();
			document.body.removeChild(aLink);
		},
		uploadUrl2(){
			//上线要换线上地址
			return 'http://39.105.14.188:5005/api/excel/equipment/import';
			//return 'http://192.168.102.59:5005/api/excel/equipment/import';
		},
		batchImport2(response, file, fileList){
			if(response.code == 200){
				const data = response.model;
				this.planBook.equipmentAllocation = data;
				if(data.length > 10){
				   this.curEqAllocation = data.slice(0, this.pageSize);
				}else{
				   this.curEqAllocation = data;
				}
			}else{
				const msg = response.message;
				this.$alert(msg,'错误提示');
			}
		},
		eqHandleCurChange(val){
			this.eqPageNum = val;
			this.curEqAllocation = this.planBook.equipmentAllocation.slice((val-1)*this.pageSize, val*this.pageSize);
		},
		addRow2(){
			let startTime = '';
			let endTime = '';
			if(this.planBook.equipmentAllocation.length > 0){
				const example = this.planBook.equipmentAllocation[0];
				startTime = example.startTime;
				endTime = example.endTime;
			}
			let rowData = {name:"",version:"", count:"", startTime: startTime, endTime: endTime, remark:'' };
			this.planBook.equipmentAllocation.push(rowData);
			this.eqPageNum = Math.ceil(this.planBook.equipmentAllocation.length/this.pageSize);
			this.curEqAllocation = this.planBook.equipmentAllocation.slice((this.perPageNum-1)*this.pageSize, this.perPageNum*this.pageSize);
		},
		delRow2(index, row){
			this.planBook.equipmentAllocation.splice(index,1);
			this.curEqAllocation = this.planBook.equipmentAllocation.slice((this.perPageNum-1)*this.pageSize, this.perPageNum*this.pageSize);
		},
		toCreate(){
			let params = this.planBook;
			this.axios.post('/api/planPaper/add', params).then((res) =>{
				const data = res.data;
				const msg = data.message;
				if(data.code == 200){
					this.$alert(msg, '提示',{
						confirmButtonText:'确定',
						callback: action => {
							this.$router.push({
								path:'/TaskBooksReceived'
							});
						}
					})
				}else{
					this.$alert(msg,'错误提示');
				}
			}).catch((res)=>{
				console.log(res);
			})
		}
	}
}
</script>

<style scoped>
.sm-tip{ font-size: 12px; color:#67c23a; margin-left: 10px;}
.upload-demo{ display: inline-block; }
.href_font{ color: #ffffff; }
</style>
