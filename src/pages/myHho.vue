<template>
  <div class="myXf">
    <div class="myXf-order" >
            <van-list
            v-model="loading"
            v-show="fxlist.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
      <div class="myXf-order-item" v-for="(item, index) in fxlist" :key="index" >
        <div class="myXf-order-top">
          <div class="ot1">订单编号：<span>864319955677</span></div>
          <div class="ot2">订单时间：<span>4月15日 19:14</span> </div>
          <div class="ot2">订单金额：<span>¥680.00</span> </div>
          <!-- 订单时间：4月15日 19:14 订单金额：¥680.00  -->
        </div>
        <div class="myXf-order-bottom">
          <div class="ob1">
            <img class="avatar" :src="item.user.avatar" />
            <span class="b1">{{item.user.nickname}}</span>
          </div>
          <div class="ob2">
            <span class="p1">预估收入：</span>
            <span class="p2">¥120.00</span>
          </div>
        </div>
      </div>
      </van-list>
    </div>
    <img class="myfooter" src="../assets/images/myfooter.png" alt="">
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  name: 'MyHho',
  data () {
    return {
      currentIndex: 2,
      finished: false,
      loading: false,
      current: 1,
      total: 0,
      userInfo: {},
      xflist: [],
      fxlist: []
    }
  },
  mounted () {
    this.getuserIndex()
    if (this.$route.query.current) {
      this.currentIndex = this.$route.query.current
    }
    this.getuserTakeout()
  },
  methods: {
    getuserTakeout () {
      const param = {
        page: this.current,
        pageSize: 10
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      if (this.currentIndex === 1) {
        this.$api.userTakeout(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false

            if (this.fxlist.length == 0) {
              // 第一次加载
              this.fxlist = res.data.data || []
              this.total = res.data.total
            } else if (this.fxlist.length < this.total) {
              // 加载更多
              this.fxlist = this.fxlist.concat(res.data.data)
            }
            if (this.fxlist.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      } else if (this.currentIndex === 0) {
        this.$api.userDistribution(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false

            if (this.fxlist.length == 0) {
              // 第一次加载
              this.fxlist = res.data.data || []
              this.total = res.data.total
            } else if (this.fxlist.length < this.total) {
              // 加载更多
              this.fxlist = this.fxlist.concat(res.data.data)
            }
            if (this.fxlist.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      } else if (this.currentIndex === 2) {
        param.order_type = 2
        this.$api.userDistributionList(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false

            if (this.fxlist.length == 0) {
              // 第一次加载
              this.fxlist = res.data.data || []
              this.total = res.data.total
            } else if (this.fxlist.length < this.total) {
              // 加载更多
              this.fxlist = this.fxlist.concat(res.data.data)
            }
            if (this.fxlist.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      } else if (this.currentIndex == 3) {
        param.order_type = 1
        this.$api.userDistributionList(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false

            if (this.fxlist.length == 0) {
              // 第一次加载
              this.fxlist = res.data.data || []
              this.total = res.data.total
            } else if (this.fxlist.length < this.total) {
              // 加载更多
              this.fxlist = this.fxlist.concat(res.data.data)
            }
            if (this.fxlist.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      }
    },
    onLoad () {
      if (this.fxlist.length < this.total) {
        this.current++
        this.getuserTakeout()
      }
    },
    getuserIndex () {
      this.$api.userIndex().then((result) => {
        if (result.code === 1) {
          this.userInfo = result.data
        }
      })
    },
    tabClickHandler (e) {
      this.currentIndex = e
      this.finished = false
      this.loading = false
      this.current = 1
      this.fxlist = []
      this.getuserTakeout()
    },
    linkClickHandler () {
      this.$router.push({name: 'MyTx', params: {money: this.userInfo.money}})
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
  width:30%
}
.des,.money{
  width:20%
}
.myXf{
  display: flex;
  flex-direction: column;
  min-height:100vh;
  background:#FBF8F4;
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
    &-item{
      display: flex;
      flex-direction: column;
      background: white;
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
    background: white;
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
</style>
