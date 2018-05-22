import Vue from 'vue'
import Router from 'vue-router'

// Login页面
import Login from '@/pages/Login'

// 系统页面
import cmp from '@/pages/cmp'
import MyHomePage from '@/pages/MyHomePage'
import UserManage from '@/pages/UserManage'
import UserCreate from '@/pages/UserCreate'
import TaskBookCreate from '@/pages/TaskBookCreate'
import TaskBookUnaudited from '@/pages/TaskBookUnaudited'
import TaskBookPassed from '@/pages/TaskBookPassed'
import TaskBookNotPassed from '@/pages/TaskBookNotPassed'

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
        {path:'/TaskBookNotPassed', component: TaskBookPassed, meta:{ reqiuresAuth: true }}
      ]
    }
  ]
})
