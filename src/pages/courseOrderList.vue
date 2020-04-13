<template>
  <div class="orderList">
    <div class="orderList-tab">
      <div class="orderList-tab-item" v-for="(item,index) in tabList" :key="index" @click="tabClickHandler(index,item.status)">
         <span :class="{active: currentIndex === index ? true : false}">{{item.name}}</span>
      </div>
    </div>
    <div class="orderList-content">
      <van-list
            v-model="loading"
            v-show="orderList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
        <div class="orderList-content-item" v-for="(item,index) in orderList" :key="index">
          <div class="ordertop">
            <span>订单编号：{{item.order_code}}</span>
            <span  v-if="item.t_id == 0">{{item.status_text}}</span>
            <span  v-if="item.t_id != 0 && status === 4" class="sharecorol">{{item.need == 0 ? '拼团成功' :`待分享，差`+item.need+`人`}}</span>
            <span  v-if="item.t_id !== 0 && status !== 4">拼团{{goodsTuanText[item.t_status]}}</span>
            <span v-if="item.need ==0 && item.t_id != 0 && (type == 3 || type == 2)">拼团成功</span>
          </div>
          <div class="ordercontent" @click="orderDetailHandler(item.order_id)">
            <div class="ordercontentimg">
              <van-image :src="item.image">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
            <div class="ordercenter">
              <div class="ol">
                <span class="s1">{{item.title}}</span>
                <span class="s1 s2">{{item.nickname}}</span>
                <div><span class="s3">¥</span><span class="s4">{{item.price}}</span></div>
              </div>
              <span class="s5">x 1</span>
            </div>
          </div>
          <div class="orderfooter">
            <span>合计: ¥{{item.price_pay}}</span>
            <div class="btns" >
              <span  class="cancel" v-if="item.t_id == 0 && item.status == 0" @click="cancelHandler(item.order_id)">取消订单</span>
              <span  class="share" v-if="item.t_id == 0 && item.status == 0" @click="repayHandler(item.order_id)">立即支付</span>
              <span class="share" v-if="status === 4 && item.t_id != 0" @click="sharelHandler(item.t_id)">{{item.need == 0 ? `查看详情` : `邀请拼团`}}</span>
            </div>
          </div>
        </div>
      </van-list>
      <NoData v-if="orderList.length === 0" />
    </div>

  </div>
</template>

<script>
import NoData from '@/components/nodata.vue'
export default {
  name: 'CourseOrderList',
  components: {
    NoData
  },
  data () {
    return {
      currentIndex: 0,
      tabList: [
        {name: '全部', status: ''},
        {name: '待分享', status: 4},
        {name: '线下课程', status: 3},
        {name: '线上课程', status: 2}
      ],
      goodsTuanText: [
        '进行中',
        '成功',
        '解散'
      ],
      orderList: [],
      type: '',
      finished: false,
      loading: false,
      status: '',
      current: 1,
      total: 0,
      wxpay: {}
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    onBridgeReady () {
      var _this = this
      WeixinJSBridge.invoke(
        // 'getBrandWCPayRequest', {
        //   'appId': data.appId, // 公众号名称，由商户传入
        //   'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
        //   'nonceStr': data.nonceStr, // 随机串
        //   'package': data.package,
        //   'signType': data.signType, // 微信签名方式：
        //   'paySign': data.paySign // 微信签名
        // },
        'getBrandWCPayRequest', _this.wxpay,
        function (res) {
          console.log(res)
          if (new String(res.err_msg).trim() === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            // window.location.href = config.baseurl + '/tickOrderList'
            // alert(1)
          } else {
            // window.location.href = config.baseurl + '/tickOrderList'
            // alert(2)
          }
        })
    },
    sharelHandler (tid) {
      this.$router.push({path: '/coursegroupdetails', query: {id: tid}})
    },
    repayHandler (order_id) {
      var _this = this
      this.$api.courseOrderpayOrder({order_id: order_id}).then((res) => {
        if (res.code === 1) {
          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady)
            }
          } else {
            _this.wxpay = res.data.pay_data
            _this.onBridgeReady()
          }
        } else {
          _this.$toast(res.msg)
        }
      })
    },
    cancelHandler (order_id) {
      var _this = this
      this.$api.courseDelAppoint({order_id: order_id}).then((res) => {
        if (res.code === 1) {
          this.$toast({
            message: res.msg,
            onClose: () => {
              _this.orderList = []
              _this.finished = false
              _this.loading = false
              _this.current = 1
              _this.getOrderList()
            }

          })
        } else {
          this.$toast(res.msg)
        }
      })
    },
    tabClickHandler (index, type) {
      this.currentIndex = index
      this.type = type
      this.status = type
      this.orderList = []
      this.finished = false
      this.loading = false
      this.current = 1
      this.getOrderList()
    },
    orderDetailHandler (id) {
      this.$router.push({name: 'CourseOrderDetail', query: {id}})
    },
    getOrderList () {
      const param = {
        page: this.current,
        pageSize: 10,
        type: this.type
      }
      if (this.type == 4) {
        param.status = 4
        param.type = null
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.courseOrderList(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.orderList.length == 0) {
            // 第一次加载
            this.orderList = res.data.data || []
            this.total = res.data.total
          } else if (this.orderList.length < this.total) {
            // 加载更多
            this.orderList = this.orderList.concat(res.data.data)
          }
          if (this.orderList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.orderList.length < this.total) {
        this.current++
        this.getOrderList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.orderList{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FBF8F4;
  &-tab{
    height: 98px;
    display:flex;
    flex-direction: row;
    width:100%;
    background:white;
    align-items: center;
    position: fixed;
    z-index: 2;
    &-item{
      width:33.33%;
      font-size: 32px;
      color:#999999;
      text-align: center;
      position: relative;
      .active{
        font-size:36px;
        color:#6D8160;
      }
      .active::before{
        position: absolute;
        content: '';
        width:45px;
        height:4px;
        left:50%;
        background:#6D8160;
        transform: translateX(-50%);
        bottom: -25px;
      }
    }
  }
  &-content{
    display: flex;
    flex-direction: column;
    margin-top:98px;
    &-item{
      background:white;
      margin-top:20px;
      padding:26px;
      font-size: 30px;
      color:#333;
      display: flex;
      flex-direction: column;
      .ordertop{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .sharecorol{
          color:#cda871;
        }
      }
      .ordercontent{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding:30px 0px;
        width:100%;
        border-bottom:1px solid #F3F3F3;
        .ordercontentimg{
          width:156px;
          height:130px;
          border-radius: 8px;
          margin-right:15px;
          overflow: hidden;
          .van-image{
            width:100%;
            height:100%;
          }
        }
        .ordercenter{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: calc(100% - 171px);
          .ol{
            display: flex;
            flex-direction: column;
            width:400px;
            .s1{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .s2{
              font-size: 26px;
              color:#999999;
              margin-top:10px;
            }
            .s3{
              color:#995258;
              font-size: 24px;
            }
            .s4{
              color:#995258;
              font-size: 34px;
            }
          }
        }
        .s5{
          font-size: 28px;
          color:#333;
        }
      }
      .orderfooter{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top:15px;
        height:62px;
        align-items: center;
        span{
          display: flex;
          flex:1;
        }
        .btns{
          display: flex;
          flex-direction: row;
          span{
            width:168px;
            height:62px;
            line-height:62px;
            text-align: center;
            border:2px solid rgba(205, 168, 113, 1);
            border-radius:31px;
            margin-right:16px;
            margin-left:16px;
          }
          .cancel{
            color:#666666;
            border:2px solid #E3E3E3;
            display: block;
            margin: 0 auto;
            margin-right:16px;
            margin-left:16px;
          }
          .share{
            color:#cda871;
            border:2px solid #cda871;
            display: block;
            margin: 0 auto;
            margin-right:16px;
            margin-left:16px;
          }
        }
      }
    }
  }
}
</style>
