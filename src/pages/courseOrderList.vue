<template>
  <div class="orderList">
    <div class="orderList-tab">
      <div class="orderList-tab-item" v-for="(item,index) in tabList" :key="index" @click="tabClickHandler(index)">
         <span :class="{active: current === index ? true : false}">{{item.name}}</span>
      </div>
    </div>
    <div class="orderList-content">
      <div class="orderList-content-item">
        <div class="ordertop">
          <span>订单编号：86431995</span>
          <span>待付款</span>
        </div>
        <div class="ordercontent" @click="orderDetailHandler">
          <img src="../assets/images/770552.png" alt="">
          <div class="ordercenter">
            <div class="ol">
              <span class="s1">花见小路·橄榄枝花见小路·橄榄枝花见小路·橄榄枝</span>
              <span class="s1 s2">白色</span>
              <div><span class="s3">¥</span><span class="s4">39</span></div>
            </div>
            <span class="s5">X200000</span>
          </div>
        </div>
        <div class="orderfooter">
          <span>合计: ¥78</span>
          <div class="btns">
            <span class="cancel">取消预约</span>
            <span>去付款</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseOrderList',
  data () {
    return {
      current: 0,
      tabList: [
        {name: '全部', status: ''},
        {name: '线下课程', status: 0},
        {name: '线上课程', status: 1},
        {name: '直播课程', status: 2}
      ]
    }
  },
  methods: {
    tabClickHandler (index) {
      this.current = index
    },
    orderDetailHandler () {
      this.$router.push({name: 'CourseOrderDetail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.orderList{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FBF8F4;
  &-tab{
    height: 98px;
    display:flex;
    flex-direction: row;
    width:100%;
    background:white;
    align-items: center;
    &-item{
      width:25%;
      font-size: 32px;
      color:#999999;
      text-align: center;
      position: relative;
      .active{
        font-size:36px;
        color:#6D8160;
      }
      .active::before{
        position: absolute;
        content: '';
        width:45px;
        height:4px;
        left:50%;
        background:#6D8160;
        transform: translateX(-50%);
        bottom: -25px;
      }
    }
  }
  &-content{
    display: flex;
    flex-direction: column;
    &-item{
      background:white;
      margin-top:20px;
      padding:26px;
      font-size: 30px;
      color:#333;
      display: flex;
      flex-direction: column;
      .ordertop{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .ordercontent{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding:30px 0px;
        width:100%;
        border-bottom:1px solid #F3F3F3;
        img{
          width:156px;
          height:130px;
          border-radius: 8px;
          margin-right:15px;
        }
        .ordercenter{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: calc(100% - 171px);
          .ol{
            display: flex;
            flex-direction: column;
            width:400px;
            .s1{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .s2{
              font-size: 26px;
              color:#999999;
              margin-top:10px;
            }
            .s3{
              color:#995258;
              font-size: 24px;
            }
            .s4{
              color:#995258;
              font-size: 34px;
            }
          }
        }
        .s5{
          font-size: 28px;
          color:#333;
        }
      }
      .orderfooter{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top:15px;
        height:62px;
        align-items: center;
        .btns{
          display: flex;
          flex-direction: row;
          span{
            width:168px;
            height:62px;
            line-height:62px;
            text-align: center;
            border:1px solid rgba(205, 168, 113, 1);
            border-radius:31px;
            margin-right:16px;
            margin-left:16px;
          }
          .cancel{
            color:#666666;
            border:1px solid #E3E3E3;
          }
        }
      }
    }
  }
}
</style>
