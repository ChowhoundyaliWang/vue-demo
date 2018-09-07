<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目启动</el-breadcrumb-item>
				<el-breadcrumb-item>项目经理任命书</el-breadcrumb-item>
				<el-breadcrumb-item>创建项目经理任命书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>项目信息</h3>
				<el-form label-width="120px">
					<el-form-item label="项目名称"> 
						<span>{{appointBook.projectName}}</span>
					</el-form-item>
					<el-form-item label="应用区域"> 
						<el-input v-model='appointBook.appField' readOnly></el-input>
					</el-form-item>
				</el-form>	
			</el-card>
			<el-card class="box-card mb-16" shadow="always">
				<h3>项目经理</h3>
				<el-table :data="appointBook.proManagerTable" border style="width:80%;" class="mx-table tb-inp">
					<el-table-column prop="status" label="状态" width='110px'>
					    <template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.status" @change='statusChange'>
								<el-option v-for="(item,index) in statusList" :key="index" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</template>	
					</el-table-column>
					<el-table-column prop="empNumber" label="员工号">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.empNumber'></el-input>
						</template> 
					</el-table-column>
					<el-table-column prop="proManager" label="拟任命项目经理">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.proManager'></el-input>
						</template>  
					</el-table-column>
					<el-table-column prop="isPractice" label="是否实习" width='110px'>
					    <template slot-scope='scope'>
							<el-select placeholder="请选择" v-model="scope.row.isPractice">
								<el-option v-for="(item,index) in selectList" :key="index" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</template>  
					</el-table-column>
					<el-table-column prop="isWork" label="是否劳务" width='110px'>
					    <template slot-scope='scope'>
							<el-select placeholder="请选择" v-model="scope.row.isWork">
								<el-option v-for="(item, index) in selectList" :key="index" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</template>  
					</el-table-column>
					<el-table-column prop="email" label="电子邮箱地址" width="200px">
					    <template slot-scope='scope'>
							<el-input v-model='scope.row.email'></el-input>
						</template>  
					</el-table-column>
					<el-table-column prop="startTime" label="任命开始时间">
					    <template slot-scope='scope'>
							<el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd'></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="endTime" label="任命结束时间">
					    <template slot-scope='scope'>
							<el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' v-bind:disabled='scope.row.status'></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column label="操作" width="80px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="delRow(scope.$index, scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin-top:20px;width:80%;height:40px;position:relative;">
					<div style="position:absolute;top:0;right:0;">
					    <el-button @click="addRow" type="success" class="el-icon-plus">添加</el-button>
					</div>
				</div>
			</el-card>
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>其他信息</h3>
				<el-form label-width="120px">
					<el-form-item label="个人简历">
						<el-input v-model='appointBook.resume'></el-input>
					</el-form-item>
					<el-form-item label="预计工期">
						<el-date-picker v-model="appointBook.expectedTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="工作内容">
						<el-input type='textarea' :rows='4' style="width: 40%;" v-model='appointBook.workContent'></el-input>
					</el-form-item>
					<el-form-item label="工作界面">
						<el-input type='textarea' :rows='4' style="width: 40%;" v-model='appointBook.workspace'></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type='textarea' :rows='4' style="width: 40%;" v-model='appointBook.workRemark'></el-input>
					</el-form-item>
					<el-form-item label="发送给">
						<el-input readOnly='true' v-model='appointBook.sendToUser'></el-input>
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
export default {
	name: 'AppointBookCreate',
	data () {
		return {
			appointBook:{
				projectName:'',
				appField:'',
				proManagerTable:[],
				resume:'',
				expectedTime:[],
				workContent:'',
				workspace:'',
				workRemark:'',
				sendToUser:"运作管理部",
				planPaperId: this.$route.params.id,
				taskId: this.$route.params.taskId
			},
			statusList:[
			    { name:'在岗', value: true},
			    { name:'离岗', value: false}
			],
			selectList:[
			    { name:'是', value: '是'},
			    { name:'否', value: '否'}
			]
		}
	},
	mounted (){
		this.axios.get('/api/planPaper/get-name/'+ this.appointBook.taskId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.appointBook.projectName = model.projectName;
				this.appointBook.appField = model.appField;
				this.appointBook.expectedTime = model.cycle;
			}
		});
	},
	methods:{
		statusChange( value ){
			console.log(value);
			if(value){
				//同一行的任命结束时间不可选择
			}else{
				//同一行的任命结束时间可选
			}
		},
		addRow(){
			//往表格里添加数据
			let rowData = {status: true,empStatus:"", proManager:"", isPractice:"", isWork:'', email: '', startTime: '', endTime:'' };
			this.appointBook.proManagerTable.push(rowData);
		},
		delRow(index, row){
			this.appointBook.proManagerTable.splice(index,1);
		},
		toCreate(){
			let params = this.appointBook;
			this.axios.post('/api/manager-paper/add', params).then((res) =>{
				const data = res.data;   
				const msg = data.message;
				if(data.code == 200){
					this.$alert("审核成功！",'提示',{
						confirmButtonText:'确定',
						callback: action => {
							this.$router.push({
								path:'/AppointBooksCreated'
							});
						}
					}).catch(()=>{

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
</style>
