<template>
  <div class="invite">
    <div class="invtebackground">
    </div>
    <div class="fontin">
    </div>
    <div class="inviteitem">
      <!-- <p class="pitemstitle">长按识别 立即体验</p> -->
      <img :src="detail.fx_qrcode_img" v-lazy="detail.fx_qrcode_img"  class="wxcode"/>
      <p class="pitemss">分享二维码邀请好友</p>
    </div>
    <!-- <div class="invitebutton"  @click="shareClick">
      分享好友
    </div> -->
    <!-- <Sharepagestyle :sharePageStyle="sharePageStyle" @close="showshareclose"/> -->

  </div>

</template>

<script>
import Sharepagestyle from '../components/showSharePage.vue'
import {weixinGetShare, userShare} from '@/api'
import getSitem from '@/utils/storage'
export default {
  data () {
    return {
      sharePageStyle: false,
      openid: null,
      detail: {
        // fx_qrcode_img: ''
      }
    }
  },
  components: {
    Sharepagestyle
  },
  created () {
    // window.location.href = location.href.split('#')[0] + '#' + location.href.split('#')[1]
  },
  mounted () {
    this.openid = this.$route.query.openid
    this.userShareApi()
  },
  methods: {
    async userShareApi () {
      const data = {
        udd: this.$route.query.openid
      }
      const result = await userShare(data)
      if (result.code === 1) {
        this.detail = result.data
        getSitem.setStr('pudd', result.data.openid)
      }
    },
    showshareclose () {
      this.sharePageStyle = false
    },
    shareClick () {
      this.sharePageStyle = true
    }
  }

}
</script>

<style scoped>
.invtebackground{
  position: fixed;
  left:0;
  top:0;
  background:url('../assets/images/in.png');
  background-size: 100% 100%;
  width:750px;
  height:586px;
}
.fontin{
  position: fixed;
  left:50%;
  top:59px;
  background: url('../assets/images/fontin.png');
  background-size: 100% 100%;
  height:108px;
  width:288px;
  transform: translateX(-50%)
}
.invitebutton{
  position: fixed;
  bottom: 0;
  left:0;
  width:100%;
  height:98px;
  background:#9C3FA2;
  text-align: center;
  line-height: 98px;
  font-size: 36px;
  color:white;
  cursor: pointer;
}
.invite{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:#F3EDFB;
  width:100vw;
  height:100vh;
}
.inviteitem{
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:448px;
    height:441px;
    background:url('../assets/images/inviteitemin.png');
    background-size:100% 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.inviteitem .wxcode{
  margin-top:36px;
  width:227px;
  height:225px;
}
.inviteitem span{
  font-size:29px;
  font-weight: bold;
  color:white;
}
.inviteitem .pitemss {
  font-size:23px;
  margin-top:36px;
  color:#666
}
.inviteitem .pitemstitle{
  /* position: absolute;
  top:0px;
  font-size:29px;
  font-weight: bold;
  height:58px;
  line-height: 58px;
  display:inline-block; */
  /* flex-direction: row;
  justify-items: center;
  align-items: center; */
  /* color:white;
  text-align: center;
  margin:0 auto; */
}
</style>
