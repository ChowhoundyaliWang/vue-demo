import Vue from 'vue'
import Router from 'vue-router'

// Login页面
import Login from '@/pages/Login'

// 系统页面
import cmp from '@/pages/cmp'
import MyHomePage from '@/pages/home/MyHomePage'  //我的首页
import UserManage from '@/pages/systemManage/UserManage'  //用户管理
import UserCreate from '@/pages/systemManage/UserCreate'  //用户管理-创建用户
import UserInfoView from '@/pages/systemManage/UserInfoView'  //用户管理-查看用户
import UserInfoEdit from '@/pages/systemManage/UserInfoEdit' //用户管理-编辑用户

/*项目任务书*/
import TaskBookCreate from '@/pages/taskBook/TaskBookCreate' //创建任务书
import TaskBookUnaudited from '@/pages/taskBook/TaskBookUnaudited' //未审核的项目任务书
import TaskBookPassed from '@/pages/taskBook/TaskBookPassed'  //已通过的项目任务书
import TaskBookNotPassed from '@/pages/taskBook/TaskBookNotPassed'  //未通过的项目任务书
import TaskBooksView from '@/pages/taskBook/TaskBooksView' //查看项目任务书
import TaskBookView from '@/pages/taskBook/TaskBookView'  //项目任务书查看单页
import TaskBookToBeAudited from '@/pages/taskBook/TaskBookToBeAudited'  //待审核的项目任务书
import TaskBookAuditing from '@/pages/taskBook/TaskBookAuditing'  //项目任务书审核单页
import TaskBookModify from '@/pages/taskBook/TaskBookModify'    //项目任务书修改单页
import TaskBookAudited from '@/pages/taskBook/TaskBookAudited'   //已审核的项目任务书
import TaskBookUpdate from '@/pages/taskBook/TaskBookUpdate'   //项目任务书更新单页
import TaskBookToBeAllocated from '@/pages/taskBook/TaskBookToBeAllocated' //带分配的项目任务书
import TaskBookAllocated from '@/pages/taskBook/TaskBookAllocated' //已分配的项目任务书
import TaskBookAllot from '@/pages/taskBook/TaskBookAllot'  //项目任务书分配项目号单页
import ProByDept from '@/pages/taskBook/ProByDept'  //执行主体为本部门的项目
import TaskBookDesign from '@/pages/taskBook/TaskBookDesign'  //设计类项目任务书
//合同管理
import ContractsUpload from '@/pages/taskBook/ContractsUpload'  //需上传合同的项目
import ContractsUploadList from '@/pages/taskBook/ContractsUploadList'  //合同上传记录
import ContractUpload from '@/pages/taskBook/ContractUpload'   //上传合同
import ContractView from '@/pages/taskBook/ContractView'  //查看合同
 
/*项目计划书*/
//项目任务书接收
import TaskBookToBeReceived from '@/pages/planBook/TaskBookToBeReceived' //待接收的项目任务书
import TaskBookReceived from '@/pages/planBook/TaskBookReceived'  //待接收的项目任务书——接收单页
import PlanBookCreate from '@/pages/planBook/PlanBookCreate' //创建项目计划书
import TaskBooksReceived from '@/pages/planBook/TaskBooksReceived'  //已接收的项目任务书
import TLTaskBooksReceived from '@/pages/planBook/TLTaskBooksReceived'  //TL已接收的项目任务书
//人力资源申请
import HRNonFeedback from '@/pages/planBook/HRNonFeedback'  //未反馈的人力资源申请
import HRToBeReceived from '@/pages/planBook/HRToBeReceived'  //待接收的人力资源反馈
//人力资源申请反馈
import HRPendingFeedback from '@/pages/planBook/HRPendingFeedback'  //待反馈的人力资源申请
import HRFeedback from '@/pages/planBook/HRFeedback' //已反馈的人力资源申请
import HRView from '@/pages/planBook/HRView'  //查看人力资源申请

//项目计划书
import UnauditedProTL from '@/pages/planBook/UnauditedProTL' //部门经理未审核的项目
import UnauditedProManager from '@/pages/planBook/UnauditedProManager' //执行副总未审核的项目
import PlanBooksPassed from '@/pages/planBook/PlanBooksPassed'  //已通过的项目计划书
import PlanBooksNotPassed from '@/pages/planBook/PlanBooksNotPassed' //未通过的项目计划书
import PlanBooksDesign from '@/pages/planBook/PlanBooksDesign' //设计类项目计划书
//项目计划书审核
import TLPlanBooksToBeAudited from '@/pages/planBook/TLPlanBooksToBeAudited'   //待审核TL的项目计划书
import TLPlanBooksAudited from '@/pages/planBook/TLPlanBooksAudited'  //已审核TL的项目计划书
import planBooksToBeAudited from '@/pages/planBook/planBooksToBeAudited'   //待审核的项目计划书
import planBooksAudited from '@/pages/planBook/planBooksAudited'  //已审核的项目计划书
import PlanBookView from '@/pages/planBook/PlanBookView'  //查看项目计划书
import PlanBookUpdate from '@/pages/planBook/PlanBookUpdate'  //更新项目计划书
import PlanBookAudit from '@/pages/planBook/PlanBookAudit'
import PlanBookManagerAudit from '@/pages/planBook/PlanBookManagerAudit'


//项目预算
import ProBudgetToSumbit from '@/pages/planBook/ProBudgetToSumbit' //需提交预算的项目
import ProBudgetSumbitted from '@/pages/planBook/ProBudgetSumbitted' //已提交预算的项目
import ProBudgetPassed from '@/pages/planBook/ProBudgetPassed' //已通过预算审批的项目
import ProBudgetNotPassed from '@/pages/planBook/ProBudgetNotPassed' //未通过预算审批的项目
import ProBudgetSubmit from '@/pages/planBook/ProBudgetSubmit'  //提交项目预算单页
import ProBudgetView from '@/pages/planBook/ProBudgetView'  //项目预算查看单页
import ProBudgetApprove from '@/pages/planBook/ProBudgetApprove' //审批预算单页
import ProBudgetUpdate from '@/pages/planBook/ProBudgetUpdate'  //更新预算单页

//项目审批
import ProBudgetToApprove from '@/pages/planBook/ProBudgetToApprove' //待审批预算的项目计划书
import ProBudgetApproved from '@/pages/planBook/ProBudgetApproved'  //已审批预算的项目计划书

//项目启动——项目经理任命书
import AppointBooksToCreate from '@/pages/proStart/AppointBooksToCreate' //待创建任命书的计划书
import AppointBookToCreate from '@/pages/proStart/AppointBookToCreate' //待创建任命书的计划书单页
import AppointBookCreate from '@/pages/proStart/AppointBookCreate' // 创建项目经理任务书单页
import AppointBooksNotAmend from '@/pages/proStart/AppointBooksNotAmend'  //未修正的项目经理任命书
import AppointBooksAmended from '@/pages/proStart/AppointBooksAmended' //已修正的项目经理任命书
import AppointBookView from '@/pages/proStart/AppointBookView' //查看项目经理任命书单页
import AppointBookAdjust from '@/pages/proStart/AppointBookAdjust' //调整项目经理任命书单页

//项目启动——项目经理任命书修正
import AppointBooksCreated from '@/pages/proStart/AppointBooksCreated'  //待修正的项目经理任命书

//项目启动——项目经理任命邮件
import AppointEmailsSent from '@/pages/proStart/AppointEmailsSent' //未发送的任命书邮件
import AppointEmailsUnsent from '@/pages/proStart/AppointEmailsUnsent'  // 已发送的任命书邮件
import AppointEmail from '@/pages/proStart/AppointEmail'  //发送任命书邮件
import AppointEmailView from '@/pages/proStart/AppointEmailView'  //查看任命书邮件

//项目启动——项目启动会议纪要
import MeetingSummaryCreated from '@/pages/proStart/MeetingSummaryCreated'  // 未创建的会议纪要
import MeetingSumNotCreated from '@/pages/proStart/MeetingSumNotCreated'   // 已创建的会议纪要
import MeetingSumCreate from '@/pages/proStart/MeetingSumCreate'  //创建会议纪要

/*项目监控*/ 
//合同落地提醒
import ContractsNotDone from '@/pages/proMonitor/ContractsNotDone'   //合同未落地的项目
import ContractsFirstRemind from '@/pages/proMonitor/ContractsFirstRemind'   //第一次提醒
import ContractsSecondRemind from '@/pages/proMonitor/ContractsSecondRemind'  //第二次提醒
import ContractsDone from '@/pages/proMonitor/ContractsDone'  //合同已落地的项目

//上传满意度调查提醒
import ProSurveyToUpload from '@/pages/proMonitor/ProSurveyToUpload'  //需上传满意度调查的项目
//项目结束提醒
import ProEndRemind from '@/pages/proMonitor/ProEndRemind'  // 项目即将结束（一个月）
//项目结束通知
import ProEndInfosUnaudited from '@/pages/proMonitor/ProEndInfosUnaudited' //未审核的项目结束通知
import ProEndInfosPassed from '@/pages/proMonitor/ProEndInfosPassed' //已通过的项目结束通知
import ProEndInfosNotPassed from '@/pages/proMonitor/ProEndInfosNotPassed' //未通过的项目结束通知
//项目结束通知审核
import ProEndInfosToAudit from '@/pages/proMonitor/ProEndInfosPassed' //待审核的项目结束通知
import ProEndInfosAudited from '@/pages/proMonitor/ProEndInfosNotPassed' //已审核的项目结束通知
//项目关闭通知
import ProCloseInfosToCreate from '@/pages/proMonitor/ProCloseInfosToCreate'  //待创建关闭通知的项目
import ProCloseInfosCreated from '@/pages/proMonitor/ProCloseInfosCreated'   //已创建的项目关闭通知

//设备归还情况
import DeviceToReturn from '@/pages/proMonitor/DeviceToReturn'  //需归还设备的项目
import DeviceReturnRecord from '@/pages/proMonitor/DeviceReturnRecord'  //设备归还情况
//文件存档情况
import ProToCreateFile from '@/pages/proMonitor/ProToCreateFile'  // 需创建文件存档的项目
import ProFlieRecord from '@/pages/proMonitor/ProFlieRecord'  // 设备归还记录

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/cmp'
    },
    {
      path:'/Login',
      name:'Login',
      component: Login
    },
    {
      path:'/cmp',
      component: cmp,
      children:[
        {path:'/', component: MyHomePage, meta:{ reqiuresAuth: true }},
        {path:'/UserManage', component: UserManage, meta:{ reqiuresAuth: true }},
        {path:'/UserCreate', component: UserCreate, meta:{ reqiuresAuth: true }},
        {path:'/TaskBookCreate', component: TaskBookCreate, meta:{ reqiuresAuth: true }},
        {path:'/TaskBookUnaudited', component: TaskBookUnaudited, meta:{ reqiuresAuth: true }},
        {path:'/TaskBookPassed', component: TaskBookPassed, meta:{ reqiuresAuth: true }},
        {path:'/TaskBookNotPassed', component: TaskBookNotPassed, meta:{ reqiuresAuth: true }},
        {path:'/TaskBooksView', component: TaskBooksView, meta:{reqiuresAuth:true }},
        {path:'/TaskBookView/:id', name: 'TaskBookView', component: TaskBookView, meta:{reqiuresAuth:true }},   // 在子组件$route.params.id来获取参数
        {path:'/TaskBookToBeAudited', component: TaskBookToBeAudited, meta:{reqiuresAuth:true }},
        {path:'/TaskBookAuditing/:id', name: 'TaskBookAuditing', component: TaskBookAuditing, meta:{reqiuresAuth:true }},   // 在子组件$route.params.id来获取参数
        {path:'/TaskBookModify/:id', name: 'TaskBookModify', component: TaskBookModify, meta:{reqiuresAuth:true }},
        {path:'/TaskBookAudited', name:'TaskBookAudited', component: TaskBookAudited, meta:{reqiuresAuth:true }},
        {path:'/TaskBookUpdate/:id', name: 'TaskBookUpdate', component: TaskBookUpdate, meta:{reqiuresAuth:true }},
        {path:'/TaskBookToBeAllocated', name:'TaskBookToBeAllocated', component: TaskBookToBeAllocated, meta:{ reqiuresAuth:true}},
        {path:'/TaskBookAllocated', name:'TaskBookAllocated', component: TaskBookAllocated, meta:{ reqiuresAuth:true}},
        {path:'/TaskBookAllot/:id', name:'TaskBookAllot', component: TaskBookAllot, meta:{ reqiuresAuth:true}},
        { path: '/ContractsUpload', name: 'ContractsUpload', component: ContractsUpload, meta:{ reqiuresAuth: true }},
        { path: '/ContractsUploadList', name: 'ContractsUploadList', component: ContractsUploadList, meta:{ reqiuresAuth: true }},
        { path: '/ContractUpload/:conId', name: 'ContractUpload', component: ContractUpload, meta:{ reqiuresAuth: true}},
        { path: '/ContractView/:conId', name: 'ContractView', component: ContractView, meta:{ reqiuresAuth: true}},
        {path:'/TaskBookToBeReceived', component: TaskBookToBeReceived, meta:{ reqiuresAuth:true}},
        {path:'/TaskBookReceived/:id', name:'TaskBookReceived', component: TaskBookReceived, meta:{ reqiuresAuth:true}},
        {path:'/PlanBookCreate/:id/:planPaperId', name:'PlanBookCreate', component: PlanBookCreate, meta: { reqiuresAuth:true}},
        {path:'/TaskBooksReceived', component: TaskBooksReceived, meta:{ reqiuresAuth:true}},
        {path:'/TLTaskBooksReceived', component: TLTaskBooksReceived, meta:{ reqiuresAuth:true}},
        {path:'/TLPlanBooksToBeAudited', component: TLPlanBooksToBeAudited , meta:{reqiuresAuth:true}},
        {path:'/TLPlanBooksAudited', component: TLPlanBooksAudited , meta:{reqiuresAuth:true}},
        {path:'/planBooksToBeAudited', component: planBooksToBeAudited , meta:{reqiuresAuth:true}},
        {path:'/planBooksAudited', component: planBooksAudited , meta:{reqiuresAuth:true}},
        {path:'/PlanBookView/:id', name:'PlanBookView', component: PlanBookView, meta: { reqiuresAuth:true}},
        {path:'/PlanBookUpdate/:id', name:'PlanBookUpdate', component: PlanBookUpdate, meta: { reqiuresAuth:true}},
        {path:'/PlanBookAudit/:id', name:'PlanBookAudit', component: PlanBookAudit, meta: { reqiuresAuth:true}},
        {path:'/PlanBookManagerAudit/:id', name:'PlanBookManagerAudit', component: PlanBookManagerAudit, meta: { reqiuresAuth:true}},   
        {path:'/HRNonFeedback', name: 'HRNonFeedback', component: HRNonFeedback, meta: { reqiuresAuth: true}},
        {path:'/HRToBeReceived', name: 'HRToBeReceived', component: HRToBeReceived, meta: { reqiuresAuth: true}},
        {path:'/HRPendingFeedback', name: 'HRPendingFeedback', component: HRPendingFeedback, meta: { reqiuresAuth: true}},
        {path:'/HRFeedback', name: 'HRFeedback', component: HRFeedback, meta: { reqiuresAuth: true}},
        { path: '/HRView/:hrId', name: 'HRView', component: HRView, meta:{ reqiuresAuth: true}},
        {path:'/UnauditedProManager', name: 'UnauditedProManager', component: UnauditedProManager, meta: { reqiuresAuth: true}},
        {path:'/UnauditedProTL', name: 'UnauditedProTL', component: UnauditedProTL, meta: { reqiuresAuth: true}},
        {path:'/PlanBooksPassed', name: 'PlanBooksPassed', component: PlanBooksPassed, meta: { reqiuresAuth: true}},
        {path:'/PlanBooksNotPassed', name: 'PlanBooksNotPassed', component: PlanBooksNotPassed, meta: { reqiuresAuth: true}},
        {path:'/PlanBooksDesign', name: 'PlanBooksDesign', component: PlanBooksDesign, meta: { reqiuresAuth: true}},
        {path:'/ProBudgetToSumbit', name: 'ProBudgetToSumbit', component: ProBudgetToSumbit, meta: { reqiuresAuth: true}},
        {path:'/ProBudgetSumbitted', name: 'ProBudgetSumbitted', component: ProBudgetSumbitted, meta: { reqiuresAuth: true}},
        {path:'/ProBudgetPassed', name: 'ProBudgetPassed', component: ProBudgetPassed, meta: { reqiuresAuth: true}},
        {path:'/ProBudgetNotPassed', name: 'ProBudgetNotPassed', component: ProBudgetNotPassed, meta: { reqiuresAuth: true}},
        {path:'/ProBudgetToApprove', name: 'ProBudgetToApprove', component: ProBudgetToApprove, meta: { reqiuresAuth: true}},
        {path:'/ProBudgetApproved', name: 'ProBudgetApproved', component: ProBudgetApproved, meta: { reqiuresAuth: true}},
        { path: '/ProBudgetUpdate/:id', name:'ProBudgetUpdate', component: ProBudgetUpdate, meta: {reqiuresAuth: true}},
        {path:'/ProBudgetSubmit/:id', name:'ProBudgetSubmit', component:ProBudgetSubmit, meta:{ reqiuresAuth: true}},
        {path:'/ProBudgetView/:id', name:'ProBudgetView', component:ProBudgetView, meta:{ reqiuresAuth: true}},
        {path:'/ProBudgetApprove/:id/:budgetId', name:'ProBudgetApprove', component:ProBudgetApprove, meta:{ reqiuresAuth:true}},
        {path:'/AppointBooksToCreate', name:'AppointBooksToCreate', component:AppointBooksToCreate, meta:{reqiuresAuth:true}},
        {path:'/AppointBookToCreate/:id', name:'AppointBookToCreate', component:AppointBookToCreate, meta:{ reqiuresAuth:true}},
        {path:'/AppointBookCreate/:id/:taskId', name:'AppointBookCreate', component:AppointBookCreate, meta:{ reqiuresAuth:true}},
        {path:'/AppointBooksNotAmend', name:'AppointBooksNotAmend', component: AppointBooksNotAmend, meta:{ reqiuresAuth:true }},
        {path:'/AppointBooksAmended', name:'AppointBooksAmended', component: AppointBooksAmended, meta:{ reqiuresAuth:true }},
        {path:'/AppointBookView/:id', name:'AppointBookView', component:AppointBookView, meta:{ reqiuresAuth:true}},
        {path:'/AppointBookAdjust/:id', name:'AppointBookAdjust', component:AppointBookAdjust, meta:{ reqiuresAuth:true}},
        { path: '/AppointBooksCreated', name:'AppointBooksCreated', component: AppointBooksCreated, meta:{ reqiuresAuth:true} },
        { path: '/AppointEmailsSent', name:'AppointEmailsSent', component: AppointEmailsSent, meta:{ reqiuresAuth:true} },
        { path: '/AppointEmailsUnsent', name:'AppointEmailsUnsent', component: AppointEmailsUnsent, meta:{ reqiuresAuth:true} },
        { path: '/AppointEmail/:emailId', name:'AppointEmail', component:AppointEmail ,meta:{reqiuresAuth: true } },
        { path: '/AppointEmailView/:emailId', name:'AppointEmailView', component:AppointEmailView ,meta:{reqiuresAuth: true } },
        { path: '/MeetingSummaryCreated', name:'MeetingSummaryCreated', component: MeetingSummaryCreated, meta:{ reqiuresAuth:true} },
        { path: '/MeetingSumNotCreated', name:'MeetingSumNotCreated', component: MeetingSumNotCreated, meta:{ reqiuresAuth:true} },
        { path: '/ContractsNotDone', name:'ContractsNotDone', component: ContractsNotDone, meta:{ reqiuresAuth:true} },
        { path: '/ContractsFirstRemind', name:'ContractsFirstRemind', component: ContractsFirstRemind, meta:{ reqiuresAuth:true} },
        { path: '/ContractsSecondRemind', name:'ContractsSecondRemind', component: ContractsSecondRemind, meta:{ reqiuresAuth:true} },
        { path: '/ContractsDone', name:'ContractsDone', component: ContractsDone, meta:{ reqiuresAuth:true} },
        { path: '/ProSurveyToUpload', name:'ProSurveyToUpload', component: ProSurveyToUpload, meta:{ reqiuresAuth:true} },
        { path: '/ProEndRemind', name:'ProEndRemind', component: ProEndRemind, meta:{ reqiuresAuth:true} },
        { path: '/ProEndInfosUnaudited', name:'ProEndInfosUnaudited', component: ProEndInfosUnaudited, meta:{ reqiuresAuth:true} },
        { path: '/ProEndInfosPassed', name:'ProEndInfosPassed', component: ProEndInfosPassed, meta:{ reqiuresAuth:true} },
        { path: '/ProEndInfosNotPassed', name:'ProEndInfosNotPassed', component: ProEndInfosNotPassed, meta:{ reqiuresAuth:true} },
        { path: '/ProEndInfosToAudit', name:'ProEndInfosToAudit', component: ProEndInfosToAudit, meta:{ reqiuresAuth:true} },
        { path: '/ProEndInfosAudited', name:'ProEndInfosAudited', component: ProEndInfosAudited, meta:{ reqiuresAuth:true} },
        { path: '/ProCloseInfosToCreate', name:'ProCloseInfosToCreate', component: ProCloseInfosToCreate, meta:{ reqiuresAuth:true} },
        { path: '/ProCloseInfosCreated', name:'ProCloseInfosCreated', component: ProCloseInfosCreated, meta:{ reqiuresAuth:true} },
        { path: '/DeviceToReturn', name:'DeviceToReturn', component: DeviceToReturn, meta:{ reqiuresAuth:true} },
        { path: '/DeviceReturnRecord', name:'DeviceReturnRecord', component: DeviceReturnRecord, meta:{ reqiuresAuth:true} },
        { path: '/ProToCreateFile', name:'ProToCreateFile', component: ProToCreateFile, meta:{ reqiuresAuth:true} },
        { path: '/ProFlieRecor  d', name:'ProFlieRecord', component: ProFlieRecord, meta:{ reqiuresAuth:true} },
        { path:'/MeetingSumCreate/:id', name:'MeetingSumCreate', component:MeetingSumCreate, meta:{ reqiuresAuth:true}},
        { path:'/UserInfoView/:userId', name:'UserInfoView', component:  UserInfoView, meta:{ reqiuresAuth: true}},
        { path:'/UserInfoEdit/:userId', name:'UserInfoEdit', component:  UserInfoEdit, meta:{ reqiuresAuth: true}},
        { path:'/ProByDept', name:'ProByDept', component: ProByDept, meta:{ reqiuresAuth: true}},
        { path: '/TaskBookDesign', name: 'TaskBookDesign', component: TaskBookDesign, meta:{ reqiuresAuth: true }}
      ]
    }
  ]
})
