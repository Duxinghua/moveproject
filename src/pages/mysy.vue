<template>
  <div class="mysy">
    <div class="mysyheader">
      <div class="mysyl">
        <span class="mysys1">可提现金额</span>
        <span class="mysys2">0.00</span>
      </div>
      <button class="button" @click="txclick">申请提现</button>
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
            <Nodata />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Nodata from '@/components/nodata.vue'
import {userBrokerageGetLog, userWithdrawList} from '@/api'
import getSitem from '@/utils/storage'
export default {
  mounted () {
    this.userWithdrawListApi()
    this.userBrokerageGetLogApi()
  },
  methods: {
    async userBrokerageGetLogApi () {
      let data = {
        token: getSitem.getStr('token'),
        page: this.page,
        page_size: this.page_size
      }
      const result = await userBrokerageGetLog(data)
      console.log(result)
    },
    async userWithdrawListApi () {
      let data = {
        token: getSitem.getStr('token'),
        page: this.page,
        page_size: this.page_size
      }
      const result = await userWithdrawList(data)
      if (result.code === 1) {
        console.log(result)
      }
    },
    txclick () {
      this.$toast.fail('可提现金额为0')
    }
  },
  components: {
    Nodata
  },
  computed: {

  },
  data () {
    return {
      page: 1,
      page_size: 10,
      active: 0,
      itemlist: [
        '收入明细',
        '提现明细'
      ],
      txitemList: [
        // {
        //   time: '2019-08-08 12:20:00',
        //   money: '20.00'
        // },
        // {
        //   time: '2019-08-08 12:20:00',
        //   money: '20.00'
        // },
        // {
        //   time: '2019-08-08 12:20:00',
        //   money: '20.00'
        // },
        // {
        //   time: '2019-08-08 12:20:00',
        //   money: '20.00'
        // },
        // {
        //   time: '2019-08-08 12:20:00',
        //   money: '20.00'
        // },
        // {
        //   time: '2019-08-08 12:20:00',
        //   money: '20.00'
        // },
        // {
        //   time: '2019-08-08 12:20:00',
        //   money: '20.00'
        // }
      ],
      syitemList: [
        // {
        //   time: '2019-08-03 12:21:25',
        //   des: '您邀请好友人数达到10人，平台奖励佣金 文字过多就换行',
        //   money: '100000.00'
        // },
        // {
        //   time: '2019-08-03 12:21:25',
        //   des: '您邀请好友人数达到10人，平台奖励佣金 文字过多就换行',
        //   money: '100000.00'
        // },
        // {
        //   time: '2019-08-03 12:21:25',
        //   des: '您邀请好友人数达到10人，平台奖励佣金 文字过多就换行',
        //   money: '100000.00'
        // },
        // {
        //   time: '2019-08-03 12:21:25',
        //   des: '您邀请好友人数达到10人，平台奖励佣金 文字过多就换行',
        //   money: '100000.00'
        // }
      ]
    }
  }

}
</script>

<style>
.mysyheader .van-tabs--line .van-tabs__wrap{
  height:88px;
}
.mysyheader .van-tabs__line{
  background:#923D93;
  width:47px !important;
}
.mysyheader .van-tab--active{
  color:#923D93;
}
.mysyheader .van-tab{
  font-size:26px;
  flex:0 0 150px!important;
}
.mysyheader .van-ellipsis{
  padding-top:31px;
}
</style>
