<template>
  <div class="platformstandard">
    <TopNav :menu="menutext"/>
    <div class="tabnav">
      <div :class="['tabitem',tabIndex == 1 ? 'active' : '']" @click="tabHandler(1,'STAND1')">
        整车
      </div>
      <div :class="['tabitem',tabIndex == 2 ? 'active' : '']" @click="tabHandler(2,'STAND1')">
        半车
      </div>
      <div :class="['tabitem',tabIndex == 3 ? 'active' : '']" @click="tabHandler(3,'STAND1')">
        小件
      </div>
    </div>
    <div class="wrapp">
      <div class="carinfo">
        <img :src="cartObject.picUrl" class="carico" />
        <div class="des">
          <div class="dd">
            载重：{{cartObject.carCapacity}}公斤
          </div>
          <div class="dd">
            载贷体积：{{cartObject.carVolume}}方
          </div>
        </div>
      </div>
      <div class="htitle">
        货物大小
      </div>
      <van-cell-group>
        <van-field
          label="货物最长"
          v-model="platform.goodwidth"
          input-align="right"
          readonly
          placeholder="请选择"
          right-icon="arrow"
          @click="itemHandler('goodwidth')"
        />
        <van-field
          label="货物最高"
          v-model="platform.goodheight"
          input-align="right"
          readonly
          placeholder="请选择"
          right-icon="arrow"
          @click="itemHandler('goodheight')"
        />
      </van-cell-group>
      <div class="htitle">
        搬运楼层
      </div>
      <van-cell-group>
        <van-field
          label="发货地"
          v-model="platform.goodsend"
          input-align="right"
          readonly
          placeholder="请选择"
          right-icon="arrow"
          @click="itemHandler('goodsend')"
        />
        <van-field
          label="收货地"
          v-model="platform.goodreceive"
          input-align="right"
          readonly
          placeholder="请选择"
          right-icon="arrow"
          @click="itemHandler('goodreceive')"
        />
      </van-cell-group>
      <div class="number" @click="largeHandler">
        <div class="labelwrap">
          <span>大件物品数量</span>
          <van-icon name="warning-o" size="16px" style="display:none"/>
        </div>
        <van-stepper v-model="platform.goodnumber"   :min="minNumber" disable-input theme="round" button-size="16" />
      </div>
      <div class="number numberfix"   @click="itemHandler('goodrule')">
        <span>计费规则说明</span>
        <van-icon name="arrow" size="16" color="#999999" />
      </div>
    </div>
    <div class="fixedbtn">
      <van-button type="primary" color="#28ae3a" round block size="small" @click="needHandler">确定</van-button>
    </div>
    <!-- 楼层选择 -->
    <van-popup v-model="unitshow" round position="bottom" :style="{ 'min-height': '100px' }">
      <van-picker show-toolbar :title="unitText" :columns="columns"  @cancel="cancelHandler" @confirm="confirmHandler" />
    </van-popup>

  </div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  name:'Platformstandard',
  components:{
    TopNav
  },
  data(){
    return {
      menutext:'平台标准计价',
      tabIndex:1,
      platform:{
        attachType:'STAND1',
        goodwidth:'',
        goodwidthobj:{},
        goodheight:'',
        goodheightobj:{},
        goodsend:'',
        goodsendobj:{},
        goodreceive:'',
        goodreceiveobj:{},
        goodnumber:1,
        attachPriceObj:{}
      },
      minNumber:0,
      unitshow:false,
      flag:1,
      columns: [],
      unitText:'选择楼层',
      goodWidthList:[],
      goodHeightList:[],
      housefloorList:[],
      cartObject:{}
    }
  },
  mounted(){
    this.getOther(true,this.platform.attachType)
    var platform = localStorage.getItem('platform')
    if(platform){
      this.platform = JSON.parse(platform)
    }
    var large_goods = localStorage.getItem('large_goods')
    if(large_goods){
      large_goods = JSON.parse(large_goods)
      this.platform.goodnumber = large_goods.total
      localStorage.setItem('platform',JSON.stringify(this.platform))
    }
    var cartObject = localStorage.getItem('cartObject')
    if(cartObject){
      this.cartObject = JSON.parse(cartObject)
    }
  },
  methods:{
    getOther(flag,attachType){
      var data = {
        headSeqId:JSON.parse(localStorage.getItem('cartObject')).seqId,
        attachType:attachType
      }
      this.$api.carStyleDetFindMap(data).then((result)=>{
        if(result.code == 200){
          var obj = result.data
          var list1 = []
          var list2 = []
          var list3 = []
          var list4 = {}
          Object.keys(obj).forEach((value)=>{
            if(value == '货物最长'){
              list1 = obj[value]
              list1.map((item)=>{
                item.text = item.catItem + (item.price ? '  ¥'+item.price : '免费')
              })
            }else if(value == '货物最高'){
              list2 = obj[value]
              list2.map((item)=>{
                item.text = item.catItem + (item.price ? '  ¥'+item.price : '免费')
              })

            }else if(value == '楼层'){
              list3 = obj[value]
              list3.map((item)=>{
                item.text = item.remarks + (item.price ? '  ¥'+item.price : '免费')
              })
            }else if(value == '基础帮运费'){
              if(obj[value]){
                list4 = obj[value][0]
              }
            }
          })

          this.goodWidthList = list1
          this.goodHeightList = list2
          this.housefloorList = list3
          this.platform.attachPriceObj = list4
          localStorage.setItem('platform',JSON.stringify(this.platform))
        }
      })
    },
    tabHandler(index,text){
      this.tabIndex = index
      this.platform.attachType = text
      this.platform = {
        attachType:text,
        goodwidth:'',
        goodwidthobj:{},
        goodheight:'',
        goodheightobj:{},
        goodsend:'',
        goodsendobj:{},
        goodreceive:'',
        goodreceiveobj:{},
        goodnumber:1,
        attachPriceObj:{}
      }
      localStorage.setItem('platform',JSON.stringify(this.platform))
      this.goodWidthList = []
      this.goodHeightList = []
      this.housefloorList = []
      this.getOther(true,this.platform.attachType)
    },
    itemHandler(tag){
      if(tag == 'goodsend'){
        this.flag = 1
        this.unitshow = true
        this.unitText = '选择楼层'
        this.columns = this.housefloorList
      }else if(tag == 'goodreceive'){
        this.flag = 2
        this.unitshow = true
        this.unitText = '选择楼层'
        this.columns = this.housefloorList
      }else if(tag == 'goodrule'){
        this.$router.push({ path: "/priceinfo"});
      }else if(tag == 'goodwidth'){
        this.flag = 3
        this.unitText = '选择货物长度'
        this.unitshow = true
        this.columns = this.goodWidthList
      }else if(tag == 'goodheight'){
        this.flag = 4
        this.unitText = '选择货物高度'
        this.unitshow = true
        this.columns = this.goodHeightList
      }
    },
    largeHandler(){
      return
      this.$router.push('/bigitem')
    },
    needHandler(){
      if(!this.platform.goodwidth){
        return this.$toast('请选择货物最长')
      }
      if(!this.platform.goodheight){
         return this.$toast('请选择货物最高')
      }
      if(!this.platform.goodsend){
        return this.$toast('请选择搬运楼层发货地')
      }
      if(!this.platform.goodreceive){
        return this.$toast('请选择搬运楼层收货地')
      }
      localStorage.setItem('platform',JSON.stringify(this.platform))
      this.$router.push('/need')
    },
    cancelHandler(){
      this.unitshow = false
    },
    confirmHandler(e){
      if(this.flag == 1){
        this.platform.goodsend = e.text
        this.platform.goodsendobj = e
        localStorage.setItem('platform',JSON.stringify(this.platform))
      }else if(this.flag == 2){
        this.platform.goodreceive = e.text
        this.platform.goodreceiveobj = e
        localStorage.setItem('platform',JSON.stringify(this.platform))
      }else if(this.flag == 3){
        this.platform.goodwidth = e.text
        this.platform.goodwidthobj = e
        localStorage.setItem('platform',JSON.stringify(this.platform))
      }else if(this.flag == 4){
        this.platform.goodheight = e.text
        this.platform.goodheightobj = e
        localStorage.setItem('platform',JSON.stringify(this.platform))
      }
      this.unitshow = false
    }
  }

}
</script>

<style lang="scss" scoped>
.platformstandard{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6f7;
  padding:0 30px;
  box-sizing: border-box;
  /deep/ .van-stepper__plus,
  /deep/ .van-stepper__minus{
    border:1px solid#999999;
    background: white;
    color:#999999;
  }
  .tabnav{
    width:70%;
    height:100px;
    margin:0 auto;
    display: flex;
    flex-direction: row;
    .tabitem{
      width:33.33%;
      height:100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color:#999999;
    }
    .active{
      color:#28ae3a;
    }
  }
  .wrapp{
    display: flex;
    flex-direction: column;
    width:100%;
    .carinfo{
      width: 100%;
      height:250px;
      border-radius: 20px;
      overflow: hidden;
      background:white;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: row;
      .carico{
        widows: 280px;
        height:140px;
        margin-right:40px;
        display: flex;
        justify-content: center;
      }
      .des{
        display: flex;
        flex-direction: column;
        justify-content: center;
        .dd{
          font-size: 16px;
          color:#333333;
          line-height: 40px;
        }
      }
    }
    .htitle{
      font-size: 18px;
      color: #999999;
      line-height: 100px;
      height: 100px;
    }
    .number{
      width:100%;
      height:90px;
      padding:0 30px;
      box-sizing: border-box;
      border-radius: 20px;
      overflow: hidden;
      background: white;
      margin-top:20px;
      font-size: 18px;
      color:#333333;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .labelwrap{
        display: flex;
        flex-direction: row;
        align-items: center;
        span{
          margin-right: 10px;
        }
      }
    }
    .numberfix{
      padding-right:10px;
    }
  }
  /deep/ .van-cell-group {
    border-radius: 20px;
    overflow: hidden;
  }
  /deep/ .van-cell {
    border-radius: 20px;
    overflow: hidden;
  }
  /deep/ .van-field__right-icon {
    padding: 0px !important;
  }
  .fixedbtn{
    display: flex;
    padding:0 30px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width:100%;
    height:100px;
    position: fixed;
    left:0;
    bottom: 0;
    z-index: 2000;
    background: white;
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
}

</style>
