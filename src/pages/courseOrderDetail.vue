<template>
  <div class="orderdetail">
    <div class="orderdetail-top">
      <div class="ordercontent">
          <div class="ordercontentimg">
              <van-image :src="detail.image">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
          </div>
          <div class="ordercenter">
            <div class="ol">
              <span class="s1">{{detail.title}}</span>
              <span class="s1 s2">{{detail.nickname}}</span>
              <div><span class="s3">¥</span><span class="s4">{{detail.price}}</span></div>
            </div>
            <span class="s5">x 1</span>
            <!-- <span class="btn">退款</span> -->
          </div>
      </div>
      <div class="orderItem">
        <span>合计：¥{{detail.price_pay}}</span>
        <!-- <span class="btn">取消预约</span> -->
      </div>
    </div>
    <div class="orderdetail-tuan" v-if="detail.t_id != 0 " @click="sharelHandler(detail.t_id)">
      <span>拼团状态 {{goodsTuanText[detail.courseTuanStatus]}}</span>
      <div class="avatars">
        <div :key="index" v-for="(itemav,index) in detail.courseTuanUsers">
          <img :class="{active:itemav.active}" :src="itemav.avatar" alt="" />
        </div>
      </div>
      <img class="fx" src="../assets/images/fx.png" alt="">
    </div>
    <div class="orderdetail-content" v-if="detail.type === 3">
      <div class="header kx">
        <span>
          核销码
        </span>
        <span>{{detail.hx_status == 0 ? '未核销' : '已核销' }}</span>
      </div>
      <div class="orderkx">
        <span>{{detail.hx_code}}</span>
      </div>

    </div>
    <div class="orderdetail-content">
      <div class="header">
        <span>
          订单详情
        </span>
      </div>
      <div class="orderother">
        <span>姓名</span>
        <span>{{detail.true_name}}</span>
      </div>
      <div class="orderother">
        <span>手机号码</span>
        <span>{{detail.mobile_ap}}</span>
      </div>
      <div class="orderother" v-if="detail.type == 3">
        <span>身份证号</span>
        <span>{{detail.idcard}}</span>
      </div>
      <div class="orderother">
        <span>订单编号</span>
        <span>{{detail.order_code}}</span>
      </div>
      <div class="orderother">
        <span>下单时间</span>
        <span>{{formatTime(detail.create_time)}}</span>
      </div>
    </div>
    <!-- <div class="orderdetail-btns">
      <span class="cancel" v-if="false">
        关闭订单
      </span>
      <span class="success" v-if="false">
        立即付款
      </span>
      <span class="repay">重新购买</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'CourseOrderDetail',
  data () {
    return {
      order_id: '',
      detail: {},
      goodsTuanText:[
        '进行中',
        '成功',
        '解散'
      ]
    }
  },
  mounted () {
    this.order_id = this.$route.query.id
    this.getCourseOrderIndex()
  },
  methods:{
    sharelHandler (tid){
      this.$router.push({path:'/coursegroupdetails',query:{id:tid}})
    },
    onLook () {

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
    getCourseOrderIndex () {
      this.$api.courseOrderIndex({order_id:this.order_id}).then((res)=>{
        if(res.code == 1){
          this.detail = res.data
          this.detail.courseTuanStatus = res.data.courseTuan.status
          var list = []
          var arr = res.data.courseTuan.users
          var l = res.data.courseTuan.user_number
          console.log(l,'l')

          for(var i=0;i<l;i++){
            var obj = {}
            if(i != 3){
              if(arr[i]){
                obj = arr[i]
                obj.active = false
              }else{
                if(i == 0 || i == 1 || i == 2){
                  obj.active = true
                  obj.avatar = require('../assets/images/doubt.png')

                }
              }
            }else{

                obj.active = false
                obj.avatar = require('../assets/images/img4.png')

            }
            list.push(obj)
          }
          console.log(list)
          this.detail.courseTuanUsers = list
          this.$forceUpdate()
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
      img{
        width:91px;
        height:91px;
        margin-right:35px;
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
            .btn{
              width:146px;
              height:58px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(205, 168, 113, 1);
              border-radius:29px;
              text-align: center;
              line-height: 58px;
              color:rgba(205, 168, 113, 1);
              font-size: 30px;
              position:absolute;
              right: 0;
              bottom: -26px;
            }
          }
          .s5{
            font-size: 28px;
            color:#333;
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
      .btn{
        width:180px;
        height:62px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(227, 227, 227, 1);
        border-radius:31px;
        color:#666666;
        font-size: 30px;
        line-height: 62px;
        text-align: center;
      }
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
    padding:26px 26px 0px 26px;
    margin-top:15px;
    .header{
      padding:26px 0;
      color:#6D8160;
      font-size: 36px;
      position: relative;
      span:nth-child(1){
        width: fit-content;
        position: absolute;
        left:0;
        top:50%;
        transform: translate(0%,-50%);
      }
      span:nth-child(2){
        width: fit-content;
        position: absolute;
        right:0;
        top:50%;
        transform: translate(0%,-50%);
        color:#CDA871;
        font-size: 30px;
      }
      span:nth-child(1)::before{
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
    .orderkx{
      display: flex;
      span{
        width:200px;
        height:62px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(205, 168, 113, 1);
        border-radius:31px;
        color:#CDA871;
        font-size: 32px;
        text-align: center;
        line-height: 62px;
        margin:40px 0px;
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
    .orderother:last-child(){
      border-bottom: 1px solid transparent;
    }

  }
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
      // width:243px;
      position: relative;
      // margin-left:200px;
      div{
        background:white;
        .active{
          position: relative;
          left:50%;
          top:50%;
          width:60% !important;
          height:60% !important;
          transform: translate(-50%,-50%)
        }
      }
      div:nth-child(1){
        border-radius: 50%;
        border:1px solid #DCDCDC;
        width:76px;
        height:76px;
        position: absolute;
        left:0;
        top:0;
        z-index: 1;
        img{
          width:100%;
          height:100%;
          border-radius: 50%;
        }
      }
      div:nth-child(2){
        border-radius: 50%;
        border:1px solid #DCDCDC;
        width:76px;
        height:76px;
        position: absolute;
        left:52px;
        top:0;
        z-index: 2;
        img{
          width:100%;
          height:100%;
          border-radius: 50%;
        }
      }
      div:nth-child(3){
        width:76px;
        height:76px;
        position: absolute;
        left:111px;
        top:0;
        z-index: 3;
        border-radius: 50%;
        border:1px solid #DCDCDC;
        img{
          width:100%;
          height:100%;
          border-radius: 50%;
        }
      }
      div:nth-child(4){
        border-radius: 50%;
        background: transparent!important;
        border:1px solid #DCDCDC;
        width:76px;
        height:76px;
        position: absolute;
        left:167px;
        top:0;
        z-index: 4;
        img{
          width:100%;
          height:100%;
          border-radius: 50%;
        }
      }
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
