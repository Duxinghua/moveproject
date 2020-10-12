<template>
  <div class="bigitem">
    <div class="left">
      <div
        :class="['litem',listIndex == index ? 'active' : '']"
        v-for="(item,index) in list"
        :key="index"
        @click="listItemHandler(index)"
      >
        {{item}}
      </div>
    </div>
    <div
      class="right"
      id="right"
    >
      <div class="rightitem">
        <div class="righttitle">
          {{labelText}}
        </div>
        <div class="rightcontentwrap">
          <div
            class="rightcontent"
            v-for="(item,index) in selectList"
            :key="index"
          >
            <div class="righttop">
              {{item.catType}}/{{item.catItem}}
            </div>
            <div class="stepwrap">
              <span class="price">¥{{item.price}}</span>
              <van-stepper
                v-model="item.number"
                theme="round"
                button-size="20"
                disable-input
                step="1"
                :min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixedbtn">
      <van-button
        type="primary"
        color="#28ae3a"
        round
        block
        size="small"
        @click="needHandler"
      >确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bigitem",
  data() {
    return {
      listIndex: 0,
      attachType: "LARGE_GOODS",
      labelText: "",
      list: [],
      selectList: [],
      resObj: {},
    };
  },
  mounted() {
    this.getOther();
  },
  methods: {
    listItemHandler(index) {
      this.listIndex = index;
      var key = this.list[index];
      this.selectList = this.resObj[key];
    },
    getOther() {
      var data = {
        headSeqId: JSON.parse(localStorage.getItem("cartObject")).seqId,
        attachType: this.attachType,
      };
      this.$api.carStyleDetFindMap(data).then((result) => {
        if (result.code == 200) {
          var obj = result.data;
          var list = [];
          Object.keys(obj).forEach((value) => {
            list.push(value);
          });
          var key = list[0];
          this.labelText = key;
          Object.values(obj).forEach((value) => {
            value.map((item) => {
              item.number = 0;
            });
          });
          this.selectList = obj[key];
          this.list = list;
          this.resObj = obj;
          var large_goods = localStorage.getItem('large_goods')
          if(large_goods){
            var sobj = JSON.parse(large_goods).resObj
            this.resObj = sobj
            this.selectList = sobj[key]
          }
        }
      });
    },
    needHandler() {
      var total = 0;
      Object.values(this.resObj).forEach((value) => {
        value.map((item) => {
          total += item.number
        })
      })
      var obj = {
        total:total,
        resObj:this.resObj
      }
      localStorage.setItem('large_goods',JSON.stringify(obj))
      var orderType = localStorage.getItem('orderType')
      this.$router.push('/platformstandard')
    },
  },
};
</script>

<style lang="scss" scoped>
.bigitem {
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: white;
  /deep/ .van-stepper__plus,
  /deep/ .van-stepper__minus {
    border: 1px solid#999999;
    background: white;
    color: #999999;
  }
  .fixedbtn {
    display: flex;
    padding: 0 30px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2000;
    background: white;
  }
  /deep/ .van-button--small {
    width: 100%;
    height: 80px;
  }
  .left {
    width: 180px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f5f6f7;
    position: fixed;
    left: 0;
    top: 0;
    .litem {
      width: 100%;
      height: 100px;
      border-bottom: 2px solid white;
      font-size: 20px;
      color: #333333;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active {
      color: #28ae3a;
      background: white;
      position: relative;
    }
    .active::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 5px;
      height: 100%;
      background: #28ae3a;
    }
  }
  .right {
    width: calc(100% - 180px);
    margin-left: 180px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    .rightitem {
      display: flex;
      flex-direction: column;
      .righttitle {
        font-size: 18px;
        line-height: 100px;
        height: 100px;
        color: #666666;
      }
      .rightcontentwrap {
        display: flex;
        flex-direction: column;
        .rightcontent {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100px;
          margin-bottom: 15px;
          .righttop {
            font-size: 20px;
            font-weight: bold;
            color: #333333;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .stepwrap {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            .price {
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
