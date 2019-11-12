<template>
  <div class="myEdit">
    <div class="avatar">
      <img src="../assets/images/avatar.png" alt="">
      <img src="../assets/images/apic.png" alt="" @click="imgUploadHandler">
    </div>
    <div class="info">
      <div class="infoItem" @click="infoEditHandler('nickname')">
        <span>呢称</span>
        <span>花田喜事HEBE</span>
        <img src="../assets/images/fx.png" alt="">
      </div>
      <div class="infoItem" @click="infoEditHandler('bio')">
        <span>简介</span>
        <span>去设置</span>
        <img src="../assets/images/fx.png" alt="">
      </div>
      <div class="infoItem" @click="infoEditHandler('gender')">
        <span>性别</span>
        <span>女</span>
        <img src="../assets/images/fx.png" alt="">
      </div>
      <div class="infoItem"  @click="infoEditHandler('birthday')">
        <span>生日</span>
        <span>1997-08-09</span>
        <img src="../assets/images/fx.png" alt="">
      </div>
      <div class="infoItem" @click="infoEditHandler('city')" style="display:none">
        <span>城市</span>
        <span>湖北 武汉</span>
        <img src="../assets/images/fx.png" alt="">
      </div>
    </div>
    <!-- 时间 -->
    <van-popup
      v-model="genderShow"
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
      class="my-van-popup"
    >
    <div class="grender">
      <div class="grender-item">
      男
      </div>
      <div class="grender-item">
      女
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
      genderShow: true,
      currentDate: new Date()
    }
  },
  methods: {
    imgUploadHandler () {

    },
    infoEditHandler (arg) {

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
      return year + '-' + month + '-' + day + '-'
    },
    dateChangeHandler () {
      console.log(this.currentDate)
    },
    dateConfirmHandler () {
      console.log(this.currentDate)
    },
    dateCancelHandler () {
      console.log(this.currentDate)
    }
  }

}
</script>

<style lang="scss" scoped>
.my-van-popup{
  padding-left:25px;
  padding-right:25px;
}
.myEdit{
  display: flex;
  flex-direction: column;
  .avatar{
    width:172px;
    height:172px;
    position: relative;
    margin:92px auto 121px auto;
    img:nth-child(1){
      width:100%;
      height:100%;
    }
    img:nth-child(2){
      position: absolute;
      right:0;
      bottom: 0;
      width:58px;
      height:58px;
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
