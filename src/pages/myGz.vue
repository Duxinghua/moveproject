<template>
  <div class="mygz">
    <HuabanUsergzItem v-for="(item, index) in gzList" :item="item" :key="index" :types="gzType"/>
    <NoData v-if="gzList.length === 0"/>
  </div>
</template>

<script>
import NoData from '@/components/nodata'
import HuabanUsergzItem from '@/components/huabanUsergzItem.vue'
export default {
  name: 'MyGz',
  data () {
    return {
      gzList: [
        {
          avatar: require('../assets/images/people.png'),
          username: '花田喜事Hebe',
          userinfo: '美国花艺设计学院教授会导师'
        },
        {
          avatar: require('../assets/images/people.png'),
          username: '花田喜事Hebe',
          userinfo: '美国花艺设计学院教授会导师'
        }
      ],
      gzType: true
    }
  },
  components: {
    HuabanUsergzItem,
    NoData
  }
}
</script>

<style lang="scss" scoped>
.mygz{
  display: flex;
  flex-direction: column;
  padding:26px;
}
</style>
