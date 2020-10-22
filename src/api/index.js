import httpv2 from "./httpv2.js";
import httpv1 from "./httpv1.js";

const server = {
  //登陆短信 /shortmessage/login
  shortmessagelogin(params){
    return httpv1({method:"Get",url:"/shortmessage/login", params})
  },
  // 短信验证登陆 /custlogin/loginByMobileAndVlidateCode
  loginByMobileAndVlidateCode(params){
    return httpv1({method:"Get",url:'/custlogin/loginByMobileAndVlidateCode', params})
  },
  //车型详情查询（全部车型） GET /sysCarType/findPage
  sysCarTypeFindPage(params){
    return httpv1({method:"Get",url:'/sysCarType/findPage', params})
  },
  //查询全部车型 /carStyle/findPage
  carStyleFindPage(params){
    return httpv1({method:"Get",url:'/carStyle/findPage', params})
  },
  //车型附加价格明细 GET /carStyleDet/findMap
  carStyleDetFindMap(params){
    return httpv1({method:"Get",url:'/carStyleDet/findMap', params})
  },
  // 订单基本价格/orderHead/calcPrice
  orderHeadCalcPrice(data){
    return httpv1({method:"Post",url:'/orderHead/calcPrice',data})
  },
  couponManagefindPage(params){
    return httpv2({method:"Get",url:'/couponManage/findPage', params})
  }
}

export default server
