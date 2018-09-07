<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目启动</el-breadcrumb-item>
				<el-breadcrumb-item>项目经理任命书邮件</el-breadcrumb-item>
				<el-breadcrumb-item>重发项目经理任命书邮件</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<appoint-book></appoint-book>
	</div>
</template>

<script>
import AppointBook from '../../components/AppointBook'
export default {
	name: 'AppointBookAdjust',
	components:{
		"appoint-book": AppointBook
	},
	data () {
		return {
			appointBook:{
				proManagerTable:[]
			},
			viewFlag: false,
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
		/*this.axios.get('/api/planPaper/get-name/'+ this.appointBook.taskId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.appointBook.projectName = model.projectName;
				this.appointBook.appField = model.appField;
			}
		});*/
	},
	methods:{
	}
}
</script>

<style scoped>
.sm-tip{ font-size: 12px; color:#67c23a; margin-left: 10px;}
.upload-demo{ display: inline-block; }
</style>
