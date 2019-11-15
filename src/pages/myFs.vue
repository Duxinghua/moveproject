<template>
  <div class="myFs">
    <HuabanUsergzItem v-for="(item, index) in fsList" :key="index" :item="item" :types="true"/>
    <NoData v-if="fsList.length === 0"/>
  </div>
</template>

<script>
import HuabanUsergzItem from '@/components/huabanUsergzItem.vue'
import NoData from '@/components/nodata'
export default {
  name: 'MyFs',
  data () {
    return {
      fsList: [
        {
          avatar: require('../assets/images/people.png'),
          username: '花田喜事xibe',
          userinfo: '年少时向往远方，走的太匆忙',
          isGz: true,
          gznum: '1782'
        },
        {
          avatar: require('../assets/images/people.png'),
          username: '花田喜事xibe',
          userinfo: '年少时向往远方，走的太匆忙',
          isGz: false,
          gznum: '1782'
        }
      ]
    }
  },
  components: {
    NoData,
    HuabanUsergzItem
  },
  mounted () {
    this.$api.userFans().then((result) => {
      if (result.code === 1) {

      }
    })
  }
}
</script>

<style lang="scss" scoped>
.myFs{
  display: flex;
  flex-direction: column;
  padding-left:26px;
  padding-right:26px;
}
</style>
