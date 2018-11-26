<template>
	<!-- 更新记录对话框 -->
	<div>
		<div class='page-content'>
			<el-dialog title="更新记录" :visible="updateListShow" @close='closeDialog'>
				<el-table :data="updateList" stripe border style="width:100%;" class="mb-16" height="300">
					<el-table-column prop="operate" label="操作" tooltip-effect='dark' width="210px">
					    <template slot-scope='scope'>
					    	<template v-if="curType === 'task'">
					    		<span v-show="scope.row.isNewest">最新版本</span>
					    		<span v-show="!scope.row.isNewest && scope.row.version !== 1">
					    			<el-button type="text" @click="contrastNewest(scope.row)">对比最新版本</el-button>
					    			<el-button type="text" @click="contrastPre(scope.row)">对比上一版本</el-button>
					    		</span>
					    		<span v-show="!scope.row.isNewest && scope.row.version == 1">
					    			<el-button type="text" @click="contrastNewest(scope.row)">对比最新版本</el-button>
					    		</span>
					    	</template>
					    	<template v-else>
					    		<span v-show="scope.row.id == -1">最新版本</span>
					    		<span v-show="scope.row.id !== -1 && scope.row.version !== 1">
					    			<el-button type="text" @click="contrastNewest(scope.row)">对比最新版本</el-button>
					    			<el-button type="text" @click="contrastPre(scope.row)">对比上一版本</el-button>
					    		</span>
					    		<span v-show="scope.row.id !== -1 && scope.row.version == 1">
					    			<el-button type="text" @click="contrastNewest(scope.row)">对比最新版本</el-button>
					    		</span>
					    	</template>
					    </template> 
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width='200px' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="remark" label="更新次数" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="status" label="状态" show-overflow-tooltip width='60px'> 
					</el-table-column>
					<el-table-column prop="createName" label="创建人" show-overflow-tooltip> 
					</el-table-column>
					<el-table-column prop="createdOn" label="创建时间" width='180px' show-overflow-tooltip> 
					</el-table-column>
				</el-table>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="closeDialog">确定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'Vuex'
export default {
	name: 'recordDialog',
	computed: mapState([
		'curType',
		'updateList',
		'updateListShow'
	]),
	methods:{
		...mapActions([
			'showVersions', 'initUpdateList'
		]),
		getId(row){
			if( this.curType == 'task'){
				return row.taskId;
			}else if(this.curType == 'planPaper'){
				return row.planPaperId;
			}else if( this.curType == 'projectBudget'){
				return row.budgetId;
			}else{
				return null;
			}
		},
		//和最新版本对比
		contrastNewest(row){
			let rowId = this.getId(row);
			this.axios.get('/api/'+ this.curType + '/compare/'+ rowId +'?another=0&version='+ row.version).then((res)=>{
				const data = res.data;
				if(data.code == 200){
					const model = data.model;
					let versions = { one: model[0], another: model[1]};
					this.showVersions( versions);
				}
			})
		},
		//和上一版本对比
		contrastPre(row){
			let rowId = this.getId(row);
			this.axios.get('/api/'+ this.curType +'/compare/'+ rowId +'?another='+ (row.version - 1) +'&version='+ row.version).then((res)=>{
				const data = res.data;
				if(data.code == 200){
					const model = data.model;
					let versions = { one: model[0], another: model[1]};
					this.showVersions( versions);
				}
			})
		},
		// 关闭
		closeDialog(){
			this.initUpdateList();
		}
	}
}
</script>

<style scoped>
</style>
