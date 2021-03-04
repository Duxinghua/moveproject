import httpv2 from "./httpv2.js";
import httpv1 from "./httpv1.js";

const server = {
  //登陆短信 /shortmessage/login //GET /shortmessage/bind
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
    return httpv1({method:"Get",url:'/couponUser/orderFindUserCoupon', params})
  },
  //公众号授权 /custlogin/getOfficeOpenId
  getOfficeOpenId(params){
    return httpv1({method:"Get",url:'/custlogin/getOfficeOpenId',params})
  },
  //微信支付 GET /wxPay/webPay
  wxWebpay(params){
    return httpv1({method:"Get",url:'/wxPay/webPay',params})
  },
  //微信签名GET /workerApply/getOfficeSign
  workerApply(params){
    return httpv1({method:"Get",url:'/workerApply/getOfficeSign',params})
  },
  //腾讯地图,计算线路公里数 /map/getDistance
  getDistance(data){
    return httpv1({method:"Post",url:'/map/getDistance',data})
  },
  //企业加盟  /custEnterpriseApply/findPage
  custEnterpriseApplyFindPage(params){
    return httpv1({method:"GET",url:'/custEnterpriseApply/findPage',params})
  },
  //GET /custWorkType/findPage 工种单位
  custWorkTypeFindPage(params){
    return httpv1({method:"GET",url:'/custWorkType/findPage',params})
  },
  ///carStyle/getCarStyleAttachType
  getCarStyleAttachType(params){
    return httpv1({method:"GET",url:'/carStyle/getCarStyleAttachType',params})
  },
  //订单取消
  cancelStatusUser(params){
    return httpv1({method:"GET",url:'/orderSheet/cancelStatusUser',params})
  },
  //订单删除
// export const order_delete = params => { return get(`/orderHead/delete`, params).then(res => res.data) };
  order_delete(params){
    return httpv1({method:"GET",url:'/orderHead/delete',params})
  },
//立即评价
// export const orderEvaluate = params => { return post(`/orderEvaluate/save`, params).then(res => res.data) };
  orderEvaluate(params){
    return httpv1({method:"POST",url:'/orderEvaluate/save',params})
  },
  //线下支付wx_pay
  //export const orderPayOffLine = params => { return get(`/orderHead/orderPayOffLine`, params).then(res => res.data) };
  orderPayOffLine(params){
    return httpv1({method:"Get",url:'/orderEvaluate/save',params})
  },
  //微信登录绑定手机获取验证码
  //export const getUserDataBySeqId = params => { return get(`/custlogin/getUserDataBySeqId`, params).then(res => res.data) };
  getUserDataBySeqId(params){
    return httpv1({method:"Get",url:'/custlogin/getUserDataBySeqId',params})
  },
  ////订单列表
  orderList(params){
    return httpv1({method:"GET",url:'/orderSheet/findPage',params})
  },
  //订单详情
  orderSheet(params){
    return httpv1({method:"GET",url:'/orderSheet/getSheet',params})
  },
  ////微信支付
  // export const wx_pay = params => { return get(`/wxPay/miniAppPay`, params).then(res => res.data) };
  wx_pay(params){
    return httpv1({method:"GET",url:'/wxPay/miniAppPay',params})
  },
  ////查询客服电话
  //export const findCustomerServiceNumber = params => { return get(`/sysUser/findCustomerServiceNumber`, params).then(res => res.data) };
  findCustomerServiceNumber(params){
    return httpv1({method:"GET",url:'/sysUser/findCustomerServiceNumber',params})
  },
  //取消订单
  //export const cancelStatusUser = params => { return post(`/orderSheet/cancelStatusUser`, params).then(res => res.data) };
  cancelStatusUser(params){
    return httpv1({method:"GET",url:'/orderSheet/cancelStatusUser',params})
  },
  ////订单生成后价格计算
  //export const orderSheet_price = params => { return get(`/orderSheet/calcPrice`, params).then(res => res.data) };
  orderSheet_price(params){
    return httpv1({method:"GET",url:'/orderSheet/calcPrice',params})
  }

}

export default server
