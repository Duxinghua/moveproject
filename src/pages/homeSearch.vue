<template>
  <div class="homeSearch">
    <div class="homeSearch-header">
      <div class="homeSearch-header-input">
        <img src="../assets/images/homesearch.png" alt="">
        <input type="text" v-model="searchText" placeholder="请输入关键字" @keyup.enter="submit">
        <span @click="searchHandler">取消</span>
      </div>
      <div class="homeSearch-header-tab">
        <ul>
          <li :class="{active:cur == 0}" @click="tabHandler(0)">课程</li>
          <li :class="{active:cur == 1}" @click="tabHandler(1)">名师</li>
        </ul>
      </div>
    </div>
    <van-list
      v-model="loading"
      v-show="courceLists.length > 0 || teacherLists.length > 0"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="homeSearch-course-content" v-if="pageType == 0">
        <div class="homeSearch-course">
          <CourceItem v-for="(cource,index) in courceLists" :item="cource" :key="index" offlineDetail="/offcoursedetail"/>
        </div>
      </div>
      <div class="homeSearch-user-content" v-if="pageType == 1">
        <div class="homeSearch-users" v-for="item in teacherLists" :key="item.id">
          <!-- <img :src="item.avatar" alt="">
          <div class="user-msg">
            <p>{{item.title}}</p>
            <span>{{item.content}}</span>
          </div>
          <div class="user-btn" :class="{active: item.id == status}">
            <img src="../assets/images/userfocus.png" v-if="item.id != status" alt="">
            <span @click="userFocusHandler(item.id)">{{item.id == status ? '已' : '' }}关注</span>
          </div> -->
          <TeacherMsg :msgItem="item"></TeacherMsg>

        </div>


      </div>
    </van-list>
    <NoData v-if="(courceLists.length === 0 && pageType === 0) || teacherLists.length === 0 && pageType === 1" />
  </div>
</template>

<script>
import CourceItem from '@/components/courceItem.vue'
import TeacherMsg from '@/components/teacherMsg.vue'
import NoData from '@/components/nodata'
import getSitem from '@/utils/storage'

export default {
  name: 'HomeSearch',
  data () {
    return {
      status: 0,
      courceLists: [],
      teacherLists: [],
      cur: 0,
      pageType: 0,
      current: 1,
      total: 0,
      recommend: 0,
      searchText: '',
      loading: false,
      finished: false
    }
  },
  mounted () {
    if(getSitem.getStr('homesearch')){
      this.searchText = getSitem.getStr('homesearch')
      this.getGroupLists()
    }
    if(getSitem.getStr('homesearchcur')){
      this.cur = getSitem.getStr('homesearchcur')
      this.pageType = getSitem.getStr('homesearchcur')
      this.getGroupLists()
    }
  },
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
      this.teacherLists = []
      this.finished = false
      this.loading = false
      this.current = 1
      this.total = 0
      getSitem.setStr('homesearchcur',index)
      this.getGroupLists()
      // console.log(arg,'arg')
    },
    userFocusHandler (index) {
      if (this.status === 0) {
        this.status = index
      } else {
        this.status = 0
      }
    },
    searchHandler () {
      this.$router.push({name: 'Home'})
    },
    submit () {
      this.courceLists= []
      this.teacherLists= []
      this.finished = false
      this.loading = false
      this.current = 1
      this.total = 0
      if(!this.searchText){
        this.$toast('请输入搜索内容')
        return
      }
      if(this.searchText){
        getSitem.setStr('homesearch',this.searchText)
      }
      this.getGroupLists()
    },
    getGroupLists () {
      const param = {
        keyword: this.searchText,
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
            // console.log(res.data)
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
      } else if (this.pageType == 1) {
        this.$api.teacherList(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false
            console.log(res.data.data)
            if (this.teacherLists.length == 0) {
              // 第一次加载
              this.teacherLists = res.data.data || []
              this.total = res.data.total
            } else if (this.teacherLists.length < this.total) {
              // 加载更多
              this.teacherLists = this.teacherLists.concat(res.data.data)
            }
            if (this.teacherLists.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      }
    },
    onLoad () {
      if (this.courceLists.length < this.total || this.teacherLists.length < this.total) {
        this.current++
        this.getGroupLists()
      }
    }
  },
  components: {
    CourceItem,
    TeacherMsg,
    NoData
  }
}
</script>

<style lang="scss" scoped>
.homeSearch{
  background-color: #FBF8F4;
  min-height: 100vh;
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
    padding: 25px;
    .offdetail-teacher-msg {
      width: 700px;
      height: 180px;
      background-color: #fff;
      justify-content: space-around !important;
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
