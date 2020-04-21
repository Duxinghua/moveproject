<template>
  <div class="my">
    <div class="my-header">
      <div class="my-header-info">
        <img class="avatar" :src="userInfo.avatar ? userInfo.avatar : require('../assets/images/people.png')" alt="">
        <div class="myInfos">
          <div class="myInfos-wrap">
            <div class="des">
              <span>{{userInfo.nickname}}</span>
              <span>{{userInfo.bio}}</span>
            </div>
            <div class="qd" @click="qdClickHandler">
              <img src="../assets/images/jf.png" alt="">
              <span>签到</span>
            </div>
          </div>
          <span class="myInfos-edit" @click="editHandler">编辑资料</span>
        </div>
      </div>
      <div class="my-header-tab" style="display:none">
        <div class="tabitem" @click="likeClickHandler('gz')">
          <span>{{userInfo.follow}}</span>
          <span>我的关注</span>
        </div>
        <div class="tabitem" @click="likeClickHandler('xf')">
          <span>{{userInfo.score}}</span>
          <span>花币</span>
        </div>
        <div class="tabitem" @click="likeClickHandler('fs')">
          <span>{{userInfo.by_follow}}</span>
          <span>粉丝</span>
        </div>
        <div class="tabitem" @click="likeClickHandler('bx')">
          <span>{{userInfo.likes}}</span>
          <span>被喜欢</span>
        </div>
      </div>
      <div class="my-header-oc">
        <div class="oitem" @click="likeClickHandler('st')">
          <img src="../assets/images/sp.png" alt="">
          <span>商品订单</span>
        </div>
        <div class="oitem" @click="likeClickHandler('zt')">
          <img src="../assets/images/kz.png" alt="">
          <span>课程订单</span>
        </div>
        <div class="oitem" @click="likeClickHandler('fx')">
          <img src="../assets/images/myshare.png" alt="">
          <span>分享推广</span>
        </div>
        <div class="oitem" @click="likeClickHandler('hh')">
          <img src="../assets/images/mf.png" alt="">
          <span>合伙人</span>
        </div>
      </div>
    </div>
    <div class="my-header-ad" @click="likeGo" >
        <img :src="slideList.image+''" alt="">
    </div>
    <div class="my-list">
      <div class="mlitem" @click="likeClickHandler('yy')">
        <img src="../assets/images/myy.png" alt="" />
        <span>课程中心</span>
      </div>
      <div class="mlitem" @click="likeClickHandler('xx')">
        <img src="../assets/images/mym.png" alt="" />
        <span>消息中心</span>
      </div>
      <div class="mlitem" style="display:none" @click="likeClickHandler('yq')">
        <img src="../assets/images/myf.png" alt="" />
        <span>邀请好友</span>
      </div>
      <div class="mlitem" style="display:none"  @click="likeClickHandler('hhr')">
        <img src="../assets/images/myf.png" alt="" />
        <span>邀请合伙人</span>
      </div>
      <div class="mlitem" @click="likeClickHandler('ab')">
        <img src="../assets/images/myg.png" alt="" />
        <span>关于我们</span>
      </div>
      <div class="mlitem" @click="likeClickHandler('pl')">
        <img src="../assets/images/myp.png" alt="" />
        <span>我的评论</span>
      </div>
      <div class="mlitem mlitemfix" @click="likeClickHandler('ad')">
        <img src="../assets/images/address.png" alt="" />
        <span>地址管理</span>
      </div>
    </div>
    <img src="../assets/images/myfooter.png" class="myfooter">
    <div class="myqd" v-if="qdShow">
      <div class="t-mb" @click="qdCloseHandler"></div>
      <div class="t-body">
        <div class="t-body-h">
          <img class="img1" src="../assets/images/qdico.png" alt="">
          <span>每日签到得花币</span>
          <img class="img2" src="../assets/images/qdclose.png" alt="" @click="qdCloseHandler">
        </div>
        <div class="t-body-b">
          <div class="title">
              今日签到可获得<img src="../assets/images/qdda.png" alt=""> {{signValue}}花币
          </div>
          <div class="list">
            <div class="litem" v-for="(item,index) in qdList" :key="index">
              <img :src="item.check ? require('../assets/images/qdda.png') : require('../assets/images/qdd.png')" alt="">
              <span>第{{item.num}}天</span>
            </div>

          </div>
          <div :class="{btn:true,qdbtn:qdcontrol}" @click="qdFuClickHandler">
            {{qdText}}
          </div>
        </div>
      </div>
    </div>
    <Footer :wd="true" />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import getSitem from '@/utils/storage'
export default {
  name: 'My',
  data () {
    return {
      qdList: [
        {
          num: 1,
          check: false
        },
        {
          num: 2,
          check: false
        },
        {
          num: 3,
          check: false
        }, {
          num: 4,
          check: false
        }, {
          num: 5,
          check: false
        },
        {
          num: 6,
          check: false
        },
        {
          num: 7,
          check: false
        }
      ],
      qdShow: false,
      userInfo: {},
      userSignList: [],
      qdText: '立即签到',
      currentDate: '',
      qdcontrol: false, // 今天是否签到
      signValue: 5,
      slideList: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to, from, next)
    next()
  },
  mounted () {
    if (!getSitem.getStr('mobile')) {
      this.$router.push({name: 'Login'})
    }
    this.currentDate = this.formatTime(1)
    this.getUserinfo()
    this.getBanner()
    this.$api.commonConfig({name: 'sign'}).then((res) => {
      if (res.code === 1) {
        this.signValue = res.data.value
      }
    })
    this.getUserSignLists()
  },
  methods: {
    likeGo () {
      if (this.userInfo.is_apply == 1) {
        this.$router.push({name: 'MyHhr', query: {is_partner: this.userInfo.is_partner}})
      } else {
        this.$toast('您是合伙人下线，不能申请合伙人')
      }
    },
    getBanner () {
      this.$api.indexBanner({type: 2}).then((res) => {
        if (res.code == 1) {
          this.slideList = res.data[0]
          this.$forceUpdate()
        }
      })
    },
    getUserinfo () {
      this.$api.userIndex().then((result) => {
        if (result.code === 1) {
          this.userInfo = result.data
        }
      })
    },
    formatTime (time) {
      var date = ''
      if (time != 0 && time != 1) {
        date = new Date(time * 1000)
      } else if (time == 0) {
        date = new Date(0)
      } else if (time == 1) {
        date = new Date()
      }
      var getyear = date.getFullYear()
      var getmonth = date.getMonth() + 1
      var getday = date.getDate()
      return getyear + '-' + getmonth + '-' + getday
    },
    getUserSignLists () {
      var _this = this
      this.$api.userSignLists().then((result) => {
        console.log(result)
        if (result.code === 1) {
          if (_this.currentDate == _this.formatTime(result.data.sign_time)) {
            _this.qdcontrol = true
            _this.qdText = '已经连续签到' + result.data.days + '天'
          } else {
            _this.qdcontrol = false
            _this.qdText = '立即签到'
          }
          _this.qdList.map((item) => {
            if (item.num <= result.data.days) {
              item.check = true
            }
          })
          _this.$forceUpdate()
        }
      })
    },
    qdFuClickHandler () {
      var _this = this
      this.$api.userSaveSign().then((result) => {
        if (result.code === 1) {
          this.$toast({
            message: result.msg,
            onClose: () => {
              _this.getUserSignLists()
              _this.getUserinfo()
            }
          })
        } else {
          this.$toast(result.msg)
        }
      })
    },
    qdClickHandler () {
      this.qdShow = true
    },
    qdCloseHandler () {
      this.qdShow = false
    },
    editHandler () {
      this.$router.push({name: 'MyEdit'})
    },
    likeClickHandler (arg) {
      console.log(arg, 'arg')
      var Links
      switch (arg) {
        case 'gz':
          Links = 'MyGz'
          break
        case 'xf':
          Links = 'MyXf'
          break
        case 'fs':
          Links = 'MyFs'
          break
        case 'bx':
          Links = 'MyBx'
          break
        case 'fx':
          Links = 'MyFx'
          break
        case 'yq':
          Links = 'MyYq'
          break
        case 'xx':
          Links = 'MyXx'
          break
        case 'yy':
          Links = 'MyYy'
          break
        case 'tz':
          Links = 'MyTz'
          break
        case 'pl':
          Links = 'MyPl'
          break
        case 'ab':
          Links = 'About'
          break
        case 'st':
          Links = 'OrderList'
          break
        case 'zt':
          Links = 'CourseOrderList'
          break
        case 'ad':
          Links = 'addressList'
          break
        case 'hh':
          Links = 'MyHhr'
          break
      }
      if (arg === 'xf') {
        this.$router.push({name: Links, query: {score: this.userInfo.score}})
      } else if (arg === 'hh') {
        if (this.userInfo.is_apply == 1) {
          this.$router.push({name: Links, query: {is_partner: this.userInfo.is_partner}})
        } else {
          this.$toast('您是合伙人下线，不能申请合伙人')
        }
      } else {
        this.$router.push({name: Links})
      }
    }
  },
  components: {
    Footer
  }
}
</script>

<style lang="scss" scoped>
.my{
  display: flex;
  flex-direction:column;
  padding-top:34px;
  min-height: 100vh;
  background:#fff;
  &-header{
    display: flex;
    flex-direction: column;
    // border-bottom: 15px solid #FBF8F4;
    &-info{
      display: flex;
      flex-direction: row;
      padding-left:26px;
      padding-right:26px;
      margin-bottom: 26px;
      justify-content: space-between;
      width:100%;
      .avatar{
        width:118px;
        height:118px;
        margin-right:26px;
        border-radius: 50%;
      }
      .myInfos{
        width:555px;
        display: flex;
        flex-direction: column;
        &-wrap{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width:100%;
          .des{
            width:400px;
            font-size: 32px;
            color: #333;
            display: flex;
            flex-direction: column;
            margin-right:26px;
            span:nth-child(2){
              font-size: 26px;
              color:#666666;
            }
          }
          .qd{
            width:128px;
            height:52px;
            background:rgba(205,168,113,1);
            border-radius:26px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            img{
              width:25px;
              height:27px;
              margin-right:11px;
            }
            span{
              font-size: 26px;
              color:white;
            }
          }
        }
        &-edit{
          width:550px;
          height:65px;
          background:rgba(255,255,255,1);
          border:2px solid rgba(205, 168, 113, 1);
          border-radius:33px;
          line-height: 65px;
          text-align: center;
          font-size: 28px;
          color:#CDA871;
          margin-top:20px;
        }
      }
    }
    &-tab{
      display: flex;
      flex-direction: row;
      width:100%;
      margin-top:30px;
      .tabitem{
        width:calc(25% - 1px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right:1px solid #EEEEEE;
        span:nth-child(1){
          font-size:36px;
          color:#333;
        }
        span:nth-child(2){
          font-size: 26px;
          color:#666;
          margin-top:10px;
        }
      }
      .tabitem:last-child{
        border-right:1px solid transparent;
      }
    }
    &-ad{
      width:700px;
      height:160px;
      margin:15px auto;
      img{
        width:100%;
        height:100%;
        border-radius: 8px;
      }
    }
    &-oc{
      width:100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 26px;
      .oitem{
        width:25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          width:103px;
          height:103px;
        }
        span{
          font-size: 30px;
          margin-top:15px;
          color:#333;
        }
      }
    }
  }
  &-list{
    display: flex;
    flex-direction: column;
    width:100%;
    .mlitem{
      height:98px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left:26px;
      margin-right:26px;
      border-bottom: 1px solid #F2EEE9;
      img{
        width:36px;
        height:38px;
        margin-right:26px;
      }
      span{
        color:#333333;
        font-size: 30px;
      }
    }
    .mlitemfix{
      img{
        width:43.2px;
        height:45.6px;
        margin-right:18.8px
      }
    }
  }
  .myfooter{
    position: relative;
    width:750px;
    height:229px;
    left:0;
    bottom: 0;
    // z-index: -1;
  }
  .myqd{
    .t-mb{
      position: fixed;
      left:0;
      top:0;
      z-index: 1200;
      background:rgba(1,1,1,0.6);
      width:100%;
      height:100%;
    }
    .t-body{
      position: fixed;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      width:552px;
      height:642px;
      background:white;
      border-radius: 18px;
      z-index: 1201;
      &-h{
        height:93px;
        width:100%;
        display: flex;
        flex-direction: row;
        padding-left:26px;
        padding-right:26px;
        background:#738666;
        align-items: center;
        border-radius: 18px 18px 0 0;
        .img1{
          width:45px;
          height:47px;
          margin-right:15px;
        }
        span{
          font-size: 32px;
          color:#F3D995;
          flex:1;
        }
        .img2{
          width:31px;
          height:30px;
        }
      }
      &-b{
        display: flex;
        flex-direction: column;
        .title{
          font-size: 26px;
          color:#333333;
          display: flex;
          align-items: center;
          margin:37px auto;
          img{
            width:31px;
            height:30px;
            margin:0 10px;
          }
        }
        .list{
          display:flex;
          flex-direction: row;
          justify-content: flex-start;
          flex-wrap: wrap;
          .litem{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width:25%;
            margin-bottom: 30px;
            img{
              width:72px;
              height:71px;
            }
            span{
              font-size: 26px;
              margin-top:15px;
              color:#666666;
            }
          }
        }
        .btn{
          width:469px;
          height:82px;
          background:rgba(255,255,255,1);
          border:2px solid rgba(205, 168, 113, 1);
          border-radius:41px;
          color:#CDA871;
          font-size: 30px;
          line-height: 82px;
          text-align: center;
          margin:25px auto;
        }
        .qdbtn{
          width:469px;
          height:82px;
          background:#CDA871;
          border:2px solid rgba(205, 168, 113, 1);
          border-radius:41px;
          color:white;
          font-size: 30px;
          line-height: 82px;
          text-align: center;
          margin:25px auto;
        }
      }
    }
  }
}
</style>
