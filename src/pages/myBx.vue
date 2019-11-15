<template>
  <div class="myBx">
    <HuabanUserdzItem v-for="(item,index) in Lklist" :item="item" :key="index" />
    <NoData v-if="Lklist.length === 0" />
  </div>
</template>

<script>
import NoData from '@/components/nodata'
import HuabanUserdzItem from '@/components/huabanUserdzItem.vue'
export default {
  name: 'MyBx',
  data () {
    return {
      Lklist: [
        {
          avatar: require('../assets/images/people.png'),
          des: '朝花夕拾zhanzhan赞了你',
          date: '2019-10-11 14:20',
          image: require('../assets/images/userdz.png')
        }
      ]
    }
  },
  components: {
    NoData,
    HuabanUserdzItem
  }
}
</script>

<style lang="scss" scoped>
.myBx{
  display: flex;
  flex-direction: column;
  padding-left:26px;
  padding-right:26px;
}
</style>
