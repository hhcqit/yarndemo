<template>
  <div class="wrapper">
    <!--头部-->
    <header class="main-header">
      <!-- Logo -->
      <a href="index.html" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>KMY</b></span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>科脉云</b>设备管理平台</span>
      </a>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
          <span class="sr-only">折叠</span>
        </a>
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="../../static/images/user2-160x160.jpg" class="user-image" alt="User Image">
                <span class="hidden-xs">禾诺实验室</span>
              </a>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header">
                  <img src="../../static/images/user2-160x160.jpg" class="img-circle"
                       alt="User Image">
                  <p>
                    禾诺实验室 - henuo labcenter
                    <small>登录时间 <span>2017-12-10 10:10:10</span></small>
                  </p>
                </li>

                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <a href="#" class="btn btn-default btn-flat">简介</a>
                  </div>
                  <div class="pull-right">
                    <a href="../login.html" class="btn btn-default btn-flat">退出登录</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- 左边菜单-->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image">
            <img src="../../static/images/user2-160x160.jpg" class="img-circle" alt="User Image">
          </div>
          <div class="pull-left info">
            <p>禾诺实验室</p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree" id="sidebar-menu">
          <li v-for="item in sidebarmenu">
            <router-link :to="item.html">
              <i :class="[item.icon]"></i>
              <span>{{item.name}}</span>
            </router-link>
          </li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>
    <!--/左边菜单-->
    <!-- 中间内容 -->
    <div class="content-wrapper">
      <router-view/>
    </div>
    <!-- /中间内容 -->
    <!--尾部-->
    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 2.4.0
      </div>
      <strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights
      reserved.
    </footer>
    <!--/尾部-->
  </div>
</template>

<script>
export default {
  name: 'index',
  data: function () {
    return {
      role:0, /**0实验室，1服务商*/
      sidebarmenu:[
        {name:"首页",icon:"fa fa-desktop",html:"total"},
        {name:"我的设备",icon:"fa fa-tv",html:"device"},
        {name:"我要报修",icon:"fa fa-wrench",html:"repair"},
        {name:"保养计划",icon:"fa  fa-bell",html:"maintenancePlan"},
        {name:"保养任务",icon:"fa fa-tag",html:"maintenanceWork"},
        {name:"校准计划",icon:"fa  fa-arrows",html:"checkPlan"},
        {name:"鉴定&校准任务",icon:"fa  fa-gavel",html:"identification"},
        {name:"我的成员",icon:"fa  fa-user",html:"remembers"},
        {name:"我的服务商",icon:"fa  fa-users",html:"seviceProviders"},
        {name:"系统设置",icon:"fa  fa-gear",html:"settings"}
      ]
    }
  },
  mounted:function () {
    $(window).resize()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  /*div.dataTables_wrapper div.dataTables_filter {*/
  /*text-align: left;*/
  /*}*/
  h1{
    margin: 0;
    padding: 0;
  }
  table tbody tr.selected {
    background-color: #abb9d3 !important;
  }

  @media (min-width: 1440px) {
    .modal-lg {
      width: 1200px;
    }
  }
  .uploader-list .row.item{
    border: 1px solid green;margin-bottom: 10px;padding: 10px;
  }
  /**修改datatables宽度设置，使得宽度不够时出现滚动条**/
  .dataTables_wrapper {
    position: relative;
    clear: both;
    zoom: 1;
    overflow-x: auto;
  }
  .dataTables_wrapper .row {
    margin-right:0;
    margin-left: 0;
  }
  /**隐藏了搜索框*/
  .box.no-search div.dataTables_wrapper div.dataTables_filter{
    display:none;
  }
  /*改变表格中搜索框颜色*/
  .has-success.tableSearch .input-group-addon {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #3c763d;
  }
  /*
  *加减输入框组件样式
  */
  .spinner{
    width: 200px;
  }
  .spinner input{
    padding-left: 0;padding-right: 0;text-align: center;
  }
  .spinner .unit{
    display: table-cell;vertical-align: middle;white-space: nowrap;width: 40px;text-align: center;
  }
  /*
  *禁用输入域横向拉伸
   */
  textarea{
    resize:vertical;
  }
</style>
