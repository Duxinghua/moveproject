<template>
  <div class="offdetail-teacher-msg">
    <img :src="msgItem.avatar" alt="">
    <div>
      <span>{{msgItem.nickname}}</span>
      <p>{{msgItem.keywords}}</p>
    </div>
    <span class="offdetail-teacher-btn">已关注</span>
  </div>
</template>

<script>
export default {
  name: 'TeacherMsg',
  props: {
    msgItem: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // console.log(msgItem.name);
  }
}
</script>

<style lang="scss" scoped>
.offdetail-teacher-msg{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // padding-left: 4%;
    // padding-right: 4%;
    // margin: 40px 0;
    img{
      width: 85px;
      height: 85px;
      border-radius: 50%;
    }
    div{
      width: 368px;
      display: flex;
      flex-direction: column;
      // padding: 50px 0;
      span{
        font-size: 32px;
        color: #333333;
        margin-bottom: 6px;
      }
      p{
        width: 100%;
        font-size: 26px;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        // line-height: 36px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
    .offdetail-teacher-btn{
      width: 172px;
      height: 62px;
      border: 1px solid #CDA871;
      border-radius: 31px;
      color: #CDA871;
      font-size: 30px;
      text-align: center;
      line-height: 62px;
    }
}
</style>
