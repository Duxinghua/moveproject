<template>
  <div class="platformpricing">
      <div class="itemtitle">
        工种选择
      </div>
      <van-cell-group>
        <van-field
          label="选择工种"
          v-model="worktype"
          input-align="right"
          clearable
          readonly
          placeholder="请选择"
          right-icon="arrow"
          @click="itemHandler('worktype')"
        />
      <van-field
        label="订单备注"
        v-model="remark"
        input-align="right"
        readonly
        placeholder="填写订单备注需求"
        right-icon="arrow"
        @click="itemHandler('remark')"
      />
      </van-cell-group>
      <div class="itemtitle">
        需求填写
      </div>
      <van-cell-group>
      <div class="vanpos">
          <van-field
            label="选择劳务工人数"
            v-model="worktype"
            input-align="right"
            placeholder="请填写人数"
            @click="itemHandler('worktype')"
          />
      </div>
      <van-field
        label="服务工期"
        v-model="worktimetype"
        input-align="right"
        readonly
        placeholder="请选择工期类型"
        right-icon="arrow"
        @click="itemHandler('worktimetype')"
      />
      <van-field
        label="服务区域"
        v-model="areatext"
        input-align="right"
        readonly
        placeholder="请选择"
        right-icon="arrow"
        @click="itemHandler('area')"
      />
      <div class="adarea">
        <van-field
          v-model="address"
          rows="1"
          autosize
          clearable
          label="详情地址"
          type="textarea"
          placeholder="请输入详情地址"
        />
      </div>
    </van-cell-group>
    <div class="itemtitle">
        其他信息
    </div>
    <van-cell-group>
      <div class="vanpes">
        <van-field
          label="联系人"
          v-model="name"
          input-align="right"
          clearable
          placeholder="请输入联系人"
          @click="itemHandler('name')"
        />
        <van-field
          label="联系电话"
          v-model="phone"
          input-align="right"
          clearable
          placeholder="请输入联系电话"
          @click="itemHandler('phone')"
        />
        </div>
        <van-field
          label="上门服务时间"
          v-model="time"
          input-align="right"
          clearable
          readonly
          right-icon="arrow"
          placeholder="请选择"
          @click="itemHandler('time')"
        />
        <div class="itemdiy">
          <span class="itemlabel lm">自定义价格</span>
          <van-switch
            v-model="diyprice"
            active-color="#28ae3a"
            size="14"
            inactive-color="#999999"
          />
        </div>
        <div class="diyprice" v-if="diyprice">
          <van-field
            label="¥"
            v-model="pricetext"
            input-align="left"
            clearable
            placeholder="请输入自定义价格"
            @click="itemHandler('diyprice')"
          />
        </div>
    </van-cell-group>
    <div class="couponwrap">
      <van-field
        label="选择优惠券"
        v-model="coupon"
        input-align="right"
        readonly
        placeholder="请选择优惠券"
        right-icon="arrow"
        @click="itemHandler('coupon')"
      />
    </div>
    <div class="notice">具体上门时间以线下沟通为主</div>
    <div class="rulewrap">
      <van-checkbox
        v-model="rulechecked"
        icon-size="14"
        checked-color="#28ae3a"
        shape="square"
      >勾选即代理服从</van-checkbox>
      <span
        class="link"
        @click="linkHandler(1)"
      >《货搬搬用户协议》</span>
    </div>
    <div class="pricepay">
      <div class="priceb">
        <span>¥</span>
        200
      </div>
      <div
        class="priceinfo"
        @click="linkHandler(2)"
      >
        <span>价格明细</span>
        <van-icon
          name="arrow"
          color="#999999"
        />
      </div>
      <div
        class="paychoosebtn"
        @click="payTodo"
      >
        确认下单
      </div>
    </div>

    <!-- 选择工期 -->
    <van-popup v-model="worktimeShow" round position="bottom" :style="{ 'min-height': '100px' }">
      <van-picker show-toolbar title="请选择工期类型" :columns="columns"  @cancel="cancelHandler" @confirm="confirmHandler" />
    </van-popup>
    <!-- 选择区域 -->
    <van-popup v-model="areaShow" round position="bottom" :style="{ 'min-height': '100px' }">
      <van-area title="选择区域" :area-list="areaList" :value="areavalue" @cancel="areacancelHandler" @confirm="areaconfirmHandler" />
    </van-popup>
    <!-- 时间 -->
    <van-popup
      v-model="timeshow"
      round
      position="bottom"
      :style="{'min-height':'100px'}"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择预约时间"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="timeCancel"
        @confirm="timeConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import areaList from '../utils/area.js'
export default {
  name:'platformpricing',
  data(){
    return {
      name:'',
      time:'',
      phone:'',
      remark:'',
      worktype:'',
      areaShow:false,
      worktimetype:'',
      worktimeShow:false,
      timeshow:false,
      diyprice:false,
      rulechecked:false,
      pricetext:'',
      coupon:'',
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2050, 10, 1),
      address:'',
      areatext:'',
      areavalue:'',
      areaObj:[],
      areaList:areaList,
      columns: [
        {
          text: '按小时计算'
        },
        {
          text: '按天计算'
        }
      ]
    }
  },
  methods:{
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      } else if (type === "hour") {
        return `${val}时`;
      } else if (type == "minute") {
        return `${val}分`;
      }
      return val;
    },
    timeCancel() {
      this.timeshow = false;
    },
    timeConfirm(e) {
      this.time = this.DateFormat(e, "yyyy-MM-dd hh:mm:ss");
      this.timeshow = false;
    },
    itemHandler(tag){
      if(tag == 'worktimetype'){
        this.worktimeShow = true
      }else if(tag == 'area'){
        this.areaShow = true
      }else if(tag == 'time'){
        this.timeshow = true
      }
    },
    areacancelHandler(){
      this.areaShow = false
    },
    cancelHandler(){
      this.worktimeShow = false
    },
    areaconfirmHandler(e){
      this.areavalue = e[0].code+'-'+e[1].code+'-'+e[2].code
      this.areatext = e[0].name+'-'+e[1].name+'-'+e[2].name
      this.areaObj = e
      this.areaShow = false
    },
    confirmHandler(e){
      this.worktimetype = e.text
      this.worktimeShow = false
    },
    linkHandler(index){

    },
    payTodo(){

    }
  }

}
</script>

<style lang="scss" scoped>
.platformpricing{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:#f5f6f7;
  padding:0 30px 200px 30px;
  box-sizing: border-box;
  .itemtitle{
    font-size: 26px;
    color:#666666;
    margin-top:30px;
    margin-bottom: 20px;
  }
  /deep/ .van-cell-group {
    border-radius: 20px;
    overflow: hidden;
  }
  /deep/ .van-cell {
   padding-right:15px;
   display: flex;
   align-items: center;
  }
  /deep/ .van-field__label{
    width:3.5rem;
  }
  /deep/ .van-button--small{
    width:100%;
    height:80px;
  }
  /deep/ .van-picker__cancel{
    color:#999999;
  }
  /deep/ .van-picker__confirm {
    color:#28ae3a;
  }
  .vanpos{
    /deep/ .van-cell {
      padding-right:25px;
      display: flex;
      align-items: center;
    }
    /deep/ .van-field__body{
      position: relative
    }
    /deep/ .van-field__control{
      padding-right:24px;
    }
    /deep/ .van-field__body::after{
      position: absolute;
      content:'人';
      right:0;
      top:50%;
      transform: translateY(-50%);
      font-size: 28px;
    }
  }
  .adarea{
    /deep/ .van-field__control{
      text-align: right;
      padding-right:14px;
    }
  }
  .vanpes{
    /deep/ .van-cell{
      padding-right:28px;
    }
  }
  .itemdiy {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 90px;
      padding:0 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #f5f6f7;
      .itemlabel {
        font-size: 26px;
        color: #333333;
      }
      .lm {
        margin-right: auto;
      }
      .itemvalue {
        font-size: 26px;
        color: #333333;
        margin-left: auto;
      }
      /deep/ .van-icon {
        font-size: 34px;
      }
  }
  .diyprice{
    /deep/ .van-field__label{
      width:fit-content;
      margin-right: 15px;
    }
  }
  .couponwrap {
    width: 690px;
    margin: 30px auto;
    /deep/ .van-cell{
      border-radius: 20px;
      overflow: hidden;
    }
  }
  .notice {
    color: #999999;
    font-size: 28px;
    margin-top: 30px;
    text-align: center;
  }
  .rulewrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    /deep/ .van-checkbox__label {
      font-size: 28px;
      color: #999999;
    }
    .link {
      font-size: 28px;
      color: #28ae3a;
    }
  }
  .pricepay {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    height: 100px;
    box-shadow: 0 -2px 5px #f5f6f7;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 5555555;
    .priceb {
      font-size: 50px;
      color: #28ae3a;
      margin-right: 20px;
      span {
        font-size: 34px;
      }
    }
    .priceinfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 18px;
      color: #999999;
      justify-content: center;
      padding: 5px 15px;
      border-radius: 25px;
      border: 1px solid #999999;
    }
    .paychoosebtn {
      width: 250px;
      height: 70px;
      border-radius: 35px;
      overflow: hidden;
      background: #28ae3a;
      color: white;
      font-size: 35px;
      text-align: center;
      line-height: 70px;
      margin-left: auto;
    }
  }
}

</style>
