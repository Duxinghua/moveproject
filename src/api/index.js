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
  //车型详情根据id查 GET /carStyle/getByPk
  carStyleGetByPk(params){
    return httpv1({method:"Get",url:'/carStyle/getByPk', params})
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
  //GET /custWorkType/findWorkLevel根据属性查询第一级工种
  custWorkTypeFindWorkLevel(params){
    return httpv1({method:"Get",url:'/custWorkType/findWorkLevel',params})
  },
  // GET /custWorkType/findMap按二级工种分类返回
  custWorkTypeFindMap(params){
    return httpv1({method:"Get",url:'/custWorkType/findMap',params})
  },
  //sys/appeal/imgUpload 图片上传
  appealimgUpload(data){
    return httpv1({method:"Post",url:'/sys/appeal/imgUpload',data})
  },
  //明细 /orderHead/calcPricePullDet
  orderHeadCalcPricePullDet(data){
    return httpv1({method:"Post",url:'/orderHead/calcPricePullDet',data})
  },
  // /orderHead/calcHireWorkerDet劳务工价格明细
  orderHeadCalcHireWorkerDet(data){
    return httpv1({method:"Post",url:'/orderHead/calcHireWorkerDet',data})
  },
  // /orderHead/insert订单主信息，保存
  orderHeadInsert(data){
    return httpv1({method:"Post",url:'/orderHead/insert',data})
  },
  //支付宝支付http://106.52.164.64:8184/aliPay/wapPay?orderHeadSeqId=159750943536054272
  aliPayWapPay(params){
    return httpv1({method:"Get",url:'/aliPay/wapPay',params})
  },
  //优惠券
  orderFindUserCoupon(params){
    return httpv2({method:"Get",url:'/couponUser/orderFindUserCoupon', params})
  }
}

export default server
