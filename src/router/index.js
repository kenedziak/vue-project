import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logged from '@/components/Logged'
import Driver from '@/components/Driver'
import DriverAdd from '@/components/DriverAdd'
import DriverEdit from '@/components/DriverEdit'
import Schedule from '@/components/Schedule'
import Maps from '@/components/Maps'

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.use(Router)

export default  new Router({


  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
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
    {
      path:'/wchedule',
      name:'Schedule',
      component: Schedule
    },
    {
      path:'/maps',
      name:'Maps',
      component: Maps
    },
    {
      path:'/driver',
      name:'Driver',
      component: Driver
    },
    {
      path:'/driver/add',
      name:'DriverAdd',
      component: DriverAdd
    },
    {
      path:'/driver/edit/:id',
      name:'DriverEdit',
      component: DriverEdit
    },



  ]



})
