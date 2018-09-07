 export default{
	showUpdateList({commit, state}, listInfos){
		commit('SHOW_UPDATE_LIST', listInfos)
	},
	initUpdateList({commit, state}){
		commit('INIT_UPDATE_LIST');
	},
	// 显示两个不同版本的对比
	showVersions({commit, state}, versions){
		commit('SHOW_VERSIONS', versions);
	},
	//初始化版本信息
	initVersions({commit, state}){
		commit('INIT_VERSIONS');
	},
}