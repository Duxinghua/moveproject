<template>
  <div class="mygz">
    <van-list
            v-model="loading"
            v-show="gzList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
    >

    <HuabanUsergzItem v-for="(item, index) in gzList" :item="item" :key="index" :types="gzType" @cancelGz="cancelHandler"/>

    </van-list>
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
      finished: false,
      loading: false,
      current: 1,
      total: 0,
      gzList: [],
      gzType: true
    }
  },
  mounted () {
    this.getgzList()
  },
  methods: {
    getgzList () {
      const param = {
        page: this.current,
        pageSize: 10,
        by: 0
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.userFollow(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.gzList.length == 0) {
            // 第一次加载
            this.gzList = res.data.data || []
            this.total = res.data.total
            console.log(1)
          } else if (this.gzList.length < this.total) {
            // 加载更多
            this.gzList = this.gzList.concat(res.data.data)
            console.log(2)
          }
          if (this.gzList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.gzList.length < this.total) {
        this.current++
        this.getgzList()
      }
    },
    cancelHandler (id) {
      var _this = this
      this.$api.userSaveFollow({user_id: id}).then((result) => {
        if (result.code === 1) {
          this.$toast({
            message: result.msg,
            onClose: () => {
              this.current = 1
              const param = {
                page: this.current,
                pageSize: 10,
                by: 0
              }
              this.$toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: true
              })
              this.$api.userFollow(param).then((res) => {
                this.$toast.clear()
                if (res.code == 1) {
                  this.gzList = res.data.data
                  this.total = res.data.total
                }
              })
            }
          })
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
  .huabanUserItem{
    border-bottom: 2px solid #f3f3f3;
    border-radius: 0%;
  }
  .huabanUserItem:nth-last-child(2){
     border-bottom: 2px solid transparent;
  }
}
</style>
