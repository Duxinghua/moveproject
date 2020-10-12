import { post, get } from './request'

const server = {
  //登陆短信 /shortmessage/login
  shortmessagelogin(data){
    return get('/shortmessage/login', data)
  },
  // 短信验证登陆 /custlogin/loginByMobileAndVlidateCode
  loginByMobileAndVlidateCode(data){
    return get('/custlogin/loginByMobileAndVlidateCode', data)
  },
  //车型详情查询（全部车型） GET /sysCarType/findPage
  sysCarTypeFindPage(data){
    return get('/sysCarType/findPage', data)
  },
  //查询全部车型 /carStyle/findPage
  carStyleFindPage(data){
    return get('/carStyle/findPage', data)
  },
  //车型附加价格明细 GET /carStyleDet/findMap
  carStyleDetFindMap(data){
    return get('/carStyleDet/findMap', data)
  }
}

export default server
