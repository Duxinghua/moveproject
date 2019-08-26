<template>
  <div class="sales">
    <div class="saleheader">
      <div class="saitem">
        <img src="../assets/images/woman.png" alt="" />
        <span>模特展示</span>
      </div>
      <div class="saitem">
        <img src="../assets/images/live.png" alt="" />
        <span>直播展示</span>
      </div>
      <div class="saitem">
        <img src="../assets/images/media.png" alt="" />
        <span>新媒体</span>
      </div>
    </div>
    <div class="salecontent">
      <van-tabs v-model="active" swipeable>
        <van-tab v-for="index in itemlist" :title="index" :key="index">
          <div :class="autoClass" >
            <Saleitem :item="item" :key="index" v-for="(item,index) in itemdata" v-if="active !== 4"/>
            <Wbitem :item="item" :key="index" v-for="(item,index) in wbitemdata" v-if="active === 4"/>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <Footer />
  </div>
</template>

<script>
import Saleitem from '../components/saleitem.vue'
import Wbitem from '../components/wbitem.vue'
import Footer from '../components/footer.vue'
export default {
  computed: {
    autoClass () {
      if (this.active !== 4) {
        return {
          saleitems: true
        }
      } else {
        return {
          wbitems: true
        }
      }
    }
  },
  components: {
    Saleitem,
    Wbitem,
    Footer
  },
  data () {
    return {
      active: 0,
      itemlist: ['抖音', '小红书', '快手', '微视', '微博', '公众号', '高校团队'],
      itemdata: [
        {
          avater: require('../assets/images/ic1.png'),
          username: 'Angelababy',
          noid: '1023129014',
          num1: '1137.4w',
          num2: '4412w',
          img1: require('../assets/images/s1.png')
        },
        {
          avater: require('../assets/images/ic1.png'),
          username: 'Angelababy',
          noid: '1023129014',
          num1: '1137.4w',
          num2: '4412w',
          img1: require('../assets/images/s1.png')
        },
        {
          avater: require('../assets/images/ic1.png'),
          username: 'Angelababy',
          noid: '1023129014',
          num1: '1137.4w',
          num2: '4412w',
          img1: require('../assets/images/s1.png')
        }
      ],
      wbitemdata: [
        {
          avater: require('../assets/images/wb1.png'),
          username: '李子柒',
          des: '微博知名美食视频博主',
          num1: '1137.4w',
          num2: '4412w'
        },
        {
          avater: require('../assets/images/wb1.png'),
          username: '李子柒',
          des: '微博知名美食视频博主',
          num1: '1137.4w',
          num2: '4412w'
        },
        {
          avater: require('../assets/images/wb1.png'),
          username: '李子柒',
          des: '微博知名美食视频博主',
          num1: '1137.4w',
          num2: '4412w'
        },
        {
          avater: require('../assets/images/wb1.png'),
          username: '李子柒',
          des: '微博知名美食视频博主',
          num1: '1137.4w',
          num2: '4412w'
        },
        {
          avater: require('../assets/images/wb1.png'),
          username: '李子柒',
          des: '微博知名美食视频博主',
          num1: '1137.4w',
          num2: '4412w'
        },
        {
          avater: require('../assets/images/wb1.png'),
          username: '李子柒',
          des: '微博知名美食视频博主',
          num1: '1137.4w',
          num2: '4412w'
        }
      ]
    }
  }
}
</script>

<style>
.van-tabs--line .van-tabs__wrap{
  height:88px;
}
.van-tabs__line{
  background:#923D93;
  width:47px !important;
}
.van-tab--active{
  color:#923D93;
}
.van-tab{
  font-size:26px;
  flex:0 0 120px!important;
}
.van-ellipsis{
  padding-top:31px;
}
</style>
