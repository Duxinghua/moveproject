// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amfe-flexible/index.js'
import VueScroller from 'vue-scroller'
import { Dialog, Swipe, SwipeItem, Tab, Tabs, Cell, CellGroup, Field, Checkbox, CheckboxGroup, RadioGroup, Radio, Toast, ActionSheet, Area, PullRefresh, List, DropdownMenu, DropdownItem, DatetimePicker, Popup } from 'vant'
import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'
import VueWechatTitle from 'vue-wechat-title'
import 'vant/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/minireset.min.css'
import './assets/css/element.css'
import './assets/css/fixvant.css'
import api from '@/api/index'

Vue.prototype.$api = api

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Swipe).use(Dialog).use(SwipeItem).use(Tab).use(Tabs).use(Cell).use(CellGroup).use(Field).use(Checkbox).use(CheckboxGroup).use(RadioGroup).use(Radio).use(Toast).use(ActionSheet).use(Area)
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
Vue.use(DatetimePicker).use(Popup)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
