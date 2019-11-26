<template>
  <div class="huaban-tz-item" @click="huabantzHandler(item.gp_id)">
          <div class="tzleft">
            <img src="../assets/images/huabanmsg.png" alt="">
            <span>{{item.comment_count}}</span>
          </div>
          <div class="tzcenter">
            <span class="tztitle cleartext">{{item.title}}</span>
            <div class="tzcdes">
              <img class="tzavatar" :src="item.avatar" alt="">
              <div class="tzcinfo">
              <span>{{item.nickname}}</span>
              <span>{{autoTimer(item.create_time)}}小时前更新</span>
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
    autoTimer (timer) {
      return parseInt((new Date().getTime() - timer*1000)/1000/3600)
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
        img{
          width:40px;
          height:34px;
          margin-bottom: 16px;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .tzcdes{
          display: flex;
          flex-direction: row;
          color:#999999;
          font-size: 24px;
          margin-top: 16px;
          align-items: center;
          .tzavatar{
            width:40px;
            height:40px;
            border-radius: 50%;
            margin-right:16px;
          }
          .tzcinfo{
            display: flex;
            width:calc(100% - 72px);
            justify-content: space-between;
            span{
              width:calc(50% - 26px);
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
        height:118px;
        overflow: hidden;
        border-radius: 8px;
        .van-image{
          width: 100%;
          // height: 100%;
        }
      }
}
</style>
