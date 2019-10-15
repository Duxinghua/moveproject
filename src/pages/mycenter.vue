<template>
  <div class="mycenter">
    <div class="mycHeader">
      <!-- :src="detail.avatar" -->
      <img class="myavater"  v-lazy="detail.avatar"/>
      <span class="myusername">{{detail.user_nickname}}</span>
      <router-link class="myjr" to="/mysy">
          <!-- <img class="myjrb" src="../assets/images/tsb.png" /> -->
          <p class="p1">{{detail.brokerage}}</p>
          <p class="p2">可提现</p>
          <p class="p3"><span>累计总额{{detail.brokerage_history}}元</span><span>已提现{{detail.tixian}}元</span></p>
      </router-link>

    </div>
    <div class="mycBody">
      <div class="myorder">
        <h4>我的订单</h4>
        <div class="myofun">
          <router-link class="myoitem" to="/productorderlist">
            <img class="ao" src="../assets/images/porder.png" alt="">
            <span>产品订单</span>
          </router-link>
          <router-link class="myoitem" to="/tickOrderList">
            <img class="df1" src="../assets/images/morder.png" alt="">
            <span>门票订单</span>
          </router-link>
        </div>
      </div>
      <!-- :href="adinfo.url" -->
      <a class="myyq" :href="adinfo.url">
        <!-- :src="adinfo.image" -->
        <img  v-lazy="adinfo.image"/>
      </a>
      <div class="myyqg">
        <router-link class="myyqgitem" to="/myteam">
          <img class="myyqic" src="../assets/images/yj.png" />
          <span class="myyqc" >邀请好友获得奖励金</span>
          <span class="myyqbtn">去邀请</span>
        </router-link>
        <div class="myyqgitem" @click="myCenter">
          <img class="myyqic" src="../assets/images/ma.png" />
          <span class="myyqc">我的地址</span>
          <img class="myyqnext" src="../assets/images/addressnext.png" />
        </div>
      </div>
    </div>
    <Footer :xbr="false" :me="true" :sale="false" :home="false" />
  </div>
</template>

<script>
import Footer from '../components/footer.vue'
import getSitem from '@/utils/storage'
import {userIndex} from '@/api'
export default {
  data () {
    return {
      detail: {},
      adinfo: {}
    }
  },
  mounted () {
    this.userIndexApi()
  },
  components: {
    Footer
  },
  methods: {
    myCenter () {
      // to="/addresslist?flag=true"
      // 删除商品
      getSitem.remove('goods_id')
      this.$router.push({path: '/addresslist', query: {flag: true}})
    },
    async userIndexApi () {
      const result = await userIndex({})
      if (result.code === 1) {
        this.detail = result.data.user
        this.adinfo = result.data.slideList[0]
      }
    }
  }
}
</script>

<style scoped>
.mycenter{
  display: flex;
  flex-direction: column;
  padding-top:35px;
}
.mycHeader{
  background:white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left:30px;
  padding-right:30px;
  padding-bottom: 35px;

}
.myavater{
  width:120px;
  height:120px;
  border-radius: 50%;
  margin-top:35px;
}
.myusername{
  font-size: 34px;
  color:#333;
  margin-bottom: 32px;
}
.myjrt{
  position: relative;
}
.myjr{
  width:100%;
  /* height:345px; */
  background:linear-gradient(135deg,rgba(156,64,162,1) 0%,rgba(66,44,148,1) 100%);
  border-radius:10px;
  color:white;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  /* padding-top:78px; */
  padding:50px 20px 20px 20px;
}
.myjr .p1{
  font-size: 72px;
}
.myjr .p2{
  font-size: 28px;
  padding-bottom: 15px;
}
.myjr .p3{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  width:100%;
  padding:0 29px;
}
.myjr .p3 span{
  width:50%;
}
.myjr .p3 span:nth-child(2){
  text-align: right
}
.myjrb{
  position: absolute;
  top:0;
  height:345px;

}
.mycBody{
  background:#F8F5FC;
  display: flex;
  flex-direction: column;
  padding-top:35px;
  padding-left:30px;
  padding-right:30px;
  height:80vh
}
.myorder{
  display: flex;
  background:white;
  border-radius:10px;
  padding:30px 20px;
  flex-direction: column;
}
.myorder h4{
  color:#333;
  font-size: 26px;
  font-weight: bold;
  padding-bottom: 15px;
  border-bottom:1px solid #EEEEEE;
}
.myofun{
  display: flex;
  flex-direction: row;
}
.myoitem{
  width:50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top:30px;
}
.myoitem .ao{
  width:44px;
  height:51px;
}
.myoitem .df1{
  width:51px;
  height:51px;
}
.myoitem .df2{
  width:61px;
  height: 49px;
}
.myoitem .ds{
  width:51px;
  height:54px;
}

.myoitem span{
  color:#333;
  font-size: 24px;
  padding-top: 15px;
}
.myyq{
  display: flex;
  margin-top:20px;
}
.myyq img{
  width:690px;
  height:130px;
}
.myyqg{
  margin-top:20px;
  background:white;
  border-radius: 10px;
}
.myyqic{
  width:48px;
  height:48px;
  margin-right:20px;

}
.myyqc{
  font-size: 26px;
  color:#333;
  flex:1 1 auto;
}
.myyqgitem{
  height:109px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #eee;
  padding-right:20px;
  padding-left:20px;
  justify-content: space-between;
  align-items: center;
}
.myyqgitem:last-child{
  border-bottom: 1px solid transparent;
}
.myyqnext{
  width:11px;
  height:20px;
}
.myyqbtn{
  width:160px;
  height:52px;
  background:rgba(238,228,253,1);
  border:1px solid rgba(228, 193, 231, 1);
  border-radius:8px;
  color:#8C3B92;
  font-size: 24px;
  text-align: center;
  line-height: 52px;
}
.mycompany{
  height: 100vh;
  background:white;
  /* padding-top:53px; */
  padding-left:32px;
  padding-right:32px;
}
.mycomheader .comimg{
  width:682px;
  height:290px;
  margin-bottom: 10px;
}
.mycomContent{
  /* font-size: 26px; */
}
.advantage{
  padding:52px 32px 0 32px;
  display: flex;
  flex-direction: column
}
.advcontent{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.advitem{
  width:33.33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.advitem img{
  width:120px;
  height:120px;
  margin-bottom: 30px;
}
.advitem span{
  color:#333333;
  font-size:26px;
}
.advcc{
  font-size: 26px;
}

</style>
