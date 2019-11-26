<template>
  <div class="orderdetail">
    <div class="orderdetail-top">
      <div class="orderwlinfo">
        <div class="orderwlinfoimg">
              <van-image :src="order_detail.tipsimage">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
        </div>
        <div class="orderwl">
          <span>{{order_detail.tipst1}}</span>
          <span>{{order_detail.tipst2}}</span>
        </div>
      </div>
      <div class="orderlist">
        <div class="ordercontent" v-for="(goodsitem,index) in order_detail.goods" :key="index">
            <div class="ordercontentimg">
              <van-image :src="goodsitem.images">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
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
      <div class="orderItem">
        <span>商品总价：</span>
        <span>¥{{order_detail.price_amount}}</span>
      </div>
      <div class="orderItem">
        <span>运费：</span>
        <span>¥{{order_detail.express_price}}</span>
      </div>
      <div class="orderItem">
        <span>优费：</span>
        <span>¥{{order_detail.price_deduction}}</span>
      </div>
      <div class="orderItem total">
        <span>实付款（含运费）</span>
        <span>¥{{order_detail.price_pay}}</span>
      </div>
      <div class="orderItem orderItemfix" v-if="order_detail.status == 1 || order_detail.status == 3 && order_detail.is_comment == 0 ">
          <span class="btn" v-if="order_detail.status == 1" @click="refundHandler(order_detail.order_id)">退款</span>
          <span class="btn" v-if="order_detail.status == 3 && order_detail.is_comment == 0">评价</span>
      </div>
    </div>
    <div class="orderdetail-tuan" v-if="order_detail.t_id != 0 && order_detail.goodsTuan">
      <span>拼团成功</span>
      <div class="avatars">
        <img :src="itemav.avatars" alt="" v-for="(itemav,index) in order_detail.goodsTuan" :key="index">
        <!-- <img src="../assets/images/img2.png" alt="">
        <img src="../assets/images/img3.png" alt=""> -->
        <img src="../assets/images/img4.png" alt="">
      </div>
      <img class="fx" src="../assets/images/fx.png" alt="">
    </div>
    <div class="orderdetail-content">
      <div class="header">
        <span>
          订单详情
        </span>
      </div>
      <div class="address">
        <span>收货人</span>
        <div class="infos">
          <span>{{order_detail.address_name}}</span>
          <span>{{order_detail.address_mobile}}</span>
          <span>{{order_detail.addressInfo}}</span>
        </div>
      </div>
      <div class="orderother">
        <span>订单编号</span>
        <span>{{order_detail.order_code}}</span>
      </div>
      <div class="orderother">
        <span>快递公司</span>
        <span>{{order_detail.express_cp}}</span>
      </div>
      <div class="orderother">
        <span>快递单号</span>
        <span>{{order_detail.express_num}}</span>
      </div>
      <div class="orderother">
        <span>下单时间</span>
        <span>{{formatTime(order_detail.create_time)}}</span>
      </div>
    </div>
    <div class="orderdetail-btns" v-if="order_detail.status == 0">
      <span class="cancel" v-if="order_detail.status == 0" @click="cancelClickHandler(order_detail.order_id)">
        关闭订单
      </span>
      <span class="success" v-if="order_detail.status == 0" @click="payClickHandler(order_detail.order_id)">
        立即付款
      </span>
      <span class="repay" v-if="false">重新购买</span>
    </div>
  </div>
</template>

<script>
import area from '@/utils/area'
export default {
  name: 'OrderDetail',
  data () {
    return {
      order_id: null,
      order_detail: {},
      tips: [
        {
          image: require('../assets/images/orderpay.png'),
          t1: '等待买家付款',
          t2: '剩23小时59分自动关闭'
        },
        {
          image: require('../assets/images/ordersend.png'),
          t1: '等待卖家发货',
          t2: '卖家会尽快为您发货'
        },
        {
          image: require('../assets/images/ordersend.png'),
          t1: '卖家已发货',
          t2: '请卖家收到货之后，确认收货'
        },
        {
          image: require('../assets/images/ordersuccess.png'),
          t1: '交易成功',
          t2: '买家已经确认收货'
        },
        {
          image: require('../assets/images/orderclose.png'),
          t1: '订单已关闭',
          t2: '订单已超过可支付时间，请重新购买。'
        }

      ]
    }
  },
  mounted () {
    this.order_id = this.$route.query.id
    this.getDetail()
  },
  methods: {
    refundHandler (order_id) {
      this.$router.push({name:'OrderRefund',query:{id:order_id}})
    },
    payClickHandler (order_id) {
      var _this = this
      this.$api.goodsOrderPayOrder({order_id: order_id}).then((res)=>{
        if(res.code === 1){
          this.$toast({
            message: res.msg,
            onClose: () => {
              _this.getDetail()
            }
          })
        }else{
          this.$toast(res.msg)
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

               _this.getDetail()
             }
           })

         }else{
           _this.$toast(res.msg)
         }
       })
    },
    formatTime (time) {
      var date  = ""
      if (time) {
        date = new Date(time*1000)
      }else{
        date = new Date()
      }
      var getyear = date.getFullYear()
      var getmonth = date.getMonth() + 1
      var getday = date.getDate()
      var gethours = date.getHours()
      var getminute = date.getMinutes()
      return getyear + '-' + getmonth + '-' + getday + ' ' + gethours + ':'+ getminute
    },
    getDetail () {
      this.$api.goodsOrderIndex({order_id:this.order_id}).then((res)=>{
        if(res.code === 1) {
          var address = res.data.address_text
          var arr = address.split('，')
          var list = []
          this.order_detail = res.data
          if(arr.length){
            list.push(area.province_list[arr[0]])
            list.push(area.city_list[arr[1]])
            list.push(area.county_list[arr[2]])
            list.push(arr[3])
            this.order_detail.addressInfo = list.join()
          }else{
            this.order_detail.addressInfo = ''
          }
          var status = res.data.status
          this.order_detail.tipsimage = this.tips[status].image
          this.order_detail.tipst1 = this.tips[status].t1
          this.order_detail.tipst2 = this.tips[status].t2
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.orderdetail{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FBF8F4;
  &-tuan{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height:147px;
    width:100%;
    background: white;
    margin-top:15px;
    font-size: 30px;
    color:#333333;
    padding:0 26px;
    .fx{
      width:17px;
      height:30px;
    }
    .avatars{
      display: flex;
      height:76px;
      width:243px;
      position: relative;
      margin-left:269px;
      img:nth-child(1){
        width:76px;
        height:76px;
        position: absolute;
        left:0;
        top:0;
        z-index: 1;
      }
      img:nth-child(2){
        width:76px;
        height:76px;
        position: absolute;
        left:52px;
        top:0;
        z-index: 2;
      }
      img:nth-child(3){
        width:76px;
        height:76px;
        position: absolute;
        left:111px;
        top:0;
        z-index: 3;
      }
      img:nth-child(4){
        width:76px;
        height:76px;
        position: absolute;
        left:167px;
        top:0;
        z-index: 4;
      }
    }
  }
  &-top{
   display: flex;
   flex-direction: column;
   background:white;
   padding:26px 26px 0px 26px;
    .orderwlinfo{
      display: flex;
      flex-direction: row;
      padding-bottom: 26px;
      border-bottom: 1px solid #F3F3F3;
      .orderwlinfoimg{
        width:91px;
        height:91px;
        margin-right:35px;
        overflow: hidden;
        .van-image{
          width:100%;
          height:100%;
        }
      }
      .orderwl{
        display: flex;
        flex-direction: column;
        span:nth-child(1){
          font-size: 30px;
          color:#333;
          margin-top:13px;
        }
        span:nth-child(2){
          font-size: 24px;
          color:#999;
        }
      }
    }
    .orderlist{
      display: flex;
      width:100%;
      flex-direction: column;
      .ordercontent{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding:30px 0px;
            width:100%;
            // border-bottom:1px solid #F3F3F3;
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
              position: relative;
              .ol{
                display: flex;
                flex-direction: column;
                font-size: 30px;
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
    .orderItem{
      font-size: 26px;
      color:#666;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px 0px;
      align-items: center;
      border-bottom: 1px solid #F3F3F3;
      position: relative;
              .btn{
                width:146px;
                height:58px;
                background:rgba(255,255,255,1);
                border:2px solid rgba(205, 168, 113, 1);
                border-radius:29px;
                text-align: center;
                line-height: 58px;
                color:rgba(205, 168, 113, 1);
                font-size: 30px;
                position:absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%)
              }
    }
    .orderItemfix{
      height:100px;
    }
    .total{
      padding:30px 0;
      font-size: 32px;
      span:nth-child(1){
        color:#333;
      }
      span:nth-child(2){
        color:#6D8160
      }
      border-bottom: 1px solid transparent;
    }
  }
  &-content{
    display: flex;
    flex-direction: column;
    background:white;
    padding:0px 26px 26px  26px;
    margin-top:15px;

    .header{
      padding:26px 0;
      color:#6D8160;
      font-size: 36px;
      position: relative;
      span{
        width: fit-content;
        position: absolute;
        left:0;
        top:50%;
        transform: translate(0%,-50%);
      }
      span::before{
        position: absolute;
        content: '';
        height: 16px;
        width:100%;
        background:#EEF1EC;
        border-radius: 8px;
        left:0;
        bottom: 0;
        z-index: -1;
      }
    }
    .address{
      font-size: 26px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding:26px 0px;
      border-bottom: 1px solid #F3F3F3;
      span:nth-child(1){
        color: #999999;
        width:150px;
      }
      .infos{
        display: flex;
        flex-direction: column;
        span{
          color:#333333;
          font-size: 26px;
          line-height: 42px;
        }
      }
    }
    .orderother{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      font-size: 26px;
      padding:20px 0px;
      align-items: center;
      border-bottom: 1px solid #f3f3f3;
      span:nth-child(1){
        width:150px;
        color:#999999;
      }
      span:nth-child(2){
        color:#333333;
      }
    }
    .orderother:last-child{
      border-bottom: 1px solid transparent;
    }
  }
  &-btns{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin:44px 0px;
    span{
      width:250px;
      height:86px;
      border-radius:43px;
      font-size: 36px;
      text-align: center;
      line-height: 86px;
      margin:0px 11px;
    }
    .cancel{
      background:white;
      color:#999999;
    }
    .success{
      background:#738666;
      color:#F3D995;
    }
    .repay{
      background:#738666;
      color:#F3D995;
      width:90%;
    }
  }
}
</style>
