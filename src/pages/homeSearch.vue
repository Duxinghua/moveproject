<template>
  <div class="homeSearch">
    <div class="homeSearch-header">
      <div class="homeSearch-header-input">
        <img src="../assets/images/homesearch.png" alt="">
        <input type="text" v-model="searchText" placeholder="装饰" @keyup.enter="submit">
        <span @click="searchHandler">取消</span>
      </div>
      <div class="homeSearch-header-tab">
        <ul>
          <li :class="{active:cur == 0}" @click="tabHandler(0)">课程</li>
          <li :class="{active:cur == 1}" @click="tabHandler(1)">用户</li>
        </ul>
      </div>
    </div>
    <div class="homeSearch-course-content" v-if="pageType == 0">
      <div class="homeSearch-course">
        <CourceItem v-for="(cource,index) in courceLists" :item="cource" :key="index" offlineDetail="/offcoursedetail"/>
      </div>
    </div>
    <div class="homeSearch-user-content" v-if="pageType == 1">
      <div class="homeSearch-users">
        <div class="homeSearch-users-item" v-for="item in userList" :key="item.id">
          <img :src="item.img" alt="">
          <div class="user-msg">
            <p>{{item.title}}</p>
            <span>{{item.content}}</span>
          </div>
          <div class="user-btn" :class="{active: item.id == status}">
            <img src="../assets/images/userfocus.png" v-if="item.id != status" alt="">
            <span @click="userFocusHandler(item.id)">{{item.id == status ? '已' : '' }}关注</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourceItem from '@/components/courceItem.vue'

export default {
  name: 'HomeSearch',
  data () {
    return {
      status: 0,
      courceLists: [],
      userList: [
        {
          id: 1,
          img: require('../assets/images/useravatar.png'),
          title: '花田喜事xibe',
          content: '年少时向往远方，走的太匆忙'
        },
        {
          id: 2,
          img: require('../assets/images/useravatar.png'),
          title: 'Anlebaby',
          content: '年少时向往远方，走的太匆忙'
        },
        {
          id: 3,
          img: require('../assets/images/useravatar.png'),
          title: '朝花夕拾zhanzhan',
          content: '年少时向往远方，走的太匆忙'
        },
        {
          id: 4,
          img: require('../assets/images/useravatar.png'),
          title: '花田喜事xibe',
          content: '年少时向往远方，走的太匆忙'
        }
      ],
      cur: 0,
      pageType: 0,
      current: 1,
      total: 0,
      recommend: 0,
      searchText: '',
      loading: false
    }
  },
  // mounted () {
  //   this.courseList()
  // },
  methods: {
    tabHandler (index) {
      if(!this.searchText){
        this.$toast('请输入搜索内容')
        return
      }
      this.cur = index
      this.pageType = index
      // this.currentIndex = arg
      this.courceLists = []
      this.finished = false
      this.loading = false
      this.current = 1
      this.recommend = 0
      this.total = 0
      this.getGroupLists()
      console.log(arg,'arg')
    },
    userFocusHandler (index) {
      if (this.status === 0) {
        this.status = index
      } else {
        this.status = 0
      }
    },
    // courseList () {
    //   const param = {
    //     recommend: 0,
    //     page: 1,
    //     pageSize: 10
    //   }
    //   this.$api.courseList(param).then((res) => {
    //     if (res.code === 1) {
    //       this.courceLists = res.data.data
    //       console.log(res.data)
    //     }
    //   })
    // },
    searchHandler () {
      this.$router.push({name: 'Home'})
    },
    submit () {
      // this.huabanList = []
      this.finished = false
      this.loading = false
      // this.current = 1
      // this.total = 0
      console.log(this.currentIndex,'ci')
      this.getGroupLists()
    },
    getGroupLists () {
      const param = {
        keyword: this.searchText,
        recommend: this.recommend,
        page: this.current,
        pageSize: 10
        
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      if(this.pageType == 0){
        this.$api.courseList(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false
            console.log(res.data)
            if (this.courceLists.length == 0) {
              // 第一次加载
              this.courceLists = res.data.data || []
              this.total = res.data.total
            } else if (this.courceLists.length < this.total) {
              // 加载更多
              this.courceLists = this.courceLists.concat(res.data.data)
            }
            if (this.courceLists.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      }
    }
  },
  components: {
    CourceItem
  }
}
</script>

<style lang="scss" scoped>
.homeSearch{
  background-color: #FBF8F4;
  &-header{
    width:100%;
    height:203px;
    background:white;
    padding:26px 26px 0 26px;
    box-sizing: border-box;
    &-input{
      height:82px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      img{
        position: absolute;
        width:33px;
        height:35px;
        left:36px;
        // top: 24px;
        top:50%;
        transform: translateY(-50%)
      }
      input{
        width:624px;
        height:100%;
        border-radius: 40px;
        padding-left:85px;
        background:#FAFAFA;
        border:none;
        font-size: 30px;
        color:#333;
      }
      span{
        color:#6D8160;
        font-size: 30px;
      }
    }
    &-tab{
      margin-bottom: 37px;
      ul{
        display: flex;
        // flex-direction: row;
        color:#999;
        font-size: 30px;
        li{
          padding: 24px 26px;
        }
        .active{
          font-size: 36px;
          color: #6D8160;
          position: relative
        }
        .active::after{
          content: '';
          display: block;
          position: absolute;
          bottom: 1px;
          left: 50%;
          transform: translateX(-50%);
          width: 40%;
          height: 5px;
          background-color: #76896A;
        }
      }
    }
  }
  &-course{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 38px;
  }
  &-users{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    &-item{
      width: 700px;
      height: 179px;
      background-color: #FFFFFF;
      border-radius: 10px;
      padding: 36px 20px;
      margin-bottom: 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      img{
        width: 107px;
        height: 107px;
      }
      .user-msg{
        width: 338px;
        display: flex;
        flex-direction: column;
        p{
          font-size: 32px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span{
          font-size: 26px;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      div:last-child{
        width: 170px;
        height: 58px;
        // background-color: #6D8160;
        border: 1px solid #CDA871;
        border-radius: 28px;
        color: #CDA871;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        img{
          width: 34px;
          height: 30px;
          margin-right: 16px;
        }
        span{
          font-size: 30px;
        }
      }
      div.active{
        background-color: #6D8160;
        border: none;
        color: #F3D995;
      }
    }
  }
}
.home-course-content-item:nth-child(2n){
  margin-right: 0 !important;
}
.homeSearch-course-content,.homeSearch-user-content{
  width: 100%;
  height: 100vh;
}
</style>
