<template>
  <div class="huaban">
    <div class="huaban-top">
      <button @click="test">222</button>
      <div class="huaban-top-wrap">
        <div class="huaban-top-item" v-for="(item,index) in huabanList" :key="index" @click="huabangdHandler(item.group_id)">
          <div class="huaban-top-item-img1">
              <van-image :src="item.image">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
          </div>
          <div class="huaban-top-item-des">
            <span class="title">{{item.group_name}}</span>
            <span class="title subtitle">{{item.description}}</span>
            <span class="title subtitle">{{item.user_count}} 成员</span>
          </div>
          <img class="huaban-top-item-img2" :src="item.is_join == 0 ? require('../assets/images/hgdg.png') : require('../assets/images/ygz.png')" alt="">
        </div>
      </div>
      <div class="huaban-top-join">
        <TitleItem title="加入我们" />
        <div class="huaban-top-jwrap">
          <div class="huaban-top-jwrap-item" @click="moreGroupHandler">
            <div class= "img-wrap">
              <img src="../assets/images/jiahaoico.png" alt="">
            </div>
            <span class="s1">更多圈子</span>
          </div>
          <div class="huaban-top-jwrap-item" v-for="(item,index) in huabanJoin" :key="index" @click="linkDetail(item.group_id)">
            <div class="image-wrap-vant">
              <van-image :src="item.image">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
            <span class="s1">{{item.group_name}}</span>
            <span class="s2" v-if="item.recommend">推荐</span>
          </div>
        </div>
        <MoreText moreText="更多" moreName="HuabanMyGroupList"/>
      </div>
    </div>
    <div class="huaban-tz">
      <TitleItem title="贴子讨论" />
      <div class="huaban-tz-wrap">
        <HuabantzItem v-for="(item,index) in huabantzlist" :key="index" :item="item" />
        <NoData v-if="huabantzlist.length === 0"/>
      </div>
      <MoreText moreText="更多" moreName="HuabanTzList" />
    </div>

    <Footer :hb="true" />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import MoreText from '@/components/moreItem.vue'
import TitleItem from '@/components/titleItem.vue'
import HuabantzItem from '@/components/huabantzItem.vue'
import NoData from '@/components/nodata.vue'
import WxSing from '@/utils/wxSing'
export default {
  name: 'Huaban',
  data () {
    return {
      huabanList: [],
      huabanJoin: [],
      huabantzlist: []
    }
  },
  mounted () {
    WxSing.init('花伴123','测试发的哈456',location.href,'https://youmeng.qixiuu.com/uploads/20191031/92c752479595ee8fbd07c3caca9dd434.png')
    this.getGroupLists({recommend:0},{data:1})
    this.getGroupLists({my:1},{data:2})
    this.getPostsLists()
  },
  methods: {
    test() {
  localStorage.removeItem('mobile')
  localStorage.removeItem('token')
    },
    linkDetail (id) {
      this.$router.push({name:'HuabanGroupDetail', query:{id:id}})
    },
    getGroupLists (data,type) {
      this.$api.groupLists(data).then((res)=>{
        if(res.code === 1){
          if(type.data === 1) {
            this.huabanList = res.data.data
          }else if(type.data === 2){
            this.huabanJoin = res.data.data
          }
        }
      })
    },
    formatTimer (timer) {
      return parseInt((new Date().getTime() - timer*1000)/1000/3600)
    },
    getPostsLists () {
      this.$api.postsLists({recommend:1}).then((result)=>{
        if(result.code === 1) {
        var list =  result.data.data.splice(0,3)
         list.map((item)=>{
           item.image = item.images ? item.images[0]: ''
           item.nickname = item.user.nickname
           item.avatar = item.user.avatar
         })
         this.huabantzlist = list
        }
      })
    },
    huabangdHandler (index) {
      this.$router.push({name: 'HuabanGroupDetail', query: {id: index}})
    },
    moreGroupHandler () {
      this.$router.push({name: 'HuabanGroupList'})
    }
  },
  components: {
    Footer,
    MoreText,
    TitleItem,
    HuabantzItem,
    NoData
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
display: none;
}
.cleartext{
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  white-space: nowrap
}
.background-item{
  background:#6D8160;
}
.huaban{
  display: flex;
  flex-direction: column;
  background:#FBF8F4;
  width:100%;
  padding-top:26px;
  min-height: 100vh;
  &-top{
    padding-bottom: 15px;
    border-bottom: 15px solid #F6F3EE;
    &-wrap{
      box-sizing: border-box;
      height:184px;
      width: calc(100% - 26px - 26px);
      margin:0 auto;
      overflow-y: hidden;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      display:-webkit-box;
    }
    &-item{
      width:536px;
      height:100%;
      padding:26px 32px;
      background:white;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right:26px;
      &-img1{
        width:117px;
        height:117px;
        margin-right:20px;
        overflow: hidden;
        .van-image{
          width:100%;
          height:100%;
        }
      }
      &-des{
        width:265px;
        display: flex;
        flex-direction: column;
        .title{
          font-size: 30px;
          color:#333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .subtitle{
          font-size:24px;
          color:#999;
          line-height:48px;
        }
      }
      &-img2{
        width:82px;
        height:82px;
      }
    }
    &-join{
      display: flex;
      flex-direction: column;
      padding-right: 26px;
      padding-left:26px;
      box-sizing: border-box;
    }
    &-jwrap{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 26px;
      overflow: hidden;
      overflow-x: auto;
      &-item{
        width:117px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right:calc(113px /4);
        flex-shrink: 0;
        position: relative;
        .img-wrap{
          width:117px;
          height:117px;
          border-radius: 8px;
          position: relative;
          background:#6D8160;
          img{
            position: absolute;
            left:50%;
            top:50%;
            width:43px;
            height:43px;
            transform: translate(-50%,-50%)
          }
        }
        .image-wrap-vant{
          width:117px;
          height:117px;
          border-radius: 8px;
          overflow: hidden;
          .van-image{
            width: 100%;
            height:100%;
          }

        }
        .s1{
          font-size: 24px;
          color:#333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width:100%;
          display: inline-block;
          margin-top:5px;
          text-align: center;
        }
        .s2{
          font-size: 24px;
          color:#E4CF8F;
          width:63px;
          height:32px;
          background:#6D8160;
          border-radius: 10px 0px 10px 0px;
          position: absolute;
          right:0;
          bottom: 38px;
          text-align: center;
          line-height: 32px;
        }
      }
    }
  }
  &-tz{
    padding-left:26px;
    padding-right:26px;
    box-sizing: border-box;
    width:100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 126px;
    &-wrap{
      display: flex;
      flex-direction: column;
      /deep/ .nodata{
        position: relative;
        margin-top:30%;
      }
    }
  }
}
</style>
