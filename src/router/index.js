import Vue from 'vue'
import getSitem from '@/utils/storage'
import Api from '@/api/index'
import Router from 'vue-router'

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

// 路由切换时 页面位置
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
      component: () => import('@/pages/home'),
      meta: {
        title: '货搬搬'
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/pages/cart'),
      meta: {
        title: '全部车型'
      }
    },
    {
      path: '/cartinfo',
      name: 'Cartinfo',
      component: () => import('@/pages/cartinfo'),
      meta: {
        title: '车辆详情'
      }
    },
    {
      path: '/chooseaddress',
      name: 'Chooseaddress',
      component: () => import('@/pages/chooseaddress'),
      meta: {
        title: '发货地信息'
      }
    },
    {
      path: '/sendaddress',
      name: 'Sendaddress',
      component: () => import('@/pages/sendaddress'),
      meta: {
        title: '发货地址'
      }
    },
    {
      path: '/pricedetail',
      name: 'Pricedetail',
      component: () => import('@/pages/pricedetail'),
      meta: {
        title: '价格明细'
      }
    },
    {
      path: '/confirmorder',
      name: 'Confirmorder',
      component: () => import('@/pages/confirmorder'),
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/need',
      name: 'Need',
      component: () => import('@/pages/need'),
      meta: {
        title: '额外需求'
      }
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: () => import('@/pages/agreement'),
      meta: {
        title: '服务协议'
      }
    },
    {
      path: '/ordernote',
      name: 'Ordernote',
      component: () => import('@/pages/ordernote'),
      meta: {
        title: '订单备注'
      }
    },
    {
      path: '/platformstandard',
      name: 'Platformstandard',
      component: () => import('@/pages/platformstandard'),
      meta: {
        title: '平台标准计价'
      }
    },
    {
      path: '/platformpricing',
      name: 'Platformpricing',
      component: () => import('@/pages/platformpricing'),
      meta: {
        title: '平台定价'
      }
    },
    {
      path: '/accountingrules',
      name: 'Accountingrules',
      component: () => import('@/pages/accountingrules'),
      meta: {
        title: '计费规则说明'
      }
    },
    {
      path: '/company',
      name: 'Company',
      component: () => import('@/pages/company'),
      meta: {
        title: '企业展示'
      }
    },
    {
      path: '/bigitem',
      name: 'Bigitem',
      component: () => import('@/pages/bigitem'),
      meta: {
        title: '大件物品'
      }
    },
    {
      path: '/selectwork',
      name: 'Selectwork',
      component: () => import('@/pages/selectwork'),
      meta: {
        title: '选择工种'
      }
    },
    {
      path: '/city',
      name: 'City',
      component: () => import('@/pages/city'),
      meta: {
        title: '选择城市'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/pages/auth'),
      meta: {
        title: '授权'
      }
    },
    {
      path: '/priceinfo',
      name: 'Priceinfo',
      component: () => import('@/pages/priceinfo'),
      meta: {
        title: '计费规则说明'
      }
    },
    {
      path: '/paysuccess',
      name: 'Paysuccess',
      component: () => import('@/pages/paysuccess'),
      meta: {
        title: '支付成功'
      }
    },
    {
      path: '/my',
      name: 'My',
      component: () => import('@/pages/my/my'),
      meta: {
        title: '我的'
      }
    },
    {
      path: '/callcenter',
      name: 'CallCenter',
      component: () => import('@/pages/personalCenter/callCenter'),
      meta: {
        title: '客服中心'
      }
    },
    {
      path: '/myorder',
      name: 'myOrder',
      component: () => import('@/pages/myOrder/index'),
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/cancelOrder',
      name: 'cancelOrder',
      component: () => import('@/pages/order/cancelOrder'),
      meta: {
        title: '取消订单'
      }
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: () => import('@/pages/myOrder/evaluation'),
      meta: {
        title: '立即评价'
      }
    },
    {
      path: '/myOrder/lahuo',
      name: 'lahuo',
      component: () => import('@/pages/myOrder/lahuo'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/pages/test'),
      meta: {
        title: '测试'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  return;
  // console.log(to
  // getSitem.remove('token')
  // getSitem.remove('mobile')
  // getSitem.remove('open')
  if (!getSitem.getStr('mobile')) {
    // alert(getSitem.getStr('token'))
    if (to.name === 'My' || to.name === 'groupDetails' || to.name === 'goodsDetails' || to.name === 'CourseGroupDetails' || to.name === 'OffCourseDetail' || to.name === 'OnlineCourseDetail') {
      next({path: '/login', query: {name: to.name, arg: to.fullPath}})
      // alert(getSitem.getStr('token'))
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.name === 'Invite' || to.name === 'auth') {
    next()
  } else {
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
    var appid = 'wxd2a255476bf18aec'
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
        Api.wxTokenCheck().then((result) => {
          if (result.code === 1) {
            getSitem.setStr('token', result.data.token)
            Api.userIndex().then((result) => {
              if (result.code === 1) {
                getSitem.setStr('ispartner', result.data.is_partner)
              }
            })
            if (getSitem.getStr('pudd')) {
              var params = {
                openid: getSitem.getStr('pudd')
              }
              Api.userBindTopUserId(params).then((res) => {
                getSitem.remove('pudd')
              })
            }
          }
        })
        next()
      }
    } else {
      console.log('已拿到code', code)
      console.log('111')
      var data = {
        code: code
      }
      getToken(data)
    }
  }
})

export default router
