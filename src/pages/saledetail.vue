<template>
  <div class="saledetail">
    <div class="saledheader">
      <img :src="detail.head_image" />
      <div class="saledright">
        <p>{{detail.user_name}}</p>
        <p>{{detail.user_name}}</p>
        <p class="saledrs"><span>{{detail.likes}} 关注</span><span>{{detail.funs}} 粉丝</span></p>
      </div>
    </div>
    <div class="saledcontent">
        <div class="saledes">
          <span class="saledsp">详情</span>
        </div>
        <div class="saledec" style="font-size:initial" v-html="detail.content">
        </div>
    </div>
  </div>
</template>

<script>
import {celebrityDetail} from '@/api'
export default {
  data () {
    return {
      detail: {}
    }
  },
  mounted () {
    this.celebrityDetailApi()
  },
  methods: {
    async celebrityDetailApi () {
      let formdata = {celebrity_id: this.$route.query.id}
      console.log(formdata, 'data')
      const result = await celebrityDetail(formdata)
      if (result.code === 1) {
        this.detail = result.data
      }
    }
  }
}
</script>

<style scoped>
.saledetail{
  background:white;
  display: flex;
  flex-direction: column;
}
.saledheader{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding:44px;
  background:linear-gradient(169deg,rgba(151,62,147,1),rgba(62,38,139,1));
}
.saledheader img{
  width:134px;
  height:134px;
  border-radius: 50%;
  margin-right:33px;
}
.saledright{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color:#FFFFFF;

}
.saledright p:nth-child(1){
  font-size: 30px;
  margin-bottom: 14px;
}
.saledright p:nth-child(2){
  font-size: 26px;
  margin-bottom: 16px;
}
.saledrs{
  display: flex;
  flex-direction: row;
}
.saledrs span{
  width:190px;
  height:48px;
  background:rgba(255,255,255,0);
  border:1px solid white;
  opacity:0.28;
  border-radius:24px;
  color:white;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right:15px;
}
.saledcontent{
  padding-left:32px;
  padding-right:32px;
}
.saledec{
  /* font-size: 26px;
  color:#333; */
  font-size: initial;
}
.saledec img{
  width: 100% !important;
  height:auto !important;
}

</style>
