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
  /**
	 * 商品评论
	 */
  goodsComments (data) {
    return post('/goods/comments', data)
  },
  /**
	 * 购物车
	 */
  goodsCarts (data) {
    return post('/goods/carts', data)
  },
  /**
	 * 商品拼团详情
	 */
  goodsTuan (data) {
    return post('/goods_tuan', data)
  },
  /**
	 * 商品拼团列表
	 */
  goodsTuanLists (data) {
    return post('/goods_tuan/lists', data)
  },
  /**
	 * 新建商品拼团列表
	 */
  goodsTuanStore (data) {
    return post('/goods_tuan/store', data)
  },
  /**
	 * 加入商品拼团列表
	 */
  goodsTuanJoin (data) {
    return post('/goods_tuan/join', data)
  },
  /**
	 * 地址列表
	 */
  addressList (data) {
    return post('/address/lists', data)
  },
  /**
	 * 地址详情
	 */
  address (data) {
    return post('/address', data)
  },
  /**
	 * 新增编辑地址
	 */
  saveAddress (data) {
    return post('/address/save', data)
  },
  /**
	 * 删除地址
	 */
  delAddress (data) {
    return post('/address/del', data)
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
  },
  // 签到列表 /api/user/signLists
  userSignLists (data) {
    return post('user/signLists', data)
  },
  //  签到 /api/user/saveSign
  userSaveSign (data) {
    return post('user/saveSign', data)
  },
  // 个人资料 /api/user/info
  userInfo (data) {
    return post('user/info', data)
  },
  // 编辑资料 /api/user/edit
  userEdit (data) {
    return post('user/edit', data)
  },
  // 我的关注 /api/user/follow
  userFollow (data) {
    return post('user/follow', data)
  },
  // 被喜欢 user/likes
  userLikes (data) {
    return post('user/likes', data)
  },
  // 关注 /api/user/saveFollow
  userSaveFollow (data) {
    return post('user/saveFollow', data)
  },
  // 我的粉丝 /api/user/fans
  userFans (data) {
    return post('user/fans', data)
  },
  //  粉丝（取消粉丝） /api/user/saveFans
  userSaveFans (data) {
    return post('user/saveFans', data)
  },
  // 学分 /api/user/pointsRecords
  userPointsRecords (data) {
    return post('user/pointsRecords', data)
  },
  // 提现记录 /user/takeout
  userTakeout (data) {
    return post('user/takeout', data)
  },
  // 发起提现 user/storeTakeout
  userStoreTakeout (data) {
    return post('user/storeTakeout', data)
  },
  // 用户列表 /api/user/lists
  userLists (data) {
    return post('user/lists', data)
  },
  // 消息列表 /api/user/messages
  userMessage (data) {
    return post('user/messages', data)
  },
  // 社区详情 /api/group/index
  groupIndex (data) {
    return post('group/index', data)
  },
  // 社区列表（搜索） /api/group/lists
  groupLists (data) {
    return post('group/lists', data)
  },
  // 微信 jdk 签名
  userGetSignPackage (data) {
    return post('user/getSignPackage', data)
  },
  // 贴子详情 posts
  tzPosts (data) {
    return post('posts', data)
  },
  // 贴子点赞 posts/saveLike
  postsSaveLike (data) {
    return post('posts/saveLike', data)
  },
  // 发布评论 posts/commentsSave
  postsCommentsSave (data) {
    return post('posts/commentsSave', data)
  },
  // 加入社区 posts/groupUser
  postsGroupUser (data) {
    return post('posts/groupUser', data)
  },
  // 退出社区 posts/groupUserDel
  postsGroupUserDel (data) {
    return post('posts/groupUserDel', data)
  },
  // 帖子评论列表 posts/comments
  postsComments (data) {
    return post('posts/comments', data)
  },
  // 订单列表  goods_order/lists
  goods_orderLists (data) {
    return post('goods_order/lists', data)
  }

}

export default server
