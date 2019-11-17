<template>
  <div class="myXf">
    <div class="myXf-top">
      <img class="card" src="../assets/images/myxf.png" alt="">
      <div class="cardInfo">
        <div class="cardInfo-c">
          <span>账户余额</span>
          <span>{{userInfo.money}}</span>
          <span @click="linkClickHandler">提现</span>
        </div>
      </div>
      <div class="myXf-top-menu">
        <span :class="{active: current === 0 ? true : false}" @click="tabClickHandler(0)">好友分销</span>
        <span :class="{active: current === 1 ? true : false}" @click="tabClickHandler(1)">提现记录</span>
      </div>
    </div>
    <div class="myXf-content" v-if="current === 0">
      <div class="myXf-content-item" v-for="(item, index) in xflist" :key="index" >
        <div class="myXf-content-item-top">
            <img class="userIco" :src="item.avatar" alt="">
            <div class="userInfo">
              <span>{{item.username}}</span>
              <span>注册时间:{{item.date}}</span>
            </div>
        </div>
        <div class="myXf-content-item-bottom">
          <div>累计消费金额:<span class="sl">¥{{item.fxnum}}</span></div>
          <div>返还金额:<span class="sr">¥{{item.srnum}}</span></div>
        </div>

      </div>
      <NoData v-if="xflist.length === 0"/>
    </div>
    <div class="myXf-Fx" v-if="current === 1">
      <div class="myXf-Fx-top">
        <span class="time">时间</span>
        <span class="des">详情</span>
        <span class="money">金额</span>
        <span class="status">状态</span>
      </div>
      <div class="myXf-Fx-content">
        <div class="myXf-Fx-content-item" v-for="(item, index) in fxlist" :key="index">
          <span class="time">{{item.time}}</span>
          <span class="des">{{item.des}}</span>
          <span class="money">¥{{item.money}}</span>
          <span class="status">{{item.status}}</span>
        </div>
      </div>
    </div>
    <img class="myfooter" src="../assets/images/myfooter.png" alt="">
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  name: 'MyFx',
  data () {
    return {
      current: 0,
      userInfo: {},
      xflist: [
        {
          avatar: require('../assets/images/people.png'),
          username: 'XXX肖战',
          date: '2019.10.11 15:28',
          fxnum: 6800,
          srnum: 250
        },
        {
          avatar: require('../assets/images/people.png'),
          username: 'XXX肖战',
          date: '2019.10.11 15:28',
          fxnum: 6800,
          srnum: 250
        },
        {
          avatar: require('../assets/images/people.png'),
          username: 'XXX肖战',
          date: '2019.10.11 15:28',
          fxnum: 6800,
          srnum: 250
        },
        {
          avatar: require('../assets/images/people.png'),
          username: 'XXX肖战',
          date: '2019.10.11 15:28',
          fxnum: 6800,
          srnum: 250
        }

      ],
      fxlist: [
        {
          time: '2019.11.08',
          des: '转至支付宝账户',
          money: '120000',
          status: '提现失败'
        },
        {
          time: '2019.11.08',
          des: '转至支付宝账户',
          money: '120000',
          status: '提现失败'
        },
        {
          time: '2019.11.08',
          des: '转至支付宝账户',
          money: '120000',
          status: '提现失败'
        },
        {
          time: '2019.11.08',
          des: '转至支付宝账户',
          money: '120000',
          status: '提现失败'
        }
      ]
    }
  },
  mounted () {
    this.getuserIndex()
  },
  methods: {
    getuserIndex () {
    this.$api.userIndex().then((result) => {
      if (result.code === 1) {
        this.userInfo = result.data
      }
    })
    },
    tabClickHandler (e) {
      this.current = e
    },
    linkClickHandler () {
      this.$router.push({name: 'MyTx',params: {money: this.userInfo.money}})
    }
  },
  computed: {
    autoIco (type) {
      var links
      switch (type) {
        case 1:
          links = require('../assets/images/myxfzl.png')
          break
        case 2:
        case 3:
          links = require('../assets/images/myxfxx.png')
          break
        case 4:
          links = require('../assets/images/myxfft.png')
          break
      }
      return links
    }
  },
  components: {
    NoData
  }
}
</script>

<style lang="scss" scoped>
.time,.status{
  width:20%
}
.des,.money{
  width:30%
}
.myXf{
  display: flex;
  flex-direction: column;
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
          margin-top: 45px;
        }
      }
    }
    &-menu{
      display: flex;
      flex-direction: row;
      height:105px;
      justify-content: center;
      align-items: center;
      position: absolute;
      left:0;
      bottom: 0;
      background:white;
      width:100%;
      border-bottom: 2px solid #F3F3F3;
      span{
        font-size: 32px;
        color:#999999;
        padding-left:24px;
        padding-right:24px;
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
          border-bottom: 1px solid #F3F3F3;
          .userIco{
            width:77px;
            height:77px;
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
    .myfooter{
      position: fixed;
      bottom: 0;
      left:0;
      width:100%;
      height:164px;
    }
  }
  &-Fx{
    display: flex;
    flex-direction: column;
    padding-left: 26px;
    padding-right: 26px;
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
</style>
