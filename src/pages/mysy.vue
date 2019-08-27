<template>
  <div class="mysy">
    <div class="mysyheader">
      <div class="mysyl">
        <span class="mysys1">可提现金额</span>
        <span class="mysys2">￥5000.00</span>
      </div>
      <button class="button">申请提现</button>
    </div>
      <van-tabs v-model="active" swipeable>
      <van-tab v-for="index in itemlist" :title="index" :key="index">
        <div class="syitems">
          <div class="txitem" v-for="(item,index) in  txitemList" :key="index" v-if="active === 1">
            <span>{{item.time}}</span>
            <span>-￥{{item.money}}</span>
          </div>
          <div class="sritem" v-for="(item,index) in  syitemList" :key="index" v-if="active === 0">
            <div class="sriteml">
              <span class="s1l">{{item.time}}</span>
              <span class="s2l">{{item.des}}</span>
            </div>
            <span class="sritemr">
              +￥{{item.money}}
            </span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      itemlist: [
        '收入明细',
        '提现明细'
      ],
      txitemList: [
        {
          time: '2019-08-08 12:20:00',
          money: '20.00'
        },
        {
          time: '2019-08-08 12:20:00',
          money: '20.00'
        },
        {
          time: '2019-08-08 12:20:00',
          money: '20.00'
        },
        {
          time: '2019-08-08 12:20:00',
          money: '20.00'
        },
        {
          time: '2019-08-08 12:20:00',
          money: '20.00'
        },
        {
          time: '2019-08-08 12:20:00',
          money: '20.00'
        },
        {
          time: '2019-08-08 12:20:00',
          money: '20.00'
        }
      ],
      syitemList: [
        {
          time: '2019-08-03 12:21:25',
          des: '您邀请好友人数达到10人，平台奖励佣金 文字过多就换行',
          money: '100000.00'
        },
        {
          time: '2019-08-03 12:21:25',
          des: '您邀请好友人数达到10人，平台奖励佣金 文字过多就换行',
          money: '100000.00'
        },
        {
          time: '2019-08-03 12:21:25',
          des: '您邀请好友人数达到10人，平台奖励佣金 文字过多就换行',
          money: '100000.00'
        },
        {
          time: '2019-08-03 12:21:25',
          des: '您邀请好友人数达到10人，平台奖励佣金 文字过多就换行',
          money: '100000.00'
        }
      ]
    }
  }

}
</script>

<style>
.van-tabs--line .van-tabs__wrap{
  height:88px;
}
.van-tabs__line{
  background:#923D93;
  width:47px !important;
}
.van-tab--active{
  color:#923D93;
}
.van-tab{
  font-size:26px;
  flex:0 0 150px!important;
}
.van-ellipsis{
  padding-top:31px;
}
</style>
