<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-col :span="24" class="container">
        <el-container>
        <el-aside>
          <NavMenu></NavMenu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      </el-col>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header'
import NavMenu from './components/NavMenu'
export default {
  name: 'App',
  components:{ 
    Header, 
    NavMenu 
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
a{ color: #48576a;text-decoration: none; }
.container{ display: flex;position: absolute;top: 60px;bottom: 0;overflow: hidden;}
.el-header { background-color: #1f7ab7; color: #333;line-height: 60px; height: 100%;}
.el-aside { background-color: #eef1f6; color: #333;flex: 0 0 260px;width: 260px;}
.el-main { background-color: #fff; color: #333;flex: 1;overflow-y: auto;}

/* NavMenu 样式修改 */
.mx-nav-menu .el-submenu{background-color: #eef1f6;}
.mx-nav-menu .el-menu-item{background-color: #e4e8f1;}
.mx-nav-menu .el-manu-item,.mx-nav-menu .el-submenu__title{color:#48576a;height:50px;line-height: 50px;}
.mx-nav-menu [class^=el-icon-]{line-height: 1;}
.mx-nav-menu .el-submenu [class^=el-icon-] {font-size: 14px;height: 50px;line-height: 49px;}
.mx-nav-menu .el-menu-item:hover,.mx-nav-menu  .el-submenu__title:hover{ background-color: #d1dbe5; }
.mx-nav-menu .el-menu-item.is-active{ color: #2b98e8;}
</style>
