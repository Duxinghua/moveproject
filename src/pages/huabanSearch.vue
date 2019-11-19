<template>
  <div class="huabanSearch">
    <div class="huabanSearch-header">
      <div class="inputWrap">
        <img src="../assets/images/huabansearchico.png" alt="">
        <input type="text" v-model="searchText" class="input" placeholder="插花" @keyup.enter="submit">
        <span @click="searchHandler">取消</span>
      </div>
      <div class="menuTab">
        <ul>
          <li :class="{active: currentIndex == item.id ? true : false }" @click="resultClickHandler(item.id)" v-for="(item) in menuList" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="huabanSearch-content">
          <van-list
            v-model="loading"
            v-show="huabanList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
            >
          <HuabanGroupItem v-if="currentIndex === 0"  v-for="(item, index) in huabanList" :key="index" :item="item" @joinGroupHandler="joinGroupHandler"/>
          <HuabantzItem v-if="currentIndex === 1"  v-for="(item, index) in huabanList" :key="index" :item="item" />
          <HuabanUsergzItem  v-if="currentIndex === 2" v-for="(item, index) in huabanList" :key="index" :item="item" @cancelGz="cancelGz"/>
          </van-list>
          <NoData v-if="huabanList.length === 0" />
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata'
import HuabanGroupItem from '@/components/huabanGroupItem.vue'
import HuabantzItem from '@/components/huabantzItem.vue'
import HuabanUsergzItem from '@/components/huabanUsergzItem.vue'
export default {
  name: 'HuabanSearch',
  data () {
    return {
      currentIndex: 0,
      isComponent: HuabanGroupItem,
      menuList: [
        {
          id: 0,
          name: '小组'
        },
        {
          id: 1,
          name: '帖子'
        },
        {
          id: 2,
          name: '用户'
        }
      ],
      huabanList: [],
      searchText: '',
      finished: false,
      loading: false,
      current: 1,
      total: 0
    }
  },
  components: {
    HuabanGroupItem,
    HuabantzItem,
    HuabanUsergzItem,
    NoData
  },
  methods: {
    joinGroupHandler (is_join,group_id) {
      if(is_join === 0){
      this.$api.groupGroupUser({group_id:group_id}).then((res)=>{
        if(res.code === 1){
          this.$toast({
            message: res.msg,
            onClose: () => {
              this.huabanList = []
              this.finished = false
              this.loading = false
              this.getGroupLists()
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
              this.getGroupLists()
            }
          })
        }else{
          this.$toast(res.msg)
        }
      })
      }
    },
    cancelGz(id) {
      this.$api.userSaveFollow({user_id:id}).then((res)=>{
        if(res.code === 1){
          this.$toast({
            message: res.msg,
            onClose: () => {
              this.huabanList = []
              this.finished = false
              this.loading = false
              this.getGroupLists()
            }
          })
        }else{
          this.$toast(res.msg)
        }
      })
    },
    submit () {
      this.huabanList = []
      this.finished = false
      this.loading = false
      this.current = 1
      this.total = 0
      console.log(this.currentIndex,'ci')
      this.getGroupLists()
    },
    getGroupLists () {
      const param = {
        page: this.current,
        pageSize: 10,
        keyword: this.searchText
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      if(this.currentIndex == 0){
        this.$api.groupLists(param).then((res) => {
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
      }else if(this.currentIndex == 1){
        this.$api.postsLists(param).then((res)=>{
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false

            if (this.huabanList.length == 0) {
              // 第一次加载
              var list = []
              res.data.data.map((item)=>{
                item.nickname = item.user.nickname
                item.avatar = item.user.avatar
                item.image = item.images ? item.images[0] : ''
                list.push(item)
              })
              this.huabanList = list || []
              this.total = res.data.total
            } else if (this.huabanList.length < this.total) {
              // 加载更多
              var list = []
              res.data.data.map((item)=>{
                item.nickname = item.user.nickname
                item.avatar = item.user.avatar
                item.image = item.images ? item.images[0] : ''
                list.push(item)
              })
              this.huabanList = this.huabanList.concat(list)
            }
            if (this.huabanList.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      }else if(this.currentIndex == 2){
        this.$api.userLists(param).then((res)=>{
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
      }
    },
    onLoad () {
      if (this.huabanList.length < this.total) {
        this.current++
        this.getGroupLists()
      }
    },

    resultClickHandler (arg) {
      if(!this.searchText){
        this.$toast('请输入搜索内容')
        return
      }
      this.currentIndex = arg
      this.huabanList = []
      this.finished = false
      this.loading = false
      this.current = 1
      this.total = 0
      this.getGroupLists()
      console.log(arg,'arg')
    },
    searchHandler () {
      this.$router.push({name: 'HuabanGroupList'})
    }
  }

}
</script>

<style lang="scss" scoped>
.huabanSearch{
  background:#FBF8F4;
  &-header{
    padding-top:26px;
    height:203px;
    width:100%;
    background:white;
    padding-left:26px;
    padding-right: 26px;
    box-sizing: border-box;
    .inputWrap{
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
    .menuTab{
      padding-bottom:37px;
      ul{
        display: flex;
        color:#999;
        font-size: 30px;
        li{
          padding:24px 50px;
        }
        .active{
          font-size: 36px;
          color:#6D8160;
          position: relative;
        }
        .active::before{
          display: block;
          content: '';
          width: 30%;
          height: 3px;
          background: #6D8160;
          position: absolute;
          bottom: 0px;
          left:50%;
          transform: translateX(-50%)
        }
      }
    }
  }
  &-content{
    width:100%;
    height:100vh;
    padding-top:26px;
    padding-left:26px;
    padding-right:26px;
    .huabanUserItem{
      display: flex;
      flex-direction: row;
      align-items: center;
      background:white;
      border-radius: 10px;
      width:100%;
      padding:35px 25px;

      .avatar{
        width:107px;
        height:107px;
        margin-right:25px;
      }
      &-center{
        width:336px;
        display: flex;
        flex-direction: column;
        margin-right:25px;
        .user{
          font-size: 32px;
          color:#333333;
          overflow: hidden;
          text-overflow: ellipsis;
          width:100%;
          white-space: nowrap;
        }
        .userinfo{
          font-size: 26px;
          color:#999999;
          overflow: hidden;
          text-overflow: ellipsis;
          width:100%;
          white-space: nowrap;
        }
        .usergz{
          display: flex;
          flex-direction: row;
          span:nth-child(1){
            font-size: 26px;
            color:#999999;
            margin-right:10px;
          }
          span:nth-child(2){
            font-size: 26px;
            color:#333333;
          }
        }
      }
      &-btn{
        width:170px;
        height:58px;
        border-radius: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        .gz{
          color:#F3D995;
          font-size: 30px;
        }
        .nogz{
          display: flex;
          flex-direction: row;
          align-items: center;
          img{
            width:34px;
            height:30px;
            margin-right:16px;
          }
          span{
            color: #CDA871;
            font-size: 30px;
          }
        }
      }
      .gzbackground{
        background:#708363;
      }
      .nogzbackground{
        background:transparent;
        border:2px solid #CDA871;
      }
    }
  }
}
</style>
