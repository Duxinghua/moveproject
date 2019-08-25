<template>
  <div class="activityList">
    <div class="activitycontent">
        <div class="activitycate">
          <span class="active">热门</span>
          <span>公益</span>
          <span>美食</span>
          <span>旅游</span>
          <span>娱乐</span>
          <span>其他</span>
        </div>
        <div class="activityitem">
           <Activity v-for="(item,index) in avList" :key="index" :avitem="item" />
        </div>
    </div>
    <Pagetab />
  </div>
</template>

<script>
import Activity from '../components/activity.vue'
import Pagetab from '../components/pagetab.vue'
export default {
  components: {
    Activity,
    Pagetab
  },
  data () {
    return {
      avList: [
        {
          img: require('../assets/images/av1.png'),
          title: '韩辰医疗美容鼻模海选'
        },
        {
          img: require('../assets/images/av1.png'),
          title: '韩辰医疗美容鼻模海选'
        }
      ]
    }
  }

}
</script>

<style>

</style>
