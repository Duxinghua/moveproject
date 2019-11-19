<template>
  <div class="huabanList">
    <HuabanMenu :menuList="menuList" @menuClick="menuClick"/>
    <div class="huabanList-content">
      <van-list
            v-model="loading"
            v-show="huabanList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
      <HuabanGroupItem v-for="(item, index) in huabanList" :key="index" :item="item" @joinGroupHandler="joinGroupHandler"/>
      </van-list>
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
      menuList: [],
      huabanList: [],
      finished: false,
      loading: false,
      current: 1,
      total: 0,
      gc_id: 0
    }
  },
  mounted () {
    this.getGroupCateGory()
  },
  methods: {
    menuClick (v) {
      this.gc_id = v
      this.current = 1
      this.total = 0
      this.huabanList = []
      this.finished = false
      this.loading = false
      this.getGroupLists()
    },
    getGroupCateGory () {
      this.$api.groupCateGory().then((res)=>{
        if(res.code === 1) {
          this.menuList = res.data
          this.gc_id = res.data ? res.data[0].gc_id : 1
          this.getGroupLists()
        }
      })
    },
    joinGroupHandler () {

    },
    getGroupLists () {
      const param = {
        page: this.current,
        pageSize: 10
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.groupLists(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.huabanList.length == 0) {
            // 第一次加载
            this.huabanList = res.data.data || []
            this.total = res.data.total
          } else if (this.huabanList.length < this.total) {
            // 加载更多
            this.huabanList = this.huabanList.concat(res.data.data)
          }
          if (this.huabanList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.huabanList.length < this.total) {
        this.current++
        this.getGroupLists()
      }
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
  min-height: 100vh;
  &-content{
    margin-top:126px;
    display: flex;
    flex-direction: column;
    padding-right:26px;
    padding-left:26px;
  }
}
</style>
