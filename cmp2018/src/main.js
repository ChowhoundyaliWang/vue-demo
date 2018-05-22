// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import Vuex from 'Vuex'
Vue.use(Vuex)

import axios from 'axios'
Vue.prototype.axios=axios

Vue.config.productionTip = false

/*登录路由验证*/
router.beforeEach((to, from, next) =>{
	console.log(to);
	let token = localStorage.getItem('token');
	if(to.path === '/Login'){
		next();
	}else{
		//需要登录权限且token等于空
		if(to.meta.reqiuresAuth && (token === null)){
			next({
				path:'/Login',
				query:{ redirect:to.fullPath }
			});
		}else{
			next();
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
