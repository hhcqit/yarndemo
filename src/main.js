// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
//AdminLTE
import './assets/css/skins/_all-skins.min.css'
import './assets/css/AdminLTE.min.css'
import './assets/js/adminlte.min.js'
import 'font-awesome/css/font-awesome.min.css'
//公共配置
import './assets/js/common.js'
Vue.config.productionTip = false;  //生产环境提示，这里设置成了false
console.log(jQuery);
console.log($("#app"));
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
