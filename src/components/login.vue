<template>
  <div>
    <div class="wrapper">
      <header class="main-header">
        <!-- Logo -->
        <a href="#" class="logo">
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b>科临脉云设备管理平台</b></span>
        </a>
        <nav class="navbar navbar-static-top">
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <li>
                <a @click="register('labRegister')"> <i class="fa fa-gears"></i>实验室加入</a>
              </li>
              <li>
                <a @click="register('serverRegister')"> <i class="fa fa-gears"></i>服务商加入</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <!--login form-->
      <div class="content-wrapper" style="margin-left:0;">
        <div class="login-box">
          <!-- /.login-logo -->
          <div class="login-box-body">
            <div class="box-bg"></div>
            <div class="login-tilte">
              <img src="../assets/img/avatar.png" class="login-logo"/><br>
              <p class="login-name">欢迎使用科临脉云设备管理</p>
            </div>
            <form  method="post" id="login-form">
              <div class="form-group has-feedback ">
                <input type="text" class="form-control" name="userName" placeholder="请输入手机号码" v-model="userName">
                <span class="glyphicon glyphicon-phone form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input type="password" class="form-control" name="password" placeholder="请输入密码" v-model="password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <div class="form-group">
                <button type="button" @click="login" class="btn btn-success btn-block btn-flat" style="pointer-events: auto;" id="loginBtn">
                  登录
                </button>
                <!--<button type="button" @click="login">登录</button>-->
              </div>
              <p>
                <small id="errors" v-bind:style="error.styleObject">{{error.msg}}</small>
              </p>
              <div class="row">
                <div class="col-xs-6">
                  <label style="cursor:pointer"  class="text-green">
                    <!--<input type="checkbox" name="rememberMe" style="position: relative;top:2px;" > Remember me-->
                    <input type="checkbox" name="rememberMe" style="position: relative;top:2px;" v-model="state" v-on:click="alocked" />
                    Remember me
                  </label>
                </div>
                <div class="col-xs-3 col-xs-offset-3">
                  <div>
                    <a href="#" style="font-size: 12px;">忘记密码?</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <!-- /.login-box-body -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      error:{
        msg:'您输入的用户名或密码有误',
        styleObject:{
          color:'red',
          'text-align':'left',
          display: 'none'
        }
      },
      userName:"",
      password:"",
      state: false
    }
  },
  methods:{
    alocked: function () {
      this.state = !this.state;
    },
    login () {
      var _self =this;
      if(this.userName == "" || this.password == ""){
        this.error.msg = "请输入用户名或密码";
        this.error.styleObject.display ='block';
      }else {
        $.ajax({
          type:'post',
          url:'http://114.55.251.147:8080/kuaixiu-web/user/login',
          data:JSON.stringify({
            "mobile": this.userName,
            "password": this.password
          }),
          dataType:'json',
          contentType: "application/json; charset=utf-8",
          xhrFields : {
            //设置跨域请求
            withCredentials : true
          },
          success:function (data) {
            console.log(data);
            if(data.code == 0){
              if(data.data.token){
                localStorage.setItem('token',data.data.token);
              }
              if(data.data.org != null){
                localStorage.setItem('org',JSON.stringify(data.data.org));
                localStorage.setItem('userType',data.data.user.userType)
              }
              _self.rememberMe();
//              location.href = 'html/index.html';
              _self.error.styleObject.display ='none';
              _self.$router.push({ path:'/total'})
            }else{
              _self.error.msg = data.msg;
              _self.error.styleObject.display ='block';
            }
          },
          err:function (err) {
            alert(err);
          }
        })
      }
//      this.$router.push({ path:'/total'})
    },
    rememberMe:function () {
      if (this.state) {
        localStorage.userName =  this.userName;
        localStorage.password =  this.password;
        localStorage.rememberMe = this.state;
      }
      //delete remember msg
      else {
        localStorage.userName = null;
        localStorage.password = null;
        localStorage.setItem('token',null);
        localStorage.setItem('org',null);
        localStorage.setItem('userType',null);
        localStorage.rememberMe = false;
      }
     },
    fillbackLoginForm:function () {
      console.log('回填判断:'+localStorage.rememberMe);
      if (localStorage.rememberMe) {
        console.log('需要胡天')
        this.userName = localStorage.userName;
        this.password = localStorage.password;
        this.state = true;
      }
    },
    register:function (path) {
      this.$router.push(path)
    }
  },
  mounted:function () {
    this.fillbackLoginForm();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .skin-blue .wrapper, .skin-blue .main-sidebar, .skin-blue .left-side {
    background-color: #ecf0f5;
  }

  .login-box {
    margin: 0 auto;
    padding-top: 150px;
    padding-bottom: 150px;
  }

  .login-tilte, form {
    text-align: center;
    z-index: 100;
    position: relative;
  }

  .login-logo {
    margin: 20px auto;
    width: 80px;
  }

  .login-name {
    font-size: 25px;
    color: #47C9AF;
  }

  .navbar li a i {
    margin-right: 5px;
  }
  .skin-blue .main-header .logo{
    background-color: rgb(2, 59, 255);
  }
  .skin-blue .main-header .logo:hover {
    background-color: rgba(2, 59, 255,0.9);
  }
  .btn.btn-flat{
    border-radius: 3px;
  }

  .content-wrapper{
    background: url(../../static/images/new_background.png) center center no-repeat;
    background-size: 100% 100%;
  }
  .login-box-body, .register-box-body{
    border-radius: 10px;
    min-height: 400px;
    position: relative;
  }


  .skin-blue .main-header .navbar {
    background-color: rgb(2, 59, 255);
  }
  .box-bg{
    background: ghostwhite;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 10px;
  }
  .bv-form{
    z-index: 100;
    position: relative;
  }
</style>
