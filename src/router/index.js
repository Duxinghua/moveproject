import Vue from 'vue'
import getSitem from '@/utils/storage'
import {loginByCode, userFriend} from '@/api'
import Router from 'vue-router'
import Home from '@/components/home'
import Produce from '../pages/produce.vue'
import Detail from '../pages/producedetail.vue'
import Payorder from '../pages/payorder.vue'
import Activitylist from '../pages/activitylist.vue'
import Activitydetail from '../pages/activitydetail.vue'
import Ticket from '../pages/ticket.vue'
import Ticketdetail from '../pages/ticketdetail.vue'
import Ticketpay from '../pages/ticketpay.vue'
import Ticketpaydetail from '../pages/ticketpaydetail.vue'
import Sale from '../pages/sale.vue'
import Join from '../pages/join.vue'
import Mysy from '../pages/mysy.vue'
import Myaddress from '../pages/myaddress.vue'
import AddressList from '../pages/addresslist.vue'
import Mycenter from '../pages/mycenter.vue'
import Company from '../pages/company.vue'
import TickOrderList from '@/pages/tickOrderList'
import Advantage from '../pages/advantage.vue'
import Saledetail from '../pages/saledetail.vue'
import ProductOrderList from '@/pages/ProductOrderList.vue'
import Productpaydetail from '@/pages/productpaydetail.vue'
import Invite from '@/pages/invite.vue'
import Shopdetail from '@/pages/shopdetail.vue'
import Search from '@/pages/search.vue'
import Myteam from '@/pages/myteam.vue'
import Toshare from '@/pages/toshare.vue'
import Tixian from '@/pages/tixian.vue'
import Club from '@/pages/club.vue'
import Wctx from '@/pages/wctx.vue'
// import getSitem from '../utils/storage'
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

const getToken = async (data, url) => {
  // alert('gettoken')
  const result = await loginByCode(data)
  console.log('result', '请求token')
  // alert('getToken请求开启')
  getSitem.setStr('open', true)
  if (result.code === 1) {
    // alert('getToken请求成功')
    // alert(JSON.stringify(result))
    getSitem.setStr('token', result.data.token)
    if (getSitem.getStr('open')) {
      location.reload()
    } else {
      getSitem.setStr('open', false)
    }
    // alert(getSitem.getStr('pudd'))
    // alert(getSitem.getStr('token'))
    if (getSitem.getStr('pudd')) {
      if (!getSitem.getStr('token')) {
        // alert('token you')
        return
      }
      let data = {
        token: getSitem.getStr('token'),
        pudd: getSitem.getStr('pudd')
      }
      const re = await userFriend(data)
      if (re.code === 1) {
        // alert('userFriend')
        getSitem.remove('pudd')
      } else {
        // alert(JSON.stringify(re.msg))
      }
    }
  } else {
    // alert('getToken请求失败')
    // alert(JSON.stringify(result))
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
      path: '/produce',
      name: 'product',
      component: Produce,
      meta: {
        title: '产品'
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {
        title: '产品详情'
      }
    },
    {
      path: '/payorder',
      name: 'payorder',
      component: Payorder,
      meta: {
        title: '提交订单'
      }
    },
    {
      path: '/activity',
      name: 'activity',
      meta: {
        title: '活动'
      },
      component: Activitylist
    },
    {
      path: '/activitydetail',
      name: 'activitydetail',
      meta: {
        title: '活动详情'
      },
      component: Activitydetail
    },
    {
      path: '/ticket',
      name: 'ticket',
      meta: {
        title: '门票'
      },
      component: Ticket
    },
    {
      path: '/ticketdetail',
      name: 'ticketdetail',
      meta: {
        title: '门票详情'
      },
      component: Ticketdetail
    },
    {
      path: '/ticketpay',
      name: 'ticketpay',
      component: Ticketpay,
      meta: {
        title: '提交门票订单'
      }
    },
    {
      path: '/ticketpaydetail',
      name: 'ticketpaydetail',
      meta: {
        title: '门票订单详情'
      },
      component: Ticketpaydetail
    },
    {
      path: '/sale',
      name: 'sale',
      component: Sale,
      meta: {
        title: '营销'
      }
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
      meta: {
        title: '联系我们'
      }
    },
    {
      path: '/mysy',
      name: 'mysy',
      component: Mysy,
      meta: {
        title: '我的收益'
      }
    },
    {
      path: '/myaddress',
      name: 'myaddress',
      component: Myaddress,
      meta: {
        title: '新增收货地址'
      }
    },
    {
      path: '/addresslist',
      name: 'addresslsit',
      component: AddressList,
      meta: {
        title: '收货地址'
      }
    },
    {
      path: '/mycenter',
      name: 'mycenter',
      component: Mycenter,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/company',
      name: 'company',
      component: Company,
      meta: {
        title: '公司介绍'
      }
    },
    {
      path: '/tickOrderList',
      name: 'tickOrderList',
      meta: {
        title: '门票订单'
      },
      component: TickOrderList
    },
    {
      path: '/advantage',
      name: 'advantage',
      component: Advantage,
      meta: {
        title: '合作优势'
      }
    },
    {
      path: '/saledetail',
      name: 'saledetail',
      component: Saledetail,
      meta: {
        title: '详情介绍'
      }
    },
    {
      path: '/productorderlist',
      name: 'ProductOrderList',
      component: ProductOrderList,
      meta: {
        title: '产品订单'
      }
    },
    {
      path: '/productpaydetail',
      name: 'productpaydetail',
      component: Productpaydetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/invite',
      name: 'invite',
      component: Invite,
      meta: {
        title: '邀请'
      }
    },
    {
      path: '/shopdetail',
      name: 'shopdetail',
      component: Shopdetail,
      meta: {
        title: '商户介绍'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/myteam',
      name: 'myteam',
      component: Myteam,
      meta: {
        title: '我的邀请'
      }
    },
    {
      path: '/toshare',
      name: 'toshare',
      component: Toshare,
      meta: {
        title: '邀请'
      }
    },
    {
      path: '/tixian',
      name: 'tixian',
      component: Tixian,
      meta: {
        title: '提现'
      }
    },
    {
      path: '/',
      name: 'home',
      meta: {
        title: '新宝瑞'
      },
      component: Home
    },
    {
      path: '/club',
      name: 'club',
      meta: {
        title: '俱乐部'
      },
      component: Club
    },
    {
      path: '/wctx',
      name: 'wctx',
      meta: {
        title: '完成提现'
      },
      component: Wctx
    }
  ]
})

router.beforeEach((to, from, next) => {
  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isiOS) {
    getSitem.setStr('iosurl', location.href)
  }
  console.log(to.fullPath, 'tofullpaty')
  var localurl = window.location.href
  console.log(localurl, 'localurl')
  var goback = encodeURIComponent(localurl)
  var code = GetUrlParame('code')
  console.log(code, 'code')
  console.log(window.location.href)
  var appid = 'wx505f185e9f5fcf57'
  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + goback + '&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect'
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
      console.log('222')
      next()
    }
  } else {
    console.log('已拿到code', code)
    console.log('111')
    var data = {
      appid: appid,
      code: code
    }
    getToken(data, goback)
    // if (isiOS && to.path !== location.pathname) {
    //   // 此处不可使用location.replace
    //   location.assign(to.fullPath)
    // } else {
    //   next()
    // }
    next()
  }
})

export default router
