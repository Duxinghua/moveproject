// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amfe-flexible/index.js'
import Vant from 'vant'
import VideoPlayer from 'vue-video-player'
import ElementUI from 'element-ui'
import VueWechatTitle from 'vue-wechat-title'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vant/lib/index.css'
import 'swiper/dist/css/swiper.css'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/minireset.min.css'
import store from './store'

import './assets/css/element.css'
import './assets/css/fixvant.css'
import api from '@/api/index'

Vue.prototype.$api = api

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VueWechatTitle)

Vue.use(Vant)
Vue.use(VueAwesomeSwiper)

Vue.use(VideoPlayer)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
