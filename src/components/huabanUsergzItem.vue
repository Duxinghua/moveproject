<template>
  <div class="huabanUserItem" >
            <div class="avatar"  @click="userInfoHandler">
              <van-image :src="item.avatar+''">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
            <!-- <img class="avatar" :src="item.avatar" alt=""> -->
            <div class="huabanUserItem-center" @click="userInfoHandler">
                <span class="user">{{item.nickname}}</span>
                <span class="userinfo">{{item.bio}}</span>
                 <div class="usergz" v-if="!types">
                   <span>关注</span>
                   <span>{{item.user_count}}</span>
                 </div>
            </div>
            <div :class="autoBack"  @click="cancelHandler(item.id)">
              <div v-if="!types">
                <span class="gz" v-if="item.amity == 1">已关注</span>
                <div class="nogz" v-else >
                  <img src="../assets/images/gzico.png" alt="" >
                  <span>关注</span>
                </div>
              </div>
              <div v-else>
                <div class="nogz">
                  <span>已关注</span>
                </div>
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
        'nogzbackground': !!this.item.amity,
        'gzbackground': !this.item.amity
      }
    },
    autoBorder () {
      return {
        'huabanUserItem': true
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    cancelHandler (id) {
      this.$emit('cancelGz', id)
    },
    userInfoHandler () {
      this.$router.push({name: 'HuabanUserInfo',query: {
        id:this.item.id
      }})
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
        border-radius: 50%;
        overflow: hidden;
        .van-image{
          width:100%;
          height:100%;
        }
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
  }
  .huabanUserBottom{
    border-bottom: 2px solid #f3f3f3;
    padding:35px 0px;
    .huabanUserItem-center{
      width:362px;
    }
  }
  .huabanUserBottom:last-child{
    border-bottom: 2px solid transparent;
  }
</style>
