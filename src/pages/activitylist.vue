<template>
  <div class="activityList">
    <div class="activitycontent">
        <div class="activitycate">
          <span v-for="(item,index) in menuList" :key="index" :class="index==aIndex?'active':'' " @click="changetab(index)">{{item.name}}</span>
        </div>
        <div class="activityitem">
          <Activity v-for="(item,index) in avList" :key="index" :avitem="item" />
        </div>
    </div>
<!--    <Pagetab />-->
  </div>
</template>

<script>
import Activity from '@/components/activity.vue'
import Pagetab from '@/components/pagetab.vue'
import { activityListApi, activityCateApi } from '@/api'
export default {
  components: {
    Activity,
    Pagetab
  },
  data () {
    return {
      aIndex: 0,
      menuList: [],
      page: 1,
      page_size: 10,
      avList: []
    }
  },
  mounted () {
    this.activityCate()
  },
  methods: {
    async activityCate () {
      let formdata = {}
      const data = await activityCateApi(formdata)
      if (data.code === 1) {
        this.menuList = data.data
        this.activityList(this.menuList[0].id)
      }
    },
    async activityList (cate) {
      let formdata = {cate_id: cate, page: this.page, page_size: this.page_size}
      const data = await activityListApi(formdata)
      if (data.code === 1) {
        this.avList = data.data.list
      }
    },
    changetab (index) {
      if (this.aIndex === index) {
        return
      }
      this.aIndex = index
      this.activityList(this.menuList[index].id)
    }
  }

}
</script>

<style>

</style>
