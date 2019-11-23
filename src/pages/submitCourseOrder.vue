<template>
  <div class="submit-order">
    <div class="submit-order-info">
      <div class="order-detail">
        <div class="order-detail-item">
          <div class="img"><img src="../assets/images/courseimg.png" alt=""></div>
          <div class="info">
            <div class="title">秋拾-零基础花艺创业课</div>
            <div class="name">柯杏林</div>
            <div class="price">¥1299.00</div>
          </div>
        </div>
        <span>x2</span>
      </div>
      <div class="order-item">
        <div class="left">课程合计</div>
        <div class="right">¥1299.00</div>
      </div>
      <div class="order-item">
        <div class="left">优惠活动</div>
        <div class="right">¥0.00</div>
      </div>
      <div class="order-item">
        <div class="left">合计</div>
        <div class="right">¥1299.00</div>
      </div>
    </div>
    <div class="submit-order-msg">
      <div class="title">订单信息</div>
      <div class="msg-info">
        <div class="lf">姓名</div>
        <div class="rg">王王娃</div>
      </div>
      <div class="msg-info">
        <div class="lf">手机号码</div>
        <div class="rg">13456776547</div>
      </div>
      <div class="msg-info">
        <div class="lf">订单编号</div>
        <div class="rg">201910291689</div>
      </div>
      <div class="msg-info">
        <div class="lf">身份证号</div>
        <div class="rg">420980199412309098</div>
      </div>
      <div class="msg-info">
        <div class="lf">下单时间</div>
        <div class="rg">2019-10-29 16:50</div>
      </div>
    </div>
    <div class="buy-box">
      <div class="money">需支付<span>￥1299</span></div>
      <div class="submit" @click="onBuy">立即购买</div>
    </div>
    <div class="submit-order-reconfirm" v-if="reShow">
      <div class="re-mb"></div>
      <div class="re-body">
        <div class="pt">提示</div>
        <div class="pb">确定要购买此课程吗？</div>
        <div  class="btns">
          <span @click="cancelHandler">取消</span>
          <span @click="onHandler">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubmitCourseOrder',
  data () {
    return {
      reShow: false
    }
  },
  mounted () {
    const param = {
      course_id: this.$route.query.courseId,
      type: 0
    }
    this.$api.courseOrderStore(param).then((res) => {
      if(res.code == 1) {
        console.log(res.data)
      }
    })
  },
  methods: {
    onBuy () {
      this.reShow = true;
    },
    cancelHandler () {
      this.reShow = false;
    },
    onHandler () {
      this.$router.push('/orderSuccess')
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-order{
  width: 100%;
  min-height: 100vh;
  padding: 25px;
  padding-bottom: 100px;
  background: #FBF8F4;
  &-info{
    background-color: #fff;
    border-radius: 12px;
    padding: 55px 25px;
    margin-bottom: 17px;
    .order-detail{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      &-item{
        display: flex;
        .img{
          width: 156px;
          height: 115px;
          border-radius: 4px;
          overflow: hidden;
          margin-right: 15px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info{
          max-width: 400px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title{
            font-size: 30px;
            color: #333333;
          }
          .name{
            font-size: 26px;
            color: #999999;
          }
          .price{
            font-size: 24px;
            color: #995258;
            font-weight: bold;
          }
        }
      }
      span{
        font-size: 28px;
        color: #333333;
        margin-right: 8px;
      }
    }
    .order-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #333333;
      font-size: 26px;
      padding: 25px 0px;
      border-top: 1px solid #F3F3F3;
      &:last-child{
        font-size: 36px;
        .right{
          color: #6D8160;
        }
      }
    }
  }
  &-msg{
    background-color: #fff;
    border-radius: 12px;
    padding: 40px 30px;
    .title{
      font-size: 36px;
      color: #6D8160;
      margin-bottom: 30px;
    }
    .msg-info{
      display: flex;
      align-items: center;
      color: #333333;
      font-size: 26px;
      padding: 25px 0;
      border-bottom: 1px solid #F3F3F3;
      &:last-child{
        border-bottom: none;
      }
      .lf{
        display: inline-block;
        width: 104px;
        margin-right: 36px;
        color: #999999;
        text-align: justify;
        text-align-last: justify;
      }
    }
  }
  .buy-box{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 95px;
    background: #fff;
    box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 25px;
    .money{
      color: #333333;
      font-size: 30px;
      span{
        color: #995258;
        font-size: 36px;
      }
    }
    .submit{
      width: 280px;
      height: 80px;
      background: #738266;
      text-align: center;
      line-height: 80px;
      color: #F3D995;
      font-size: 36px;
      border-radius: 50px;
    }
  }
  &-reconfirm{
    .re-mb{
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      background: rgba(1,1,1,0.6);
      width: 100%;
      height: 100%;
    }
    .re-body{
      position: fixed;
      margin: auto;
      left: 0;
      right: 0;
      top: 345px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      // transform: translate(-30%,-50%);
      width: 578px;
      height: 350px;
      padding: 47px 0;
      background: #FFFFFF;
      border-radius: 12px;
      z-index: 1000;
      .pt,.pb{
        font-size: 32px;
        color: #333333;
      }
      .pb{
        font-weight: Bold;
      }
      .btns{
        display: flex;
        flex-direction: row;
        justify-content: center;
        span{
          width: 209px;
          height: 72px;
          line-height: 72px;
          text-align: center;
          font-size: 30px;
          border-radius: 36px;
          border: 1px solid #E3E3E3;
          color: #999999;
          background-color: #fff;
          margin: 0 13px;
        }
        :last-child{
          border: 1px solid #738666;
          background-color: #738666;
          color: #F3D995;
        }
      }
    }
  }
}
</style>
