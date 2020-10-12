<template>
  <div class="pricedetail">
    <div class="pricetop">
      <div class="price">
        <span>¥</span>
        200
      </div>
      <div class="lc">总里程9公里</div>
      <div class="des">
        若产生高速费、停车费和搬运费，请用户额外支付；<br/>
        若涉及逾时等侯费，请与司机按收费标准结算
      </div>
    </div>
    <div class="pricebot">
      <div class="priceitem">
        <div class="pricetitle">
          基础费用
        </div>
        <div class="pricew">
          <div class="pt">
            起步价(小面包车)
          </div>
          <div class="pr">
            ¥20
          </div>
        </div>
        <div class="pricew">
          <div class="pt">
            超里程(4公里 )
          </div>
          <div class="pr">
            ¥20
          </div>
        </div>
      </div>
      <div class="priceitem">
        <div class="pricetitle">
          额外费用
        </div>
        <div class="pricew">
          <div class="pt">
           楼层费
          </div>
          <div class="pr">
            ¥20
          </div>
        </div>
        <div class="pricew">
          <div class="pt">
            大件物品附加费
          </div>
          <div class="pr">
            ¥20
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Pricedetail',
  data(){
    return {

    }
  }

}
</script>

<style lang="scss" scoped>
.pricedetail{
  display: flex;
  flex-direction: column;
  padding:100px 40px 40px 40px;
  box-sizing: border-box;
  .pricetop{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .price{
      font-size: 50px;
      color:#333333;
      span{
        font-size: 40px;
        margin-right:5px;
      }
    }
    .lc{
      font-size: 40px;
      color:#333333;
      margin-top:10px;
    }
    .des{
      font-size: 24px;
      color:#999999;
      line-height: 50px;
      margin-top:25px;
      text-align: center;
      padding-bottom: 40px;
      border-bottom: 1px solid #e5e6e7;
    }
  }
  .pricebot{
    display: flex;
    flex-direction: column;
    padding-top:40px;
    box-sizing: border-box;
    .priceitem{
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .pricetitle{
        font-size: 40px;
        color:#999999;
        margin-top:20px;
        margin-bottom: 20px;
      }
      .pricew{
        font-size: 30px;
        line-height: 52px;
        color:#333333;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
