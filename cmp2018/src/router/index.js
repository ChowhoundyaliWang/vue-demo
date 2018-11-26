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
import ViewMessage from '@/pages/systemManage/ViewMessage'  //我的消息页面

/*项目任务书*/
import TaskBookCreate from '@/pages/taskBook/TaskBookCreate' //创建任务书
import TaskBookUnaudited from '@/pages/taskBook/TaskBookUnaudited' //未审核的项目任务书
import TaskBookPassed from '@/pages/taskBook/TaskBookPassed'  //已通过的项目任务书
import TaskBookNotPassed from '@/pages/taskBook/TaskBookNotPassed'  //未通过的项目任务书
import TaskBooksView from '@/pages/taskBook/TaskBooksView' //查看项目任务书
import TaskBookView from '@/pages/taskBook/TaskBookView'  //项目任务书查看 单页
import TaskBookToBeAudited from '@/pages/taskBook/TaskBookToBeAudited'  //待审核的项目任务书
import TaskBookAuditing from '@/pages/taskBook/TaskBookAuditing'  //项目任务书审核 单页
import TaskBookModify from '@/pages/taskBook/TaskBookModify'    //项目任务书修改 单页
import TaskBookAudited from '@/pages/taskBook/TaskBookAudited'   //已审核的项目任务书
import TaskBookUpdate from '@/pages/taskBook/TaskBookUpdate'   //项目任务书更新 单页
import TaskBookToBeAllocated from '@/pages/taskBook/TaskBookToBeAllocated' //带分配的项目任务书
import TaskBookAllocated from '@/pages/taskBook/TaskBookAllocated' //已分配的项目任务书
import TaskBookAllot from '@/pages/taskBook/TaskBookAllot'  //项目任务书分配项目号 单页
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
import TaskBookReceived from '@/pages/planBook/TaskBookReceived'  //待接收的项目任务书——接收 单页
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
import PlanBookAudit from '@/pages/planBook/PlanBookAudit'    //部门经理审核项目计划书 单页
import PlanBookManagerAudit from '@/pages/planBook/PlanBookManagerAudit'  //执行副总审核项目计划书 单页


//项目预算
import ProBudgetToSumbit from '@/pages/planBook/ProBudgetToSumbit' //需提交预算的项目
import ProBudgetSumbitted from '@/pages/planBook/ProBudgetSumbitted' //已提交预算的项目
import ProBudgetPassed from '@/pages/planBook/ProBudgetPassed' //已通过预算审批的项目
import ProBudgetNotPassed from '@/pages/planBook/ProBudgetNotPassed' //未通过预算审批的项目
import ProBudgetSubmit from '@/pages/planBook/ProBudgetSubmit'  //提交项目预算 单页
import ProBudgetView from '@/pages/planBook/ProBudgetView'  //项目预算查看 单页
import ProBudgetApprove from '@/pages/planBook/ProBudgetApprove' //审批预算 单页
import ProBudgetUpdate from '@/pages/planBook/ProBudgetUpdate'  //更新预算 单页

//项目审批
import ProBudgetToApprove from '@/pages/planBook/ProBudgetToApprove' //待审批预算的项目计划书
import ProBudgetApproved from '@/pages/planBook/ProBudgetApproved'  //已审批预算的项目计划书

//项目启动——项目经理任命书
import AppointBooksToCreate from '@/pages/proStart/AppointBooksToCreate' //待创建任命书的计划书
import AppointBookToCreate from '@/pages/proStart/AppointBookToCreate' //待创建任命书的计划书 单页
import AppointBookCreate from '@/pages/proStart/AppointBookCreate' // 创建项目经理任务书 单页
import AppointBooksNotAmend from '@/pages/proStart/AppointBooksNotAmend'  //未修正的项目经理任命书
import AppointBooksAmended from '@/pages/proStart/AppointBooksAmended' //已修正的项目经理任命书
import AppointBookView from '@/pages/proStart/AppointBookView' //查看项目经理任命书 单页
import AppointBookAdjust from '@/pages/proStart/AppointBookAdjust' //调整项目经理任命书 单页

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

/*项目关闭*/ 
//项目关闭单
import ProCloseListToCreate from '@/pages/proClose/ProCloseListToCreate'  //待创建关闭单的项目--销售创建
import ProCloseListCreated from '@/pages/proClose/ProCloseListCreated'   //已创建的项目关闭单
import CloseListCreate from '@/pages/proClose/CloseListCreate'  //创建项目关闭单
import CloseListView from '@/pages/proClose/CloseListView'   //查看项目关闭单
import CloseListModify from '@/pages/proClose/CloseListModify'  //修改项目关闭单
import CloseListAudit from '@/pages/proClose/CloseListAudit'  //审批项目关闭单
//项目关闭单审批
import ProCloseListToAudit from '@/pages/proClose/ProCloseListToAudit' //待审批的项目关闭单--总经理审批
import ProCloseListAudited from '@/pages/proClose/ProCloseListAudited' //已审批的项目关闭单
//项目关闭通知
import ProCloseListPassed from '@/pages/proClose/ProCloseListPassed' //已通过的项目关闭单
import ProCloseListNotPassed from '@/pages/proClose/ProCloseListNotPassed' //未通过的项目关闭单

// 销售合同评审记录表
import ContractsToReview from '@/pages/salesContracts/ContractsToReview'   // 未评审的销售合同
import ContractsReviewed from '@/pages/salesContracts/ContractsReviewed'   // 已评审的销售合同
import ContractReview from '@/pages/salesContracts/ContractReview'  //评审销售合同
import salesContractView from '@/pages/salesContracts/salesContractView'  //查看销售合同
import ContractCreate from '@/pages/salesContracts/ContractCreate'  //创建销售合同
 
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
        {path:'/UserManage', name:'UserManage', component: UserManage, meta:{ reqiuresAuth: true }},
        {path:'/UserCreate', name:'UserCreate', component: UserCreate, meta:{ reqiuresAuth: true }},
        { path: '/ViewMessage', name: 'ViewMessage', component: ViewMessage, meta:{ reqiuresAuth: true} },
        {path:'/TaskBookCreate', component: TaskBookCreate, meta:{ reqiuresAuth: true }},
        {path:'/TaskBookUnaudited', component: TaskBookUnaudited, meta:{ reqiuresAuth: true }},
        {path:'/TaskBookPassed', component: TaskBookPassed, meta:{ reqiuresAuth: true }},
        {path:'/TaskBookNotPassed', component: TaskBookNotPassed, meta:{ reqiuresAuth: true }},
        {path:'/TaskBooksView', component: TaskBooksView, meta:{reqiuresAuth:true, scrollToTop: true }},
        {path:'/TaskBookView/:id', name: 'TaskBookView', component: TaskBookView, meta:{reqiuresAuth:true, scrollToTop: true }},   // 在子组件$route.params.id来获取参数
        {path:'/TaskBookToBeAudited', component: TaskBookToBeAudited, meta:{reqiuresAuth:true, scrollToTop: true }},
        {path:'/TaskBookAuditing/:id', name: 'TaskBookAuditing', component: TaskBookAuditing, meta:{reqiuresAuth:true, scrollToTop: true }},   // 在子组件$route.params.id来获取参数
        {path:'/TaskBookModify/:id', name: 'TaskBookModify', component: TaskBookModify, meta:{reqiuresAuth:true, scrollToTop: true }},
        {path:'/TaskBookAudited', name:'TaskBookAudited', component: TaskBookAudited, meta:{reqiuresAuth:true, scrollToTop: true }},
        {path:'/TaskBookUpdate/:id', name: 'TaskBookUpdate', component: TaskBookUpdate, meta:{reqiuresAuth:true, scrollToTop: true }},
        {path:'/TaskBookToBeAllocated', name:'TaskBookToBeAllocated', component: TaskBookToBeAllocated, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/TaskBookAllocated', name:'TaskBookAllocated', component: TaskBookAllocated, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/TaskBookAllot/:id', name:'TaskBookAllot', component: TaskBookAllot, meta:{ reqiuresAuth:true, scrollToTop: true}},
        { path: '/ContractsUpload', name: 'ContractsUpload', component: ContractsUpload, meta:{ reqiuresAuth: true }},
        { path: '/ContractsUploadList', name: 'ContractsUploadList', component: ContractsUploadList, meta:{ reqiuresAuth: true }},
        { path: '/ContractUpload/:conId', name: 'ContractUpload', component: ContractUpload, meta:{ reqiuresAuth: true}},
        { path: '/ContractView/:conId', name: 'ContractView', component: ContractView, meta:{ reqiuresAuth: true}},
        {path:'/TaskBookToBeReceived', component: TaskBookToBeReceived, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/TaskBookReceived/:id', name:'TaskBookReceived', component: TaskBookReceived, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/PlanBookCreate/:id', name:'PlanBookCreate', component: PlanBookCreate, meta: { reqiuresAuth:true, scrollToTop: true}},
        {path:'/TaskBooksReceived', component: TaskBooksReceived, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/TLTaskBooksReceived', component: TLTaskBooksReceived, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/TLPlanBooksToBeAudited', component: TLPlanBooksToBeAudited , meta:{reqiuresAuth:true, scrollToTop: true}},
        {path:'/TLPlanBooksAudited', component: TLPlanBooksAudited , meta:{reqiuresAuth:true, scrollToTop: true}},
        {path:'/planBooksToBeAudited', component: planBooksToBeAudited , meta:{reqiuresAuth:true, scrollToTop: true}},
        {path:'/planBooksAudited', component: planBooksAudited , meta:{reqiuresAuth:true, scrollToTop: true}},
        {path:'/PlanBookView/:id/:taskId', name:'PlanBookView', component: PlanBookView, meta: { reqiuresAuth:true, scrollToTop: true}},
        {path:'/PlanBookUpdate/:id/:planPaperId', name:'PlanBookUpdate', component: PlanBookUpdate, meta: { reqiuresAuth:true, scrollToTop: true}},
        {path:'/PlanBookAudit/:id', name:'PlanBookAudit', component: PlanBookAudit, meta: { reqiuresAuth:true, scrollToTop: true}},
        {path:'/PlanBookManagerAudit/:id/:taskId', name:'PlanBookManagerAudit', component: PlanBookManagerAudit, meta: { reqiuresAuth:true, scrollToTop: true}},   
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
        {path:'/ProBudgetSubmit/:id/:taskId', name:'ProBudgetSubmit', component:ProBudgetSubmit, meta:{ reqiuresAuth: true}},
        {path:'/ProBudgetView/:id/:taskId', name:'ProBudgetView', component:ProBudgetView, meta:{ reqiuresAuth: true}},
        {path:'/ProBudgetApprove/:id/:budgetId/:taskId', name:'ProBudgetApprove', component:ProBudgetApprove, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/AppointBooksToCreate', name:'AppointBooksToCreate', component:AppointBooksToCreate, meta:{reqiuresAuth:true, scrollToTop: true}},
        {path:'/AppointBookToCreate/:id', name:'AppointBookToCreate', component:AppointBookToCreate, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/AppointBookCreate/:id/:taskId', name:'AppointBookCreate', component:AppointBookCreate, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/AppointBooksNotAmend', name:'AppointBooksNotAmend', component: AppointBooksNotAmend, meta:{ reqiuresAuth:true, scrollToTop: true }},
        {path:'/AppointBooksAmended', name:'AppointBooksAmended', component: AppointBooksAmended, meta:{ reqiuresAuth:true, scrollToTop: true }},
        {path:'/AppointBookView/:id', name:'AppointBookView', component:AppointBookView, meta:{ reqiuresAuth:true, scrollToTop: true}},
        {path:'/AppointBookAdjust/:id', name:'AppointBookAdjust', component:AppointBookAdjust, meta:{ reqiuresAuth:true, scrollToTop: true}},
        { path: '/AppointBooksCreated', name:'AppointBooksCreated', component: AppointBooksCreated, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path: '/AppointEmailsSent', name:'AppointEmailsSent', component: AppointEmailsSent, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path: '/AppointEmailsUnsent', name:'AppointEmailsUnsent', component: AppointEmailsUnsent, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path: '/AppointEmail/:emailId', name:'AppointEmail', component:AppointEmail ,meta:{reqiuresAuth: true } },
        { path: '/AppointEmailView/:emailId', name:'AppointEmailView', component:AppointEmailView ,meta:{reqiuresAuth: true } },
        { path: '/MeetingSummaryCreated', name:'MeetingSummaryCreated', component: MeetingSummaryCreated, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path: '/MeetingSumNotCreated', name:'MeetingSumNotCreated', component: MeetingSumNotCreated, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path:'/MeetingSumCreate/:id/:name', name:'MeetingSumCreate', component:MeetingSumCreate, meta:{ reqiuresAuth:true, scrollToTop: true}},
        { path: '/ProCloseListToCreate', name:'ProCloseListToCreate', component: ProCloseListToCreate, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path: '/ProCloseListCreated', name:'ProCloseListCreated', component: ProCloseListCreated, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path: '/CloseListCreate/:id', name: 'CloseListCreate', component: CloseListCreate, meta:{reqiuresAuth: true} },
        { path: '/CloseListView/:id', name: 'CloseListView', component:  CloseListView, meta:{reqiuresAuth: true} },
        { path: '/CloseListModify/:id', name: 'CloseListModify', component:  CloseListModify, meta:{reqiuresAuth: true} },
        { path: '/CloseListAudit/:id', name: 'CloseListAudit', component:  CloseListAudit, meta:{reqiuresAuth: true} },
        { path: '/ProCloseListToAudit', name:'ProCloseListToAudit', component: ProCloseListToAudit, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path: '/ProCloseListAudited', name:'ProCloseListAudited', component: ProCloseListAudited, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path: '/ProCloseListPassed', name:'ProCloseListPassed', component: ProCloseListPassed, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path: '/ProCloseListNotPassed', name:'ProCloseListNotPassed', component: ProCloseListNotPassed, meta:{ reqiuresAuth:true, scrollToTop: true} },
        { path:'/UserInfoView/:userId', name:'UserInfoView', component:  UserInfoView, meta:{ reqiuresAuth: true}},
        { path:'/UserInfoEdit/:userId', name:'UserInfoEdit', component:  UserInfoEdit, meta:{ reqiuresAuth: true}},
        { path:'/ProByDept', name:'ProByDept', component: ProByDept, meta:{ reqiuresAuth: true}},
        { path: '/TaskBookDesign', name: 'TaskBookDesign', component: TaskBookDesign, meta:{ reqiuresAuth: true }},
        { path: '/ContractsToReview', name: 'ContractsToReview', component: ContractsToReview, meta:{ reqiuresAuth: true }},
        { path: '/ContractsReviewed', name: 'ContractsReviewed', component: ContractsReviewed, meta:{ reqiuresAuth: true }},
        { path:'/ContractReview/:id', name:'ContractReview', component:  ContractReview, meta:{ reqiuresAuth: true}},
        { path:'/salesContractView/:id', name:'salesContractView', component:  salesContractView, meta:{ reqiuresAuth: true}},
        { path:'/ContractCreate', name:'ContractCreate', component:  ContractCreate, meta:{ reqiuresAuth: true}}
      ]
    }
  ]
})
