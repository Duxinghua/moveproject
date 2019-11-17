<template>
  <div class="huabangd">
    <div class="huabangd-top">
      <div class="huabangd-top-detail">
        <div class="detail-top">
          <img  class="detail-top-img" src="../assets/images/hgdi.png" alt="">
          <div class="detail-top-center">
            <span class="detail-title">插花花艺爱好同盟插花花艺爱好同盟插花花艺爱好同盟</span>
            <div class="detail-avatar">
              <img src="../assets/images/hgdp.png" alt="">
              <span>1586成员</span>
            </div>
          </div>
          <img class="detail-top-imgmore" src="../assets/images/hgdg.png" alt="">
        </div>
        <span class="detail-bottom">
小组简介：指尖创造。插花之道，让人们更加的关注周围的
自然环境，这种脆肉的美好，却充满让人感动的道。指尖创造。插花之道，让人们更加的关注周围的
自然环境，这种脆肉的美好，却充满让人感动的道。
        </span>
      </div>

    </div>
    <div class="huabangd-tzdl">
      <TitleItem title="贴子讨论" />
      <div class="huabangd-tzdl-wrap">
       <HuabantzItem v-for="(item,index) in huabantzlist" :key="index" :item="item" />
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
        },
        {
          id: 4,
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
  methods: {
    fptzClickHandler () {
      this.$router.push({name: 'HuabanTzfp',params:{id:1}})

    }
  },
  mounted () {
    console.log(this.$route.params.id)
    this.$api.groupIndex({id: this.$route.params.id}).then((result) => {
      console.log(result,'tz')
      if (result.code === 1) {
        console.log(result)
      }
    })
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
