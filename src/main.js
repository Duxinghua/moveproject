// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'amfe-flexible/index.js'
import { Swipe, SwipeItem, Tab, Tabs } from 'vant'
import VueLazyLoad from 'vue-lazyload'
import 'vant/lib/index.css'
import './assets/css/style.css'
import './assets/css/minireset.min.css'

Vue.config.productionTip = false
Vue.use(Swipe).use(SwipeItem).use(Tab).use(Tabs)
Vue.use(VueLazyLoad, {
  error: require('./assets/images/close.png'),
  loading: require('./assets/images/loading.png')
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // Toast('提示', '加载超时')
  return Promise.reject(error.response.data)
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
