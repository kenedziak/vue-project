import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logged from '@/components/Logged'
import Driver from '@/components/Driver'
import DriverAdd from '@/components/DriverAdd'
import DriverEdit from '@/components/DriverEdit'
import Schedule from '@/components/Schedule'
import ScheduleAdd from '@/components/ScheduleAdd'
import ScheduleEdit from '@/components/ScheduleEdit'
import Map from '@/components/Map'
import MapAdd from '@/components/MapAdd'
import MapEdit from '@/components/MapEdit'
import Car from '@/components/Car'
import CarAdd from '@/components/CarAdd'
import CarEdit from '@/components/CarEdit'

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.use(Router)

const myRouter = new Router({

  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: { auth: true }
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
      path:'/schedule',
      name:'Schedule',
      component: Schedule
    },
    {
      path:'/shedule/add',
      name:'sheduleAdd',
      component: ScheduleAdd
    },
    {
      path:'/schedule/edit/:id',
      name:'scheduleEdit',
      component: ScheduleEdit
    },
    {
      path:'/map',
      name:'Map',
      component: Map
    },
    {
      path:'/map/add',
      name:'MapAdd',
      component: MapAdd
    },
    {
      path:'/map/edit',
      name:'MapEdit',
      component: MapEdit
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
    {
      path:'/car',
      name:'Car',
      component: Car
    },
    {
      path:'/car/add',
      name:'CarAdd',
      component: CarAdd
    },
    {
      path:'/car/edit/:id',
      name:'CarEdit',
      component: CarEdit
    },



  ]

});
myRouter.beforeEach((to, from, next) => {
  var jwt = localStorage.getItem('id_token');
  if(!jwt && to.path != "/login") {
    next("/login");
  } else {
    next();
  }
});

export default myRouter;
