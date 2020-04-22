import Vue from 'vue'
import getSitem from '@/utils/storage'
import Api from '@/api/index'
import Router from 'vue-router'
import Home from '@/pages/home'
import HomeSearch from '@/pages/homeSearch'
import TeacherList from '@/pages/teacherList'
import TeacherDetail from '@/pages/teacherDetail'
import OffCourseList from '@/pages/offCourseList'
import OffCourseDetail from '@/pages/offCourseDetail'
import OnlineCourseDetail from '@/pages/onlineCourseDetail'
import OnlineCourseList from '@/pages/onlineCourseList'
import CourseGroupDetails from '@/pages/courseGroupDetails'
import CourseAllGroup from '@/pages/courseAllGroup'
import OrderCommit from '@/pages/orderCommit'
import SubmitCourseOrder from '@/pages/submitCourseOrder'
import OrderSuccess from '@/pages/orderSuccess'
import DoTask from '@/pages/doTask'
import Huaban from '@/pages/huaban'
import HuabanGroupDetail from '@/pages/huabanGroupDetail'
import HuabanTzDetail from '@/pages/huabanTzDetail'
import HuabanMoreGroupList from '@/pages/huabanMoreGroupList'
import HuabanMyGroupList from '@/pages/HuabanMyGroupList'
import HuabanGroupList from '@/pages/huabanGroupList'
import HuabanJoinGroup from '@/pages/huabanJoinGroup'
import HuabanGroupMember from '@/pages/huabanGroupMember'
import HuabanTzfp from '@/pages/huabanTzfp'
import HuabanTzList from '@/pages/huabanTzList'
import HuabanSearch from '@/pages/huabanSearch'
import HuabanUserInfo from '@/pages/huabanUserInfo'
import OrderList from '@/pages/orderlist'
import OrderDetail from '@/pages/OrderDetail'
import OrderRefund from '@/pages/orderRefund'
import OrderComment from '@/pages/orderComment'
import CourseOrderList from '@/pages/courseOrderList'
import CourseOrderDetail from '@/pages/courseOrderDetail'
import Invite from '@/pages/invite'
import MyEdit from '@/pages/myEdit'
import MyModify from '@/pages/myModify'
import MyBx from '@/pages/myBx'
import MyFs from '@/pages/myFs'
import MyGz from '@/pages/myGz'
import MyXf from '@/pages/myXf'
import MyFx from '@/pages/myFx'
import MyTx from '@/pages/myTx'
import MyTz from '@/pages/myTz'
import MyXx from '@/pages/myXx'
import MyYx from '@/pages/myYx'
import MyYq from '@/pages/myYq'
import MyYy from '@/pages/myYy'
import MyPl from '@/pages/myPl'
import About from '@/pages/about'
import VideoDetail from '@/pages/videodetail'
import My from '@/pages/my'
import Login from '@/pages/login'
import Test from '@/pages/test'

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

const funcUrlDel = (name) => {
  var loca = window.location
  var baseUrl = loca.origin + loca.pathname + '?'
  var query = loca.search.substr(1)
  if (query.indexOf(name) > -1) {
    var obj = {}
    var arr = query.split('&')
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=')
      obj[arr[i][0]] = arr[i][1]
    }
    delete obj[name]
    var url = baseUrl + JSON.stringify(obj).replace(/[\'\{\ }]/g, '').replace(/\:/g, '=').replace(/\,/g, '&')
    return url
  } else {
    return window.location.href
  }
}

const getToken = (data) => {
  if (getSitem.getStr('token')) {
    Api.wxTokenCheck().then((result) => {
      // alert(JSON.stringify(result))
      if (result.code === 1) {
        getSitem.setStr('token', result.data.token)
        Api.userIndex().then((result) => {
          console.log(result, 'aa')
          if (result.code === 1) {
            getSitem.setStr('ispartner', result.data.is_partner)
          }
        })
      }
    })
  } else {
    Api.wxLogin(data).then((result) => {
      console.log(result, 'result')
      getSitem.setStr('open', true)
      if (result.code === 1) {
        getSitem.setStr('mobile', result.data.info.mobile)
        getSitem.setStr('token', result.data.info.token)
        getSitem.setStr('openid', result.data.info.openid)
        getSitem.setStr('userid', result.data.info.user_id)
        Api.userIndex().then((result) => {
          if (result.code === 1) {
            getSitem.setStr('ispartner', result.data.is_partner)
          }
        })
        if (getSitem.getStr('open')) {
          location.reload()
        } else {
          getSitem.setStr('open', false)
        }
      } else {

      }
    })
  }
  if (getSitem.getStr('pudd')) {
    var params = {
      openid: getSitem.getStr('pudd')
    }
    Api.userBindTopUserId(params).then((res) => {
      if (res.code === 1) {
        getSitem.remove('pudd')
      }
    })
  }
}

/*
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
      path: '/Fall',
      name: 'Fall',
      component: Home,
      meta: {
        title: '匠心'
      }
    },
    {
      path: '/homeSearch',
      name: 'HomeSearch',
      component: HomeSearch,
      meta: {
        title: '有梦不晚'
      }
    },
    {
      path: '/offcoursedetail',
      name: 'OffCourseDetail',
      component: OffCourseDetail,
      meta: {
        title: '线下课程'
      }
    },
    {
      path: '/offcourselist',
      name: 'OffCourseList',
      component: OffCourseList,
      meta: {
        title: '线下课程'
      }
    },
    {
      path: '/onlinecoursedetail',
      name: 'OnlineCourseDetail',
      component: OnlineCourseDetail,
      meta: {
        title: '线上课程'
      }
    },
    {
      path: '/onlinecourselist',
      name: 'OnlineCourseList',
      component: OnlineCourseList,
      meta: {
        title: '线上课程'
      }
    },
    {
      path: '/teacherList',
      name: 'TeacherList',
      component: TeacherList,
      meta: {
        title: '名师列表'
      }
    },
    {
      path: '/teacherDetail',
      name: 'TeacherDetail',
      component: TeacherDetail,
      meta: {
        title: '名师详情'
      }
    },
    {
      path: '/ordercommit',
      name: 'OrderCommit',
      component: OrderCommit,
      meta: {
        title: '有梦不晚'
      }
    },
    {
      path: '/submitcourseorder',
      name: 'SubmitCourseOrder',
      component: SubmitCourseOrder,
      meta: {
        title: '提交订单'
      }
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess,
      meta: {
        title: '有梦不晚'
      }
    },
    {
      path: '/dotask',
      name: 'DoTask',
      component: DoTask,
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
        title: '小组详情'
      }
    },
    {
      path: '/huabangroupmember',
      name: 'HuabanGroupMember',
      component: HuabanGroupMember,
      meta: {
        title: '小组成员'
      }
    },
    {
      path: '/huabantzlist',
      name: 'HuabanTzList',
      component: HuabanTzList,
      meta: {
        title: '贴子列表'
      }

    },
    {
      path: '/huabantzdetail',
      name: 'HuabanTzDetail',
      component: HuabanTzDetail,
      meta: {
        title: '贴子详情'
      }
    },
    {
      path: '/huabangrouplist',
      name: 'HuabanGroupList',
      component: HuabanGroupList,
      meta: {
        title: '社区小组'
      }
    },
    {
      path: '/huabanmoregrouplist',
      name: 'HuabanMoreGroupList',
      component: HuabanMoreGroupList,
      meta: {
        title: '推荐圈子'
      }
    },
    {
      path: '/huabanmygrouplist',
      name: 'HuabanMyGroupList',
      component: HuabanMyGroupList,
      meta: {
        title: '我加入的圈子'
      }

    },
    {
      path: '/huabanjoingroup',
      name: 'HuabanJoinGroup',
      component: HuabanJoinGroup,
      meta: {
        title: '加入社区小组'
      }
    },
    {
      path: '/huabantzfp',
      name: 'HuabanTzfp',
      component: HuabanTzfp,
      meta: {
        title: '发布贴子'
      }
    },
    {
      path: '/huabansearch',
      name: 'HuabanSearch',
      component: HuabanSearch,
      meta: {
        title: '花伴搜索'
      }
    },
    {
      path: '/huabanuserinfo',
      name: 'HuabanUserInfo',
      component: HuabanUserInfo,
      meta: {
        title: '用户信息'
      }
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/invite',
      name: 'Invite',
      component: Invite,
      meta: {
        title: '好友邀请'
      }
    },
    {
      path: '/myedit',
      name: 'MyEdit',
      component: MyEdit,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/mymodify',
      name: 'MyModify',
      component: MyModify,
      meta: {
        title: '修改资料'
      }
    },
    {
      path: '/mygz',
      name: 'MyGz',
      component: MyGz,
      meta: {
        title: '我的关注'
      }
    },
    {
      path: '/myxf',
      name: 'MyXf',
      component: MyXf,
      meta: {
        title: '我的花币'
      }
    },
    {
      path: '/myfs',
      name: 'MyFs',
      component: MyFs,
      meta: {
        title: '我的粉丝'
      }
    },
    {
      path: '/mybx',
      name: 'MyBx',
      component: MyBx,
      meta: {
        title: '被喜欢'
      }
    },
    {
      path: '/myfx',
      name: 'MyFx',
      component: MyFx,
      meta: {
        title: '我的分销'
      }
    },
    {
      path: '/mytx',
      name: 'MyTx',
      component: MyTx,
      meta: {
        title: '我的提现'
      }
    },
    {
      path: '/mytx',
      name: 'MyTx',
      component: MyTx,
      meta: {
        title: '我的提现'
      }
    },
    {
      path: '/myyq',
      name: 'MyYq',
      component: MyYq,
      meta: {
        title: '我的邀请'
      }
    },
    {
      path: '/myXx',
      name: 'MyXx',
      component: MyXx,
      meta: {
        title: '消息中心'
      }
    },
    {
      path: '/myyy',
      name: 'MyYy',
      component: MyYy,
      meta: {
        title: '课程中心'
      }
    },
    {
      path: '/mytz',
      name: 'MyTz',
      component: MyTz,
      meta: {
        title: '我的贴子'
      }
    },
    {
      path: '/myyx',
      name: 'MyYx',
      component: MyYx,
      meta: {
        title: '登陆认证协议'
      }
    },
    {
      path: '/mypl',
      name: 'MyPl',
      component: MyPl,
      meta: {
        title: '我的评论'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/videodetail',
      name: 'VideoDetail',
      component: VideoDetail,
      meta: {
        title: '预课详情'
      }
    },
    {
      path: '/orderlist',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: '商品订单'
      }
    },
    {
      path: '/orderdetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        title: '商品订单详情'
      }
    },
    {
      path: '/orderrefund',
      name: 'OrderRefund',
      component: OrderRefund,
      meta: {
        title: '申请退款'
      }
    },
    {
      path: '/ordercomment',
      name: 'OrderComment',
      component: OrderComment,
      meta: {
        title: '订单评论'
      }
    },
    {
      path: '/courseorderlist',
      name: 'CourseOrderList',
      component: CourseOrderList,
      meta: {
        title: '课程订单'
      }
    },
    {
      path: '/coursegroupdetails',
      name: 'CourseGroupDetails',
      component: CourseGroupDetails,
      meta: {
        title: '课程拼团详情'
      }
    },
    {
      path: '/courseallgroup',
      name: 'CourseAllGroup',
      component: CourseAllGroup,
      meta: {
        title: '课程拼团列表'
      }
    },
    {
      path: '/courseorderdetail',
      name: 'CourseOrderDetail',
      component: CourseOrderDetail,
      meta: {
        title: '课程订单详情'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      name: 'shopHome',
      component: () => import('@/pages/shopHome'),
      meta: {
        title: '有梦不晚',
        keepAlive: true
      }
    },
    {
      path: '/tuan',
      name: 'Tuan',
      component: () => import('@/pages/tuan'),
      meta: {
        title: '拼团',
        keepAlive: true
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
      path: '/afterorder',
      name: 'afterOrder',
      component: () => import('@/pages/afterOrder'),
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
      path: '/goodsCate',
      name: 'GoodsCate',
      component: () => import('@/pages/goodsCate'),
      meta: {
        title: '目录分类'
      }
    },
    {
      path: '/shopCate',
      name: 'ShopCate',
      component: () => import('@/pages/shopCate'),
      meta: {
        title: '商品分类'
      }
    },
    {
      path: '/myHhR',
      name: 'MyHhr',
      component: () => import('@/pages/myHhr'),
      meta: {
        title: '合伙人'
      }
    },
    {
      path: '/myHho',
      name: 'MyHho',
      component: () => import('@/pages/myHho'),
      meta: {
        title: '合伙人订单'
      }
    },
    {
      path: '/myHhl',
      name: 'MyHhl',
      component: () => import('@/pages/myHhl'),
      meta: {
        title: '合伙人列表'
      }
    },
    {
      path: '/partner',
      name: 'Partner',
      component: () => import('@/pages/partner'),
      meta: {
        title: '合伙人申请'
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
  // console.log(to)
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
