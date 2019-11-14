<template>
  <div class="myXq">
    <div class="myXq-item" v-for="(item,index) in xqList" :key="index">
      <img class="ico" src="../assets/images/xxico.png" alt="">
      <div class="content">
        <span class="s1">{{item.t1}}</span>
        <span :class="autoCss">{{item.t2}}</span>
      </div>
      <img class="down" :src="item.upFlag ? require('../assets/images/xxup.png') : require('../assets/images/xxdown.png')" alt="" @click="zkClickHandler(item.id)">
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  name: 'MyXx',
  data () {
    return {
      upFlag: false,
      xqList: [
        {
          id: 1,
          t1: '系统消息',
          t2: '恭喜你注册成为VIP会员，您将获取的积分奖 励会按时发到您的个人账户，有问题请及时联 系我们的客服电话400-52842000',
          upFlag: false
        }

      ]
    }
  },
  methods: {
    zkClickHandler (e) {
      this.upFlag = !this.upFlag
      this.xqList.map((item) => {
        if (item.id === e) {
          item.upFlag = !item.upFlag
        }
      })
    }
  },
  components: {
    NoData
  },
  computed: {
    autoCss () {
      return {
        s2: true,
        s3: !this.upFlag
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.myXq{
  display: flex;
  flex-direction: column;
  padding-left:26px;
  padding-right:26px;
  padding-top:51px;
  &-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 26px;
    border-bottom: 1px solid #F3F3F3;
    .ico{
      width:82px;
      height:82px;
      margin-right:22px;
    }
    .content{
      display: flex;
      flex-direction: column;
      width:518px;
      .s1{
        font-size: 32px;
        color:#333;
        width:100%;
        display: inline-block;
      }
      .s2{
        font-size: 26px;
        color:#666666;
        line-height: 46px;
      }
      .s3{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .down{
      width:37px;
      height:37px;
    }
  }
}
</style>
