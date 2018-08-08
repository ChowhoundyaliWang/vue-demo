<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目计划书</el-breadcrumb-item>
				<el-breadcrumb-item>更新项目计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<pb-contrast :one-pb='onePb' :another-pb='anotherPb'></pb-contrast>
	</div>
</template>

<script>
import planBookContrast from '../components/planBookContrast.vue'
export default {
	name: 'PlanBookUpdate',
	components: {
		"pb-contrast": planBookContrast
	},
	data () {
		return {
			onePb:{},
			anotherPb:{},
			curId: this.$route.params.id
		}
	},
	mounted (){
		this.axios.get('/api/planPaper/get/'+ this.curId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.onePb = model;
				this.anotherPb = model;
			}
		});
	}
}
</script>

<style scoped>

</style>
