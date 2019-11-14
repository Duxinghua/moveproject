import { post, get } from './request'

const server = {
  /**
     * 登录
     */
  login (data) {
    return post('/auth/login', data)
  },
  /**
     *
     */
  getDefaultStruct (data) {
    return post('/imageRecognition/getDefaultStruct', data)
  },
  /**
     * 获取用户信息
     */
  getPersonInfo (data) {
    return get('/bk/getPersonInfo', data)
  },
  /**
     * 退出
     */
  logout (data) {
    return post('/auth/logout', data)
  },
  /**
     * 商城列表
     */
  goodsList (data) {
    return post('/goods/lists', data)
  },
  /**
     * 商城分类
     */
  categorys (data) {
    return post('/goods/categorys', data)
  },
  /**
     * 商城详情
     */
  goodsIndex (data) {
    return post('/goods/index', data)
  },
  /*
  微信登录
  */
  wxLogin (data) {
    return post('/auth/wechat', data)
  },
  // 检查token是否过期
  wxTokenCheck (data) {
    return post('/auth/check', data)
  },
  // 用户首页
  userIndex (data) {
    return post('/user/index', data)
  },
  // 获取二维码
  userQrcode (data) {
    return post('/user/qrcode', data)
  }

}

export default server
