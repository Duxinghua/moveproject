<template>
  <div class="huabanUserItem">
            <img class="avatar" :src="item.avatar" alt="">
            <div class="huabanUserItem-center">
                <span class="user">{{item.username}}</span>
                <span class="userinfo">{{item.userinfo}}</span>
                 <div class="usergz">
                   <span>关注</span>
                   <span>{{item.gznum}}</span>
                 </div>
            </div>
            <div :class="autoBack">
              <span class="gz" v-if="item.isGz">已关注</span>
              <div class="nogz" v-else >
                <img src="../assets/images/gzico.png" alt="">
                <span>关注</span>
              </div>
            </div>
    </div>
</template>

<script>
export default {
  name: 'HuabanUsergzItem',
  props: {
    item: {
      type: Object,
      required: true
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
        margin-right:25px;
      }
      &-center{
        width:336px;
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
  }
</style>
