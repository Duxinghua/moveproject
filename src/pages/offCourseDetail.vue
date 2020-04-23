<template>
  <div class="offdetail">
    <div class="course-swiper">
      <van-swipe :autoplay="10000">
        <van-swipe-item
            v-for="(itemimg, index) in courseDetails.image"
            :key="index"
        >
            <van-image :src="itemimg">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="offdetail-top">
      <div class="offdetail-top-rec">
        <span class="title">{{courseDetails.title}}</span>
        <!-- {{courseDetails.description}} -->
        <span class="description">{{courseDetails.description}}</span>
        <span class="price">¥{{courseDetails.price}}</span>
        <div @click="shareOpen">
          <img src="../assets/images/offlinenjoy.png" alt="">
          <span>分享</span>
        </div>
      </div>
    </div>
    <div class="goods-group" v-if="type == 'tuan'">
      <div class="group-header">
        <h3>课程拼团</h3>
        <div class="right" @click="onLinkAll">查看全部拼团<img class="arrormore" src="../assets/images/fxend.png" alt=""/></div>
      </div>
      <div class="group-list">
        <GroupItem v-for="(item, index) in groupList" :key="index" :groupData="item"/>
        <div class="group-no" v-if="groupList.length == 0">
          <img src="../assets/images/tuan.png" alt="">
          <span>暂无拼团,快去拼团吧</span>
        </div>
      </div>
    </div>
    <div class="offdetail-course">
      <div class="offdetail-course-title">课程介绍</div>
      <p class="offdetail-course-con">我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色</p>
      <div class="offdetail-course-sec">
        <p>
          <span>开课时间</span>
          <span>{{datatime}}</span>
        </p>
        <p>
          <span>开课地址</span>
          <span>{{courseOffline.address}}</span>
        </p>
        <p>
          <span>主办单位</span>
          <span>有梦花居</span>
        </p>
      </div>
    </div>
    <div class="offdetail-teacher">
      <div class="offdetail-teacher-title">讲师介绍</div>
      <TeacherMsg :msgItem="msgItem" />
      <div class="offdetail-teacher-sec">
        <div v-for="(item,index) in tecImg" :key="index">
          <img :src="item.image ? item.image[0] : ''" alt="">
          <span>{{item.description}}</span>
        </div>

      </div>
    </div>
    <div class="offdetail-set">
      <div class="offdetail-set-title">课程设置</div>
      <div class="timeline" v-for="(item,index) in planList" :key="index">
        <div class="timeline-title">
          <img :src="item.img" alt="">
          <p>第{{item.id}}天</p>
        </div>
        <div class="timeline-body">
          <ul>
            <li v-for="i in planList[index].listItem" :key="i.id">
              <div class="bullet"></div>
              <div class="desc">{{i.content}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="goods-action">
      <div class="goods-money" @click="homeClick">
          <img src="../assets/images/carhome.png" alt="">
          <span>首页</span>
      </div>
      <div>
        <div class="goods-group-btn" @click="onTuan(courseId)" v-if="type == 'tuan'">
          <span>￥{{courseDetails.price_tuan}}</span>
          <em>发起拼团</em>
        </div>
        <div  :class="[buyClass]" @click="onBuy(courseId)">
          <span>￥{{courseDetails.price}}</span>
          <em>立即购买</em>
        </div>
      </div>
    </div>
    <WxShare :show="wxShare" @toShare="toShare" />
  </div>
</template>

<script>
import TeacherMsg from '@/components/teacherMsg.vue'
import GroupItem from '@/components/cource/groupItem.vue'
import WxShare from '@/components/wxshare.vue'
import config from '@/utils/config'
import getSitem from '@/utils/storage'
export default {
  name: 'OffCourseDetail',
  data () {
    return {
      // swiperCurrent: 0,
      bannerImg: [],
      courseDetails: {},
      courseOffline: {},
      user_number: null,
      wxShare: false,
      datatime: null,
      planList: [
        {
          id: 1,
          img: require('../assets/images/offlineset.png'),
          listItem: [
            {id: 1, content: '品牌规划：你要去哪里？'},
            {id: 2, content: '设计商业化'},
            {id: 3, content: '四个花束设计技巧：群组、阶梯、群组、阶梯'},
            {id: 4, content: '自然的包装方式'},
            {id: 5, content: '品牌规划：你要去哪里？'},
            {id: 6, content: '设计商业化'},
            {id: 7, content: '四个花束设计技巧：群组、阶梯、群组、阶梯'},
            {id: 8, content: '自然的包装方式'}
          ]
        },
        {
          id: 2,
          img: require('../assets/images/offlineset.png'),
          listItem: [
            {id: 1, content: '品牌规划：你要去哪里？'},
            {id: 2, content: '设计商业化'},
            {id: 3, content: '四个花束设计技巧：群组、阶梯、群组、阶梯'},
            {id: 4, content: '自然的包装方式'}
          ]
        }
      ],
      msgItem: {}, // 讲师详情
      tecImg: {}, // 讲师作品
      groupList: [],
      courseId: 0, // 课程id
      imageShow: false,
      isBuy: 0,
      sourceuid: '',
      type: 'single'
    }
  },
  mounted () {
    if (!getSitem.getStr('mobile')) {
      this.$router.push({name: 'Login'})
    }
    console.log(this.$route.query.id)
    this.courseId = this.$route.query.id
    if (this.$route.query.openid) {
      getSitem.setStr('pudd', this.$route.query.openid)
    }
    if (this.$route.query.sourceuid) {
      this.sourceuid = this.$route.query.sourceuid
    }
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
    this.courseDetail()
    this.courseTuanList()
  },
  methods: {
    // onSwipeChange (index) {
    //   this.swiperCurrent = index
    // },
    teacherDetail (a) {
      console.log(a)
    },
    homeClick () {
      this.$router.push({name: 'shopHome'})
    },
    shareOpen () {
      this.wxShare = true
    },
    toShare () {
      this.wxShare = false
    },
    courseDetail () {
      const param = {
        course_id: this.courseId
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.courseDetail(param).then((res) => {
        console.log(res, 'resdata')
        this.$toast.clear()
        if (res.code == 1) {
          this.courseDetails = res.data
          this.user_number = res.data.user_number
          this.courseOffline = res.data.courseOffline
          var t1 = res.data.courseOffline.open_time_end
          var text = ''
          var t2 = res.data.courseOffline.open_time_text.split(' ')[0]
          var t3 = ''
          if (t1 == 0) {
            text = t2
          } else {
            t3 = res.data.courseOffline.open_time_end_text.split(' ')[0]
            text = t2 + ' 至 ' + t3
          }
          this.datatime = text
          this.msgItem = res.data.admin
          this.tecImg = res.data.adminOpus ? res.data.adminOpus.slice(0, 3) : []
          // this.skuList = res.data.specs ? JSON.parse(res.data.specs) : []
          // console.log(res.data)
          console.log(res.data.title, res.data.description, 'title', 'des')
          var title = res.data.title
          var description = res.data.description
          var image = res.data.image ? res.data.image[0] : ''
          this.isBuy = res.data.is_buy
          this.wxs(title, description, image)
        } else if (res.code == 401 ) {
          localStorage.setItem('page', location.href)
          this.$router.push({
            path: '/auth'
          })
        }
      })
    },
    courseTuanList () {
      const param = {
        page: 1,
        pageSize: 10,
        course_id: this.courseId
      }
      this.$api.courseTuanList(param).then((res) => {
        if (res.code == 1) {
          var list = res.data.data.slice(0, 3)
          console.log(list)
          this.groupList = list
          // console.log(res.data)
        } else if (res.code == 401) {
          localStorage.setItem('page', location.href)
          this.$router.push({
            path: '/auth'
          })
        }
      })
    },
    onLinkAll () {
      this.$router.push({path: '/courseallgroup', query: {courseId: this.courseId}})
    },
    onTuan (courseId) {
      if (this.isBuy == 1) {
        this.$dialog.confirm({
          title: '提示',
          message: '您的课程已购买，确认再次购买吗？',
          confirmButtonColor: '#6D8160',
          cancelButtonColor: '#999999'
        }).then(() => {
          this.$router.push({path: '/submitCourseOrder', query: {courseId: courseId, type: 2, user_number: this.user_number}})
        }).catch(() => {
          // on cancel
        })
      } else {
        this.$router.push({path: '/submitCourseOrder', query: {courseId: courseId, type: 2, user_number: this.user_number}})
      }
    },
    onBuy (courseId) {
      if (this.isBuy == 1) {
        this.$dialog.confirm({
          title: '提示',
          message: '您的课程已购买，确认再次购买吗？',
          confirmButtonColor: '#6D8160',
          cancelButtonColor: '#999999'
        }).then(() => {
          if (this.sourceuid) {
            this.$router.push({path: '/submitCourseOrder', query: {sourceuid: this.sourceuid, courseId: courseId, type: 1, user_number: this.user_number}})
          } else {
            this.$router.push({path: '/submitCourseOrder', query: {courseId: courseId, type: 1, user_number: this.user_number}})
          }
        }).catch(() => {
          // on cancel
        })
      } else {
        if (this.sourceuid) {
          this.$router.push({path: '/submitCourseOrder', query: {sourceuid: this.sourceuid, courseId: courseId, type: 1, user_number: this.user_number}})
        } else {
          this.$router.push({path: '/submitCourseOrder', query: {courseId: courseId, type: 1, user_number: this.user_number}})
        }
      }
    },
    wxs (title, description, image) {
      var data = {
        url: location.href
      }
      var that = this
      var shareurl = ''
      if (getSitem.getStr('ispartner') == 0) {
        shareurl = config.baseurl + '/offcoursedetail?id=' + that.courseId + '&sourceuid=' + getSitem.getStr('userid')
      } else {
        shareurl = config.baseurl + '/offcoursedetail?id=' + that.courseId + '&openid=' + getSitem.getStr('openid') + '&sourceuid=' + getSitem.getStr('userid')
      }
      const agent = navigator.userAgent
      const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        data.url = config.shareurls
      }
      this.$api.userGetSignPackage(data).then((res) => {
        if (res.code === 1) {
          var wxpay = res.data
          wx.config({
            debug: false,
            appId: wxpay.appId,
            timestamp: wxpay.timestamp,
            nonceStr: wxpay.nonceStr,
            signature: wxpay.signature,
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'chooseImage',
              'uploadImage',
              'getLocalImgData'
            ]
          })
          wx.error(function (res) {
            console.log('出错了：' + res.errMsg)
          })
          // 在这里调用 API
          wx.ready(function () {
            wx.checkJsApi({
              jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'chooseImage',
                'uploadImage',
                'getLocalImgData'
              ],
              success: function (res) {

              }
            })
          })

          // 点击分享到朋友圈
          wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: description, // 分享描述
            link: config.gourl + encodeURIComponent(shareurl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: image, // 分享图标
            trigger: function (res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
              alert('用户点击分享到朋友圈')
            },
            success: function () {
              that.wxShare = false
              // 用户确认分享后执行的回调函数
              alert('分享成功')
            },
            cancel: function () {
              that.wxShare = false
              // 用户取消分享后执行的回调函数
              alert('分享取消')
            },
            fail: function (res) {
              alert(JSON.stringify(res))
            }
          })
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: description, // 分享描述
            link: config.gourl + encodeURIComponent(shareurl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: image, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              that.wxShare = false
              // 用户确认分享后执行的回调函数
              // alert('分享成功');
            },
            cancel: function () {
              that.wxShare = false
              // 用户取消分享后执行的回调函数
              // alert('分享取消');
            }
          })
        }
      })
    }
  },
  components: {
    TeacherMsg,
    WxShare,
    GroupItem
  },
  computed: {
    buyClass () {
      return {
        'goods-buy-btn': true,
        'noTuan': this.type == 'single'
        // 'noTuan': this.courseDetails.is_tuan == 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .offdetail{
    width:100%;
    background:#FBF8F4;
    padding-bottom: 100px;
    min-height: 100vh;
    overflow-x: hidden;
    overflow: auto;
    .course-swiper{
      width: 100%;
      height: 550px;
      position: relative;
      .van-image{
        width: 100%;
        height: 100%;
      }
      .van-swipe{
        height: 100%;
      }
    }
    &-top{
      width: 100%;
      border-bottom: 15px solid #F6F3EE;
      &-rec{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        // height: 221px;
        padding: 22px 154px 22px 25px;
        .title{
          font-size: 36px;
          color: #333333;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .description{
          font-size: 26px;
          line-height: 36px;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-top:15px;
        }
       .price{
          font-size: 32px;
          color: #995258;
          margin-top:18px;
        }
        div:last-child{
        position: absolute;
        top: 34px;
        right: 0;
        width: 112px;
        height: 58px;
        background-color: #6D8160;
        border-top-left-radius: 29px;
        border-bottom-left-radius: 29px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
          img{
            width: 27px;
            height: 27px;
            margin-right: 9px;
          }
          span{
            font-size: 26px;
            color: #F3D995;
          }
        }
      }
    }
    .goods-group{
      // margin-top: 15px;
      background: #FBF8F5;
      padding: 33px 25px;
      border-bottom: 15px solid #F6F3EE;
      .group-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:45px;
        h3{
          color: #6D8160;
          font-size: 36px;
          position: relative;
          width: fit-content;
          z-index: 2;
        }
        h3::before{
          position: absolute;
          content: '';
          display: block;
          width: 100%;
          height: 16px;
          background: #EEF1EC;
          border-radius: 8px;
          bottom: 8px;
          z-index: -1;
        }
        .right{
          color: #999999;
          font-size: 26px;
          display: flex;
          align-items: center;
          .arrormore{
            width:15px;
            height:24px;
            background:url('../assets/images/fxend.png') no-repeat;
            background-size: 100% 100%;
            margin-left:12px;
          }
        }
      }
      .group-list{
        .group-no{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px 0px;
          img{
            width: 160px;
            height: 104px;
          }
          span{
            color: #666666;
            font-size: 30px;
            margin-top: 40px;
          }
        }
      }
    }
    .offdetail-course,.offdetail-teacher,.offdetail-set{
      margin: 0 auto;
      padding: 40px 25px 35px 25px;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-around;
      border-bottom: 15px solid #F6F3EE;
    }
    .offdetail-set{
      border-bottom: 0 !important;
    }
    &-course{
      min-height: 300px;
      &-title{
        font-size: 36px;
        color: #6D8160;
        position: relative;
        z-index: 1;
        width:fit-content;
      }
      &-title::before{
        position: absolute;
        content: '';
        display: block;
        width: 100%;
        height: 16px;
        background: #EEF1EC;
        border-radius: 8px;
        bottom: 8px;
        z-index: -1;
      }
      &-con{
        font-size: 26px;
        line-height: 42px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        margin: 35px 0;
      }
      &-sec{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p{
          display: flex;
          flex-direction: row;
          justify-content: start;
          span{
            margin-right: 30px;
            font-size: 26px;
            line-height: 45px;
            color: #6D8160;
            // text-overflow: hidden;
            max-width: 500px;
          }
        }
      }
    }
    &-teacher{
      // min-height: 812px;
      &-title{
        font-size: 36px;
        color: #6D8160;
        margin-bottom: 40px;
        position: relative;
        z-index: 1;
        width:fit-content;
      }
      &-title::before{
        position: absolute;
        content: '';
        display: block;
        width: 100%;
        height: 16px;
        background: #EEF1EC;
        border-radius: 8px;
        bottom: 8px;
        z-index: -1;
      }
      &-sec{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 40px;
        // min-height: 550px;
        // padding-left: 4%;
        // padding-right: 4%;
        div{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          flex-wrap: nowrap;
          margin-bottom: 40px;
          img{
            width: 216px;
            height: 287.3px;
          }
          span{
          font-size: 26px;
          line-height: 36px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
        }
        }

      }
    }
    &-set{
      min-height: 600px;
      padding-left: 25px;
      padding-right: 25px;
      margin: 0 !important;
      &-title{
        font-size: 36px;
        color: #6D8160;
        position: relative;
        z-index: 1;
        width:fit-content;
        margin-bottom: 25px;
      }
      &-title::before{
        position: absolute;
        content: '';
        display: block;
        width: 100%;
        height: 16px;
        background: #EEF1EC;
        border-radius: 8px;
        bottom: 8px;
        z-index: -1;
      }
      .timeline{
        width: 100%;
        overflow: hidden;
        // margin: 0 auto;
        &-title{
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: center;
          img{
            width: 74px;
            height: 74px;
            margin-right: 16px;
          }
          p{
            font-size: 30px;
            color: #333333;
          }
        }
      }
      .timeline ul{
          width: 100%;
          padding: 0 0 0 30px;
          margin: 0;
          list-style: none;
          position: relative;
          z-index: 2;
      }
      .timeline ul::before{
          content: ' ';
          height: 100%;
          width: 2px;
          background-color: #F3F3F3;
          position: absolute;
          top: 0;
          left: 36px;
          z-index: -1;
      }
      .timeline ul li{
        height: 65px;
        line-height: 65px;
      }
      .timeline ul li div{
          display: inline-block;
          // margin: 20px 0;
          vertical-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }
      .timeline ul li .bullet{
          width: 12px;
          height: 12px;
          box-sizing: border-box;
          border-radius: 50%;
          background-color: #F3D995;
          z-index: 1;
          margin-right: 30px;
          margin-bottom: 4%;
      }
      .timeline ul li .desc{
          width: 73%;
          font-size: 26px;
          color: #666666;
      }
    }
    .goods-action{
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
      .goods-money{
        color: #333333;
        font-size: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
          width:48px;
          height:48px;
        }
        span{
          color: #995258;
          font-size: 16px;
          padding-top:2px;
          display:flex;
        }
      }
      >div{
        display: flex;
      }
      .goods-group-btn{
        line-height: 1.3;
        width: 243px;
        // padding-top:10px;
        padding: 10px;
        height: 90px;
        text-align: center;
        color: #fff;
        background: #DCC98B;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius:50px 0px 0px 50px;
          span{
            font-size: 30px;
          }
                em{
        font-size: 30px;
        font-style: normal;
       }
      }
      .goods-buy-btn{
        line-height: 1.3;
        width: 243px;
        // padding-top:10px;
        padding:10px;
        height: 90px;
        text-align: center;
        color: #F3D995;
        background: #6D8160;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius:0px 50px 50px 0px;
        span{
        font-size: 30px;
        }
              em{
        font-size: 30px;
        font-style: normal;
      }

      }
      .noTuan{
        border-radius: 50px;
      }
    }
  }
</style>
