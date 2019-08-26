// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amfe-flexible/index.js'
import { Swipe, SwipeItem, Tab, Tabs, Cell, CellGroup, Field, Checkbox, CheckboxGroup } from 'vant'
import VueLazyLoad from 'vue-lazyload'
import 'vant/lib/index.css'
import './assets/css/style.css'
import './assets/css/sale.css'
import './assets/css/other.css'
import './assets/css/minireset.min.css'

Vue.config.productionTip = false
Vue.use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Cell).use(CellGroup).use(Field).use(Checkbox).use(CheckboxGroup)
Vue.use(VueLazyLoad, {
  error: require('./assets/images/close.png'),
  loading: require('./assets/images/loading.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
