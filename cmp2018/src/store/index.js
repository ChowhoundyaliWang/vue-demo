//更改vuex的store中的状态的唯一方法是提交mutation
//vuex中的mutation非常类似于事件：每个mutation都有一个字符串的 事件类型 和 一个回调函数。
// 这个回调函数就是进行状态更改的地方，接受state作为第一个参数

import Vue from 'vue'
import Vuex from 'Vuex'
import mutations from './mutation-types.js'
import actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		curType: null,  //当前类型为：项目任务书-task/计划书-planBook/项目预算-projectBudget
		updateList: null, // 当前是 项目任务书/计划书/项目预算 的更新记录列表
		updateListShow: false, //是否显示 项目任务书/计划书/项目预算 更新记录的列表 true-show
		taskContrastShow: false,  //是否显示 项目任务书 版本对比的弹出框 true-show
		pbContrastShow: false, //是否显示 计划书 版本对比的弹出框 true-show
		budgetContrastShow: false, //是否显示 项目预算 版本对比的弹出框 true-show
		one:{},  //其中一版 计划书/项目预算
		another:{},  //另一版 计划书/项目预算
	},
	mutations,
	actions
})

export default store;
