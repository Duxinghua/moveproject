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
          <span>{{item.status_text}}</span>
        </div>
        <div class="orderclist" @click="orderDetailHandler(item.order_id)">
          <div class="ordercontent" v-for="(goodsitem,index) in item.goods" :key="goodsitem.goods_id">
            <img :src="goodsitem.images" alt="">
            <div class="ordercenter">
              <div class="ol">
                <span class="s1">{{goodsitem.goods_name}}</span>
                <span class="s1 s2">{{goodsitem.specs}}</span>
                <div><span class="s3">¥</span><span class="s4">{{goodsitem.price}}</span></div>
              </div>
              <span class="s5">x {{goodsitem.goods_num}}</span>
            </div>
          </div>
        </div>
        <div class="orderfooter">
          <span>合计: ¥{{item.price_pay}}</span>
          <div class="btns">
            <span class="cancel" v-if="item.status === 0" @click="cancelClickHandler(item.order_id)">取消订单</span>
            <span v-if="item.status === 0" @click="replayClickHandler(item.order_id)">去付款</span>
            <span v-if="item.status === 1" @click="sendClickHandler(item.order_id)">提配发货</span>
            <span v-if="item.status === 2" @click="confirmClickHandler(item.order_id)">确认收货</span>
            <span v-if="item.status === 3 && item.is_comment === 0" @click="commentClickHandler(item.order_id)">评论</span>
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
  name: 'OrderList',
  components: {
    NoData
  },
  data () {
    return {
      currentIndex: 0,
      tabList: [
        {name: '全部', status: ''},
        {name: '待付款', status: 0},
        {name: '待发货', status: 1},
        {name: '待收货', status: 2},
        {name: '评价', status: 3}
      ],
      orderList: [],
      finished: false,
      loading: false,
      status: '',
      current: 1,
      total: 0
    }
  },
  methods: {
    confirmClickHandler (order_id) {

    },
    sendClickHandler (order_id) {

    },
    commentClickHandler (order_id) {
      this.$router.push({name:'OrderComment',query:{id:order_id}})
    },
    replayClickHandler (order_id) {
       var _this = this
       this.$api.goodsOrderPayOrder({order_id:order_id}).then((res)=>{
         if (res.code === 1) {
           _this.$toast({
             message: res.msg,
             onClose: () => {
               _this.orderList = []
               _this.finished = false
               _this.loading = false
               _this.current = 1
               _this.getOrderList()
             }
           })

         }else{
           _this.$toast(res.msg)
         }
       })

    },
    cancelClickHandler (order_id) {
      var _this = this
       this.$api.goodsOrderDel({order_id:order_id}).then((res)=>{
         if (res.code === 1) {
           _this.$toast({
             message: res.msg,
             onClose: () => {
               _this.orderList = []
               _this.finished = false
               _this.loading = false
               _this.current = 1
               _this.getOrderList()
             }
           })

         }else{
           _this.$toast(res.msg)
         }
       })
    },
    tabClickHandler (index, status) {
      this.currentIndex = index
      this.status = status
      this.orderList = []
      this.finished = false
      this.loading = false
      this.getOrderList()
    },
    orderDetailHandler (order_id) {
      this.$router.push({name: 'OrderDetail',query:{id:order_id}})
    },
    getOrderList () {
      const param = {
        page: this.current,
        pageSize: 10,
        status: this.status
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.goodsOrderLists(param).then((res) => {
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

  },
  mounted () {
    this.getOrderList()
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
    &-item{
      width:20%;
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
    margin-top: 98px;
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
      }
      .orderclist{
        width:100%;
        display: flex;
        flex-direction: column;
        .ordercontent{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding:30px 0px;
          width:100%;
          border-bottom:1px solid #F3F3F3;
          img{
            width:156px;
            height:130px;
            border-radius: 8px;
            margin-right:15px;
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
      }
      .orderfooter{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top:15px;
        height:62px;
        align-items: center;
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
          }
        }
      }
    }
  }
}
</style>
