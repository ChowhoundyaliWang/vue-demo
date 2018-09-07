// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(ElementUI)
Vue.prototype.axios=axios

import Common from '../src/util/util.js'
Vue.use(Common)

Vue.config.productionTip = false

/*登录路由验证*/
router.beforeEach((to, from, next) =>{
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

/* axios请求头带token 拦截 */
axios.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	if(token){
		config.headers.Authorization = token;
	}
	return config
},error => {
	return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
