<template>
  <div class="rate-wrap">
          <span>描述相符</span>
         <van-rate class="van-rates"
          @change="rateChange(value)"
          v-model="value"
          :size="20"
          color="#995258"
          void-icon="star"
          void-color="#eee"
          :readonly="disabled"
        />
  </div>
</template>

<script>
export default {
  name: 'RateWrap',
  props: {
    values: {
      type: Number
    },
    goodsId: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: this.values
    }
  },
  methods: {
    rateChange (value) {
      this.$emit('rateChange', value, this.goodsId)
    }
  }

}
</script>

<style lang="scss" scoped>
      .van-rates{
       display: flex;
      }
      .rate-wrap{
        display: flex;
        flex-direction: row;
        align-items: center;
        height:80px;
        span{
          font-size: 32px;
          color:#333;
          margin:auto 0;
          margin-right: 32px;

        }
      }
</style>
