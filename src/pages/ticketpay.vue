<template>
  <div class="activitydetail">
    <div class="activityheader">
      <div class="accontenty">
        <p>韩辰医疗美容鼻模海选</p>
        <p class="syyouxi">使用有效期</p>
        <p class="tdshp"><span class="addressdeta1">高新二路129号创意产业园3037号</span> <span class="pricetick">¥8888</span></p>
        <p class="goumai">
          <span class="goumaisl">购买数量</span>
        <span class="minus"><i class="row"></i></span>
        <input class="text" type="tel" value="1" id="buyNum1">
        <span class="plus" ><i class="row"></i><i class="col"></i></span>
        </p>
      </div>
    </div>
    <div class="activityheader">
      <div class="accontenty">
        <p>游客信息 <span class="tip">需填<i>1</i>位，用于入园身份证</span> </p>
        <p class="info">
          <label for="cstname">姓名</label>
          <input id="cstname" type="text" placeholder="必填，输入证件上的姓名">
        </p>
        <p class="info">
          <label for="csttel">手机号</label>
          <input maxlength="11" id="csttel" type="text" placeholder="必填，输入联系人手机号">
        </p>
      </div>
    </div>
    <Paybutton @pay="payClient"/>
  </div>
</template>

<script>
import Paybutton from '../components/paybutton.vue'
export default {
  components: {
    Paybutton
  },
  methods: {
    payClient (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .activitydetail{
    padding: 44px 30px 0;
    padding-bottom: 98px;
    .activityheader{
      border-radius: 12px;
      margin-bottom: 20px;
      .accontenty{
        padding-bottom: 12px;
        p{
          line-height: 44px;
          padding: 22px 0 22px 0;
          margin-bottom: 0;
          border-bottom: 1px solid #F3F3F3;
          width: 100%;
          .tip{
            margin-left: 24px;
            font-size: 24px;
            color: #666666;
            i{
              color: #F4781D;
              font-style: normal;
            }
          }
        }
        .syyouxi{
          padding: 16px 0 0 0 ;
          font-size:30px;
          border: none;
        }
        .tdshp{
          border: none;
          padding: 0;
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -webkit-flex-direction: row;
          flex-direction: row;
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
          .addressdeta1{
            color: #666666;
            font-size: 24px;
            padding: 0;
            width: 100%;
          }
          .pricetick{
            margin-left: 20px;
            color: #999;
            color: #F4781D;
            font-size: 28px;
            font-weight: bold;
          }
        }
        .goumai{
          padding: 20px 0 20px 0 ;
          font-size:30px;
          border: none;
          width: 100%;
          border: none;
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -webkit-flex-direction: row;
          flex-direction: row;
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
          .goumaisl{
            width: 100%;
            border: none;
            padding: 0;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -webkit-flex-direction: row;
            flex-direction: row;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
          }
          .minus,.plus{
            position: relative;
            max-width: 40px;
            min-width: 40px;
            height: 40px;
            line-height: 40px;
            background: #F3EEFB;
            text-align: center;
            border-radius: 6px;
            text-align: center;
            .row{
              display: inline-block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              width: 20px;
              height: 2px;
              background-color: #8C3B92;
            }
            .col{
              display: inline-block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              width: 2px;
              height: 20px;
              background-color: #8C3B92;
            }
          }
          .text{
            text-align: center;
            width: 80px;
          }
        }
        .info{
          padding: 17px 0;
          line-height:40px;
          label{
            font-size: 26px;
            color: #666666;
            width: 100px;
            display: inline-block;
          }
          input{
            line-height: 40px;
            border: none;
            height: 40px;
          }
          ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color: #C1C1C1;
            font-size: 26px;
          }
          :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #C1C1C1;
            font-size: 26px;
          }
          ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:#C1C1C1;
            font-size: 26px;
          }
          :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #C1C1C1;
            font-size: 26px;
          }
        }
        .info:last-child{
          border: none;
          padding-bottom: 25px;
        }
      }
    }
  }
</style>
