<template>
    <div class="goods-details">
        <div class="goods-swiper">
            <van-swipe
                :autoplay="10000"
                @change="onSwipeChange"
            >
                <van-swipe-item
                    v-for="(image, index) in goodsData.images"
                    :key="index"
                    @click="onImageView(goodsData.images,index)"
                >
                    <van-image :src="image">
                        <template v-slot:loading>
                            <van-loading
                                type="spinner"
                                size="20"
                            />
                        </template>
                    </van-image>
                </van-swipe-item>
                <div
                    class="custom-indicator"
                    slot="indicator"
                >
                    {{ swiperCurrent + 1 }}/{{ goodsData.images ? goodsData.images.length : 0}}
                </div>
            </van-swipe>
        </div>
        <div class="goods-info">
            <div class="goods-price">
                ￥<span>{{goodsData.price}}</span>
                <em>原价￥{{goodsData.price_cost}}</em>
            </div>
            <div class="goods-title">
                {{goodsData.goods_name}}
            </div>
            <div class="goods-subtitle">
                {{goodsData.description}}
            </div>
            <div
                class="goods-share"
            >
                <img
                    src="../assets/images/share.png"
                    alt=""
                >
                <span>分享</span>
            </div>
        </div>
        <div class="goods-group">
            <div class="group-header">
                <h3>商品拼团</h3>
                <div
                    class="right"
                    @click="onLinkAll"
                >查看全部拼团
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="group-list">
                <GroupItem
                    v-for="(item, index) in groupList"
                    :key="index"
                    :groupData="item"
                    :groupTime="groupTime"
                />
                <div
                    class="group-no"
                    v-if="groupList.length == 0"
                >
                    <img
                        src="../assets/images/tuan.png"
                        alt=""
                    >
                    <span>暂无拼团,快去拼团吧</span>
                </div>
            </div>
        </div>

        <div class="goods-content">
            <div class="goods-tab">
                <div
                    :class="['tab-item' ,{'active' : tabIndex == 0}]"
                    @click="onTabChange(0)"
                >
                    商品详情
                </div>
                <div
                    :class="['tab-item' ,{'active' : tabIndex == 1}]"
                    @click="onTabChange(1)"
                >
                    商品评价
                </div>
            </div>
            <div
                class="goods-detail"
                v-if="tabIndex == 0"
                v-html="goodsData.content"
            >
            </div>

            <div
                class="goods-comments"
                v-if="tabIndex == 1"
            >
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    :immediate-check="false"
                    @load="onLoad"
                    v-if="comments.length > 0"
                >
                    <div class="comments-list">
                        <div
                            class="comments-item"
                            v-for="(item, index) in comments"
                            :key="index"
                        >
                            <div class="comments-user">
                                <div class="img"><img
                                        :src="item.user.avatar ? item.user.avatar : require('../assets/images/img1.png')"
                                        alt=""
                                    ></div>
                                <span class="user">{{item.user.nickname}}</span>
                                <span class="time">{{item.create_time}}</span>
                            </div>
                            <div class="comments-center">
                                {{item.content}}
                            </div>
                            <div class="comments-img">
                                <div
                                    class="img"
                                    v-for="(self, index) in item.images"
                                    :key="index"
                                    @click="onImageView(item.images,index)"
                                >
                                    <van-image :src="self">
                                        <template v-slot:loading>
                                            <van-loading
                                                type="spinner"
                                                size="20"
                                            />
                                        </template>
                                    </van-image>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
                <div
                    class="comments-no"
                    v-if="comments.length == 0"
                >暂无评论</div>
            </div>
        </div>

        <div class="goods-action">
            <div
                class="goods-money"
                v-if="!disabled"
            >合计<span>￥{{skuList[skuIndex] ? (skuList[skuIndex].price * goodsNum) : '0.00'}}</span></div>
            <div
                class="goods-money"
                v-if="disabled"
            >合计<span>￥{{ skuIndex != -1 ? goodsData.price_tuan : '0.00'}}</span></div>
            <div>
                <div
                    class="goods-group-btn"
                    @click="onBuy('group')"
                    v-if="goodsData.is_tuan == 1"
                >发起拼团</div>
                <div
                    class="goods-group-btn"
                    @click="onBuy('car')"
                    v-if="goodsData.is_tuan != 1"
                >加入购物车</div>
                <div
                    class="goods-buy-btn"
                    @click="onBuy('buy')"
                >立即购买</div>
            </div>
        </div>

        <van-popup
            v-model="popupStatus"
            round
            :safe-area-inset-bottom="true"
            position="bottom"
        >
            <div class="sku-content">
                <div class="sku-header">
                    <img
                        :src="goodsData.images && goodsData.images[0]"
                        alt=""
                    >
                    <div class="price">
                        <div
                            class="money"
                            v-if="skuIndex == -1"
                        ><span>￥{{goodsData.price}}</span><em>￥{{goodsData.price_cost}}</em></div>
                        <div
                            class="money"
                            v-if="skuIndex != -1 && !disabled"
                        ><span>￥{{ skuList[skuIndex] ? skuList[skuIndex].price : '0.00'}}</span><em>￥{{ skuList[skuIndex] ? skuList[skuIndex].price_cost : '0.00'}}</em></div>
                        <div
                            class="money"
                            v-if="skuIndex != -1 && disabled"
                        ><span>￥{{ goodsData.price_tuan }}</span><em>￥{{ goodsData.price_cost }}</em></div>
                        <div
                            class="attri"
                            v-if="skuIndex == -1"
                        >请选择规格属性</div>
                        <div
                            class="attri"
                            v-if="skuIndex != -1"
                        >{{skuList[skuIndex] ? skuList[skuIndex].specs : '请选择规格属性'}}</div>
                    </div>
                </div>
                <div class="sku-row">
                    <div class="sku-title">
                        规格
                    </div>
                    <div class="sku-list">
                        <div
                            v-for="(item, index) in skuList"
                            :key="index"
                            :class="['sku-item',{'active': skuIndex == index}]"
                            @click="onSkuClick(index)"
                        >{{item.specs}}</div>
                    </div>
                </div>
                <div class="sku-row">
                    <div class="sku-title">
                        数量
                    </div>
                    <div class="sku-list">
                        <van-stepper
                            :disabled="disabled"
                            disable-input
                            v-model="goodsNum"
                        />
                    </div>
                </div>
                <div
                    class="submit"
                    @click="onSubmit"
                >
                    确认
                </div>
            </div>
        </van-popup>
        <van-image-preview
            v-model="imageShow"
            :images="imagePreview"
            :startPosition="startPosition"
        >
        </van-image-preview>
    </div>
</template>

<script>
import GroupItem from '@/components/shop/groupItem'

export default {
    data() {
        return {
            goodsNum: 1,
            swiperCurrent: 0,
            tabIndex: 0,
            popupStatus: false,
            skuList: [],//规格
            skuIndex: -1,//规格
            goodsId: 0,//商品ID
            goodsData: {},
            comments: [],//评论列表
            total: 0,
            current: 1,
            loading: false,
            finished: false,
            groupList: [],
            imageShow: false,
            disabled: false,
            groupTime: 0,
            buyType: 'buy',
            imagePreview: [],
            startPosition: 0,
            wx: null
        }
    },
    components: {
        GroupItem,
    },
    created() {
        const config = {
            url: location.href.split('#')[0]
        }
        // 请求api返回sdk配置参数
        this.$api.userGetSignPackage(config).then(res => {
            if (res.code === 1) {
                var wxConfig = res.data;
                this.wxConfig = wxConfig;
                wx.config({
                    appId: wxConfig.appId, // 必填，公众号的唯一标识
                    timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
                    signature: wxConfig.signature,// 必填，签名
                    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
                });
            }

            wx.ready(() => {
                this.wx = wx;
            });
        });
    },
    mounted() {
        this.goodsId = this.$route.query.goodsId;
        this.goodsIndex();
        this.goodsComments();
        this.goodsTuanLists();
    },
    methods: {
        onShare() {
            const _this = this;
            const title = this.goodsData.goods_name;
            const description = this.goodsData.description;
            const link = location.href;
            const imgUrl = this.goodsData.images[0];
            wx.updateAppMessageShareData({
                title: title, // 分享标题
                desc: description, // 分享描述
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // _this.$toast('分享成功')
                }
            })

            wx.updateTimelineShareData({
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // _this.$toast('分享成功')
                }
            })

        },
        onImageView(data, index) {
            this.imagePreview = data;
            this.startPosition = index;
            this.imageShow = true;
        },
        onLoad() {
            this.current++;
            this.goodsComments()
        },
        goodsIndex() {
            const param = {
                goods_id: this.goodsId
            }
            this.$toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: true
            });
            this.$api.goodsIndex(param).then((res) => {
                this.$toast.clear();
                if (res.code == 1) {
                    this.goodsData = res.data;
                    this.skuList = res.data.specs;
                    this.onShare()
                }
            })
        },
        goodsComments() {
            const param = {
                page: this.current,
                pageSize: 10,
                goods_id: this.goodsId
            }
            this.$api.goodsComments(param).then((res) => {
                if (res.code == 1) {
                    if (this.comments.length == 0) {
                        //第一次加载
                        this.comments = res.data.data || [];
                        this.total = res.data.total;
                    } else if (this.comments.length < this.total) {
                        //加载更多
                        this.comments = this.comments.concat(res.data.data);
                    }
                    if (this.comments.length >= this.total) {
                        // 全部加载完成
                        this.finished = true;
                    }
                }
            })
        },
        goodsTuanLists() {
            const param = {
                page: 1,
                pageSize: 10,
                goods_id: this.goodsId
            }
            this.$api.goodsTuanLists(param).then((res) => {
                if (res.code == 1) {
                    this.groupList = res.data.data;
                    this.groupTime = res.time;
                }
            })
        },
        onSkuClick(index) {
            if (this.skuIndex == index) {
                this.skuIndex = -1;
            } else {
                this.skuIndex = index;
            }
        },
        onSwipeChange(index) {
            this.swiperCurrent = index;
        },
        onTabChange(index) {
            this.tabIndex = index;
        },
        onBuy(type) {
            this.buyType = type;
            if (type == 'group') {
                this.goodsNum = 1;
                this.disabled = true;
            } else if(type == 'buy') {
                this.disabled = false;
            }else if(type == 'car'){
                this.disabled = false;
            }
            this.popupStatus = true;
        },
        onSubmit() {
            if (this.skuIndex == -1) {
                this.$toast('请选择规格')
                return false
            }
            if (this.buyType == 'group') {
                // this.goodsStoreCarts();//加入购物车
                this.goodsOrderCreate(1)
            } else if(this.buyType == 'buy') {
                this.goodsOrderCreate(2)

            }else if(this.buyType == 'car') {
                this.goodsStoreCarts();//加入购物车
            }
        },
        onLinkAll() {
            this.$router.push('/allGroup')
        },
        goodsStoreCarts() {
            const param = {
                goods_id: this.goodsId,
                goods_num: this.goodsNum,
                specs: JSON.stringify(this.skuList[this.skuIndex])
            }
            this.$toast.loading({
                duration: 0,
                forbidClick: true
            });
            this.$api.goodsStoreCarts(param).then((res) => {
                this.$toast.clear();
                if (res.code == 1) {
                    this.$toast({
                        type: 'success',
                        message: '添加购物车成功',
                        forbidClick: true
                    });
                } else {
                    this.$toast({
                        message: res.msg
                    });
                }
            })
        },
        goodsOrderCreate(type) {
            const param = {
                type,
                goods_id: this.goodsId,
                specs: JSON.stringify(this.skuList[this.skuIndex]),
                goods_num: this.goodsNum
            }
            this.$router.push({
                path: '/submitOrder',
                query: param
            })
        }

    }
}
</script>

<style lang='scss' scoped>
.goods-details {
  background: #f6f3ee;
  padding-bottom: 100px;
  min-height: 100vh;
  overflow-x: hidden;
  overflow: auto;
  .goods-swiper {
    width: 100%;
    height: 550px;
    position: relative;
    .van-image {
      width: 100%;
      height: 100%;
    }
    .van-swipe {
      height: 100%;
      .custom-indicator {
        position: absolute;
        width: 100px;
        height: 50px;
        border-radius: 25px;
        background: rgba(109, 129, 96, 0.7);
        right: 10px;
        bottom: 30px;
        z-index: 10;
        font-size: 24px;
        color: #f3f3f3;
        text-align: center;
        line-height: 50px;
      }
    }
  }
  .goods-info {
    padding: 25px 25px 40px 25px;
    background: #fbf8f5;
    position: relative;
    overflow: hidden;
    .goods-share {
      position: absolute;
      display: flex;
      align-items: center;
      background: #6c7a5f;
      width: 120px;
      height: 60px;
      border-radius: 35px;
      right: -20px;
      top: 50px;
      img {
        width: 27px;
        height: 27px;
        margin-right: 5px;
        margin-left: 13px;
      }
      span {
        color: #f3d995;
        font-size: 26px;
      }
    }
    .goods-price {
      color: #995258;
      font-size: 30px;
      span {
        color: #995258;
        font-size: 36px;
        font-weight: 500;
      }
      em {
        color: #999999;
        font-size: 26px;
        margin-left: 10px;
        text-decoration: line-through;
        font-style: inherit;
      }
    }
    .goods-title {
      color: #333333;
      font-size: 30px;
      margin-top: 10px;
      width: 8.5rem;
    }
    .goods-subtitle {
      color: #999999;
      font-size: 26px;
    }
  }

  .goods-group {
    margin-top: 15px;
    background: #fbf8f5;
    padding: 40px 25px 35px 25px;
    .group-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        color: #6d8160;
        font-size: 36px;
      }
      .right {
        color: #999999;
        font-size: 26px;
        display: flex;
        align-items: center;
        .van-icon {
          font-size: 34px;
          color: #d4b589;
        }
      }
    }
    .group-list {
      .group-no {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 0px;
        img {
          width: 160px;
          height: 104px;
        }
        span {
          color: #666666;
          font-size: 30px;
          margin-top: 40px;
        }
      }
    }
  }

  .goods-content {
    margin-top: 15px;
    background: #fbf8f5;
    .goods-tab {
      display: flex;
      justify-content: center;
      border-bottom: 1Px solid #f4f0ea;
      .tab-item {
        padding-top: 45px;
        padding-bottom: 30px;
        position: relative;
        font-size: 32px;
        color: #999999;
        transition: all 0.3s;
        &:last-child {
          margin-left: 50px;
        }
        &::before {
          content: "";
          display: inline-block;
          width: 50px;
          height: 4px;
          background: #fff;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 5px;
          transition: all 0.3s;
        }
      }
      .active {
        color: #6d8160;
        transform: scale(1.1);
        &::before {
          background: #6d8160;
        }
      }
    }
    .goods-detail {
      padding: 35px 25px;
      font-size: 26px;
      color: #333333;
      img {
        width: 100%;
      }
    }
    .goods-comments {
      padding: 35px 25px;
      .comments-no {
        text-align: center;
        color: #969799;
        font-size: 30px;
      }
      .comments-list {
        .comments-item {
          padding-top: 25px;
          padding-bottom: 30px;
          position: relative;
          &::after {
            content: "";
            display: inline-block;
            width: 610px;
            height: 1Px;
            background: #f1eeea;
            position: absolute;
            bottom: 0px;
            right: 0px;
            // transform: scale(0.5);
          }
          &:last-child {
            &::after {
              display: none;
            }
          }
          .comments-user {
            display: flex;
            align-items: center;
            .img {
              width: 65px;
              height: 65px;
              border-radius: 50%;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
              }
            }
            span {
              margin-left: 20px;
            }
            .user {
              color: #333333;
              font-size: 26px;
            }
            .time {
              color: #999999;
              font-size: 26px;
            }
          }
          .comments-center {
            color: #333333;
            margin-top: 10px;
            font-size: 26px;
            padding-left: 85px;
          }
          .comments-img {
            margin-top: 20px;
            padding-left: 60px;
            display: flex;
            flex-flow: wrap;
            align-items: center;
            margin-left: 30px;
            .img {
              width: 180px;
              height: 140px;
              border-radius: 8px;
              overflow: hidden;
              margin-right: 30px;
              margin-top: 10px;
              &:nth-child(3n) {
                margin-right: 0px;
              }
              /deep/ .van-image {
                width: 100%;
                height: 100%;
                position: relative;
              }
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }

  .goods-action {
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 10;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px 0px 25px;
    background: #fff;
    .goods-money {
      color: #333333;
      font-size: 30px;
      display: flex;
      align-items: center;
      span {
        color: #995258;
        font-size: 36px;
        margin-left: 15px;
      }
    }
    > div {
      display: flex;
    }
    .goods-group-btn {
      width: 220px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #fff;
      background: #dcc98b;
      border-radius: 40px 0px 0px 40px;
      font-size: 34px;
    }
    .goods-buy-btn {
      width: 220px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #f3d995;
      background: #6d8160;
      font-size: 34px;
      border-radius: 0px 40px 40px 0px;
    }
  }

  .sku-content {
    padding: 45px 35px 25px 35px;
    .sku-header {
      display: flex;
      align-items: center;
      margin-bottom: 50px;
      img {
        width: 200px;
        height: 150px;
      }
      .price {
        margin-left: 20px;
        .money {
          span {
            color: #995258;
            font-size: 30px;
            font-weight: 500;
          }
          em {
            color: #999999;
            font-size: 26px;
            text-decoration: line-through;
            margin-left: 10px;
            font-style: normal;
          }
        }
        .attri {
          color: #333333;
          font-size: 24px;
        }
      }
    }
    .sku-row {
      .sku-title {
        color: #333333;
        font-size: 26px;
        margin-bottom: 20px;
        margin-top: 20px;
      }
      .sku-list {
        display: flex;
        .sku-item {
          padding: 12px 26px;
          border-radius: 6px;
          border: 1Px solid #e3e3e3;
          font-size: 24px;
          color: #333333;
          margin-right: 20px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .active {
          border-color: #cda871;
          color: #cda871;
        }
        /deep/ .van-stepper {
          border: 1Px solid #d3d3d3;
          border-radius: 6px;
          .van-stepper__minus,
          .van-stepper__plus {
            width: 80px;
            height: 55px;
            background: #fff;
            &::before {
              width: 13px;
              height: 1Px;
            }
            &::after {
              width: 1Px;
              height: 13px;
            }
          }
          input {
            width: 115px;
            margin: 0px;
            height: 100%;
            border-left: 1Px solid #d3d3d3;
            border-right: 1Px solid #d3d3d3;
            background: #fff;
            font-size: 24px;
          }
          input[disabled] {
            color: #333333;
            -webkit-text-fill-color: #333333;
            -webkit-opacity: 1;
          }
        }
      }
    }
    .submit {
      width: 100%;
      height: 90px;
      text-align: center;
      line-height: 90px;
      color: #f3d995;
      font-size: 36px;
      background: url("../assets/images/buy-bg.png") 100%/100% no-repeat;
      margin-top: 40px;
    }
  }
}
</style>
