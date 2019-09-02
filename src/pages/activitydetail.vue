<template>
  <div class="activitydetail">
    <div class="activityheader" v-if="activeDetail">
      <img class="acbanner" :src="activeDetail.image"  v-lazy="activeDetail.image" alt="">
      <div class="accontenty">
        <p>{{activeDetail.title}}</p>
        <div class="activityditem">
          <img src="../assets/images/avtime.png" alt="">
          <span>活动时间:</span>
          <span>{{activeDetail.start_time}} 至 {{activeDetail.end_time}}</span>
        </div>
        <div class="activityditem">
          <img src="../assets/images/avmoney.png" alt="">
          <span>活动费用:</span>
          <span>{{activeDetail.money}}元</span>
        </div>
        <div class="activityditem">
          <img src="../assets/images/avpersion.png" alt="">
          <span>参与人群:</span>
          <span>{{activeDetail.member}}</span>
        </div>
      </div>
    </div>
    <div class="activityinfodes" v-if="activeDetail">
      <span class="aidst">活动介绍</span>

      <div class="aids" v-html="activeDetail.content">

      </div>
      <!-- <span class="aidsb">报名请加入社区群，群号：L54120013</span> -->
    </div>
  </div>
</template>

<script>
import tool from '@/assets/js/tool'
import {activeDetailApi} from '@/api'
export default {
  data () {
    return {
      activeDetail: null
    }
  },
  mounted () {
    this.getActiveDetail()
  },
  methods: {
    async getActiveDetail () {
      let formdata = {activity_id: this.$route.query.id}
      const data = await activeDetailApi(formdata)
      if (data.code === 1) {
        this.activeDetail = data.data
        this.activeDetail.start_time = tool.transformTime(data.data.start_time)
        this.activeDetail.end_time = tool.transformTime(data.data.end_time)
      }
    }
  }
}
</script>

<style scoped>
  .activitydetail{
    display: block;
  }
  .activityinfodes{
    padding-bottom: 60px;
  }

.acbanner{
  height: auto;
}
.accontenty{
  padding-bottom: 12px;
}
  .activitydetail .accontenty p{
    line-height: 44px;
    padding: 18px 0 0 0;
    margin-bottom: 0;
  }
.activityditem{
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 1px solid #F3F3F3;
  line-height:60px;
}
.activityditem:last-child{
  border-bottom: none;
}
.aids{
  /* font-size: 24px;
  color: #333333;
  text-align: left;
  line-height: 40px;
  margin-bottom: 34px; */
  font-size: initial
}
.aids img{
  width:100% !important;
  height:auto !important;
}
</style>
