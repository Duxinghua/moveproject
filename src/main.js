// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import wx from 'weixin-js-sdk'
import 'amfe-flexible/index.js'
import Vant from 'vant'
import ElementUI from 'element-ui'
import VueWechatTitle from 'vue-wechat-title'
import 'vant/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/minireset.min.css'
import store from './store'

import './assets/css/element.css'
import './assets/css/fixvant.css'
import api from '@/api/index'

Vue.prototype.$api = api
Vue.prototype.$wx = wx

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VueWechatTitle)

Vue.use(Vant)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
