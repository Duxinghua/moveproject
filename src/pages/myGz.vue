<template>
  <div class="mygz">
    <NoData />
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

        }
      ]
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
