<template>
  <div class="wrapper" id="labRegister">
    <header class="main-header">
      <!-- Logo -->
      <router-link to="/login" class="logo">
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>科临脉云设备管理平台</b></span>
      </router-link>
      <nav class="navbar navbar-static-top">
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
          </ul>
        </div>
      </nav>
    </header>
    <!--register form-->
    <div class="content-wrapper" style="margin-left:0;">
      <div class="login-box">
        <div class="login-box-body">
          <div class="box-bg"></div>
          <div class="login-tilte">
            <p class="login-name">
              <span class="fa fa-weibo"></span>
              <span>服务商注册</span>
            </p>
          </div>
          <form method="post" id="login-form">
            <div class="form-group has-feedback ">
              <input type="text" class="form-control" name="orgId" placeholder="请输入服务商名称" v-model="form.name">
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback ">
              <input type="tel" id="mobile" class="form-control" name="mobile" maxlength="11" placeholder="请输入注册手机号码"  onkeyup="if(!/^\d+$/.test(this.value)) {this.value=this.value.replace(/[^\d]+/g,'');}" v-model="form.mobile">
              <span class="glyphicon glyphicon-phone form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback checkCode">
              <div class="row">
                <div class="col-xs-8" style="padding-right:0">
                  <input type="text" class="form-control" name="code" placeholder="请输入验证码" v-model="form.code">
                </div>
                <div class="col-xs-4" style="padding-left: 0">
                  <button id="getCodeBtn" type="button" class="btn btn-info btn-flat" style="min-width:100px;" :disabled="disabled" @click="start">
                    {{text}}
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group has-feedback">
              <input type="password" class="form-control" name="password" maxlength="20"   placeholder="请设置6至20位登录密码"  v-model="form.password">
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input type="password" class="form-control" name="checkPassword" maxlength="20"  placeholder="请输入输入登录密码"  v-model="form.checkPassword">
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <p>
              <small id="errors" v-bind:style="error.styleObject">{{error.msg}}</small>
            </p>
            <div class="form-group has-feedback">
              <div class="row">
                <div class="col-xs-12">
                  <div class="checkbox icheck">
                    <label>
                      <input type="checkbox" name="agree" id="agree"  style="position: static;margin-left: 0" required> 同意
                    </label>
                    <a href="#" class="text-green">《用户注册协议》</a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button  @click="register" type="button" id="register" class="btn btn-success btn-block btn-flat" style="pointer-events: auto;">
                注册
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'serverRegister',
  data: function () {
    return {
      time:0,
      second: 180,//3分钟间隔
      disabled: false,
      error:{
        msg:'您输入的用户名或密码有误',
        styleObject:{
          color:'red',
          'text-align':'left',
          display: 'none'
        }
      },
      form:{
        code: "",
        mobile: "15756000735",
        name: "",
        password: "",
        checkPassword:"",
        type:1
      },
      state: false
    }
  },
  computed: {
    text: function () {
      return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
    }
  },
  methods:{
    start: function(){//发送验证码
      var _self =this;
      var tel = parseFloat($("#mobile").val());//获取手机号码输入框值
      var reg = /^1[3|4|5|8][0-9]\d{8}$/;
      if(!reg.test(tel)){ //校验手机号码格式
        _self.error.msg = "手机号格式错误";
        _self.error.styleObject.display ='block';
        return false;
      }
      console.log(jQuery.url);
      $.ajax({
        type:'post',
        url:jQuery.url+'org/register',
        data:JSON.stringify({mobile:tel,type:1}),
        dataType:'json',
        contentType: "application/json; charset=utf-8",
        xhrFields : {
          //设置跨域请求
          withCredentials : true
        },
        success:function (data) {
          console.log(data);
          if(data.code==0){
            _self.disabled = true;
            _self.time = _self.second;
            _self.timer();
          }else if(data.code==2){
            _self.error.msg = data.msg;
            _self.error.styleObject.display ='block';
          }
        },
        err:function (err) {
          alert(err);
        }
      })


    },
    timer: function () {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }else{
        this.disabled = false;
      }
    },
    alocked: function () {
      this.state = !this.state;
    },
    register () {//短信验证成功开始注册
      var _self =this;
      if(_self.form.name == "" || _self.form.mobile == "" || _self.form.code == "" ||_self.form.password == "" ||_self.form.checkPassword == ""){
        this.error.msg = "信息填写不完整";
        this.error.styleObject.display ='block';
      }
//      else if(){
//
//      }
      else {
        $.ajax({
          type:'post',
          url:jQuery.url+'/org/register',
          data:JSON.stringify(_self.form),
          dataType:'json',
          contentType: "application/json; charset=utf-8",
//                    headers: {
//                        Accept: "application/x-www-form-urlencoded;charset=UTF-8",
//                    },
          xhrFields : {
            //设置跨域请求
            withCredentials : true
          },
          success:function () {
            alert('succ')
          },
          err:function (err) {
            alert(err);
          }
        })
      }
//      this.$router.push({ path:'/total'})
    }
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
