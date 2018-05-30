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
        {path:'/TaskBookAudited', component: TaskBookAudited, meta:{reqiuresAuth:true }},
        {path:'/TaskBookUpdate/:id', name: 'TaskBookUpdate', component: TaskBookUpdate, meta:{reqiuresAuth:true }},
      ]
    }
  ]
})
