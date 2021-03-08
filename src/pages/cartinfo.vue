<template>
  <div class="cartinfo">
    <TopNav :menu="menutext" />
    <div class="cartinfowrap">
      <div class="carimgwrap">
        <img
          :src="detail.picUrl2"
          class="cartimg"
        />
      </div>
      <div class="cartitem">
        <div class="carttitle">
          载货空间及重量
        </div>
        <div class="cartlist">
          <div class="line">
            <span
              class='round'
            ></span>
            载重:{{detail.carCapacity}}公斤
          </div>
          <div class="line">
            <span
              class='round'
            ></span>
            长宽高:{{detail.carLwh}}
          </div>
          <div class="line">
            <span
              class='round'
            ></span>
            载货体积:{{detail.carVolume}}
          </div>
        </div>
      </div>
      <div class="cartitem">
        <div class="carttitle">
          用车参考
        </div>
        <div class="cartlist">
          <p
            v-for='(item,index) in fomat(detail.remarks)'
            class='tip'
            :key="index"
          ><span
              class='round'
            ></span>{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topnav.vue";
export default {
  name: "Cartinfo",
  components: {
    TopNav,
  },
  data() {
    return {
      seqId: "",
      detail: {},
      menutext: "车辆详情",
    };
  },
  mounted() {
    this.seqId = this.$route.query.seqId;
    this.getDetail();
  },
  methods: {
    fomat(val) {
      let arr = val && val.split("，");
      return arr;
    },
    getDetail() {
      var data = {
        seqId: this.seqId,
      };
      this.$api.carStyleGetByPk(data).then((result) => {
        this.detail = result.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cartinfo {
  display: flex;
  flex-direction: column;
  .tip {
    line-height: 48px;
    position: relative;
    padding-left: 20px;
    margin-left: 30px;
    word-break: break-all;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 30px;
    .round {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      position: absolute;
      left: 0;
      width: 8px;
      height: 8px;
      background-color: #888;
      border-radius: 50%;
    }
  }
  .cartinfowrap {
    display: flex;
    flex-direction: column;
    .carimgwrap {
      width: 100%;
      height: 427px;
      background: #f5f6f7;
      display: table-cell;
      vertical-align: middle;
      .cartimg {
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
      }
    }
    .cartitem {
      display: flex;
      padding: 30px;
      box-sizing: border-box;
      flex-direction: column;
      .carttitle {
        font-size: 30px;
        font-weight: bold;
        padding-left: 28px;
        position: relative;
      }
      .carttitle:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 5px;
        height: 70%;
        background: #00c400;
        transform: translateY(-50%);
      }
      .cartlist {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-top: 20px;
        box-sizing: border-box;
        .line {
          line-height: 48px;
          position: relative;
          padding-left: 20px;
          margin-left: 30px;
          word-break: break-all;
          padding-top: 0px;
          padding-bottom: 0px;
          margin-top: 5px;
          margin-bottom: 5px;
          font-size: 30px;
          .round {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            content: "";
            position: absolute;
            left: 0;
            width: 8px;
            height: 8px;
            background-color: #888;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
