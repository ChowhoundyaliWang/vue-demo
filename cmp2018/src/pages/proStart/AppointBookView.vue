<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>项目启动</el-breadcrumb-item>
				<el-breadcrumb-item>项目经理任命书</el-breadcrumb-item>
				<el-breadcrumb-item>查看项目经理任命书</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<appoint-book :appoint-book='appointBook' :view-flag='viewFlag' :status-list='statusList' :select-list='selectList'></appoint-book>
	</div>
</template>

<script>
import AppointBook from '../../components/AppointBook'
export default {
	name: 'AppointBookView',
	components:{
		"appoint-book": AppointBook
	},
	data () {
		return {
			appointBook:{},
			viewFlag: true,
			appBookId: this.$route.params.id,
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
		this.axios.get('/api/manager-paper/get/'+ this.appBookId).then((res)=>{
			const data = res.data;
			if(data.code == 200){
				const model = data.model;
				this.appointBook = model;
			}
		});
	},
	methods:{
	}
}
</script>

<style scoped>
.sm-tip{ font-size: 12px; color:#67c23a; margin-left: 10px;}
.upload-demo{ display: inline-block; }
</style>
