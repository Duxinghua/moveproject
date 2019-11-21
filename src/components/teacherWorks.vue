<template>
  <div class="teacher-works-item">
    <img :src="item.image[0]" alt="">
    <div>{{item.title}}</div>
    <span>{{item.description}} {{item.create_time}}</span>
  </div>

</template>

<script>
export default {
  name: 'TeacherWorks',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.teacher-works-item{
    display: flex;
    flex-direction: column;
    width: 216px;
    margin-right: 26px;
    margin-bottom: 40px;
    img{
      width: 216px;
      height: 287px;
      border-radius: 5px;
      margin-bottom: 18px;
    }
    div{
      font-size: 30px;
      line-height: 36px;
      color: #333333;
      padding-left: 5px;
    }
    span{
      font-size: 24px;
      height: 23px;
      line-height: 36px;
      color: #999999;
      padding-left: 5px;
    }
  }
.teacher-works-item:nth-child(3n){
    margin-right:0px !important;
  }
</style>
