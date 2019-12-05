<template>
  <div class="myEdit">
    <div class="avatar">
      <!-- <img style="display:none" src="../assets/images/avatar.png" alt=""> -->
      <img :src="userInfo.avatar ? userInfo.avatar :require('../assets/images/apic.png')" alt="">
    </div>
    <div class="info">
      <div class="infoItem" >
        <span>呢称</span>
        <span>{{userInfo.nickname}}</span>
        <!-- <img src="../assets/images/fx.png" alt=""> -->
      </div>
      <div class="infoItem" @click="infoEditHandler('bio')">
        <span>简介</span>
        <span>{{userInfo.bio ? userInfo.bio : '去设置'}}</span>
        <img src="../assets/images/fx.png" alt="">
      </div>
      <div class="infoItem" >
        <span>性别</span>
        <span>{{userInfo.gender}}</span>
        <img src="../assets/images/fx.png" alt="" style="display:none">
      </div>
      <div class="infoItem"  @click="dataChange()">
        <span>生日</span>
        <span>{{userInfo.birthday ? userInfo.birthday : '请您选择生日'}}</span>
        <img src="../assets/images/fx.png" alt="" style="display:none">
      </div>
      <div class="infoItem" style="display:none">
        <span>城市</span>
        <span>城市</span>
        <img src="../assets/images/fx.png" alt=""  style="display:none">
      </div>
    </div>
    <!-- 时间 -->
    <van-popup
      v-model="dateShow"
      closeable
      overlay
      round
      position="bottom"
      class="my-van-popup"
    >
    <van-datetime-picker  @change="dateChangeHandler" @confirm="dateConfirmHandler" @cancel="dateCancelHandler"
      v-model="currentDate"
      type="date"
      :formatter="formatter"
      show-toolbar
    />
    </van-popup>

    <!-- 性别 -->
    <van-popup
      v-model="genderShow"
      closeable
      overlay
      round
      position="bottom"
    >
    <div class="grender">
      <div class="grender-item">
      男
      </div>
      <div class="grender-item">
      女
      </div>
      <div class="grender-item">
      取消
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'MyEdit',
  data () {
    return {
      dateShow: false,
      genderShow: false,
      currentDate: new Date(),
      userInfo: {}
    }
  },
  mounted () {
    this.getIndex()
  },
  computed: {
    autoCity (item) {
      if (item) {
        return (item + '').replace('/,/', ' ')
      }
    }
  },
  methods: {
    getIndex () {
      this.$api.userInfo().then((result) => {
        if (result.code === 1) {
          this.userInfo = result.data
        }
      })
    },
    dataChange () {
      this.dateShow = true
    },
    imgUploadHandler () {

    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    timeFormat (time) { // 时间格式化 2019-09-08
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '-' + month + '-' + day
    },
    dateChangeHandler () {

    },
    dateConfirmHandler () {
      this.$api.userEdit({birthday:this.timeFormat(this.currentDate)}).then((result) => {
        if (result.code === 1) {
          this.$toast({
            message: result.msg,
            onClose: () => {
               this.getIndex()
               this.dateShow = false
            }
          })
        } else {
          this.$toast(result.msg)
        }
      })
    },
    dateCancelHandler () {
       this.dateShow = false
    },
    infoEditHandler () {
      this.$router.push({name: 'MyModify', params: {bio: this.userInfo ? this.userInfo.bio : null}})
    }
  }

}
</script>

<style lang="scss" scoped>
.my-van-popup{
  padding-left:25px;
  padding-right:25px;
  /deep/ .van-popup__close-icon--top-right{
    display: none
  }
}
.myEdit{
  display: flex;
  flex-direction: column;
  min-height:100vh;
  background:white;
  .avatar{
    width:172px;
    height:172px;
    position: relative;
    margin:92px auto 121px auto;
    img:nth-child(1){
      width:100%;
      height:100%;
      border-radius: 50%;
    }
    img:nth-child(2){
      position: absolute;
      right:0;
      bottom: 0;
      width:58px;
      height:58px;
      border-radius: 50%;
    }
  }
  .info{
    display: flex;
    flex-direction: column;
    padding-left:26px;
    padding-right:26px;
    justify-content: space-between;
    .infoItem{
      height:98px;
      display: flex;
      flex-direction: row;
      font-size: 28px;
      color:#666666;
      align-items: center;
      border-bottom: 2px solid #f3f3f3;
      span:nth-child(1){
        margin-right: 52px;
      }
      span:nth-child(2){
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img{
        width:15px;
        height:28px;
      }
    }
  }
}
</style>
