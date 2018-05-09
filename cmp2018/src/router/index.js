import Vue from 'vue'
import Router from 'vue-router'
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
      path: '/',
      name: 'MyHomePage',
      component: MyHomePage
    },
    {
      path: '/MyHomePage',
      name: 'MyHomePage',
      component: MyHomePage
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage
    },
    {
      path: '/UserCreate',
      name: 'UserCreate',
      component: UserCreate
    },
    {
      path: '/TaskBookCreate',
      name: 'TaskBookCreate',
      component: TaskBookCreate
    },
    {
      path:'/TaskBookUnaudited',
      name:'TaskBookUnaudited',
      component: TaskBookUnaudited
    },
    {
      path:'/TaskBookPassed',
      name:'TaskBookPassed',
      component: TaskBookPassed
    },
    {
      path:'/TaskBookNotPassed',
      name:'TaskBookNotPassed',
      component: TaskBookNotPassed
    }
  ]
})
