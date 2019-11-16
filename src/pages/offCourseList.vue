<template>
  <div class="offcourse-list">
    <CourseItem v-for="(cource,index) in courceList" :item="cource" :key="index"></CourseItem>
  </div>
</template>

<script>
import CourseItem from '@/components/courceItem'

export default {
  name: 'OffCourseList',
  data () {
    return {
      courceList: [
        {
          id: 1,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          id: 2,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          id: 3,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          id: 4,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          id: 5,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          id: 6,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        }
      ]
    }
  },
  components: {
    CourseItem
  }
}
</script>

<style lang="scss" scoped>
.offcourse-list{
  width: 100%;
  height: 100vh;
  background-color: #FBF8F4;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 36px;
  padding-left: 25px;
  padding-right: 25px;
}
.home-course-content-item:nth-child(2n){
  margin-right: 0 !important;
}
</style>
