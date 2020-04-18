<template>
  <div class="myPl">
    <van-list
            v-model="loading"
            v-show="Lklist.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
    >
	  <div class="myPl-item" v-for="(item,index) in Lklist" :key="index" @click="clickHandler(item.goods_id)">
      <img class="myPl-item-left" :src="item.user.avatar" alt="" />
      <div class="myPl-item-right">
        <div class="top">
          <span>{{item.user.nickname}}</span>
          <span>{{item.create_time}}</span>
        </div>
        <div class="des">
          <RateWrap :values="item.score" :disabled="true" />
        </div>
        <div class="pl">
          <span class="pl-item" v-for="(pitem,pid) in item.content" :key="pid">
            {{pitem}}
          </span>
        </div>
        <div class="dpl" v-if="item.diy_content">
          {{item.diy_content}}
        </div>
        <div class="goods">
          <img v-if="item.gimages" class="img" :src="item.gimages" alt="">
          <div class="goodsinfo">
            <span>{{item.goods.goods_name}}</span>
            <span>{{item.goods.description}}</span>
            <span>¥{{item.goods.price}}</span>
          </div>
        </div>
      </div>
    </div>
    </van-list>
    <NoData v-if="Lklist.length === 0" />
  </div>
</template>

<script>
import RateWrap from '@/components/ratewrap'
import NoData from '@/components/nodata'
export default {
  name: 'MyPl',
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
  components: {
    RateWrap,
    NoData
  },
  methods: {
    clickHandler (goodsId) {
      this.$router.push({
        path: '/goodsDetails',
        query: {
          goodsId,
          type: 'single'
        }
      })
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
      this.$api.myCommentedGoods(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.Lklist.length == 0) {
            // 第一次加载
            var s = res.data.data
            var arr = []
            s.map((item) => {
              console.log(item.goods)
              if (item.goods && item.goods.images) {
                item.gimages = item.goods.images[0]
              } else {
                item.gimages = ''
              }
              arr.push(item)
            })
            this.Lklist = arr
            this.total = res.data.total
          } else if (this.Lklist.length < this.total) {
            // 加载更多
            var ss = res.data.data
            var arrs = []
            ss.map((item) => {
              if (item.goods.images.length) {
                item.gimages = item.goods.images[0]
              } else {
                item.gimages = ''
              }
              arrs.push(item)
            })
            this.Lklist = this.Lklist.concat(arrs)
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
  }
}
</script>

<style lang="scss" scoped>
.myPl{
  display: flex;
  flex-direction: column;
  background:#FBF8F4;
  min-height: 100vh;
  &-item{
    padding:26px 26px 45px 26px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    background:white;
    border-bottom: 15px solid#FBF8F4;
    &-left{
      width:65px;
      height:65px;
      margin-right:20px;
    }
    &-right{
      width:613px;
      display: flex;
      flex-direction: column;
      .top{
        height:65px;
        font-size: 26px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        span:nth-child(1){
          color:#333;
          margin-right:20px;
        }
        span:nth-child(2){
          color:#999;
        }
      }
      .pl{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        &-item{
          width:fit-content;
          padding:19px 40px;
          border:2px solid #E7E7E7;
          margin-right:11px;
          margin-top:20px;
          font-size:30px;
          color:#333;
          border-radius: 44px;
        }
      }
      .dpl{
        font-size: 30px;
        color:#333;
        margin-top:20px;
      }
      .goods{
        width:100%;
        height:199px;
        background:rgba(247,247,247,1);
        border-radius:12px;
        display: flex;
        flex-direction: row;
        padding:31px;
        box-sizing: border-box;
        margin-top:30px;
        .img{
          width:186px;
          height:137px;
          border-radius: 8px;
          margin-right:31px;
        }
        .goodsinfo{
          display: flex;
          flex-direction: column;
          width:340px;
          span{
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:nth-child(1){
            font-size: 30px;
            color:#333;
          }
          span:nth-child(2){
            font-size: 26px;
            color:#666;
            margin-top:14px;
          }
          span:nth-child(3){
            font-size: 30px;
            color:#995258;
            margin-top:20px;
          }
        }
      }
    }

  }
}
</style>
