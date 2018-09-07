<template>
	<div class="page-content cur-page">
		<el-card class="box-card" shadow="always">
			<h3>邮件信息</h3>
			<appoint-email :email-id='emailId'></appoint-email>
		</el-card>
	</div>
</template>

<script>
import appointBookEmail from '../../components/appointBookEmail'
export default {
	name: 'AppointEmailView',
	components:{
		'appoint-email': appointBookEmail
	},
	data(){
		return {
			emailId: this.$route.params.emailId
		}
	}
}
</script>

<style scoped>
.cur-page .el-input{ width: 460px; }
</style>
