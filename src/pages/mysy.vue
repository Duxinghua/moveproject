<template>
  <div class="mysy">
    <div class="mysyheader">
      <div class="mysyl">
        <span class="mysys1">可提现金额</span>
        <span class="mysys2">{{brokerage}}</span>
      </div>
      <button class="button" @click="txclick">申请提现</button>
    </div>
    <div class="mysycontent">
      <div class="mysylist">
        <span :class="{active: current === 1}" @click="mysClick(1)">收入明细</span>
        <span :class="{active: current === 2}" @click="mysClick(2)">提现明细</span>
      </div>
        <div class="syitems">
          <div class="txitem" v-for="(item,index) in  txitemList" :key="index" v-if="current === 2">
            <span>{{item.create_time_desc}}</span>
            <span>-￥{{item.money}}</span>
              <Nodata  v-if="txitemList.length === 0" />
          </div>
          <div class="sritem" v-for="(item,index) in  syitemList" :key="index" v-if="current === 1">
            <div class="sriteml">
              <span class="s1l">{{item.create_time_desc}}</span>
              <span class="s2l">{{item.fx_desc}}</span>
            </div>
            <span class="sritemr">
              +￥{{item.money}}
            </span>
            <Nodata  v-if="syitemList.length === 0" />
          </div>

        </div>

    </div>
  </div>
</template>

<script>
import Nodata from '@/components/nodata.vue'
import {userBrokerageGetLog, userWithdrawList, userInfo} from '@/api'
import getSitem from '@/utils/storage'
// import Bus from '@/utils/bus'
export default {
  mounted () {
    //  let vm = this
    // Bus.$on('tixianresult', () => {
    //   vm.hasGetData = false
    //   vm.hasMoreData = false
    //   vm.inBottom = false
    //   vm.page = 1
    //   vm.txitemList = []
    //   vm.userBrokerageGetLogApi()
    // })
    // console.log(this.$route.query.current)
    //   this.hasGetData = false
    //   this.hasMoreData = false
    //   this.inBottom = false
    //   this.page = 1
      if (this.$route.query.current) {
        this.current = 2
        this.userWithdrawListApi()
      } else {
        this.current = 1
        this.userBrokerageGetLogApi()
      }

    console.log(this.current, 'current')

    this.userInfoApi()
    let bodycolors = document.documentElement || document.body
    bodycolors.style.background = '#f3f3f3'
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollfunction, false)
    })
    this.brokerage = this.$route.query.brokerage
  },
  methods: {
    scrollfunction () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if ((scrollHeight - 300) < (scrollTop + windowHeight)) {
        console.log(this.hasMoreData)
        if (!this.inBottom && this.hasMoreData) {
          console.log('加载更多')
          this.page++
          this.inBottom = true
          this.hasMoreData = false
          if (this.current === 1) {
            this.userBrokerageGetLogApi()
          } else {
            this.userWithdrawListApi()
          }
        }
      } else {
        this.inBottom = false
      }
    },
    mysClick (arg) {
      this.current = arg
      this.hasGetData = false
      this.hasMoreData = false
      this.inBottom = false
      this.page = 1
      if (this.current === 1) {
        this.syitemList = []
        this.userBrokerageGetLogApi()
      } else {
        this.txitemList = []
        this.userWithdrawListApi()
      }
    },
    async userInfoApi () {
      let data = {
        token: getSitem.getStr('token')
      }
      const result = await userInfo(data)
      if (result.code === 1) {
        this.brokerage = result.data.brokerage
      }
    },
    async userBrokerageGetLogApi () {
      let data = {
        token: getSitem.getStr('token'),
        page: this.page,
        page_size: this.page_size
      }
      const result = await userBrokerageGetLog(data)
      if (result.code === 1) {
        this.syitemList = this.syitemList.concat(result.data.list)
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          this.hasMoreData = true
        }
      }
    },
    async userWithdrawListApi () {
      let data = {
        token: getSitem.getStr('token'),
        page: this.page,
        page_size: this.page_size
      }
      const result = await userWithdrawList(data)
      if (result.code === 1) {
        this.txitemList = this.txitemList.concat(result.data.list)
        console.log(result.data.totalPage, this.page)
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          this.hasMoreData = true
          console.log(0)
        }
      }
    },
    txclick () {
      if (this.brokerage > 0) {
        this.$router.push({path: '/tixian', query: {brokerage: this.brokerage}})
      } else {
        this.$toast.fail('可提现金额为0')
      }
    }
  },
  components: {
    Nodata
  },
  computed: {

  },
  data () {
    return {
      brokerage: 0,
      current: 1,
      page: 1,
      page_size: 10,
      active: 0,
      itemlist: [
        '收入明细',
        '提现明细'
      ],
      hasMoreData: false,
      hasGetData: false,
      inBottom: false,
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
.mysy{
  background:#f5f5f5;
}
.mysylist .active{
  color:#9C3FA2;
  font-weight: bold;
}
.mysylist .active::after{
    position: absolute;
    top:50px;
    left: 50%;
    content: '';
    width: 50%;
    transform: translateX(-50%);
    height: 5px;
    background: #9C3FA2;
}
.mysylist span{
  font-size: 30px;
  color:#333;
  position: relative;
  font-weight: bold
}
.mysylist span:nth-child(1){
  margin-right: 40px;
}
.mysycontent{
  display: flex;
  flex-direction: column;
  width:100%;
  margin-top:227px;
  padding-left:32px;
  padding-right:32px;
}
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
