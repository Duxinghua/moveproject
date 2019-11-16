<template>
  <div class="mygz">
    <HuabanUsergzItem v-for="(item, index) in gzList" :item="item" :key="index" :types="gzType" @cancelGz="cancelHandler"/>
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
      ],
      gzType: true,
      page: 1,
      pageSize: 10

    }
  },
  mounted () {
    this.$api.userFollow({page: this.page, pageSize: this.pageSize}).then((result) => {
      if (result.code === 1) {
        var list = []
        result.data.data.map((item) => {
          if (!item.avatar) {
            item.avatar = require('../assets/images/people.png')
          }
          list.push(item)
        })
        this.gzList = list
      }
    })
  },
  methods: {
    cancelHandler (id) {
      console.log(id, 'id')
      this.$api.userSaveFollow({user_id: id}).then((result) => {
        if (result.code === 1) {
          this.$toast(result.msg)
        } else {
          this.$toast(result.msg)
        }
      })
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
