<template>
  <div class="huaban">

    <div class="huaban-top">
      <div class="huaban-top-wrap">
        <div class="huaban-top-item" v-for="(item,index) in huabanList" :key="index" @click="huabangdHandler(1)">
          <img class="huaban-top-item-img1" :src="item.image" alt="">
          <div class="huaban-top-item-des">
            <span class="title">{{item.title}}</span>
            <span class="title subtitle">{{item.des}}</span>
            <span class="title subtitle">{{item.num}}</span>
          </div>
          <img class="huaban-top-item-img2" src="../assets/images/huabanjoin.png" alt="">
        </div>
      </div>
      <div class="huaban-top-join">
        <TitleItem title="加入我们" />
        <div class="huaban-top-jwrap">
          <div class="huaban-top-jwrap-item" v-for="(item,index) in huabanJoin" :key="index">
            <img :src="item.image" alt="">
            <span>{{item.text}}</span>
          </div>
        </div>
        <MoreText moreText="更多" moreName="HuabanGroupList"/>
      </div>
    </div>
    <div class="huaban-tz">
      <TitleItem title="贴子讨论" />
      <div class="huaban-tz-wrap">
        <HuabantzItem v-for="(item,index) in huabantzlist" :key="index" :item="item" />
      </div>
      <MoreText moreText="更多" />
    </div>
    <Footer :hb="true" />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import MoreText from '@/components/moreItem.vue'
import TitleItem from '@/components/titleItem.vue'
import HuabantzItem from '@/components/huabantzItem.vue'
export default {
  name: 'Huaban',
  data () {
    return {
      huabanList: [
        {
          image: require('../assets/images/huabanp1.png'),
          title: '插花花艺爱好同盟',
          des: '爱华，爱生活！',
          num: '1979成员'
        },
        {
          image: require('../assets/images/huabanp1.png'),
          title: '插花花艺爱好同盟',
          des: '爱华，爱生活！',
          num: '1979成员'
        },
        {
          image: require('../assets/images/huabanp1.png'),
          title: '插花花艺爱好同盟',
          des: '爱华，爱生活！',
          num: '1979成员'
        }
      ],
      huabanJoin: [
        {
          image: require('../assets/images/huabanjoinico.png'),
          text: '花艺同盟'
        },
        {
          image: require('../assets/images/huabanjoinico.png'),
          text: '花艺同盟'
        },
        {
          image: require('../assets/images/huabanjoinico.png'),
          text: '花艺同盟'
        },
        {
          image: require('../assets/images/huabanjoinico.png'),
          text: '花艺同盟'
        },
        {
          image: require('../assets/images/huabanjoinico.png'),
          text: '花艺同盟'
        }
      ],
      huabantzlist: [
        {
          id: 1,
          title: '武汉周末线下插花兴趣活动武汉周末线下插花兴趣活动',
          image: require('../assets/images/huabaninfos.png'),
          name: '花田喜事Hebe',
          timer: '13小时前更新',
          avatar: require('../assets/images/people.png'),
          num: 56
        },
        {
          id: 2,
          title: '武汉周末线下插花兴趣活动武汉周末线下插花兴趣活动',
          image: require('../assets/images/huabaninfos.png'),
          name: '花田喜事Hebe',
          timer: '13小时前更新',
          avatar: require('../assets/images/people.png'),
          num: 56
        },
        {
          id: 3,
          title: '武汉周末线下插花兴趣活动武汉周末线下插花兴趣活动',
          image: require('../assets/images/huabaninfos.png'),
          name: '花田喜事Hebe',
          timer: '13小时前更新',
          avatar: require('../assets/images/people.png'),
          num: 56
        }
      ]

    }
  },
  components: {
    Footer,
    MoreText,
    TitleItem,
    HuabantzItem
  },
  methods: {
    huabangdHandler (index) {
      this.$router.push({name: 'HuabanGroupDetail', query: {id: index}})
    }
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
.huaban{
  display: flex;
  flex-direction: column;
  background:#FBF8F4;
  width:100%;
  padding-top:26px;
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
      &-item{
        width:117px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right:calc(113px /4);
        img{
          width:117px;
          height:117px;
          border-radius: 8px;
        }
        span{
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
      }
      &-item:nth-child(5n){
        margin-right:0px !important;
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
    }
  }
}
</style>
