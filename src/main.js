// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var decodeToken = require('jwt-js').decodeToken
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amfe-flexible/index.js'
import  Bus from './utils/bus.js'
import api from './api/index'
import Vant from 'vant'
import { ImagePreview } from 'vant';
import VueWechatTitle from 'vue-wechat-title'
import 'vant/lib/index.css'
import store from './store'
Vue.prototype.decodeToken = decodeToken
Vue.prototype.DateFormat = function(date,fmt)
{ //author: meizz
  var that = new Date(date)
 var o = {
  "M+" : that.getMonth()+1,         //月份
  "d+" : that.getDate(),          //日
  "h+" : that.getHours(),          //小时
  "m+" : that.getMinutes(),         //分
  "s+" : that.getSeconds(),         //秒
  "q+" : Math.floor((that.getMonth()+3)/3), //季度
  "S" : that.getMilliseconds()       //毫秒
 };
 if(/(y+)/.test(fmt))
  fmt=fmt.replace(RegExp.$1, (that.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)
  if(new RegExp("("+ k +")").test(fmt))
 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
 return fmt;
}

Vue.prototype.$api = api
Vue.prototype.$Bus = Bus
Vue.prototype.ImagePreview = ImagePreview

Vue.config.productionTip = false

Vue.use(VueWechatTitle)

Vue.use(Vant)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
