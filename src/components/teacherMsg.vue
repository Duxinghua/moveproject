<template>
  <div class="offdetail-teacher-msg">
    <img :src="msgItem.avatar" alt="">
    <div>
      <span>{{msgItem.nickname}}</span>
      <p>{{msgItem.keywords}}</p>
    </div>
    <!-- <span class="offdetail-teacher-btn">已关注</span> -->
    <div class="user-btn" :class="{active: msgItem.id == status}" @click="userFocusHandler(msgItem.id)">
      <img src="../assets/images/userfocus.png" v-if="msgItem.id != status" alt="">
      <span>{{msgItem.id == status ? '已' : '' }}关注</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherMsg',
  data () {
    return {
      status: 0
    }
  },
  props: {
    msgItem: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // console.log(msgItem.name);
  },
  methods: {
    userFocusHandler (index) {
      if (this.status === 0) {
        this.status = index
      } else {
        this.status = 0
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.offdetail-teacher-msg{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    .user-btn{
      width: 170px;
      height: 58px;
      // background-color: #6D8160;
      border: 2px solid #CDA871;
      border-radius: 28px;
      color: #CDA871;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img{
        width: 34px;
        height: 30px;
        margin-right: 16px;
      }
      span{
        font-size: 30px;
      }
    }
    div.active{
      background-color: #6D8160;
      border: none;
      color: #F3D995;
    }
}
</style>
