import Vue from 'vue'
import getSitem from '@/utils/storage'
import {loginByCode} from '@/api'
import Router from 'vue-router'
import Home from '@/components/home'
import Produce from '../pages/produce.vue'
import Detail from '../pages/producedetail.vue'
import Payorder from '../pages/payorder.vue'
import Activitylist from '../pages/activitylist.vue'
import Activitydetail from '../pages/activitydetail.vue'
import Ticket from '../pages/ticket.vue'
import Ticketdetail from '../pages/ticketdetail.vue'
import Sale from '../pages/sale.vue'
import Join from '../pages/join.vue'
import Mysy from '../pages/mysy.vue'
import Myaddress from '../pages/myaddress.vue'
import AddressList from '../pages/addresslist.vue'
import Mycenter from '../pages/mycenter.vue'
import Company from '../pages/company.vue'
import Advantage from '../pages/advantage.vue'
import Saledetail from '../pages/saledetail.vue'
// import getSitem from '../utils/storage'
// import Ticketpay from '../pages/ticketpay.vue'
Vue.use(Router)

const GetUrlParame = (parameName) => {
  var parames = window.location.search
  if (parames.indexOf(parameName) > -1) {
    var parameValue = ''
    parameValue = parames.substring(parames.indexOf(parameName), parames.length)
    if (parameValue.indexOf('&') > -1) {
      parameValue = parameValue.substring(0, parameValue.indexOf('&'))
      parameValue = parameValue.replace(parameName + '=', '')
      return parameValue
    }
    return ''
  }
}

const getToken = async (data) => {
  const result = await loginByCode(data)
  console.log('result', '请求token')
  if (result.code === 1) {
    getSitem.setStr('token', result.data.token)
  } else {
    console.log(JSON.stringify(result), 'error')
  }
  // var goback = GetUrlParame('state')
  // var url = decodeURIComponent(goback)
  // console.log(url, 'url')
  // window.location.href = url
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/produce',
      name: 'product',
      component: Produce
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/payorder',
      name: 'payorder',
      component: Payorder
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activitylist
    },
    {
      path: '/activitydetail',
      name: 'activitydetail',
      component: Activitydetail
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: Ticket
    },
    {
      path: '/ticketdetail',
      name: 'ticketdetail',
      component: Ticketdetail
    },
    {
      path: '/sale',
      name: 'sale',
      component: Sale
    },
    {
      path: '/join',
      name: 'join',
      component: Join
    },
    {
      path: '/mysy',
      name: 'mysy',
      component: Mysy
    },
    {
      path: '/myaddress',
      name: 'myaddress',
      component: Myaddress
    },
    {
      path: '/addresslist',
      name: 'addresslsit',
      component: AddressList
    },
    {
      path: '/mycenter',
      name: 'mycenter',
      component: Mycenter
    },
    {
      path: '/company',
      name: 'company',
      component: Company
    },
    {
      path: '/advantage',
      name: 'advantage',
      component: Advantage
    },
    {
      path: '/saledetail',
      name: 'saledetail',
      component: Saledetail
    }
    // {
    //   path: '/ticketpay',
    //   name: 'ticketpay',
    //   component: Ticketpay
    // }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to', to, 'from', from)
  var localurl = window.location.href
  console.log(localurl, 'localurl')
  var goback = encodeURIComponent(localurl)
  var code = GetUrlParame('code')
  console.log(code, 'code')
  console.log(window.location.href)
  var appid = 'wx505f185e9f5fcf57'
  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + goback + '&response_type=code&scope=snsapi_userinfo&state=' + goback + '#wechat_redirect'
  console.log('当前url', url)
  console.log('获取code码')
  console.log(getSitem.getStr('token'))
  if (!code) {
    console.log(getSitem.getStr('token'))
    if (!getSitem.getStr('token')) {
      window.location.href = url
      next()
    } else {
      console.log(getSitem.getStr('token'), 'token')
      next()
    }
  } else {
    console.log('已拿到code', code)
    var data = {
      appid: appid,
      code: code
    }
    getToken(data)
    next()
  }
})

export default router
