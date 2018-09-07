<template>
	<div>
		<el-card class="box-card mb-16 cm-steps" shadow="always">
			<el-row>
				<el-col :span='24'>
					<div class='el-steps el-steps--horizontal'>
						<div class="el-step is-horizontal is-center" style='flex-basis:5.5556%;margin-right: 0px;' v-for='(step,index) in steps' :key='index'>
							<div class="el-step__head" :class="[ step.status == 1? finishClass:(step.status == 2? processClass:waitClass)]">
								<div class='el-step__line' style="margin-right: 0;width:100%;">
									<i class='el-step__line-inner'></i>
								</div>
								<div class='el-step__icon is-icon'>
									<span class="el-step__icon-inner">
										<i :class="step.icon"></i>
									</span>
								</div>
							</div>
							<div class="el-step__main">
								<div class='el-step__title' :class='[ step.status == 1? finishClass:(step.status == 2? processClass:waitClass)]' :title='toDate(step.completeTime)'>{{step.name}}</div>
							</div>
						</div>
					</div>
				</el-col>
				<!-- <el-col :span='4'>
				
				</el-col> -->
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'cmpSteps',
	props:{
		procedures:Array
	},
	data(){
		return {
			steps:[
			   { name:'创建任务书', status:2, icon:'el-icon-edit'},
			   { name:'任务书审核通过', status:0, icon:'el-icon-circle-check-outline'},
			   { name:'项目号分配', status:0, icon:'el-icon-more-outline'},
			   { name:'人力申请', status:0, icon:'el-icon-sort-up'},
			   { name:'人力反馈', status:0, icon:'el-icon-sort-down'},
			   { name:'创建计划书', status:0, icon:'el-icon-edit'},
			   { name:'部门经理审核通过', status:0, icon:'el-icon-circle-check-outline'},
			   { name:'执行副总审核通过', status:0, icon:'el-icon-circle-check-outline'},
			   { name:'预算提交', status:0, icon:'el-icon-edit'},
			   { name:'预算审批通过', status:0, icon:'el-icon-circle-check-outline'},
			   { name:'项目经理任命书', status:0, icon:'el-icon-document'},
			   { name:'修正', status:0, icon:'el-icon-refresh'},
			   { name:'邮件发送', status:0, icon:'el-icon-arrow-right'},
			   { name:'启动会议', status:0, icon:'el-icon-star-on'},
			   { name:'项目结束', status:0, icon:'el-icon-more'},
			   { name:'审核通过', status:0, icon:'el-icon-circle-check-outline'},
			   { name:'项目关闭', status:0, icon:'el-icon-circle-close-outline'},
			   { name:'设备归还文件存档', status:0, icon:'el-icon-document'},
			],
			waitClass:'is-wait',
			finishClass:'is-finish',
			processClass:'is-process',
			stepsTimer:''
		}
	},
	destroyed(){
		//组件销毁后，清除定时器
		if(this.stepsTimer){
			clearInterval(this.stepsTimer);
		}
	},
	watch: {
		procedures(val) {			
			this.steps = val;
			this.stepsAnimation(this.steps);
		}
	},
	mounted (){
	},
	methods:{
		//时间戳转换为时间
		toDate(timestamp){
			let finishTime  = '';
			if(timestamp){
				finishTime = new Date(timestamp).toLocaleString();
				return "任务完成时间："+finishTime;
			}else{
				return '';
			}
		},
		//流程图动画效果显示
		stepsAnimation(steps){
			console.log(steps);
			let stepsLen = steps.length;
            let waitArr = [] ;  // 哪几步等待中——状态 0
            let finishArr = [];  // 哪几步完成了——状态 1
            let processArr = [];  // 哪几步正在进行中——状态 2
            let processStep = 0;  // 正在进行中的步骤——状态 2
            const time = 1000;

            if(stepsLen > 0){
            	steps.forEach((val, ind)=>{
            		// 在正在进行中的步骤之前的已完成
            		if( val.status === 1 && !processStep){
            			finishArr.push(ind);
            			val.status = 2;
            		}else if(val.status === 1 && processStep){
            			val.status = 2;
            		}else if(val.status === 2){
            			processArr.push(ind);
            			if(processArr.length > 0){
            				processStep = processArr[0];
            			}
            		}else{
            			waitArr.push(ind);
            		}
            	})

            	let realActive = finishArr.length;
            	let stepsMove = function(){
            		let index = 0;
            		let stepTimer = setInterval( function(){
            			if(index == processStep){
            				clearInterval(stepTimer);
            				steps.forEach((val, ind)=>{
            					if(finishArr.indexOf(ind) > -1){
            						val.status = 2;
            					}
            				})
            			}
            			//如果是已完成步骤，执行动画
            			if(finishArr.indexOf(index) > -1){
            				steps[index].status = 1;
            				index++;
            			}
            			while( waitArr.indexOf(index) > -1){
            				index++;
            			}
					    console.log(index);
				    }, time );
            	}
            	stepsMove();
            	this.stepsTimer = setInterval(stepsMove, (realActive+1)*time);
            }
		}
	}
}
</script>

<style scoped>
</style>