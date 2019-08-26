<template>
  <div class="activitydetail">
    <div class="activityheader">
      <div class="accontenty">
        <p>韩辰医疗美容鼻模海选</p>
        <p class="syyouxi">使用有效期</p>
        <p class="tdshp"><span class="addressdeta1">高新二路129号创意产业园3037号</span> <span class="pricetick">¥8888</span></p>
        <p class="goumai">
          <span class="goumaisl">购买数量</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .activitydetail{
    padding: 44px 30px 0;
    .activityheader{
      border-radius: 8px;
      .accontenty{
        padding-bottom: 12px;
        p{
          line-height: 44px;
          padding: 22px 0 22px 0;
          margin-bottom: 0;
          border-bottom: 1px solid #F3F3F3;
          width: 100%;
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
        }
      }
    }
  }
</style>
