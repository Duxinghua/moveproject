<template>
  <div class="huabangd">
    <div class="huabangd-top">
      <div class="huabangd-top-detail">
        <div class="detail-top">
          <img  class="detail-top-img" src="../assets/images/hgdi.png" alt="">
          <div class="detail-top-center">
            <span class="detail-title">{{tzDetail.group_name}}</span>
            <div class="detail-avatar">
              <img src="../assets/images/hgdp.png" alt="">
              <span>{{tzDetail.user_count}}成员</span>
            </div>
          </div>
          <img class="detail-top-imgmore" :src="tzDetail.is_join === 0 ? require('../assets/images/hgdg.png') : require('../assets/images/ygz.png')" alt="" @click="joinGroupHandler">
        </div>
        <span class="detail-bottom">
          {{tzDetail.description}}
        </span>
      </div>

    </div>
    <div class="huabangd-tzdl">
      <TitleItem title="贴子讨论" />
      <div class="huabangd-tzdl-wrap">
        <van-list
              v-model="loading"
              v-show="huabantzlist.length > 0"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="onLoad"
        >
        <HuabantzItem v-for="(item,index) in huabantzlist" :key="index" :item="item" />
        </van-list>
        <div class="tzdl-btn" @click="fptzClickHandler">
          <img src="../assets/images/jiahaoico.png" class="jiahaoico" alt="">
          <span>发表话题</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import TitleItem from '@/components/titleItem.vue'
import HuabantzItem from '@/components/huabantzItem.vue'
export default {
  name: 'HuabanGroupDetail',
  data () {
    return {
      tzDetail: {},
      id: null,
      huabantzlist: [],
      finished: false,
      loading: false,
      current: 1,
      total: 0

    }
  },
  methods: {
    fptzClickHandler () {
      this.$router.push({name: 'HuabanTzfp', query: {id: this.id}})
    },
    joinGroupHandler () {
      var is_join = this.tzDetail.is_join
      var group_id = this.tzDetail.group_id
      if(is_join === 0) {
        this.$api.groupGroupUser({group_id:group_id}).then((res)=>{
          if(res.code === 1){
            this.$toast({
              message: res.msg,
              onClose: () => {
                this.huabanList = []
                this.finished = false
                this.loading = false
                this.getGroupIndex()
              }
            })
          }else{
            this.$toast(res.msg)
          }
        })
      }else if(is_join === 1) {
       this.$api.groupGroupUserDel({group_id:group_id}).then((res)=>{
          if(res.code === 1){
            this.$toast({
              message: res.msg,
              onClose: () => {
                this.huabanList = []
                this.finished = false
                this.loading = false
                this.getGroupIndex()
              }
            })
          }else{
            this.$toast(res.msg)
          }
        })
      }
    },
    getGroupIndex () {
      this.$api.groupIndex({id: this.id}).then((result) => {
        console.log(result, 'tz')
        if (result.code === 1) {
          this.tzDetail = result.data
        }
      })
    },
    getTzLists () {
      const param = {
        page: this.current,
        pageSize: 10,
        gc_id: this.gc_id
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

          if (this.huabantzlist.length == 0) {
            // 第一次加载
            var list =  res.data.data
            list.map((item)=>{
              item.image = item.images ? item.images[0]: ''
              item.nickname = item.user.nickname
              item.avatar = item.user.avatar
            })

            this.huabantzlist = list || []
            this.total = res.data.total
          } else if (this.huabantzlist.length < this.total) {
            // 加载更多
            var list =  res.data.data
            list.map((item)=>{
              item.image = item.images ? item.images[0]: ''
              item.nickname = item.user.nickname
              item.avatar = item.user.avatar
            })
            this.huabantzlist = this.huabantzlist.concat(list)
          }
          if (this.huabantzlist.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.huabantzlist.length < this.total) {
        this.current++
        this.getTzLists()
      }
    }
  },
  mounted () {
    console.log(this.$route.query.id)
    this.id = this.$route.query.id
    this.getGroupIndex()
    this.getTzLists()
  },
  beforeRouteEnter (to, from, next) {
    console.log('log start')
    console.log(to, from, next)
    next()
  },
  components: {
    TitleItem,
    HuabantzItem
  }
}
</script>

<style lang="scss" scoped>
.huabangd{
  display: flex;
  flex-direction: column;
  background:#FBF8F4;
  width:100%;
  min-height: 100vh;
  &-top{
    width:100%;
    height:297px;
    background:#6D815F;
    display: flex;
    flex-direction: column;
    &-detail{
      padding:26px;
      display: flex;
      flex-direction: column;
      .detail-top{
        display: flex;
        flex-direction: row;
        color:white;
        align-items: flex-start;
        margin-bottom: 15px;
        &-img{
          width:117px;
          height:117px;
          border-radius: 8px;
          margin-right:26px;
        }
        &-center{
          display: flex;
          flex-direction: column;
          width:444px;
          margin-right:26px;
          .detail-title{
            font-size:32px;
            line-height: 36px;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .detail-avatar{
            display: flex;
            flex-direction: row;
            margin-top:17px;
            img{
              width:35px;
              height:29px;
              margin-right:17px;
            }
            span{
              font-size: 26px;
              line-height: 36px;
              color:#F3D995;
            }
          }
        }
        &-imgmore{
          width:85px;
          height:85px;
        }
      }
      .detail-bottom{
        font-size:26px;
        font-weight:500;
        line-height:36px;
        color:white;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3

      }
    }
  }
  &-tzdl{
    padding-bottom: 126px;
    display: flex;
    flex-direction: column;
    &-wrap{
     width:calc(100% - 52px);
     margin:0 auto;
     display: flex;
     flex-direction: column;
     background:white;
     border-radius: 8px;
     padding:20px 20px 80px 20px;
     position: relative;
     .tzdl-btn{
       position: absolute;
       bottom: -20px;
       height: 88px;
       width: 268px;
       left: 50%;
       transform: translateX(-50%);
       background: #6F8263;
       color:#F3D995;
       font-size: 36px;
       border-radius:44px;
       display: flex;
       justify-content: center;
       align-items: center;
       flex-direction: row;
       .jiahaoico{
         width:35px;
         height:35px;
         margin-right:9px;
       }
     }
    }
  }
}
</style>
