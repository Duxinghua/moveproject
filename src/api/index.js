import { post, get } from './request'


const server = {
    /**
     * 登录
     */
    login(data) {
        return post('/auth/login', data);
    },
    /**
     * 
     */
    getDefaultStruct(data) {
        return post('/imageRecognition/getDefaultStruct', data);
    },
    /**
     * 获取用户信息
     */
    getPersonInfo(data) {
        return get('/bk/getPersonInfo', data);
    },
    /**
     * 退出
     */
    logout(data) {
        return post('/auth/logout', data);
    },
    /**
     * 商城列表
     */
    goodsList(data) {
        return post('/goods/lists', data);
    },
    /**
     * 商城分类
     */
    categorys(data) {
        return post('/goods/categorys', data);
    },
    /**
     * 商城详情
     */
    goodsIndex(data) {
        return post('/goods/index', data);
    },
    /**
     * 商品评论
     */
    goodsComments(data) {
        return post('/goods/comments', data);
    },
    /**
     * 购物车
     */
    goodsCarts(data) {
        return post('/goods/carts', data);
    },
    /**
     * 商品拼团详情
     */
    goodsTuan(data) {
        return post('/goods_tuan', data);
    },
    /**
     * 商品拼团列表
     */
    goodsTuanLists(data) {
        return post('/goods_tuan/lists', data);
    },
    /**
     * 新建商品拼团列表
     */
    goodsTuanStore(data) {
        return post('/goods_tuan/store', data);
    },
    /**
     * 加入商品拼团列表
     */
    goodsTuanJoin(data) {
        return post('/goods_tuan/join', data);
    },
    /**
     * 地址列表
     */
    addressList(data) {
        return post('/address/lists', data);
    },
    /**
     * 地址详情
     */
    address(data) {
        return post('/address', data);
    },
    /**
     * 新增编辑地址
     */
    saveAddress(data) {
        return post('/address/save', data);
    },
    /**
     * 删除地址
     */
    delAddress(data) {
        return post('/address/del', data);
    },
}

export default server;