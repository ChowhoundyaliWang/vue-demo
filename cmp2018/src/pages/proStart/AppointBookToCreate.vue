<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目启动</el-breadcrumb-item>
				<el-breadcrumb-item>项目经理任命书</el-breadcrumb-item>
				<el-breadcrumb-item>待创建任命书的计划书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<plan-book  v-bind:plan-book='planBook' :view-only='viewOnly'></plan-book>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<h3>项目经理任命书</h3>
				<el-form label-width="120px">
					<el-form-item label=" "> 
						<el-button type="success" @click="toCreate" class="fl" icon="el-icon-circle-check-outline">创建项目经理任命书</el-button>
					</el-form-item>
				</el-form>	
			</el-card>
		</div>
	</div>
</template>

<script>
import PlanBook from '../../components/PlanBook.vue'
export default {
	name: 'AppointBookToCreate',
	components: {
		"plan-book": PlanBook
	},
	data () {
		return {
			planBook:{},
			viewOnly: true,
			curId: this.$route.params.id
		}
	},
	mounted (){
		this.$el.parentNode.scrollTop = 0;
		this.axios.get('/api/planPaper/get/'+ this.curId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.planBook = model;
			}
		});
	},
	methods:{
		toCreate(){
			this.$router.push({
            	name:'AppointBookCreate', params:{ id: this.curId, taskId: this.planBook.taskId }
            })
		}
	}
}
</script>

<style scoped>

</style>
