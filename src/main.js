// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import auth from './auth/index'

/* eslint-disable no-new */
var myApp = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods: {
    myLoad() {
      auth.checkAuth();
    }
  },


});

myApp.myLoad();
