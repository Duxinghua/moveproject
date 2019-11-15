<template>
  <div class="huabanList">
    <HuabanMenu :menuList="menuList"/>
    <div class="huabanList-content">
      <HuabanGroupItem v-for="(item, index) in huabanList" :key="index" :item="item"/>
    </div>
  </div>
</template>

<script>
import HuabanMenu from '@/components/huabanMenu.vue'
import HuabanGroupItem from '@/components/huabanGroupItem.vue'
export default {
  name: 'HuabanGroupList',
  data () {
    return {
      menuList: [
        '推荐',
        '美居分享',
        '花院分享'
      ],
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
    HuabanMenu,
    HuabanGroupItem
  }
}
</script>

<style lang="scss" scoped>
.huabanList{
  display: flex;
  flex-direction: column;
  background:#F9F5EE;
  &-content{
    margin-top:126px;
    display: flex;
    flex-direction: column;
    padding-right:26px;
    padding-left:26px;
  }
}
</style>
