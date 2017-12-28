import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Total from '@/components/total'
import Login from '@/components/login'
import ServerRegister from '@/components/serverRegister'
import LabRegister from '@/components/labRegister'
Vue.use(Router)

// Vue.http.options.emulateJSON = true;

export default new Router({
  routes: [
    {
      path: '/',
      redirect : '/login'
    },
    {
      path: '/login',
      name:'login',
      component : Login
    },
    {
      path: '/serverRegister',
      name:'serverRegister',
      component : ServerRegister
    },
    {
      path: '/labRegister',
      name:'labRegister',
      component : LabRegister
    },
    {
      path: '/index',
      name:'index',
      component: Index,
      children: [
        {
          path: '/total',
          component: Total
        }
      ]
    }
  ]
})
