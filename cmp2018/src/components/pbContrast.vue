<template>
	<!-- 对比更新 -->
	 <el-dialog title="更新记录" :visible="pbContrastShow" width='95%' @close='closeDialog'>
	 	<div style="width:100%; height:400px;overflow-y: auto;" class="constrat">
			<div style="display: inline-block;width:49%;overflow-x: auto;vertical-align: top;">
				<plan-book :plan-book='one' :view-only='viewOnly' :is-contrast='isContrast'></plan-book>
			</div>
			<div style="display: inline-block;width:50%;overflow-x: auto;vertical-align: top;">
				<plan-book :plan-book='another' :view-only='viewOnly' :is-contrast='isContrast'></plan-book>
			</div>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="closeDialog">关闭</el-button>
		</div>
	 </el-dialog>	
</template>

<script>
import planBook from './PlanBook'
import {mapState, mapActions } from 'Vuex'
export default {
	name: 'pbContrast',
	components:{
		'plan-book': planBook
	},
	data () {
		return {
			viewOnly: true,
			isContrast: true
		}
	},
	computed:{
		...mapState([
			'one', 'another', 'pbContrastShow'
		])
	},
	methods:{
		...mapActions([
			'initVersions'
		]),
		closeDialog(){
			this.initVersions();
		}
	}
}
</script>

<style scoped>
</style>
