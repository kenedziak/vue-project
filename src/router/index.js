import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Logged from '@/components/Logged'

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.use(Router)

export default  new Router({


  routes: [
    {
      path: '/home',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/logged',
      name:'Logged',
      component: Logged
    },



  ]



})
