import Vue from 'vue'
import Router from 'vue-router'

// Login页面
import Login from '@/pages/Login'

// 系统页面
import cmp from '@/pages/cmp'
import MyHomePage from '@/pages/MyHomePage'  //我的首页
import UserManage from '@/pages/UserManage'  //用户管理
import UserCreate from '@/pages/UserCreate'  //用户管理-创建用户
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
import PlanBookView from '@/pages/PlanBookView'
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
        {path:'/ProBudgetApprove/:id', name:'ProBudgetApprove', component:ProBudgetApprove, meta:{ reqiuresAuth:true}}
      ]
    }
  ]
})
