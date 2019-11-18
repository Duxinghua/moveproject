<template>
        <div class="huaban-top-item"   @click="huabangdHandler">
          <img class="huaban-top-item-img1" src="../assets/images/huabanjoinico.png" alt="">
          <div class="huaban-top-item-des">
            <span class="title">{{item.group_name}}</span>
            <span class="title subtitle">{{item.description}}</span>
            <span class="title subtitle">1980成员</span>
          </div>
          <img class="huaban-top-item-img2" src="../assets/images/huabanjoin.png" alt="">
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
      this.$emit('joinGroupHandler',1)
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
        margin-right:20px;
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
