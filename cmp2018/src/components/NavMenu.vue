<template>
	<el-menu :default-active="$route.path" class="mx-nav-menu" router>
		<el-submenu index="/1">
			<template slot="title" class="menu-title first-title"><i class="el-icon-menu"></i>首页</template>
			<el-menu-item index="/cmp">我的首页</el-menu-item>
		</el-submenu>
		<el-submenu v-for='(menuData, fInd) in menuDatas' :index="fInd+''" :key='fInd'>
			<template slot="title"  class="menu-title"><i :class="menuData.icon"></i>{{menuData.label}}</template>
			<el-submenu v-for='(menu, sInd) in menuData.children' :index="fInd+'-'+sInd" :key='sInd'>
				<template slot="title"  class="menu-title">{{menu.label}}</template>
				<el-menu-item v-for='(child, inInd) in menu.children' :index="'/'+child.address" :key='inInd'>{{child.label}}</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-submenu index="/99" v-if='adminMenu.id'>
			<template slot="title"  class="menu-title"><i :class="adminMenu.icon"></i>{{adminMenu.label}}</template>
			<el-menu-item v-for='(child, aInd) in adminMenu.children' :key='aInd' :index="'/'+child.address">{{child.label}}</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
export default {
	label: 'NavMenu',
	props:{
		menuDatas:{
			type: Array,
			required: true
		},
		adminMenu:{
			type:Object,
			required: true
		}
	}
}
</script>

<style scoped>
.menu-label.first-label{font-weight: bold;}
</style>
