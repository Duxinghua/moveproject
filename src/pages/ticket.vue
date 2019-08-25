<template>
  <div class="ticket">
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="index in itemlist" :title="index" :key="index">
        <div class="ticketContent">
            <ticketItem :item="item" v-for="(item,index) of itemData" :key="index" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ticketItem from '../components/ticketItem.vue'
export default {
  components: {
    ticketItem
  },
  data () {
    return {
      active: 0,
      itemlist: ['热门', '景点', '展览', '娱乐', '亲子', '游乐场', '其他'],
      itemData: [
        {
          img: require('../assets/images/t1.png'),
          title: '梁子湖真人cs团建拓展',
          des: '真人CS | 江汉区江汉区银松路79号',
          pr1: 99,
          pr2: 129
        },
        {
          img: require('../assets/images/t1.png'),
          title: '梁子湖真人cs团建拓展',
          des: '真人CS | 江汉区江汉区银松路79号',
          pr1: 99,
          pr2: 129
        },
        {
          img: require('../assets/images/t1.png'),
          title: '梁子湖真人cs团建拓展',
          des: '真人CS | 江汉区江汉区银松路79号',
          pr1: 99,
          pr2: 129
        },
        {
          img: require('../assets/images/t1.png'),
          title: '梁子湖真人cs团建拓展',
          des: '真人CS | 江汉区江汉区银松路79号',
          pr1: 99,
          pr2: 129
        },
        {
          img: require('../assets/images/t1.png'),
          title: '梁子湖真人cs团建拓展',
          des: '真人CS | 江汉区江汉区银松路79号',
          pr1: 99,
          pr2: 129
        }
      ]
    }
  }
}
</script>

<style>
  .ticket{
    padding-top: 88px;
  }
.van-tabs--line .van-tabs__wrap{
  height:88px;
  position: fixed;
  width: 100%;
  top:0;
}
.van-tabs__line{
  background:#923D93;
  width:47px !important;
  bottom: 0;
}
.van-tab--active{
  color:#923D93;
}
.van-tab{
  font-size:26px;
  flex:0 0 100px!important;
}
.van-ellipsis{
  line-height: 40px;
  padding:23px 0;
}
.van-tabs__nav--line{
  padding-bottom: 0;
}
</style>
