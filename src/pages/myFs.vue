<template>
  <div class="myFs">
    <HuabanUsergzItem v-for="(item, index) in gzList" :key="index" :item="item" :types="false" @cancelGz="gzClickHandler"/>
    <NoData v-if="gzList.length === 0"/>
  </div>
</template>

<script>
import HuabanUsergzItem from '@/components/huabanUsergzItem.vue'
import NoData from '@/components/nodata'
export default {
  name: 'MyFs',
  data () {
    return {
      gzList: []
    }
  },
  components: {
    NoData,
    HuabanUsergzItem
  },
  mounted () {
    this.getgzList()
  },
  methods: {
    gzClickHandler (e) {
      this.$api.userSaveFollow({user_id: e}).then((res)=>{
        if(res.code == 1){
          this.$toast({
            message: res.msg,
            onClose: () => {
              this.current = 1
                const param = {
                  page: this.current,
                  pageSize: 10,
                  by: 1
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
                    this.gzList = res.data.data || []
                    this.total = res.data.total
                  }
                })
            }
          })
        }
      })
    },
    getgzList () {
      const param = {
        page: this.current,
        pageSize: 10,
        by: 1
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
    }
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
