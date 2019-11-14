<template>
  <div class="teacherdetail">
    <TeacherMsg :msgItem="msgItem"></TeacherMsg>
    <div class="teacherdetail-content">
      <p>插花是一条修行的路，用分享美好之心对待生活；在喧嚣的人事走向自然逍遥之境，田园之美，作品大气沉稳，清丽淡雅，天地人和谐共处，自然而然。</p>
      <img src="../assets/images/teacherdetail.png" alt="">
    </div>
    <div class="teacherdetail-works">
      <div class="teacherdetail-works-title">
        <img src="../assets/images/workslleft.png" alt="">
        <span>作品</span>
        <img src="../assets/images/worksright.png" alt="">
      </div>
      <div class="teacher-works">
        <TeacherWorks v-for="item in teacherWorks" :key="item.id" :item="item"></TeacherWorks>
      </div>
    </div>
  </div>
</template>

<script>
import TeacherMsg from '@/components/teacherMsg.vue'
import TeacherWorks from '@/components/teacherWorks.vue'

export default {
  name: 'Teacher',
  data () {
    return {
      msgItem: {
        img: require('../assets/images/people.png'),
        name: '柯杏林',
        msg: '知音花艺协会副会长兼秘书长秘书长'
      },
      teacherWorks: [
        {
          id: 1,
          img: require('../assets/images/onlineworks.png'),
          title: '残荷听雨',
          des: '杏林 2019.1020'
        },
        {
          id: 2,
          img: require('../assets/images/onlineworks.png'),
          title: '残荷听雨',
          des: '杏林 2019.1020'
        },
        {
          id: 3,
          img: require('../assets/images/onlineworks.png'),
          title: '秋水伊人',
          des: '杏林 2019.1020'
        },
        {
          id: 4,
          img: require('../assets/images/onlineworks.png'),
          title: '喜迎军运',
          des: '杏林 2019.1020'
        },
        {
          id: 5,
          img: require('../assets/images/onlineworks.png'),
          title: '残荷听雨',
          des: '杏林 2019.1020'
        },
        {
          id: 6,
          img: require('../assets/images/onlineworks.png'),
          title: '残荷听雨',
          des: '杏林 2019.1020'
        }
      ]
    }
  },
  mounted () {
    console.log(this.$route.query.index.id)
  },
  components: {
    TeacherMsg,
    TeacherWorks
  }
}
</script>

<style lang="scss" scoped>
.teacherdetail{
  display: flex;
  flex-direction: column;
  width:100%;
  padding-top: 38px;
  background:#FBF8F4;
  &-content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 30px 50px 35px;
    p{
      font-size: 26px;
      color: #333333;
      line-height: 38px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      margin-bottom: 29px;
    }
    img{
      width: 652px;
      height: 52px;
    }
  }
  &-works{
    display: flex;
    flex-direction: column;
    padding-bottom: 85px;
    &-title{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img{
        width: 26px;
        height: 39px;
      }
      span{
        font-size: 36px;
        color: #333333;
        line-height: 36px;
        margin: 0 9px;
      }
    }
    .teacher-works{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-top: 35px;
        padding-left: 24px;
        padding-right: 24px;
      }
  }
}
.offdetail-teacher-msg{
  padding-left: 50px !important;
  padding-right: 45px !important;
}

</style>
