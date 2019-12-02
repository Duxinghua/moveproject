<template>
  <div class="myXq">
    <van-list
            v-model="loading"
            v-show="xqList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
    >
    <div class="myXq-item" v-for="(item,index) in xqList" :key="index">
      <img class="ico" src="../assets/images/xxico.png" alt="">
      <div class="content">
        <span class="s1">{{item.type}}</span>
        <span :class="autoCss(item.upFlag)">{{item.content}}</span>
      </div>
      <img class="down" :src="item.upFlag ? require('../assets/images/xxup.png') : require('../assets/images/xxdown.png')" alt="" @click="zkClickHandler(item.id)">
    </div>
    </van-list>
    <NoData v-if="xqList.length == 0" />
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  name: 'MyXx',
  data () {
    return {
      upFlag: false,
      xqList: [],
      finished: false,
      loading: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    this.xqListList()
  },
  methods: {
    autoCss (upFlag) {
      return {
        s2: true,
        s3: !upFlag
      }
    },
    zkClickHandler (e) {
      this.xqList.map((item) => {
        if (item.id === e) {
          item.upFlag = !item.upFlag
        }
      })
      console.log(this.xqList)
      this.$forceUpdate()
    },
    onLoad () {
      if (this.xqList.length < this.total) {
        this.current++
        this.xqListList()
      }
    },
    xqListList () {
      const param = {
        page: this.current,
        pageSize: 10
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.userMessage(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.xqList.length == 0) {
            // 第一次加载
            var list = []
            res.data.data.map((item) => {
              item.upFlag = false
              list.push(item)
            })
            this.xqList = list || []
            this.total = res.data.total
          } else if (this.xqList.length < this.total) {
            // 加载更多
            var list = []
            res.data.data.map((item) => {
              item.upFlag = false
              list.push(item)
            })
            this.xqList = this.xqList.concat(list)
          }
          if (this.xqList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    }
  },
  components: {
    NoData
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.myXq{
  display: flex;
  flex-direction: column;
  padding-left:26px;
  padding-right:26px;
  padding-top:51px;
  &-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 26px 0;
    border-bottom: 1px solid #F3F3F3;
    .ico{
      width:82px;
      height:82px;
      margin-right:22px;
    }
    .content{
      display: flex;
      flex-direction: column;
      width:518px;
      .s1{
        font-size: 32px;
        color:#333;
        width:100%;
        display: inline-block;
      }
      .s2{
        font-size: 26px;
        color:#666666;
        line-height: 46px;
      }
      .s3{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .down{
      width:37px;
      height:37px;
    }
  }
}
</style>
