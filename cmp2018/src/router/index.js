import Vue from 'vue'
import Router from 'vue-router'

// Login页面
import Login from '@/pages/Login'

// 系统页面
import cmp from '@/pages/cmp'
import MyHomePage from '@/pages/MyHomePage'  //我的首页
import UserManage from '@/pages/UserManage'  //用户管理
import UserCreate from '@/pages/UserCreate'  //用户管理-创建用户
import UserInfoView from '@/pages/UserInfoView'  //用户管理-查看用户
import UserInfoEdit from '@/pages/UserInfoEdit' //用户管理-编辑用户

/*项目任务书*/
import TaskBookCreate from '@/pages/TaskBookCreate' //创建任务书
import TaskBookUnaudited from '@/pages/TaskBookUnaudited' //未审核的项目任务书
import TaskBookPassed from '@/pages/TaskBookPassed'  //已通过的项目任务书
import TaskBookNotPassed from '@/pages/TaskBookNotPassed'  //未通过的项目任务书
import TaskBooksView from '@/pages/TaskBooksView' //查看项目任务书
import TaskBookView from '@/pages/TaskBookView'  //项目任务书查看单页
import TaskBookToBeAudited from '@/pages/TaskBookToBeAudited'  //待审核的项目任务书
import TaskBookAuditing from '@/pages/TaskBookAuditing'  //项目任务书审核单页
import TaskBookModify from '@/pages/TaskBookModify'    //项目任务书修改单页
import TaskBookAudited from '@/pages/TaskBookAudited'   //已审核的项目任务书
import TaskBookUpdate from '@/pages/TaskBookUpdate'   //项目任务书更新单页
import TaskBookToBeAllocated from '@/pages/TaskBookToBeAllocated' //带分配的项目任务书
import TaskBookAllocated from '@/pages/TaskBookAllocated' //已分配的项目任务书
import TaskBookAllot from '@/pages/TaskBookAllot'  //项目任务书分配项目号单页
import ProByDept from '@/pages/ProByDept'  //执行主体为本部门的项目

/*项目计划书*/
//项目任务书接收
import TaskBookToBeReceived from '@/pages/TaskBookToBeReceived' //待接收的项目任务书
import TaskBookReceived from '@/pages/TaskBookReceived'  //待接收的项目任务书——接收单页
import PlanBookCreate from '@/pages/PlanBookCreate' //创建项目计划书
import TaskBooksReceived from '@/pages/TaskBooksReceived'  //已接收的项目任务书
import TLTaskBooksReceived from '@/pages/TLTaskBooksReceived'  //TL已接收的项目任务书
//人力资源申请
import HRNonFeedback from '@/pages/HRNonFeedback'  //未反馈的人力资源申请
import HRToBeReceived from '@/pages/HRToBeReceived'  //待接收的人力资源反馈
//人力资源申请反馈
import HRPendingFeedback from '@/pages/HRPendingFeedback'  //待反馈的人力资源申请
import HRFeedback from '@/pages/HRFeedback' //已反馈的人力资源申请
//项目计划书
import UnauditedProTL from '@/pages/UnauditedProTL' //部门经理未审核的项目
import UnauditedProManager from '@/pages/UnauditedProManager' //执行副总未审核的项目
import PlanBooksPassed from '@/pages/PlanBooksPassed'  //已通过的项目计划书
import PlanBooksNotPassed from '@/pages/PlanBooksNotPassed' //未通过的项目计划书
import PlanBooksDesign from '@/pages/PlanBooksDesign' //设计类项目计划书
//项目计划书审核
import TLPlanBooksToBeAudited from '@/pages/TLPlanBooksToBeAudited'   //待审核TL的项目计划书
import TLPlanBooksAudited from '@/pages/TLPlanBooksAudited'  //已审核TL的项目计划书
import planBooksToBeAudited from '@/pages/planBooksToBeAudited'   //待审核的项目计划书
import planBooksAudited from '@/pages/planBooksAudited'  //已审核的项目计划书
import PlanBookView from '@/pages/PlanBookView'  //查看项目计划书
import PlanBookUpdate from '@/pages/PlanBookUpdate'  //更新项目计划书
import PlanBookAudit from '@/pages/PlanBookAudit'
import PlanBookManagerAudit from '@/pages/PlanBookManagerAudit'


//项目预算
import ProBudgetToSumbit from '@/pages/ProBudgetToSumbit' //需提交预算的项目
import ProBudgetSumbitted from '@/pages/ProBudgetSumbitted' //已提交预算的项目
import ProBudgetPassed from '@/pages/ProBudgetPassed' //已通过预算审批的项目
import ProBudgetNotPassed from '@/pages/ProBudgetNotPassed' //未通过预算审批的项目
import ProBudgetSubmit from '@/pages/ProBudgetSubmit'  //提交项目预算单页
import ProBudgetView from '@/pages/ProBudgetView'  //项目预算查看单页
import ProBudgetApprove from '@/pages/ProBudgetApprove' //审批预算单页

//项目审批
import ProBudgetToApprove from '@/pages/ProBudgetToApprove' //待审批预算的项目计划书
import ProBudgetApproved from '@/pages/ProBudgetApproved'  //已审批预算的项目计划书

//项目启动——项目经理任命书
import AppointBooksToCreate from '@/pages/AppointBooksToCreate' //待创建任命书的计划书
import AppointBookToCreate from '@/pages/AppointBookToCreate' //待创建任命书的计划书单页
import AppointBookCreate from '@/pages/AppointBookCreate' // 创建项目经理任务书单页
import AppointBooksNotAmend from '@/pages/AppointBooksNotAmend'  //未修正的项目经理任命书
import AppointBooksAmended from '@/pages/AppointBooksAmended' //已修正的项目经理任命书
import AppointBookView from '@/pages/AppointBookView' //查看项目经理任命书单页
import AppointBookAdjust from '@/pages/AppointBookAdjust' //调整项目经理任命书单页

//项目启动——项目经理任命书修正
import AppointBooksCreated from '@/pages/AppointBooksCreated'  //待修正的项目经理任命书

//项目启动——项目经理任命邮件
import AppointEmailsSent from '@/pages/AppointEmailsSent' //未发送的任命书邮件
import AppointEmailsUnsent from '@/pages/AppointEmailsUnsent'  // 已发送的任命书邮件
import AppointEmail from '@/pages/AppointEmail'  //发送任命书邮件

//项目启动——项目启动会议纪要
import MeetingSummaryCreated from '@/pages/MeetingSummaryCreated'  // 未创建的会议纪要
import MeetingSumNotCreated from '@/pages/MeetingSumNotCreated'   // 已创建的会议纪要
import MeetingSumCreate from '@/pages/MeetingSumCreate'  //创建会议纪要

/*项目监控*/ 
//合同落地提醒
import ContractsNotDone from '@/pages/ContractsNotDone'   //合同未落地的项目
import ContractsFirstRemind from '@/pages/ContractsFirstRemind'   //第一次提醒
import ContractsSecondRemind from '@/pages/ContractsSecondRemind'  //第二次提醒
import ContractsDone from '@/pages/ContractsDone'  //合同已落地的项目

//上传满意度调查提醒
import ProSurveyToUpload from '@/pages/ProSurveyToUpload'  //需上传满意度调查的项目
//项目结束提醒
import ProEndRemind from '@/pages/ProEndRemind'  // 项目即将结束（一个月）
//项目结束通知
import ProEndInfosUnaudited from '@/pages/ProEndInfosUnaudited' //未审核的项目结束通知
import ProEndInfosPassed from '@/pages/ProEndInfosPassed' //已通过的项目结束通知
import ProEndInfosNotPassed from '@/pages/ProEndInfosNotPassed' //未通过的项目结束通知
//项目结束通知审核
import ProEndInfosToAudit from '@/pages/ProEndInfosPassed' //待审核的项目结束通知
import ProEndInfosAudited from '@/pages/ProEndInfosNotPassed' //已审核的项目结束通知
//项目关闭通知
import ProCloseInfosToCreate from '@/pages/ProCloseInfosToCreate'  //待创建关闭通知的项目
import ProCloseInfosCreated from '@/pages/ProCloseInfosCreated'   //已创建的项目关闭通知

//设备归还情况
import DeviceToReturn from '@/pages/DeviceToReturn'  //需归还设备的项目
import DeviceReturnRecord from '@/pages/DeviceReturnRecord'  //设备归还情况
//文件存档情况
import ProToCreateFile from '@/pages/ProToCreateFile'  // 需创建文件存档的项目
import ProFlieRecord from '@/pages/ProFlieRecord'  // 设备归还记录

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
        {path:'/TaskBookToBeReceived', component: TaskBookToBeReceived, meta:{ reqiuresAuth:true}},
        {path:'/TaskBookReceived/:id', name:'TaskBookReceived', component: TaskBookReceived, meta:{ reqiuresAuth:true}},
        {path:'/PlanBookCreate/:id', name:'PlanBookCreate', component: PlanBookCreate, meta: { reqiuresAuth:true}},
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
        {path:'/ProBudgetSubmit/:id', name:'ProBudgetSubmit', component:ProBudgetSubmit, meta:{ reqiuresAuth: true}},
        {path:'/ProBudgetView/:id', name:'ProBudgetView', component:ProBudgetView, meta:{ reqiuresAuth: true}},
        {path:'/ProBudgetApprove/:id/:budgetId', name:'ProBudgetApprove', component:ProBudgetApprove, meta:{ reqiuresAuth:true}},
        {path:'/AppointBooksToCreate', name:'AppointBooksToCreate', component:AppointBooksToCreate, meta:{reqiuresAuth:true}},
        {path:'/AppointBookToCreate/:id', name:'AppointBookToCreate', component:AppointBookToCreate, meta:{ reqiuresAuth:true}},
        {path:'/AppointBookCreate/:id/:taskId', name:'AppointBookCreate', component:AppointBookCreate, meta:{ reqiuresAuth:true}},
        {path:'/AppointBooksNotAmend', name:'AppointBooksNotAmend', component: AppointBooksNotAmend, meta:{ reqiuresAuth:true }},
        {path:'/AppointBooksAmended', name:'AppointBooksAmended', component: AppointBooksAmended, meta:{ reqiuresAuth:true }},
        {path:'/AppointBookView/:id', name:'AppointBookView', component:AppointBookView, meta:{ reqiuresAuth:true}},
        {path:'/AppointBookAdjust/:id/:taskId', name:'AppointBookAdjust', component:AppointBookAdjust, meta:{ reqiuresAuth:true}},
        { path: '/AppointBooksCreated', name:'AppointBooksCreated', component: AppointBooksCreated, meta:{ reqiuresAuth:true} },
        { path: '/AppointEmailsSent', name:'AppointEmailsSent', component: AppointEmailsSent, meta:{ reqiuresAuth:true} },
        { path: '/AppointEmailsUnsent', name:'AppointEmailsUnsent', component: AppointEmailsUnsent, meta:{ reqiuresAuth:true} },
        { path: '/AppointEmail/:emailId', name:'AppointEmail', component:AppointEmail ,meta:{reqiuresAuth: true } },
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
        { path:'/ProByDept', name:'ProByDept', component: ProByDept, meta:{ reqiuresAuth: true}}

      ]
    }
  ]
})
