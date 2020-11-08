<template>
  <div class="priceinfo">
    <TopNav :menu="menutext" />
    <div class="itemlabel">
      拉货
    </div>
    <img
      src="../assets/images/i4.png"
      class="i1"
    />
    <img
      src="../assets/images/i1.png"
      class="i1"
    />
    <img
      src="../assets/images/i2.png"
      class="i1"
    />
    <img
      src="../assets/images/i3.png"
      class="i1"
    />
    <div class="item1">
      <div class="t1">基本路费（小面包）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（5公里）</span>
        <span>28元</span>
      </div>
      <div class="pw">
        <span>分段价（6-20公里）</span>
        <span>3元/公里</span>
      </div>
      <div class="pw">
        <span>分段价（21公里及以上）</span>
        <span>2.5元/公里</span>
      </div>
    </div>

    <div class="item1">
      <div class="t1">基本路费（中面包）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（5公里）</span>
        <span>50元</span>
      </div>
      <div class="pw">
        <span>分段价（6-20公里）</span>
        <span>4元/公里</span>
      </div>
      <div class="pw">
        <span>分段价（21公里及以上）</span>
        <span>3元/公里</span>
      </div>
    </div>
    <div class="item1">
      <div class="t1">基本路费（依维柯）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（5公里）</span>
        <span>60元</span>
      </div>
      <div class="pw">
        <span>分段价（6-20公里）</span>
        <span>5元/公里</span>
      </div>
      <div class="pw">
        <span>分段价（21公里及以上）</span>
        <span>4元/公里</span>
      </div>
    </div>

    <div class="item1">
      <div class="t1">基本路费（中货车）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（5公里）</span>
        <span>96元</span>
      </div>
      <div class="pw">
        <span>分段价（6-20公里）</span>
        <span>5元/公里</span>
      </div>
      <div class="pw">
        <span>分段价（21公里及以上）</span>
        <span>4.5元/公里</span>
      </div>
      <div class="pd">
        大件物品附加费=大件基础搬运费+大件楼层费（大件基础搬运费：25元/件，大件楼层费：3元/件/层）
      </div>
      <div class="pd">
        总费用=基础搬运费+楼层费+大件物品附件费（楼层费说明：有电梯按照1层计费；住1楼，则不收取楼层费）
      </div>
    </div>

    <div class="item1">
      <div class="t1">大件标准</div>
      <div class="t1d">
        单件重量在20kg-45kg，体积1.5m³以内，例如：
      </div>
      <div class="t1i">
        冰箱：单门/双开门冰箱
      </div>
      <div class="t1i">
        洗衣机：常见中小型洗衣机
      </div>
      <div class="t1i">
        空调：悬挂式空调，包括内机和外机
      </div>
      <div class="t1i">
        衣柜：双门及以下衣柜
      </div>
      <div class="t1i">
        书桌：小型单人书桌
      </div>
      <div class="t1i">
        电视：普通家用电视
      </div>
      <div class="t1i">
        鱼缸：1米以下鱼缸
      </div>
      <div class="t1i">
        其他大件：体积小于1.5m³或总重量小于45kg
      </div>
    </div>

    <div class="item1">
      <div class="t1">以下为超限物品</div>
      <div class="t1s">
        不适用平台计价，需与司机商议定价：
      </div>
      <div class="t1s">
        冰箱：双开门以上冰箱
      </div>
      <div class="t1s">
        衣柜：大型衣柜或长宽高之和大于3米
      </div>
      <div class="t1s">
        鱼缸：长度大于1米鱼缸
      </div>
      <div class="t1s">
        钢琴：三角钢琴
      </div>
      <div class="t1s">
        打印机：彩色喷墨打印机或其他专用打印机，总质量45kg 以上各类打印机
      </div>
      <div class="t1s">
        其他大件：体积大于1.5m³或总重量大于45kg
      </div>
    </div>

    <div class="item1">
      <div class="t1">以下为超限物品</div>
      <div class="t1info">
        <span>小面包 中面包 依维柯＊</span>
        上货、卸货免费等候时长总共为30分钟，过后每10分钟加收5元，不足10分钟按10分钟计算（如已收取搬运费，则无需加收等候费）。高速及停车场等费用，根据实际产生的金额由客户支付。
      </div>
      <div class="t1info">
        <span>中货车＊</span>
        上货、卸货免费等候时长总共为50分钟，过后每15分钟加收10元，不足15分钟按15分钟计算（如已收取搬运费，则无需加收等候费）。高速及停车场等费用，根据实际产生的金额由客户支付。
      </div>
      <div class="t1info">
        <span>5米2，6米8，7米6，9米6，14米，17.5米＊</span>
        上货、卸货免费等候时长总共为180分钟，过后每30分钟加收40元，不足30分钟按30分钟计算。高速及停车场等费用，根据实际产生的金额由客户支付。
      </div>

    </div>

    <div class="item1">
      <div class="t1">其他说明：</div>
      <div class="t1des">
        1.除搬运上楼外，纯人工搬运距离不超过20m, 超过20m以上超出部分1元/米，由客户和司机协商据实结算搬运费用。
      </div>
      <div class="t1des">
        2.如有与订单不符的物品，需要以实际情况为准，与司机根据费用参考协商搬运费用。 </div>
      <div class="t1des">
        3.如需货物拆装，增加额外搬运工，需要与司机协商搬运费用 </div>
    </div>
    <div class="item1">
      <div class="t1">注：</div>
      <div class="t1des">
        以上通过和司机协商产生的搬运费用，可在司机接单后，与司机协商议价。 </div>
      <div class="t1des">
        为保证您的权益如果发生线下乱收费可以拒绝 电话400-6789-121 </div>
    </div>
    <div class="item1">
      <div class="t1">温馨提示：</div>
      <div class="t1des">
        货搬搬是服务平台，暂不支持开具发票哦，如有需要，请与商家协商。 </div>
    </div>

    <div class="itemlabel">
      搬家
    </div>
    <img
      src="../assets/images/i5.png"
      class="i2"
    />

    <div class="item1">
      <div class="t1">基本路费（小面包）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（8公里）</span>
        <span>58元</span>
      </div>
      <div class="pw">
        <span>分段价（9公里及以上）</span>
        <span>4元/公里</span>
      </div>
    </div>

    <div class="item1">
      <div class="t1">基本路费（中面包）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（8公里）</span>
        <span>88元</span>
      </div>
      <div class="pw">
        <span>分段价（9公里及以上）</span>
        <span>4元/公里</span>
      </div>
    </div>

    <div class="item1">
      <div class="t1">基本路费（依维柯）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（8公里）</span>
        <span>98元</span>
      </div>
      <div class="pw">
        <span>分段价（9公里及以上）</span>
        <span>5元/公里</span>
      </div>
    </div>

    <div class="item1">
      <div class="t1">基本路费（中货车）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（8公里）</span>
        <span>148元</span>
      </div>
      <div class="pw">
        <span>分段价（9公里及以上）</span>
        <span>6元/公里</span>
      </div>
      <div class="t1i">
        总费用=起步价（根据车型起步价不同）+超里程（根据超出里程数定价）+楼层费+大件物品费用+基础搬运费（楼层费说明有电梯按照1层计费；住1楼，则不收取楼层费）
      </div>
    </div>

    <div class="item1">
      <div class="t1">小面包 中面包 依维柯</div>
      <div class="t2info">
        <span>加人费：100元/人</span>
      </div>
      <div class="t2info">
        <span>中途装卸费：50元/点</span>
      </div>
      <div class="t2info">
        <span>超时费：50元/点</span>
        （因客户原因导致超时30分钟以上）
      </div>
      <div class="t2info">
        <span>空驶费：50元/车</span>
        （上门后因客户自身原因取消订单时收取）
      </div>
      <div class="t2info">
        <span>第三方服务费：客户承担
        </span>
        （停车费、过路费、过桥费等产生的第三方收费）
      </div>
    </div>

    <div class="item1">
      <div class="t1">中货车</div>
      <div class="t2info">
        <span>加人费：200元/人</span>
      </div>
      <div class="t2info">
        <span>中途装卸费：100元/点</span>
      </div>
      <div class="t2info">
        <span>超时费：50元/点</span>
        （因客户原因导致超时30分钟以上）
      </div>
      <div class="t2info">
        <span>空驶费：200元/车</span>
        （上门后因客户自身原因取消订单时收取）
      </div>
      <div class="t2info">
        <span>第三方服务费：客户承担
        </span>
        （停车费、过路费、过桥费等产生的第三方收费）
      </div>

    </div>

    <div class="item1">
      <div class="t1">司机等待 上下货时间说明</div>
      <div class="t1info">
        <span>小面包 中面包 依维柯＊</span>
        上货、卸货免费等候时长总共为30分钟，过后每10分钟加收5元，不足10分钟按10分钟计算（如已收取搬运费，则无需加收等候费）。高速及停车场等费用，根据实际产生的金额由客户支付。
      </div>
      <div class="t1info">
        <span>中货车＊</span>
        上货、卸货免费等候时长总共为50分钟，过后每15分钟加收10元，不足15分钟按15分钟计算（如已收取搬运费，则无需加收等候费）。高速及停车场等费用，根据实际产生的金额由客户支付。
      </div>

      <div class="t1info">
        <span>5米2，6米8，7米6，9米6，14米，17.5米＊</span>
        上货、卸货免费等候时长总共为180分钟，过后每30分钟加收40元，不足30分钟按30分钟计算。高速及停车场等费用，根据实际产生的金额由客户支付。
      </div>

    </div>

    <div class="item1">
      <div class="t1">其他说明：</div>
      <div class="t1des">
        1.除搬运上楼外，纯人工搬运距离不超过20m, 超过20m以上超出部分1元/米，由客户和司机协商据实结算搬运费用。
      </div>
      <div class="t1des">
        2.如有与订单不符的物品，需要以实际情况为准，与司机根据费用参考协商搬运费用。 </div>
      <div class="t1des">
        3.如需货物拆装，增加额外搬运工，需要与司机协商搬运费用 </div>
    </div>
    <div class="item1">
      <div class="t1">注：</div>
      <div class="t1des">
        以上通过和司机协商产生的搬运费用，可在司机接单后，与司机协商议价。 </div>
      <div class="t1des">
        为保证您的权益如果发生线下乱收费可以拒绝 电话400-6789-121 </div>
    </div>
    <div class="item1">
      <div class="t1">温馨提示：</div>
      <div class="t1des">
        货搬搬是服务平台，暂不支持开具发票哦，如有需要，请与商家协商。 </div>
    </div>

    <div class="itemlabel">
      租车
    </div>

    <div class="item1">
      <div class="t1">费用计算说明</div>
      <div class="pd">
        租车按起步价和超里程价格计费。 </div>
    </div>

    <div class="item1">
      <div class="t1">基本路费（5米2）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（15公里）</span>
        <span>220元</span>
      </div>
      <div class="pw">
        <span>分段价（16-50公里）</span>
        <span>4.5元/公里</span>
      </div>
      <div class="pw">
        <span>分段价（51公里及以上）</span>
        <span>4元/公里</span>
      </div>
    </div>

    <div class="item1">
      <div class="t1">基本路费（6米8）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（15公里）</span>
        <span>260元</span>
      </div>
      <div class="pw">
        <span>分段价（16-50公里）</span>
        <span>5元/公里</span>
      </div>
      <div class="pw">
        <span>分段价（51公里及以上）</span>
        <span>4元/公里</span>
      </div>
    </div>

    <div class="item1">
      <div class="t1">基本路费（7米6）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（15公里）</span>
        <span>280元</span>
      </div>
      <div class="pw">
        <span>分段价（16-50公里）</span>
        <span>5.5元/公里</span>
      </div>
      <div class="pw">
        <span>分段价（51公里及以上）</span>
        <span>4.5元/公里</span>
      </div>
    </div>

    <div class="item1">
      <div class="t1">基本路费（9米6）</div>
      <div class="p1">00:00-24:00</div>
      <div class="pw">
        <span>起步价（15公里）</span>
        <span>380元</span>
      </div>
      <div class="pw">
        <span>分段价（16-50公里）</span>
        <span>6.5元/公里</span>
      </div>
      <div class="pw">
        <span>分段价（51公里及以上）</span>
        <span>6元/公里</span>
      </div>
    </div>

    <div class="itemlabel">
      劳务工
    </div>

    <div class="item1">
      <div class="t1">费用计算说明</div>
      <div class="pd">
        劳务工按工作时长计费（半天、一天）。 </div>
    </div>

    <div class="item1">
      <div class="t1">搬搬提示：</div>
      <div class="pd">
        此信息价格均是参考价格，最终价格可为双方线下协商价格。 </div>
    </div>

    <div class="item1">
      <div class="t1">搬搬提醒：</div>
      <div class="pd">
        招工、找活请确认好对方身份，签好合同，如对方要求缴纳费用，请慎重选择，自身利益受到损害的同时可立即报警，货搬搬可配合调查，但概不负责。 </div>
    </div>

  </div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  components:{
    TopNav
  },
  data(){
    return{
       menutext: "计费规则说明",
    }
  }
};
</script>

<style lang="scss" scoped>
.priceinfo {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: white;
  padding: 35px;
  box-sizing: border-box;
  .itemlabel {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 30px;
    margin-top:30px;
  }
  .i1 {
    width: 100%;
    height: 299px;
    margin-bottom: 60px;
  }
  .i2 {
    width: 100%;
    height: 459px;
    margin-bottom: 60px;
  }
  .item1 {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    .t1 {
      font-size: 28px;
      color: #000000;
      font-weight: 400;
      margin-bottom: 20px;
    }
    .p1 {
      font-size: 22px;
      color: #505050;
      font-weight: 400;
      margin-bottom: 12px;
    }
    .pw {
      display: flex;
      flex-direction: row;
      margin-bottom: 22px;
      span {
        width: 50%;
        font-size: 22px;
        color: #505050;
        font-weight: 400;
      }
    }
    .pd {
      font-size: 22px;
      color: #505050;
      margin-bottom: 20px;
      margin-top: 10px;
    }
    .t1d {
      font-size: 22px;
      color: #000000;
      margin-bottom: 20px;
    }
    .t1s {
      font-size: 22px;
      color: #505050;
      margin-bottom: 20px;
    }
    .t1i {
      font-size: 22px;
      color: #999999;
      margin-bottom: 20px;
    }
    .t1info {
      span {
        font-size: 22px;
        color: #333333;
        margin-bottom: 20px;
      }
      font-size: 22px;
      color: #999999;
      margin-bottom: 20px;
    }
    .t1des {
      font-size: 22px;
      color: #333333;
      margin-bottom: 20px;
    }

    .t2info {
      span {
        font-size: 22px;
        color: #505050;
        margin-bottom: 15px;
      }
      font-size: 22px;
      color: #999999;
      margin-bottom: 15px;
    }
  }
}
</style>
