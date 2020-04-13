<template>
  <div class="myBx">
    <van-list
            v-model="loading"
            v-show="Lklist.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
    >
    <HuabanUserdzItem v-for="(item,index) in Lklist" :item="item" :key="index" />
    </van-list>
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
      Lklist: [],
      finished: false,
      loading: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    this.getuserLikes()
  },
  methods: {
    userTz () {

    },
    getuserLikes () {
      const param = {
        page: this.current,
        pageSize: 10
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.userLikes(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.Lklist.length == 0) {
            // 第一次加载
            var list = []
            res.data.data.map((item) => {
              item.nickname = item.user.nickname
              item.avatar = item.user.avatar
              list.push(item)
            })
            this.Lklist = list || []
            this.total = res.data.total
          } else if (this.Lklist.length < this.total) {
            // 加载更多
            var list = []
            res.data.data.map((item) => {
              item.nickname = item.user.nickname
              item.avatar = item.user.avatar
              list.push(item)
            })
            this.Lklist = this.Lklist.concat(list)
          }
          if (this.Lklist.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.Lklist.length < this.total) {
        this.current++
        this.getuserLikes()
      }
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
