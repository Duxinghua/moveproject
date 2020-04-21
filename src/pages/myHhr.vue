<template>
  <div class="myhrc">
    <div class="myhr" v-if="is_partner == 0">
      <img src="../assets/images/hhjoin.png" class="hhjoin" alt="">
      <div class="myhhbtn" @click="partnerClick">成为合伙人</div>
    </div>
    <div class="myXf" v-if="is_partner == 1">
      <div class="myXf-top">
        <img class="card" src="../assets/images/myxf.png" alt="">
        <div class="cardInfo">
          <div class="cardInfo-c">
            <span>预估收入</span>
            <span>{{userInfo.money}}</span>
            <span @click="linkClickHandler">提现</span>
          </div>
        </div>
        <div class="myXf-top-menu">
        </div>
        <div class="myxf-menu-wrap">
          <div class="myitem" @click="likeClickType('kc')">
            <img src="../assets/images/o1.png" alt="">
            <span>课程订单</span>
          </div>
          <div class="myitem" @click="likeClickType('sp')">
            <img src="../assets/images/o2.png" alt="">
            <span>商品订单</span>
          </div>
          <div class="myitem" @click="likeClickType('yh')">
            <img src="../assets/images/o3.png" alt="">
            <span>邀请好友</span>
          </div>
          <div class="myitem" @click="likeClickType('hh')">
            <img src="../assets/images/o4.png" alt="">
            <span>我的合伙人</span>
          </div>
        </div>
      </div>
      <img class="myfooter" src="../assets/images/myfooter.png" alt="">
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  name: 'MyHhr',
  data () {
    return {
      currentIndex: 2,
      finished: false,
      loading: false,
      current: 1,
      total: 0,
      userInfo: {},
      xflist: [],
      fxlist: [],
      is_partner: 0
    }
  },
  mounted () {
    this.getuserIndex()
    if (this.$route.query.is_partner) {
      this.is_partner = this.$route.query.is_partner
    }
  },
  methods: {
    getuserIndex () {
      this.$api.userIndex().then((result) => {
        if (result.code === 1) {
          this.userInfo = result.data
        }
      })
    },
    linkClickHandler () {
      this.$router.push({name: 'MyTx', params: {money: this.userInfo.money}})
    },
    partnerClick () {
      this.$router.push({name: 'Partner'})
    },
    likeClickType (arg) {
      var Links
      switch (arg) {
        case 'kc':
          Links = 'MyHho'
          break
        case 'sp':
          Links = 'MyHho'
          break
        case 'yh':
          Links = 'MyYq'
          break
        case 'hh':
          Links = 'MyHhl'
          break
      }
      if (arg === 'kc') {
        this.$router.push({name: Links, query: {type: 1}})
      } else if (arg === 'sp') {
        this.$router.push({name: Links, query: {type: 2}})
      } else {
        this.$router.push({name: Links})
      }
    }
  },
  components: {
    NoData
  }
}
</script>

<style lang="scss" scoped>
.myhrc{
  display: flex;
  flex-direction: column;
  width:100%;
  .myhr{
    width:100%;
    height:100vh;
    background:url('../assets/images/hhbg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .hhjoin{
      position: absolute;
      top:116px;
      left:50%;
      transform: translateX(-50%);
      width:542px;
      height:801px;
    }
    .myhhbtn{
      position: absolute;
      bottom: 100px;
      left:50%;
      transform: translateX(-50%);
      width:601px;
      height:98px;
      background:url('../assets/images/hhbtn.png') no-repeat;
      background-size: 100% 100%;
      font-size: 36px;
      color: white;
      font-weight: 400;
      line-height: 98px;
      text-align: center;
    }
  }
}
.time,.status{
  width:30%
}
.des,.money{
  width:20%
}
.myXf{
  display: flex;
  flex-direction: column;
  min-height:100vh;
  background:white;
  .myfooter{
      position: fixed;
      bottom: 0;
      left:0;
      width:100%;
      height:164px;
  }
  &-top{
    background:#FBF8F4;
    height:448px;
    padding-top:41px;
    position: relative;
    .card{
      width:640px;
      height:362px;
      display:flex;
      margin:0 auto;
    }
    .cardInfo{
      position: absolute;
      top:99px;
      left:111px;
      &-c{
        display: flex;
        flex-direction: column;
        color: #333;
        justify-content: flex-start;
        span:nth-child(1){
          font-size: 30px;
          text-indent: 2px;
        }
        span:nth-child(2){
          font-size: 62px;
          font-weight: bold;
        }
        span:nth-child(3){
          width:201px;
          height:68px;
          background:rgba(153,82,88,1);
          border-radius:34px;
          font-size: 36px;
          line-height: 68px;
          color:white;
          text-align: center;
          margin-top: 25px;
        }
      }
    }
    &-menu{
      display: flex;
      flex-direction: row;
      height:100px;
      justify-content: center;
      align-items: center;
      position: absolute;
      left:0;
      bottom: 0px;
      background:white;
      width:100%;
      span{
        font-size: 32px;
        color:#999999;
        width:25%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .active{
        font-size: 36px;
        color:#6D8160;
        position: relative;
      }
      .active::before{
        position: absolute;
        width:45px;
        content: '';
        height:4px;
        background:#6D8160;
        left:50%;
        bottom: -25px;
        transform: translateX(-50%)
      }
    }
  }
  &-content{
    display: flex;
    flex-direction: column;
    width:100%;
    background:white;
    &-item{
      display: flex;
      flex-direction: column;
      border-bottom: 15px solid #FBF8F4;
      &-top{
          padding-left:26px;
          padding-right:26px;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-top: 30px;
          padding-bottom: 30px;
          width:100%;
          border-bottom: 1Px solid #F3F3F3;
          .userIco{
            width:77px;
            height:77px;
            border-radius: 50%;
            margin-right:26px;
          }
          .userInfo{
            display: flex;
            flex-direction: column;
            width:476px;
            span:nth-child(1){
              font-size: 32px;
              color:#333;
              width:100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:nth-child(2){
              font-size: 26px;
              margin-top:10px;
              color:#666;
            }
          }
      }
      &-bottom{
        padding-left:26px;
        padding-right:26px;
        display: flex;
        justify-content: space-between;
        font-size: 30px;
        height:94px;
        align-items: center;
        color:#666666;
        .sl{
          color:#6D8160;
          margin-left:10px;
        }
        .sr{
          color:#995258;
          margin-left:10px;
        }
      }
    }
  }
  &-Fx{
    display: flex;
    flex-direction: column;
    padding-left: 26px;
    padding-right: 26px;
    background:white;
    &-top{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 88px;
      align-items: center;
      color: #999999;
      font-size: 26px;
      border-bottom: 1px solid #F3F3F3;
      span{
        display: flex;
        justify-content: center;
      }
    }
    &-content{
      display: flex;
      flex-direction: column;
      &-item{
        height: 80px;
        font-size: 26px;
        color:#333333;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #F3F3F3;
        span{
          display: flex;
          justify-content: center;
          align-items: center;
        }

      }
      &-item:last-child{
        border-bottom: 1px solid transparent;
      }
    }
  }
}
.myXf-order{
  display: flex;
  flex-direction: column;
  .myXf-order-item{
    display: flex;
    flex-direction: column;
    padding:30px 30px 10px 30px;
    box-sizing: border-box;
    width:100%;
    height: fit-content;
    border-bottom: 20px solid #FBF8F4;
    .myXf-order-top{
      display: flex;
      flex-direction:column;
      padding-bottom: 12px;
      border-bottom: 1px solid #F3F3F3;
      .ot1{
        height:36px;
        font-size:30px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:36px;
        margin-bottom: 12px;
      }
      .ot2{
        font-size:26px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height:48px;
        span{
          color:#333;
        }
      }
      .cover{
        width:240px;
        height:160px;
        margin-right:30px;
      }
      .des{
        width:420px;
        display: flex;
        flex-direction: column;
        .c1{
          font-size: 24px;
          font-weight: bold;
          color:#333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 15px;
        }
        .c2{
          font-size: 16px;
          color:#999;
          margin-bottom: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .c3{
          font-size: 20px;
          font-weight: bold;
          color:#995258;
        }
      }
    }
    .myXf-order-bottom{
      display: flex;
      flex-direction: row;
      height:80px;
      justify-content: space-between;
      align-items: center;
      .ob1,.ob2{
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: center;
        .p1{
          font-size: 26px;
          color:#999;
        }
        .p2{
          font-size: 26px;
          color:#995258;
          font-weight: bold;
        }
      }
      .avatar{
        width:50px;
        height:50px;
        border-radius: 50%;
        margin-right: 30px;
      }
      .b1{
        font-size: 26px;
        color:#6D8160;
        margin-right:26px;
      }
      .b2{
        font-size: 20px;
        color:#999;
      }
    }
  }
}
.myxf-menu-wrap{
  display: flex;
  padding:0 28px 28px 28px;
  box-sizing: border-box;
  flex-direction: row;
  flex-wrap: wrap;
  position: inherit;
  z-index: 100;
  margin-top:-10px;
  .myitem{
    width:50%;
    height:220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span{
      font-size: 26px;
      color:#333;
      margin-top:29px;
    }
  }
  .myitem:nth-child(1){
    border-bottom: 1px solid #F2F2F2;
    border-right:1px solid #F2F2F2;
    img{
      width:38px;
      height:48px;
    }

  }
  .myitem:nth-child(2){
    border-bottom: 1px solid #F2F2F2;
    img{
      width:44px;
      height:46px;
    }
  }
  .myitem:nth-child(3){
    border-right: 1px solid #F2F2F2;
    img{
      width:46px;
      height:46px;
    }
  }
  .myitem:nth-child(4){
    img{
      width:52px;
      height:49px;
    }
  }
}
</style>
