<template>
  <div class="huabanList">
    <HuabanMenu :menuList="menuList"/>
    <div class="huabanList-content">
      <van-list
            v-model="loading"
            v-show="huabanList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
      <HuabantzItem v-for="(item, index) in huabanList" :key="index" :item="item" @joinGroupHandler="joinGroupHandler"/>
      </van-list>
    </div>
  </div>
</template>

<script>
import HuabanMenu from '@/components/huabanMenu.vue'
import HuabantzItem from '@/components/huabantzItem.vue'
export default {
  name: 'HuabanTzList',
  data () {
    return {
      menuList: [
        '推荐',
        '美居分享',
        '花院分享'
      ],
      huabanList: [],
      finished: false,
      loading: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    this.getpostsLists()
  },
  methods: {
    joinGroupHandler () {

    },
    getpostsLists () {
      const param = {
        page: this.current,
        pageSize: 10
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.postsLists(param).then((res) => {
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
        this.getpostsLists()
      }
    },
  },
  components: {
    HuabanMenu,
    HuabantzItem
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
