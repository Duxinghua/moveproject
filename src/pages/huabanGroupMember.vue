<template>
  <div class="huabanMember">
    <!-- <div class="member">
      <div class="img"><img src="../assets/images/img1.png" alt=""></div>
      <span>有梦不晚XXX</span>
      <div class="leader">创建者</div>
    </div> -->
    <div class="content">
      <van-list
            v-model="loading"
            v-show="memberList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
      <div class="member" v-for="(item,index) in memberList" :key="index" @click="userinfoHandler(item.user_id)">
        <div class="img"><img :src="item.avatar ? item.avatar : require('../assets/images/img1.png')" alt=""></div>
        <span>{{item.nickname ? item.nickname : '未知'}}</span>
      </div>
      </van-list>
      <NoData v-if="memberList.length == 0" />
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata.vue'
export default {
  name: 'HuabanGroupMember',
  data () {
    return {
      memberList:[],
      finished: false,
      loading: false,
      current: 1,
      total: 0,
      group_id:0
    }
  },
  mounted () {
    this.group_id = this.$route.query.id
    this.getgroupUser()
  },
  methods: {
    userinfoHandler (id) {
      this.$router.push({name:'HuabanUserInfo',query:{id:id}})
    },
    getgroupUser () {
      const param = {
        page: this.current,
        pageSize: 10,
        group_id: this.group_id
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
        this.$api.groupUser(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false

            if (this.memberList.length == 0) {
              // 第一次加载
              this.memberList = res.data || []
              this.total = res.data.total
            } else if (this.memberList.length < this.total) {
              // 加载更多
              this.memberList = this.memberList.concat(res.data)
            }
            if (this.memberList.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })

    },
    onLoad () {
      if (this.memberList.length < this.total) {
        this.current++
        this.getgroupUser()
      }
    }
  },
  components:{
    NoData
  }
}
</script>

<style lang="scss" scoped>
.huabanMember{
  min-height: 100vh;
  background-color: #FFF;
  padding-top: 10px;
  .img{
    width: 74px;
    height: 74px;
    border-radius: 50%;
    margin-right: 27px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .member{
    padding: 0 25px;
    height: 120px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border-bottom: 15px solid #FBF8F4;
    img{
      border-radius: 50%;
    }
    span{
      font-size: 32px;
      color: #333333;
      line-height: 36px;
      max-width: calc(100% - 280px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .leader{
      width: 92px;
      height:42px;
      border-radius: 21px;
      background-color: #995258;
      color: #FFF;
      font-size: 24px;
      line-height: 42px;
      text-align: center;
      margin-left: 26px;
    }
  }
  .content{
    padding-left: 25px;
    padding-right: 25px;
    display: flex;
    flex-direction: column;
    .member{
      padding: 0;
      border-bottom: 1px solid #F3F3F3;
    }
    .member:nth-last-child(2){
      border-bottom: 1px solid  transparent;
    }
  }
}
</style>
