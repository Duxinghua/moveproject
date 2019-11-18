<template>
  <div class="huabanUserItem huabanUserBottom" @click="userInfoHandler">
            <img class="avatar" :src="item.avatar" alt="">
            <div class="huabanUserItem-center">
                <span class="user">{{item.nickname}}</span>
                <span class="userinfo">{{autoTime(item.create_time)}}</span>
            </div>
            <img class="huabandz" src="../assets/images/userdz.png"/>
    </div>
</template>

<script>
export default {
  name: 'HuabanUsergzItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    types: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    autoBack () {
      return {
        'huabanUserItem-btn': true,
        'nogzbackground': !this.item.isGz,
        'gzbackground': !!this.item.isGz
      }
    }

  },
  data () {
    return {

    }
  },
  methods: {
    autoTime (time) {
      var tim = new Date(time*1000)
      return tim.getFullYear()+"-"+(tim.getMonth()+1)+"-"+(tim.getDate().length == 1 ? 0+tim.getDate() : tim.getDate())+" "+tim.getHours()+":"+tim.getMinutes()
    },
    userInfoHandler () {
      this.$router.push({name: 'HuabanUserInfo'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .huabanUserItem{
      display: flex;
      flex-direction: row;
      align-items: center;
      background:white;
      border-radius: 10px;
      width:100%;
      padding:35px 25px;
      margin-bottom: 26px;
      .avatar{
        width:107px;
        height:107px;
        border-radius: 50%;
        margin-right:25px;
      }
      &-center{
        width:368px;
        display: flex;
        flex-direction: column;
        margin-right:25px;
        .user{
          font-size: 32px;
          color:#333333;
          overflow: hidden;
          text-overflow: ellipsis;
          width:100%;
          white-space: nowrap;
        }
        .userinfo{
          font-size: 26px;
          color:#999999;
          overflow: hidden;
          text-overflow: ellipsis;
          width:100%;
          white-space: nowrap;
        }
        .usergz{
          display: flex;
          flex-direction: row;
          span:nth-child(1){
            font-size: 26px;
            color:#999999;
            margin-right:10px;
          }
          span:nth-child(2){
            font-size: 26px;
            color:#333333;
          }
        }
      }
      &-btn{
        width:170px;
        height:58px;
        border-radius: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        .gz{
          color:#F3D995;
          font-size: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .nogz{
          display: flex;
          flex-direction: row;
          align-items: center;
          img{
            width:34px;
            height:30px;
            margin-right:16px;
          }
          span{
            color: #CDA871;
            font-size: 30px;
          }
        }
      }
      .gzbackground{
        background:#708363;
      }
      .nogzbackground{
        background:transparent;
        border:2px solid #CDA871;
      }
      .huabandz{
        width:171px;
        height:125px;
        border-radius:12px;
      }
  }
  .huabanUserBottom{
    border-bottom: 2px solid #f3f3f3;
    padding:35px 0px;
    .huabanUserItem-center{
      width:368px;
    }
  }
</style>
