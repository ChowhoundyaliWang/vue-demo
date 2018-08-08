<template>
	<div>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>项目信息</h3>
				<el-form label-width="120px">
					<el-form-item label="项目名称"> 
						<span>{{appointBook.projectName}}</span>
					</el-form-item>
					<el-form-item label="应用区域"> 
						<el-input v-model='appointBook.appField' readonly></el-input>
					</el-form-item>
					<el-form-item label="项目号修正"> 
						<span>{{appointBook.projectName}}</span>
					</el-form-item>
					<el-form-item label="项目号"> 
						<span>{{appointBook.projectName}}</span>
					</el-form-item>
				</el-form>	
			</el-card>
			<el-card class="box-card mb-16" shadow="always" v-if='!viewFlag'>
				<h3>项目经理</h3>
				<el-table :data="appointBook.proManagerTable" border style="width:80%;" class="mx-table tb-inp">
					<el-table-column prop="status" label="状态" width='110px'>
					    <template slot-scope="scope">
							<el-select placeholder="请选择" v-model="scope.row.status">
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
			<el-card class="box-card mb-16" shadow="always" v-if='viewFlag'>
				<h3>项目经理</h3>
				<el-table :data="appointBook.proManagerTable" border style="width:80%;" class="mx-table tb-inp">
					<el-table-column prop="status" label="状态">
						<template slot-scope='scope'>
							<span v-text="scope.row.status?'在职':'离职'"></span>
						</template>
					</el-table-column>
					<el-table-column prop="empNumber" label="员工号"></el-table-column>
					<el-table-column prop="proManager" label="拟任命项目经理"></el-table-column>
					<el-table-column prop="isPractice" label="是否实习"></el-table-column>
					<el-table-column prop="isWork" label="是否劳务"></el-table-column>
					<el-table-column prop="email" label="电子邮箱地址" width="200px"></el-table-column>
					<el-table-column prop="startTime" label="任命开始时间">
					    <template slot-scope='scope'>
							<el-date-picker v-model='scope.row.startTime' type='date' placeholder="开始日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' disabled></el-date-picker>
						</template>  
					</el-table-column>
					<el-table-column prop="endTime" label="任命结束时间">
					    <template slot-scope='scope'>
							<el-date-picker v-model='scope.row.endTime' type='date' placeholder="结束日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd' disabled></el-date-picker>
						</template>  
					</el-table-column>
				</el-table>
			</el-card>
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>其他信息</h3>
				<el-form label-width="120px">
					<el-form-item label="个人简历">
						<el-input readonly='true' v-model='appointBook.resume'></el-input>
					</el-form-item>
					<el-form-item label="预计工期">
						<el-date-picker v-model="appointBook.expectedTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="工作内容">
						<el-input type='textarea' :rows='4' style="width: 40%;" v-model='appointBook.workContent' readonly></el-input>
					</el-form-item>
					<el-form-item label="工作界面">
						<el-input type='textarea' :rows='4' style="width: 40%;" v-model='appointBook.workspace' readonly></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type='textarea' :rows='4' style="width: 40%;" v-model='appointBook.workRemark' readonly></el-input>
					</el-form-item>
					<el-form-item label="发送给">
						<el-input readonly='true' v-model='appointBook.sendToUser'></el-input>
					</el-form-item>
					<el-form-item label="" v-if='!viewFlag'>
						<el-button type="primary" class="el-icon-refresh" @click="taskBookSave">调整</el-button>
					</el-form-item>
				</el-form>	
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppointBook',
	props:{
		appointBook:{
			type: Object,
			required: true
		},
		viewFlag:{
			type: Boolean,
			required: true
		},
		statusList:{
			type: Array,
			required: true
		},
		selectList:{
			type: Array,
			required: true
		}
	},
	mounted (){
	},
	methods:{
		addRow(){
			//往表格里添加数据
			let rowData = {status: true ,empStatus:"", proManager:"", isPractice:"", isWork:'', email: '', startTime: '', endTime:'' };
			this.appointBook.proManagerTable.push(rowData);
		},
		delRow(index, row){
			this.appointBook.proManagerTable.splice(index,1);
		}
	}
}
</script>

<style scoped>
.sm-tip{ font-size: 12px; color:#67c23a; margin-left: 10px;}
.upload-demo{ display: inline-block; }
</style>
