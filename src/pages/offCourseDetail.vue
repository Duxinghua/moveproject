<template>
  <div class="offdetail">
    <div class="offdetail-top">
      <img src="../assets/images/offlinedetail.png" alt="">
      <div class="offdetail-top-rec">
        <div>插花设计中的4种色彩搭配方式</div>
        <p>我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色。</p>
        <span>¥1248</span>
        <div>
          <img src="../assets/images/offlinenjoy.png" alt="">
          <span>分享</span>
        </div>
      </div>
    </div>
    <div class="offdetail-course">
      <div class="offdetail-course-title">课程介绍</div>
      <p>我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色</p>
      <div class="offdetail-course-sec">
        <p>
          <span>开课时间</span>
          <span>2019-10-22 9:00-12:00</span>
        </p>
        <p>
          <span>开课地址</span>
          <span>武汉市武汉市武汉市武汉市武汉市</span>
        </p>
        <p>
          <span>主办单位</span>
          <span>有梦不晚</span>
        </p>
      </div>
    </div>
    <div class="offdetail-teacher">
      <div class="offdetail-teacher-title">讲师介绍</div>
      <!-- <div class="offdetail-teacher-msg">
        <img src="../assets/images/people.png" alt="">
        <div>
          <span>柯杏林</span>
          <p>知音花艺协会副会长兼秘书长秘书长</p>
        </div>
        <span class="offdetail-teacher-btn">已关注</span>
      </div> -->
      <TeacherMsg :msgItem="msgItem" />
      <div class="offdetail-teacher-sec">
        <div>
          <img src="../assets/images/video1.png" alt="">
          <img src="../assets/images/video1.png" alt="">
          <img src="../assets/images/video1.png" alt="">
        </div>
        <div>我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色我们通常会把能够给人予温暖的感觉得颜色称为暖色，暖色系列包括红色、紫色、黄等颜色我们通常会把能够给人予温暖的感觉得颜色称为暖色</div>
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
  </div>
</template>

<script>
import TeacherMsg from '@/components/teacherMsg.vue'

export default {
  name: 'OffCourseDetail',
  data () {
    return {
      msgItem: {
        img: '',
        name: '',
        msg: ''
      },
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
      ]
    }
  },
  mounted () {
    this.msgItem.img = this.$route.query.img
    this.msgItem.name = this.$route.query.name
    this.msgItem.des = this.$route.query.des
    console.log(this.$route.query.id)
  },
  components: {
    TeacherMsg
  }
}
</script>

<style lang="scss" scoped>
  .offdetail{
    display: flex;
    flex-direction: column;
    width:100%;
    background:#FBF8F4;
    &-top{
      display: flex;
      flex-direction: column;
      width: 100%;
      border-bottom: 15px solid #F6F3EE;
      img{
        width:749px;
        height: 500px;
      }
      &-rec{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 221px;
        padding: 14px 154px 0 25px;
        div:first-child{
          font-size: 36px;
          color: #333333;
          font-weight: 500;
        }
        p{
          font-size: 26px;
          color: #999999;
          // font-weight: 500;
          text-overflow: ellipsis;
        }
        span{
          font-size: 32px;
          color: #995258;
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
    .offdetail-course,.offdetail-teacher,.offdetail-set{
      margin: 0 auto;
      padding-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 15px solid #F6F3EE;
    }
    &-course{
      min-height: 501px;
      padding-left: 4%;
      padding-right: 4%;
      &-title{
        font-size: 36px;
        color: #6D8160;
      }
      p{
        font-size: 26px;
        line-height: 42px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
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
            color: #6D8160;
            // text-overflow: hidden;
            max-width: 500px;
          }
        }
      }
    }
    &-teacher{
      min-height: 812px;
      &-title{
        font-size: 36px;
        color: #6D8160;
        padding-left: 4%;
        padding-right: 4%;
      }
      // &-msg{
      //   display: flex;
      //   flex-direction: row;
      //   justify-content: space-between;
      //   align-items: center;
      //   // margin: 40px 0;
      //   img{
      //     width: 85px;
      //     height: 85px;
      //   }
      //   div{
      //     width: 368px;
      //     display: flex;
      //     flex-direction: column;
      //     // padding: 50px 0;
      //     span{
      //       font-size: 32px;
      //       color: #333333;
      //       margin-bottom: 6px;
      //     }
      //     p{
      //       width: 100%;
      //       font-size: 26px;
      //       color: #666666;
      //       overflow: hidden;
      //       text-overflow: ellipsis;
      //       // line-height: 36px;
      //       display: -webkit-box;
      //       -webkit-box-orient: vertical;
      //       -webkit-line-clamp: 1;
      //     }
      //   }
      //   .offdetail-teacher-btn{
      //     width: 172px;
      //     height: 62px;
      //     border: 1px solid #CDA871;
      //     border-radius: 31px;
      //     color: #CDA871;
      //     font-size: 30px;
      //     text-align: center;
      //     line-height: 62px;
      //   }
      // }
      &-sec{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        min-height: 550px;
        padding-left: 4%;
        padding-right: 4%;
        div:first-child{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          img{
            width: 216px;
            height: 287.3px;
          }
        }
        div:last-child{
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
    &-set{
      min-height: 600px;
      padding-left: 4%;
      padding-right: 4%;
      margin: 0 !important;
      &-title{
        font-size: 36px;
        color: #6D8160;
        padding: 20px 0 30px 0;
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
      }
      .timeline ul::before{
          content: ' ';
          height: 100%;
          width: 2px;
          background-color: #F3F3F3;
          position: absolute;
          top: 0;
          left: 36px;
          z-index: 0;
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
  }
</style>
