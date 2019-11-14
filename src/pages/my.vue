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
      <div class="my-header-tab">
        <div class="tabitem" @click="likeClickHandler('gz')">
          <span>1256</span>
          <span>我的关注</span>
        </div>
        <div class="tabitem" @click="likeClickHandler('xf')">
          <span>384</span>
          <span>学分</span>
        </div>
        <div class="tabitem" @click="likeClickHandler('fs')">
          <span>79</span>
          <span>粉丝</span>
        </div>
        <div class="tabitem" @click="likeClickHandler('bx')">
          <span>642</span>
          <span>被喜欢</span>
        </div>
      </div>
      <div class="my-header-ad">
        <img src="../assets/images/myad.png" alt="">
      </div>
      <div class="my-header-oc">
        <div class="oitem">
          <img src="../assets/images/sp.png" alt="">
          <span>商品订单</span>
        </div>
        <div class="oitem">
          <img src="../assets/images/kz.png" alt="">
          <span>课程订单</span>
        </div>
        <div class="oitem" @click="likeClickHandler('tz')">
          <img src="../assets/images/mt.png" alt="">
          <span>我的帖子</span>
        </div>
        <div class="oitem" @click="likeClickHandler('fx')">
          <img src="../assets/images/mf.png" alt="">
          <span>我的分销</span>
        </div>
      </div>
    </div>
    <div class="my-list">
      <div class="mlitem" @click="likeClickHandler('yy')">
        <img src="../assets/images/myy.png" alt="" />
        <span>我的预约记录</span>
      </div>
      <div class="mlitem" @click="likeClickHandler('xx')">
        <img src="../assets/images/mym.png" alt="" />
        <span>消息中心</span>
      </div>
      <div class="mlitem" @click="likeClickHandler('yq')">
        <img src="../assets/images/myf.png" alt="" />
        <span>邀请注册</span>
      </div>
      <div class="mlitem" @click="likeClickHandler('ab')">
        <img src="../assets/images/myg.png" alt="" />
        <span>关于我们</span>
      </div>
      <div class="mlitem" @click="likeClickHandler('pl')">
        <img src="../assets/images/myp.png" alt="" />
        <span>我的评论</span>
      </div>
    </div>
    <img src="../assets/images/myfooter.png" class="myfooter">
    <div class="myqd" v-if="qdShow">
      <div class="t-mb" @click="qdCloseHandler"></div>
      <div class="t-body">
        <div class="t-body-h">
          <img class="img1" src="../assets/images/qdico.png" alt="">
          <span>每日签到得学分</span>
          <img class="img2" src="../assets/images/qdclose.png" alt="" @click="qdCloseHandler">
        </div>
        <div class="t-body-b">
          <div class="title">
              今日签到可获得<img src="../assets/images/qdda.png" alt=""> 5学分
          </div>
          <div class="list">
            <div class="litem" v-for="(item,index) in qdList" :key="index">
              <img :src="item.check ? require('../assets/images/qdda.png') : require('../assets/images/qdd.png')" alt="">
              <span>第{{item.num}}天</span>
            </div>

          </div>
          <div class="btn">
            已经连续签到2天
          </div>
        </div>
      </div>
    </div>
    <Footer :wd="true" />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import Api from '@/api/index'
export default {
  name: 'My',
  data () {
    return {
      qdList: [
        {
          num: 1,
          check: true
        },
        {
          num: 2,
          check: true
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
          num: 6,
          check: false
        }
      ],
      qdShow: false,
      userInfo: {
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('log start')
    Api.userIndex().then((result)=>{
      if(result.code === 1) {
        this.userInfo = result.data
      }
    })
    console.log(to, from, next)
    next()
  },
  methods: {
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
      }
      this.$router.push({name: Links})
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
  &-header{
    display: flex;
    flex-direction: column;
    border-bottom: 15px solid #FBF8F4;
    &-info{
      display: flex;
      flex-direction: row;
      padding-left:26px;
      padding-right:26px;
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
          margin-top:40px;
        }
      }
    }
    &-tab{
      display: flex;
      flex-direction: row;
      width:100%;
      margin-top:59px;
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
      margin:40px auto;
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
      margin-bottom: 34px;
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
  }
  .myfooter{
    position: relative;
    width:750px;
    height:229px;
    left:0;
    bottom: 0;
    z-index: -1;
  }
  .myqd{
    .t-mb{
      position: fixed;
      left:0;
      top:0;
      z-index: 1000000;
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
      z-index: 1000001;
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
      }
    }
  }
}
</style>
