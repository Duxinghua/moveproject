<template>
        <div class="huaban-top-item">
          <div class="huaban-top-item-img1">
            <van-image :src="item.image+''">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
          </div>
          <div class="huaban-top-item-des" @click="huabangdHandler">
            <span class="title">{{item.group_name}}</span>
            <span class="title subtitle">{{item.description}}</span>
            <span class="title subtitle">{{item.user_count}}成员</span>
          </div>
          <img class="huaban-top-item-img2" @click="joinGroupHandler" :src="item.is_join === 0 ? require('../assets/images/hgdg.png') : require('../assets/images/ygz.png')" alt="">
        </div>
</template>

<script>
export default {
  name: 'HuabanGroupItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    huabangdHandler () {
      this.$emit('linkDetail', this.item.group_id)
    },
    joinGroupHandler () {
      this.$emit('joinGroupHandler', this.item.is_join, this.item.group_id)
    }
  }
}
</script>

<style lang="scss" scoped>
.huaban-top-item{
      width:100%;
      height:184px;
      padding:26px 32px;
      background:white;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right:26px;
      border-radius: 8px;
      margin-bottom: 26px;
      &-img1{
        width:117px;
        height:117px;
        border-radius: 8px;
        margin-right:20px;
        overflow: hidden;
        .van-image{
            width: 100%;
            height: 100%;
        }
      }
      &-des{
        width:418px;
        display: flex;
        flex-direction: column;
        .title{
          font-size: 30px;
          color:#333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .subtitle{
          font-size:24px;
          color:#999;
          line-height:48px;
        }
      }
      &-img2{
        width:82px;
        height:82px;
      }
    }
</style>
