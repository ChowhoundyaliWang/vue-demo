<template>
  <div id="log">
    <div class="log-content">
      <h3>{{mxTitle}}</h3>
      <el-form :model="user" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  //Login界面
  data(){
    return{
      mxTitle: '明讯网络项目流程控制平台CMPv1.0',
      user:{
        userName:'',
        password:''
      }
    }
  },
  methods:{
    login(){
      let params = {};
      params = this.user;
      console.log(params);
      this.axios.post("/api/login",params,{ headers:{'Content-Type':'application/json;charset=UTF-8'} }).then((res)=>{
        let data = res.data;
        if(data.code == 200){
          let model = data.model;
          localStorage.removeItem('token');
          localStorage.setItem('token', model.token);
          /*localStorage.setItem('userData',model.)*/
          let redirect = decodeURIComponent(this.$route.query.redirect||'');
          if (redirect) { // 跳转到指定链接
            this.$router.push({path: redirect});
          } else {
            this.$router.push({path: '/'});
          }
        }else{
          //请求失败
          console.log("请求失败");
        }
      }).catch((res)=>{
        //请求异常处理
      })
    }
  }
}
</script>

<style>
/* login 登录界面 */
#log{width: 100%; height: 100vh;background:url("../assets/login-bg.png") no-repeat;background-size: cover;padding-top:12%;box-sizing: border-box;}
.log-content{ width: 400px;height: 300px;border: 1px solid #f5f7f9;border-radius: 5px;background: transparent;color: #ffffff;margin-left: 50%; }
.log-content h3{text-align: center;margin:35px 0;font-size: 18px;}
</style>