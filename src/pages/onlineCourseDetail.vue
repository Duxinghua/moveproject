<template>
  <div class="ondetail">
      <div class="ondetail-video">
          <img src="../assets/images/offlinedetail.png" alt="">
      </div>
      <div class="ondetail-top">
        <ul class="ondetail-top-list">
          <li :class="{active:current == 0}" @click="menuHandler(0)">视频介绍</li>
          <li :class="{active:current == 1}" @click="menuHandler(1)">相关花材</li>
          <li :class="{active:current == 2}" @click="menuHandler(2)">作业交流</li>
        </ul>
        <div class="ondetail-top-list">
          <span :class="{active:current == 0}"></span>
          <span :class="{active:current == 1}"></span>
          <span :class="{active:current == 2}"></span>
        </div>
      </div>
      <div class="ondetail-rec-content" v-if="pageType == 0">
        <div class="ondetail-title">
          <div>{{onlineMsg.title}}</div>
          <p>{{onlineMsg.description}}</p>
        </div>
        <div class="goods-group">
          <div class="group-header">
            <h3>课程拼团</h3>
            <div class="right" @click="onLinkAll">查看全部拼团<van-icon name="arrow" /></div>
          </div>
          <div class="group-list">
            <GroupItem v-for="(item, index) in groupList" :key="index" :groupData="item"/>
            <div class="group-no">
              <img src="../assets/images/tuan.png" alt="">
              <span>暂无拼团,快去拼团吧</span>
            </div>
          </div>
        </div>
        <div class="ondetail-teacher">
          <TeacherMsg :msgItem="msgItem"></TeacherMsg>
          <div class="ondetail-teacher-content">
            {{msgItem.description}}
          </div>
          <div class="ondetail-teacher-works">
            <p>作品</p>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="onLoad"
            >
              <div class="teacher-works">
                <TeacherWorks v-for="item in teacherWorks" :key="item.id" :item="item"></TeacherWorks>
              </div>
            </van-list>
          </div>
        </div>
      </div>
      <div class="ondetail-flower-content" v-if="pageType == 1">
        <div class="ondetail-flowers">
          <div class="ondetail-flowers-item" v-for="(item,index) in flowerLists" :key="index">
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
            <div>
              <span v-for="(i,itemPl,index) in item.item_json" :key="index">{{i}}:{{itemPl}}</span>
            </div>
          </div>
          <NoData v-if="flowerLists.length == 0"/>
        </div>
      </div>
      <div class="ondetail-task-content" v-if="pageType == 2">
        <div class="ondetail-tasks">
          <div class="ondetail-tasks-item" v-for="item in comments" :key="item.id">
            <div class="task-msg">
              <div>
                <img :src="item.avatar" alt="">
                <span>{{item.nickname}}</span>
                <span>{{item.create_time}}</span>
              </div>
              <div>
                <span :class="{active:item.amity == 1}">{{item.likes}}</span>
                <img @click="likeHandler(item.amity,item.id)" :src="item.amity === 1 ? require('../assets/images/taskheart.png') : require('../assets/images/taskheart_cancell.png')" alt="">
                <!-- <img v-show="like == item.amity" @click="likeHandler(item.amity,item.id)" src="../assets/images/taskheart_cancell.png" alt=""> -->
              </div>
            </div>
            <div class="task-content">{{item.content}}</div>
            <div class="task-img">
              <div class="img" v-for="(i,index) in item.images" :key="index"><img :src="i" alt=""></div>
            </div>
          </div>
          <NoData v-if="comments.length == 0"/>
          <div class="task-todo" @click="doTask"><img src="../assets/images/tasktodo.png" alt=""></div>
        </div>
      </div>
      <div class="ondetail-action">
        <div class="ondetail-money">合计<span>￥{{onlineMsg.price}}</span></div>
        <div>
            <div class="ondetail-group-btn" @click="onTrun(courseId)">发起拼团</div>
            <div class="ondetail-buy-btn" @click="onBuy(courseId)">立即购买</div>
        </div>
      </div>
      <!-- <van-popup v-model="popupStatus" round :safe-area-inset-bottom="true" position="bottom">
        <div class="sku-content">
            <div class="sku-header">
              <img src="../assets/images/banners.png" alt="">
              <div class="price">
                <div class="money">
                  <span>￥299.99</span>
                  <em>￥399</em>
                </div>
                <div class="attri">请选择数量</div>
              </div>
            </div>
            <div class="sku-row">
                <div class="sku-title">数量</div>
                <div class="sku-list">
                    <van-stepper disable-input v-model="num" />
                </div>
            </div>
            <div class="submit" @click="onSubmit">确认</div>
        </div>
      </van-popup> -->
  </div>
</template>

<script>
import TeacherMsg from '@/components/teacherMsg.vue'
import TeacherWorks from '@/components/teacherWorks.vue'
import NoData from '@/components/nodata'

export default {
  name: 'OnlineCourseDetail',
  data () {
    return {
      num: 1,
      current: 0,
      pageType: 0,
      courseId: 0,
      id: "",
      // like: 0,
      onlineMsg: {},
      msgItem: {},
      teacherWorks: [],
      flowerLists: [],
      groupList: [],
      comments: [],
      commentUser: {},
      commentsImg: [],
      finished: false,
      loading: false,
      popupStatus: false
    }
  },
  mounted () {
    console.log(this.$route.query.id)
    this.courseId = this.$route.query.id
    this.onlineDetail()
    this.flowerList()
    this.courseComment()
  },
  methods: {
    menuHandler (index) {
      this.current = index
      this.pageType = index
    },
    onSubmit () {
      // if (this.skuIndex == -1) {
      //   this.$toast('请选择规格')
      //   return false
      // }
      this.$router.push('/submitCourseOrder')
    },
    doTask () {
      this.$router.push('/doTask')
    },
    onlineDetail () {
      const param ={
        course_id: this.courseId
      }
      this.$api.courseDetail(param).then((res) => {

        // this.$toast.clear()
        if (res.code == 1) {
          this.onlineMsg = res.data
          this.msgItem = res.data.admin
          this.id = res.data.admin.id
          // this.courseDetails = res.data
          // this.courseOffline = res.data.courseOffline
          // this.msgItem = res.data.admin
          // this.tecImg = res.data.adminOpus
          // this.skuList = res.data.specs ? JSON.parse(res.data.specs) : []
          // console.log(res.data)
          this.getWorksList()
        }
      })
    },
    getWorksList () {
      const param = {
        page: this.current,
        pageSize: 10,
        admin_id: this.id
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.teacherWorksList(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false
          // console.log(res.data)
          if (this.teacherWorks.length == 0) {
            // 第一次加载
            this.teacherWorks = res.data.data || []
            this.total = res.data.total
          } else if (this.teacherWorks.length < this.total) {
            // 加载更多
            this.teacherWorks = this.teacherWorks.concat(res.data.data)
          }
          if (this.teacherWorks.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.teacherWorks.length < this.total) {
        this.current++
        this.getWorksList()
      }
    },
    courseTuanList () {
      const param = {
        page: 1,
        pageSize: 10,
        course_id: this.courseId
      }
      this.$api.courseTuanList(param).then((res) => {
        if (res.code == 1) {
          this.groupList = res.data.data
          // console.log(res.data)
        }
      })
    },
    flowerList () {
      const param = {
        course_id: this.courseId,
        page: 1,
        pageSize: 9
      }
      this.$api.flowers(param).then((res) => {
        // console.log(res)
        if (res.code == 1) {
          // this.flowerLists = res.data.data
          // console.log(res.data.data)
          this.flowerLists = res.data.data
        }
      })
    },
    courseComment () {
      const param = {
        course_id: this.courseId,
        page: 1,
        pageSize: 4
      }
      this.$api.courseComment(param).then((res) => {
        if (res.code == 1) {
          console.log(res.data.data)
          var list = []
          res.data.data.map((item)=>{
            item.id = item.id
            item.amity = item.amity
            item.likes = item.likes
            item.images = item.images
            item.nickname = item.user ? item.user.nickname : ''
            item.avatar = item.user ? item.user.avatar : ''
            list.push(item)
          })
          this.comments = list
        }
      })
    },
    likeHandler (amity,id) {
      this.$api.courseSaveLike({comment_id:id}).then((res) => {
        if (res.code === 1) {
          console.log(res)
          this.$toast({
            message: res.msg,
            onClose: () => {
              this.comments = []
              // this.finished = false
              // this.loading = false
              this.courseComment()
            }
          })
        }
      })
    },
    onLinkAll () {
      this.$router.push('/allGroup')
    },
    onBuy (courseId) {
      // this.popupStatus = true
      this.$router.push({path: '/submitCourseOrder', query: {courseId:courseId, type:1}})
    },
    onTrun (courseId) {
      this.$router.push({path: '/submitCourseOrder', query: {courseId:courseId, type:2}})
    }
  },
  components: {
    TeacherMsg,
    TeacherWorks,
    NoData
  }
}
</script>

<style lang="scss" scoped>
.ondetail{
  display: flex;
  flex-direction: column;
  width:100%;
  background:#FBF8F4;
  min-height: 100vh;
  overflow-x: hidden;
  overflow: auto;
  &-tasks{
    /deep/  .nodata{
      position: absolute;
      margin-top:25%;
    }
  }
  &-video{
      width: 100%;
      height: 500px;
      img{
        width:750px;
        height: 500px;
      }
  }
  &-top{
    width:100%;
    height:106px;
    background:#FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left:54px;
    padding-right:54px;
    box-sizing: border-box;
    &-list{
      display: flex;
      flex-direction: row;
      align-items: center;
      li.active{
        font-size: 36px;
        color:#6D8160;
      }
      span.active{
        background-color: #6D8160;
      }
    }
    &-list li {
      height: 98px;
      line-height: 100px;
      margin-left: 40px;
      margin-right: 40px;
      font-size: 32px;
      color:#999999;
    }
    &-list span{
      width: 66px;
      height: 5px;
      margin-left: 75px;
      margin-right: 75px;
      background-color: #ffffff;
      border-radius: 10%;

    }
  }
  &-title{
    width: 100%;
    height: 144px;
    padding-left: 33px;
    border-bottom: 15px solid #F6F3EE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    div{
      font-size: 36px;
      color: #333333;
      border-bottom: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p{
      font-size: 26px;
      color: #666666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .goods-group{
    background: #FBF8F5;
    padding: 40px 25px 35px 25px;
    border-bottom: 15px solid #F6F3EE;
    .group-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3{
        color: #6D8160;
        font-size: 36px;
      }
      .right{
        color: #999999;
        font-size: 26px;
        display: flex;
        align-items: center;
        .van-icon{
            font-size: 34px;
            color: #D4B589;
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
  &-teacher{
    padding: 40px 25px 35px 25px;
    // display: flex;
    // flex-direction: column;
    border-bottom: 15px solid #F6F3EE;
    &-content{
      font-size: 26px;
      line-height: 36px;
      color: #333333;
      margin-top: 45px;
      margin-bottom: 45px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    &-works{
      display: flex;
      flex-direction: column;
      // width:100%;
      // min-height: 500px;
      padding-bottom: 160px;
      p{
        font-size: 36px;
        color: #6D8160;
      }
      .teacher-works{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-top: 35px;
      }
    }
  }
  &-flowers{
    width: 100%;
    padding: 45px 24px 80px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    /deep/  .nodata{
      position: absolute;
      margin-top:25%;
    }
    &-item{
      display: flex;
      flex-direction: column;
      width: 216px;
      margin-right: 26px;
      margin-bottom: 37px;
      img{
        width: 216px;
        height: 287px;
      }
      p{
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30px;
        color:#333;
        line-height: 36px;
        margin-top: 18px;
      }
      div{
        height: 87px;
        margin-top: 18px;
        display: flex;
        flex-direction: column;
        // justify-content: space-around;
      }
      div span {
        font-size: 24px;
        color: #999999;
        line-height: 32px;
      }
    }
    &-item:nth-child(3n){
        margin-right:0px !important;
    }
  }
  &-tasks{
    width: 100%;
    padding: 27px 25px 150px;
    position: relative;
    &-item{
      margin-top: 17px;
      padding-bottom: 30px;
      // position: relative;
      // display: flex;
      // flex-direction: column;
      &::after{
        content: "";
        display: inline-block;
        width: 610px;
        height: 1Px;
        background: #F1EEEA;
        position: absolute;
        bottom: 0px;
        right: 0px;
        // transform: scale(0.5);
      }
      &:last-child{
        &::after{
            display: none;
        }
      }
      .task-msg{
        display: flex;
        justify-content: space-between;
        align-items: center;
        div:first-child{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: start;
          align-items: center;
          // max-width: 528px;
          img{
            width: 65px;
            height: 65px;
            border-radius: 50%;
            margin-right: 20px;
          }
          span{
            font-size: 26px;
            color: #333333;
            margin-right: 20px;
          }
          span:last-child{
            // width: 158px;
            font-size: 26px;
            color: #999999;
          }
        }
        div:last-child{
          display: flex;
          flex-direction: row;
          align-items: center;
          span{
            font-size: 26px;
            color: #000;
            margin-right: 8px;

          }
          span.active{
            color: #995258;
          }
          img{
            width: 37px;
            height: 32px;
          }
        }
      }
      .task-content{
        color: #333333;
        margin-top: 10px;
        font-size: 26px;
        padding-left: 85px;
      }
      .task-img{
        margin-top: 30px;
        padding-left: 85px;
        display: flex;
        // flex-direction: row;
        flex-flow: wrap;
        justify-content: space-between;
        align-items:center;
        // margin-left: 30px;
        .img{
          width: 188px;
          height: 140px;
          border-radius: 8px;
          overflow: hidden;
          // margin-right: 21px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .task-todo{
      position: fixed;
      bottom: 120px;
      right: 9px;
      img{
        width: 114px;
        height: 114px;
      }
    }
  }
  &-action{
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
    .ondetail-money{
      color: #333333;
      font-size: 30px;
      display: flex;
      align-items: center;
      span{
        color: #995258;
        font-size: 36px;
        margin-left: 15px;
      }
    }
    >div{
      display: flex;
    }
    .ondetail-group-btn{
      width: 220px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #fff;
      background: #DCC98B;
      border-radius:40px 0px 0px 40px;
      font-size: 34px;
    }
    .ondetail-buy-btn{
      width: 220px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #F3D995;
      background: #6D8160;
      font-size: 34px;
      border-radius:0px 40px 40px 0px;
    }
  }
  // .sku-content{
  //   padding: 45px 35px 25px 35px;
  //   .sku-header{
  //       display: flex;
  //       align-items: center;
  //       margin-bottom: 50px;
  //       img{
  //           width: 200px;
  //           height: 150px;
  //       }
  //       .price{
  //           margin-left: 20px;
  //           .money{
  //               span{
  //                   color: #995258;
  //                   font-size: 30px;
  //                   font-weight: 500;
  //               }
  //               em{
  //                   color: #999999;
  //                   font-size: 26px;
  //                   text-decoration: line-through;
  //                   margin-left: 10px;
  //                   font-style: normal;
  //               }
  //           }
  //           .attri{
  //               color: #333333;
  //               font-size: 24px;
  //           }
  //       }
  //   }
  //   .sku-row{
  //       .sku-title{
  //           color: #333333;
  //           font-size: 26px;
  //           margin-bottom: 20px;
  //           margin-top: 20px;
  //       }
  //       .sku-list{
  //           display: flex;
  //           // .sku-item{
  //           //     padding: 12px 26px;
  //           //     border-radius: 6px;
  //           //     border: 1Px solid #E3E3E3;
  //           //     font-size: 24px;
  //           //     color: #333333;
  //           //     margin-right: 20px;
  //           //     cursor: pointer;
  //           //     transition: all .3s;
  //           // }
  //           // .active{
  //           //     border-color: #CDA871;
  //           //     color: #CDA871;
  //           // }
  //           /deep/ .van-stepper{
  //               border: 1Px solid #D3D3D3;
  //               border-radius: 6px;
  //                 .van-stepper__minus, .van-stepper__plus{
  //                   width: 80px;
  //                   height: 55px;
  //                   background: #fff;
  //                   &::before{
  //                       width: 13Px;
  //                       height: 1Px;
  //                   }
  //                   &::after{
  //                       width: 1Px;
  //                       height: 13Px;
  //                   }
  //               }
  //               input{
  //                   width: 115px;
  //                   margin: 0px;
  //                   height: 100%;
  //                   border-left: 1Px solid #D3D3D3;
  //                   border-right: 1Px solid #D3D3D3;
  //                   border-bottom: 1Px solid #D3D3D3;
  //                   background: #fff;
  //                   font-size: 24px;
  //               }
  //               input[disabled]{
  //                   color: #333333;
  //                   -webkit-text-fill-color:#333333;
  //                   -webkit-opacity: 1;
  //               }
  //           }
  //       }
  //   }
  //   .submit{
  //       width: 100%;
  //       height: 90px;
  //       text-align: center;
  //       line-height: 90px;
  //       color: #F3D995;
  //       font-size: 36px;
  //       background:url('../assets/images/buy-bg.png') 100%/100% no-repeat;
  //       margin-top: 40px;
  //   }
  // }
}
</style>
