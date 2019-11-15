<template>
  <div class="myXf">
    <div class="myXf-top">
      <img class="card" src="../assets/images/myxf.png" alt="">
      <div class="cardInfo">
        <div class="cardInfo-c">
          <span>学会</span>
          <span>1250</span>
        </div>
      </div>
      <div class="myXf-top-menu">
        <span :class="{active: current === 0 ? true : false}" @click="tabClickHandler(0)">学分记录</span>
        <span :class="{active: current === 1 ? true : false}" @click="tabClickHandler(1)">学分规则</span>
      </div>
    </div>
    <div class="myXf-content">
      <div class="myXf-content-item">
        <img class="userIco" src="../assets/images/myxfzl.png" alt="">
        <div class="userInfo">
          <span>完善个人资料</span>
          <span>2019.10.11 15:28</span>
        </div>
        <span class="userNum">+30</span>
      </div>
      <NoData v-if="xflist.length === 0 && current === 0"/>
      <img class="myfooter" src="../assets/images/myfooter.png" alt="">
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  name: 'MyXf',
  data () {
    return {
      current: 0,
      xflist: []
    }
  },
  mounted () {
    this.$api.userFans().then((result) => {
      console.log(result)
      if (result.code === 1) {
        this.xflist = result.data.data
      }
    })
  },
  methods: {
    tabClickHandler (e) {
      this.current = e
    }
  },
  computed: {
    autoIco (type) {
      var links
      switch (type) {
        case 1:
          links = require('../assets/images/myxfzl.png')
          break
        case 2:
        case 3:
          links = require('../assets/images/myxfxx.png')
          break
        case 4:
          links = require('../assets/images/myxfft.png')
          break
      }
      return links
    }
  },
  components: {
    NoData
  }
}
</script>

<style lang="scss" scoped>
.myXf{
  display: flex;
  flex-direction: column;
  &-top{
    background:#FBF8F4;
    height:448px;
    padding-top:41px;
    position: relative;
    .card{
      width:640px;
      height:362px;
      display:flex;
      margin:0 auto;
    }
    .cardInfo{
      position: absolute;
      top:144px;
      left:111px;
      &-c{
        display: flex;
        flex-direction: column;
        color: #333;
        justify-content: flex-start;
        span:nth-child(1){
          font-size: 30px;
          text-indent: 8px;
        }
        span:nth-child(2){
          font-size: 62px;
          font-weight: bold;
        }
      }
    }
    &-menu{
      display: flex;
      flex-direction: row;
      height:105px;
      justify-content: center;
      align-items: center;
      position: absolute;
      left:0;
      bottom: 0;
      background:white;
      width:100%;
      border-bottom: 2px solid #F3F3F3;
      span{
        font-size: 32px;
        color:#999999;
        padding-left:24px;
        padding-right:24px;
      }
      .active{
        font-size: 36px;
        color:#6D8160;
        position: relative;
      }
      .active::before{
        position: absolute;
        width:45px;
        content: '';
        height:4px;
        background:#6D8160;
        left:50%;
        bottom: -25px;
        transform: translateX(-50%)
      }
    }
  }
  &-content{
    display: flex;
    flex-direction: column;
    padding-left:26px;
    padding-right:26px;
    width:100%;
    &-item{
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 30px;
      padding-bottom: 30px;
      width:100%;
      border-bottom: 1px solid #F3F3F3;
      .userIco{
        width:77px;
        height:77px;
        margin-right:26px;
      }
      .userInfo{
        display: flex;
        flex-direction: column;
        width:476px;
        span:nth-child(1){
          font-size: 32px;
          color:#333;
          width:100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:nth-child(2){
          font-size: 26px;
          margin-top:10px;
          color:#666;
        }
      }
      .userNum{
        font-size:38px;
        color:#CDA871;
        width:119px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
      }
    }
    .myfooter{
      position: fixed;
      bottom: 0;
      left:0;
      width:100%;
      height:164px;
    }
  }
}
</style>
