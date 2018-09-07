
const SHOW_UPDATE_LIST = 'SHOW_UPDATE_LIST';
const INIT_UPDATE_LIST = 'INIT_UPDATE_LIST';
const SHOW_VERSIONS = 'SHOW_VERSIONS';
const INIT_VERSIONS = 'INIT_VERSIONS';

/*
    curType: null,  // 当前类型为：项目任务书-task/计划书-planBook/项目预算-projectBudget
	updateList: null, // 当前是 项目任务书/计划书/项目预算 的更新记录列表
	updateListShow: false, //是否显示 项目任务书/计划书/项目预算 更新记录的列表 true-show
	taskContrastShow: false,  //是否显示 项目任务书 版本对比的弹出框 true-show
	pbContrastShow: false, //是否显示 计划书 版本对比的弹出框 true-show
	budgetContrastShow: false, //是否显示 项目预算 版本对比的弹出框 true-show
	one:{},  //其中一版 计划书/项目预算
	another:{},  //另一版 计划书/项目预算
*/   

export default{
	// 可以向store.commit传入额外的参数，即mutation的荷载（payload）
	
	// 获取更新记录的列表信息并显示
	[SHOW_UPDATE_LIST](state, listInfos){
		state.curType = listInfos.curType;
		state.updateList = listInfos.updateList;
		state.updateListShow = true;
	},
	// 初始化更新记录列表的信息
	[INIT_UPDATE_LIST](state){
		state.curType = null;
		state.updateList = null;
		state.updateListShow = false;
	},
    // 获取需要对比的两个版本并显示
    [SHOW_VERSIONS](state, versions){
    	state.one = versions.one;
    	state.another = versions.another;
    	if(state.curType == 'planPaper'){
    		state.pbContrastShow = true;
    	}else if( state.curType == 'projectBudget'){
    		state.budgetContrastShow = true;
    	}else if( state.curType == 'task'){
    		state.taskContrastShow = true;
    	}
    },
	// 初始化两个对比版本的信息
	[INIT_VERSIONS](state){
		state.one = {};
    	state.another = {};
    	if(state.curType == 'planPaper'){
    		state.pbContrastShow = false;
    	}else if( state.curType == 'projectBudget'){
    		state.budgetContrastShow = false;
    	}else if( state.curType == 'task'){
    		state.taskContrastShow = false;
    	}
	}
}