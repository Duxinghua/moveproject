import Vue from 'vue'
// import getSitem from '@/utils/storage'
// import {loginByCode, userFriend} from '@/api'
import Router from 'vue-router'
import Home from '@/pages/home'
import Huaban from '@/pages/huaban'
import HuabanGroupDetail from '@/pages/huabanGroupDetail'
import HuabanTzDetail from '@/pages/huabanTzDetail'
import Test from '@/pages/test'

Vue.use(Router)
/*
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
*/

//路由切换时 页面位置
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (!to.matched.some(m => m.meta.keepAlive)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}
const router = new Router({
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '有梦不晚'
      }
    },
    {
      path: '/huaban',
      name: 'Huaban',
      component: Huaban,
      meta: {
        title: '花伴'
      }
    },
    {
      path: '/huabangroupdetail',
      name: 'HuabanGroupDetail',
      component: HuabanGroupDetail,
      meta: {
        title: '花伴小组详情'
      }
    },
    {
      path: '/huabantzdetail',
      name: 'HuabanTzDetail',
      component: HuabanTzDetail,
      meta: {
        title: '花伴贴子详情'
      }
    },
    {
      path: '/shopHome',
      name: 'shopHome',
      component: () => import('@/pages/shopHome'),
      meta: {
        title: '有梦花居',
        keepAlive: true,
      }
    },
    {
      path: '/goodsDetails',
      name: 'goodsDetails',
      component: () => import('@/pages/goodsDetails'),
      meta: {
        title: '有梦不晚'
      }
    },
    {
      path: '/searchGoods',
      name: 'searchGoods',
      component: () => import('@/pages/searchGoods'),
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/submitOrder',
      name: 'submitOrder',
      component: () => import('@/pages/submitOrder'),
      meta: {
        title: '订单'
      }
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: () => import('@/pages/addressList'),
      meta: {
        title: '收货地址'
      }
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      component: () => import('@/pages/editAddress'),
      meta: {
        title: '新增地址'
      }
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/pages/shop'),
      meta: {
        title: '购物车'
      }
    }, 
    {
      path: '/allGroup',
      name: 'allGroup',
      component: () => import('@/pages/allGroup'),
      meta: {
        title: '全部拼团'
      }
    },
    {
      path: '/groupDetails',
      name: 'groupDetails',
      component: () => import('@/pages/groupDetails'),
      meta: {
        title: '拼团详情'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        title: '测试'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  /*
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
  */
})

export default router
