<template>
  <div class="huaban-tz-item" @click="huabantzHandler(item.gp_id)">
          <div class="tzleft">
            <img src="../assets/images/huabanmsg.png" alt="">
            <span>{{item.comment_count}}</span>
          </div>
          <div class="tzcenter">
            <span class="tztitle cleartext">{{item.title}}</span>
            <span class="tzhits">浏览量: {{item.hits}}</span>
            <div class="tzcdes">
              <img class="tzavatar" :src="item.avatar" alt="">
              <div class="tzcinfo">
              <span>{{item.nickname}}</span>
              <span>{{autoTimer(item.create_time)}}</span>
              </div>

            </div>
          </div>
          <div class="tzright">
               <!-- <img  :src="item.image" alt=""> -->
              <van-image :src="item.image">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
          </div>
  </div>
</template>

<script>
export default {
  name: 'HuabantzItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    huabantzHandler (index) {
      this.$router.push({name: 'HuabanTzDetail', query: {id: index}})
    },
    autoTime (time) {
      var tim = new Date(time * 1000)
      return tim.getFullYear() + '-' + (tim.getMonth() + 1) + '-' + (tim.getDate().length == 1 ? 0 + tim.getDate() : tim.getDate()) + ' ' + (tim.getHours().length == 1 ? 0 + tim.getHours() : tim.getHours()) + ':' + (tim.getMinutes().length == 1 ? 0 + time.getMinutes() : tim.getMinutes())
    },
    autoTimer (timer) {
      return parseInt((new Date().getTime() - timer * 1000) / 1000 / 3600) > 24 ? this.autoTime(timer) : parseInt((new Date().getTime() - timer * 1000) / 1000 / 3600) + '小时前更新'
    }
  }
}
</script>

<style lang="scss" scoped>
.huaban-tz-item{
      display: flex;
      flex-direction: row;
      color:#333;
      margin-bottom: 25px;
      padding-bottom: 25px;
      border-bottom: 1Px solid #F3F3F3;
      .tzleft{
        display: flex;
        flex-direction: column;
        font-size: 26px;
        margin-right:26px;
        span{
          text-align: center;
        }
        img{
          width:40px;
          height:34px;
          margin-bottom: 10px;
        }
      }
      .tzcenter{
        display: flex;
        flex-direction: column;
        width:64%;
        .tztitle{
          font-size: 30px;
          line-height: 36px;
          width:calc(100% - 26px);
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .tzhits{
          font-size: 24px;
          margin-top:10px;
          color:#999;
        }
        .tzcdes{
          display: flex;
          flex-direction: row;
          color:#999999;
          font-size: 24px;
          margin-top: 10px;
          align-items: center;
          .tzavatar{
            width:30px;
            height:30px;
            border-radius: 50%;
            margin-right:16px;
          }
          .tzcinfo{
            display: flex;
            width:calc(100% - 72px);
            justify-content: flex-start;
            align-items: center;
            span{
              width:fit-content;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-right:26px;
            }
          }
        }
      }
      .tzright{
        width:169px;
        height:138px;
        overflow: hidden;
        border-radius: 8px;
        .van-image{
          width: 100%;
          height: 100%;
        }
      }
}
</style>
