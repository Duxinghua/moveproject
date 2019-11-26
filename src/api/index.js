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
	 * 订单详情
	 */
	goodsOrder(data) {
		return post('/goods_order', data);
	},
	/**
	 * 添加订单
	 */
	goodsOrderCreate(data) {
		return post('/goods_order/create', data);
	},
	/**
	 * 添加订单
	 */
	goodsOrderStore(data) {
		return post('/goods_order/store', data);
	},
	/**
	 * 支付订单
	 */
	goodsOrderPayOrder(data) {
		return post('/goods_order/payOrder', data);
	},
	/**
	 * 添加修改购物车
	 */
	goodsStoreCarts(data) {
		return post('/goods/storeCarts', data);
	},
	/**
	 * 删除购物车
	 */
	goodsDelCarts(data) {
		return post('/goods/delCarts', data);
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
  // 发送验证码
  smsSend (data) {
  // 发送验证码 /api/sms/send
    return post('/sms/send', data)
  },
  authSaveMobile (data) {
    return post('auth/saveMobile', data)
  },
  // 用户首页
  userIndex (data) {
    return post('user/index', data)
  },
  // 用户相册 /api/group/photos
  groupPhotos (data) {
    return post('group/photos', data)
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
  // 学分 user/scoreLog
  userScoreLog (data) {
    return post('user/scoreLog', data)
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
  // 公共配置 /api/common/config
  commonConfig (data) {
    return post('common/config', data)
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
  // 社区分类 group/category
  groupCateGory (data) {
    return post('group/category', data)
  },
  // 贴子点赞 posts/saveLike
  postsSaveLike (data) {
    return post('posts/saveLike', data)
  },
  // 删除帖子 /api/posts/del
  postsDel (data) {
    return post('posts/del', data)
  },
  // 贴子列表 posts/lists
  postsLists (data) {
    return post('posts/lists', data)
  },
  // 发布帖子 /api/posts/save
  postsSave (data) {
    return post('posts/save', data)
  },
  // 发布评论 posts/commentsSave
  postsCommentsSave (data) {
    return post('posts/commentsSave', data)
  },
  // 加入社区 posts/groupUser
  groupGroupUser (data) {
    return post('group/groupUser', data)
  },
  // 退出社区 posts/groupUserDel
  groupGroupUserDel (data) {
    return post('group/groupUserDel', data)
  },
  // 帖子评论列表 posts/comments
  postsComments (data) {
    return post('posts/comments', data)
  },
  // 订单列表  goods_order/lists
  goodsOrderLists (data) {
    return post('goods_order/lists', data)
  },
  // 订单详情 goods_order/index
  goodsOrderIndex (data) {
    return post('goods_order/index', data)
  },
  // 删除订单 /api/goods_order/del
  goodsOrderDel (data) {
    return post('goods_order/del', data)
  },
  // 提醒发货  /api/goods_order/hastenOrder
  goodsOrderHastenOrder (data) {
    return post('goods_order/hastenOrder',data)
  },
  // 确认收货 /api/goods_order/receiveGoods
  goodsOrderReceiveGoods (data) {
    return post('goods_order/receiveGoods', data)
  },
  // 获取自定义评论 goods/getGoodsCommentWords
  getGoodsCommentWords (data) {
    return post('goods/getGoodsCommentWords', data)
  },
  // 商品评论 /goods/storeComments
  goodsStoreComments (data) {
    return post('goods/storeComments', data)
  },
  // 订单列表 /api/course_order/lists
  courseOrderList (data) {
    return post('course_order/lists', data)
  },
  // 订单详情 /api/course_order/index
  courseOrderIndex (data) {
    return post('course_order/index', data)
  },
  // 取消预约 /api/course/delAppoint
  courseDelAppoint (data) {
    return post('course/delAppoint', data)
  },
  // 我的预约记录 /api/user/appoint
  userAppoint (data) {
    return post('user/appoint', data)
  },
  // 图片上传 /common/wxUpload
  commonwxUpload (data) {
    return post('common/wxUpload', data)
  },
  // 课程列表 /api/course/lists
  courseList (data) {
    return post('course/lists', data)
  },
  // 课程详情 /api/course/index
  courseDetail (data) {
    return post('course/index', data)
  },
  // 课程拼团列表  /api/course_tuan/lists
  courseTuanList (data) {
    return post('course_tuan/lists', data)
  },
  // 相关花材 /api/course/materials
  flowers (data) {
    return post('course/materials', data)
  },
  // 线上课程评论 /api/course/comments
  courseComment (data) {
    return post('course/comments', data)
  },
  // 线上课程评论点赞 /api/course/saveLike
  courseSaveLike (data) {
    return post('course/saveLike', data)
  },
  // 线下课程预约 /api/course/appoint
  courseAppoint (data) {
    return post('course/appoint', data)
  },
  // 课程提交订单 /api/course/storeOrder
  courseStoreOrder (data) {
    return post('course/storeOrder', data)
  },
  // 创建订单 /api/course_order/store
  courseOrderStore (data) {
    return post('course_order/store', data)
  },
  // 名师列表  /api/teacher/lists
  teacherList (data) {
    return post('teacher/lists', data)
  },
  // 名师详情  /api/teacher/index
  teacherDetail (data) {
    return post('teacher/index', data)
  },
  // 名师作品  /api/teacher/opusLists
  teacherWorksList (data) {
    return post('teacher/opusLists', data)
  },
  // 名师关注 /api/teacher/saveFollow
  teacherLike (data) {
    return post('teacher/saveFollow', data)
  },
  // 线上课程预览接口 /api/course_order/preview
  courseOrderPreview (data) {
    return get('course_order/preview', data)
  }
}

export default server
