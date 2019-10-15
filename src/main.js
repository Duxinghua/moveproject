// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'amfe-flexible/index.js'
import VueScroller from 'vue-scroller'
import { Swipe, SwipeItem, Tab, Tabs, Cell, CellGroup, Field, Checkbox, CheckboxGroup, RadioGroup, Radio, Toast, ActionSheet, Area, PullRefresh, List, DropdownMenu, DropdownItem } from 'vant'
import VueLazyLoad from 'vue-lazyload'
import VueWechatTitle from 'vue-wechat-title'
import 'vant/lib/index.css'
import './assets/css/style.css'
import './assets/css/other.css'
import './assets/css/minireset.min.css'

Vue.config.productionTip = false
Vue.use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Cell).use(CellGroup).use(Field).use(Checkbox).use(CheckboxGroup).use(RadioGroup).use(Radio).use(Toast).use(ActionSheet).use(Area)
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  listenEvents: ['scroll'],
  loading: require('@/assets/images/loading.gif'),
  // set observer to true
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})
Vue.use(VueWechatTitle)
Vue.use(PullRefresh).use(List)
Vue.use(VueScroller)
Vue.use(DropdownMenu).use(DropdownItem)

axios.interceptors.request.use(config => {
  if (process.env.NODE_ENV === 'production') {
    config.baseURL = process.env.API_HOST
  }
  // Toast.loading({
  //   mask: true,
  //   duration: 0,
  //   message: '加载中...'
  // })
  return config
}, error => {
  // Toast.clear()
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  // Toast.clear()
  return response
}, function (error) {
  // Toast.clear()
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
