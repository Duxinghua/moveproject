<template>
  <div class="huabanJoin">
    <div class="huabanJoin-top">
      <img src="../assets/images/groupjoinico.png" alt="">
      <span>加入成功</span>
    </div>
    <div class="huabanJoin-content">
      <span class="huabanJoin-content-title">以下这些你也许会感兴趣</span>
      <HuabanGroupItem v-for="(item, index) in huabanList" :key="index" :item="item"/>
    </div>
  </div>
</template>

<script>
import HuabanGroupItem from '@/components/huabanGroupItem.vue'
export default {
  name: 'HuabanJoinGroup',
  data () {
    return {
      huabanList: [
        {
          image: require('../assets/images/huabanp1.png'),
          title: '插花花艺爱好同盟',
          des: '爱华，爱生活！',
          num: '1979成员'
        },
        {
          image: require('../assets/images/huabanp1.png'),
          title: '插花花艺爱好同盟',
          des: '爱华，爱生活！',
          num: '1979成员'
        },
        {
          image: require('../assets/images/huabanp1.png'),
          title: '插花花艺爱好同盟',
          des: '爱华，爱生活！',
          num: '1979成员'
        }
      ]
    }
  },
  components: {
    HuabanGroupItem
  }
}
</script>

<style lang="scss" scoped>
.huabanJoin{
  display: flex;
  flex-direction: column;
  background:#F9F5EE;
  &-top{
    height:291px;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width:62px;
      height:54px;
    }
    span{
      font-size: 30px;
      font-weight: 500;
      margin-top:38px;
      color:#6D8160;
    }
  }
  &-content{
    display: flex;
    flex-direction: column;
    padding-left:26px;
    padding-right:26px;
    width:100%;
    &-title{
      font-size: 30px;
      color:#333;
      padding-bottom: 40px;
    }
  }
}
</style>
