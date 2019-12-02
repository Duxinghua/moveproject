<template>
  <div class="offdetail-teacher-msg" @click="detailHandler">
    <img :src="msgItem.avatar" alt="">
    <div>
      <span class="teachername">{{msgItem.nickname}}</span>
      <p>{{msgItem.keywords}}</p>
    </div>
    <!-- <span class="offdetail-teacher-btn">已关注</span> -->
    <div class="user-btn" :class="{active: msgItem.amity == status}" @click="userFocusHandler(msgItem.amity,msgItem.id)">
      <!-- <img src="../assets/images/userfocus.png"  alt=""> -->
      <van-icon size="20" name="like-o" v-if="msgItem.amity != status" />
      <span>{{msgItem.amity == status ? '已' : '' }}关注</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherMsg',
  data () {
    return {
      status: 1
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
    detailHandler () {
      this.$router.push({path: '/teacherDetail',query:{index:this.msgItem.id}})
    },
    userFocusHandler (amity,index) {
      this.$api.teacherLike({teacher_id: index}).then(res => {
        if (res.code === 1 ) {
          this.$toast({
            message: res.msg
          })
          // console.log(res)
        }
      })
      if (this.status == amity) {
        if (amity == 1) {
          this.status = 0
        }else if (amity == 0) {
          this.status = 1
        }
      } else {
        this.status = amity
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
      .teachername{
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
      // background-color: #6D8160;
      border: 2px solid #CDA871;
      color: #CDA871;
    }
}
</style>
