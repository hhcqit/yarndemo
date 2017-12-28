jQuery.url = "http://114.55.251.147:8080/kuaixiu-web/";
//登录成功 判定用户类型为  1服务商 or 0实验室
var loginStyle = localStorage.getItem("userType")=="1" ? 1 : 0;
var sidebarmenu=undefined;
//加载左边菜单数据
if(loginStyle){
    //服务商
    sidebarmenu = [
        {name:"首页",icon:"fa fa-desktop",html:"index"},
        {name:"我的设备",icon:"fa fa-tv",html:"device"},
        {name:"我要巡检",icon:"fa  fa-gavel",html:"repair"},
        {name:"我的维修",icon:"fa  fa-gavel",html:"myRepair"},
        {name:"保养计划",icon:"fa  fa-bell",html:"maintenancePlan"},
        {name:"保养任务",icon:"fa fa-tag",html:"maintenanceWork"},
        {name:"校准计划",icon:"fa  fa-arrows",html:"checkPlan"},
        {name:"鉴定&校准任务",icon:"fa  fa-gavel",html:"identification"},
        {name:"我的成员",icon:"fa  fa-user",html:"remembers"},
        {name:"我的客户",icon:"fa  fa-users",html:"seviceProviders"},
        {name:"系统设置",icon:"fa  fa-gear",html:"settings"}
    ];
}else{
    //实验室
    sidebarmenu = [
        {name:"首页",icon:"fa fa-desktop",html:"index"},
        {name:"我的设备",icon:"fa fa-tv",html:"device"},
        {name:"我要报修",icon:"fa fa-wrench",html:"repair"},
        {name:"保养计划",icon:"fa  fa-bell",html:"maintenancePlan"},
        {name:"保养任务",icon:"fa fa-tag",html:"maintenanceWork"},
        {name:"校准计划",icon:"fa  fa-arrows",html:"checkPlan"},
        {name:"鉴定&校准任务",icon:"fa  fa-gavel",html:"identification"},
        {name:"我的成员",icon:"fa  fa-user",html:"remembers"},
        {name:"我的服务商",icon:"fa  fa-users",html:"seviceProviders"},
        {name:"系统设置",icon:"fa  fa-gear",html:"settings"}
    ];
}

//加载左边菜单
if(sidebarmenu!=undefined){
    sidebarmenu.forEach(function (k, i, array) {
        $(".sidebar-menu").append( '<li><a href="'+k.html+'.html"><i class="'+k.icon+'"></i> <span>'+k.name+'</span></a></li>');
    });
}

//number组件增减按钮事件
(function ($) {
    $('.spinner .btn.minus').on('click', function() {
        console.log( $(this).parent().parent().children('input'))
        $(this).parent().parent().children('input').val( parseInt($(this).parent().parent().children('input').val().trim(),10) - 1);
        if(parseInt($(this).parent().parent().children('input').val().trim(),10)==0){
            $(this).prop('disabled',true);
        }
    });
    $('.spinner .btn.plus').on('click', function() {
        $(this).parent().parent().children('input').val( parseInt($(this).parent().parent().children('input').val().trim(),10) + 1);
        if(parseInt($(this).parent().parent().children('input').val().trim(),10)>0){
            $(this).parent().parent().find('.minus').prop('disabled',false);
        }
    });
})(jQuery);


