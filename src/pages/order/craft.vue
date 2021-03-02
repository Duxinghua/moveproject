<template>
  <view class="craft">
    <scroll-view
      class="menu-wrapper"
      scroll-y
      :scroll-top="left_scroll"
      scroll-with-animation="true"
    >
      <view class="left-content">
        <view
          style="position: relative;"
          v-for="(item,index) in workerList"
          :key="index"
          ref="menuList"
          @click="selectWorker(item,index)"
          :class="{'current': currentWorkerName == item}"
        >
          <view class="menu-item">{{item}}</view>
        </view>
      </view>
    </scroll-view>
    <!-- 右侧滚动 -->
    <scroll-view
      class="foods-wrapper"
      scroll-y
      :style="'height:'+windows_height+'px'"
      :scroll-top="foodSTop"
      @scroll="myscroll"
      scroll-with-animation="true"
    >
      <view ref="foodsWrapper">
        <view ref="foodList" class="foods">
          <view
            class="food-title"
            style="color:#888;font-size:13px;padding-left: 20rpx;margin-bottom: 25rpx;margin-top:10rpx"
          >{{currentWorkerName}}</view>
          <view class="option-list">
            <view class="option-item" 
							@click="selectWorkerType(item.workName2)"
							:class="{ active: currentWorkerType == item.workName2 }"
							v-for="(item,index) in workerMap" 
							:key="index">
							{{item.workName2}}
						</view>
          </view>
        </view>
      </view>
    </scroll-view>
    <div class="btn" @click="submitWorker">
      <span>确定</span>
    </div>
  </view>
</template>

<script>
import { findWork, findWorkMap } from "@/api";
export default {
  data() {
    return {
			workerList: [],
			workerMap: [],
			currentWorkerName: '',
			currentWorkerType: '',
      windows_height: 0, //屏幕高度
      foodSTop: 0, //右侧的滑动值
      currentIndex: 0,
      last: 0,
      right_height: [], //右侧每个内容的高度集合
      select_index: 0,
      left_height: 0, //左侧总高度
      left_scroll: 0, //左侧滑动值
      catrgoryList: [],
      timeout: null,
    };
  },
  async onLoad() {
    this.windows_height = Number(uni.getSystemInfoSync().windowHeight) - 65;
    setTimeout(() => {
      this.getHeightList();
		}, 1000);
		let data = await findWork();
		this.workerList = data.data;
		this.currentWorkerName = data.data[0];
		this.getWorkerMap();
  },
  methods: {
    // 点击侧边栏
    selectWorker(name,index) {
      if(this.currentWorkerName == name) return;
      this.currentWorkerType = '';
			this.currentWorkerName = name;
			this.getWorkerMap();
      this.setScrollH(index);
		},
		selectWorkerType(name){
			this.currentWorkerType = name;
		},
		async getWorkerMap(){
			let data = await findWorkMap({ workName: this.currentWorkerName});
			this.workerMap = data.data;
		},
		submitWorker(){
			if(this.currentWorkerType == ''){
				uni.showToast({ title: '请选择工种',icon: 'none' });
				return;
			}
			this.$store.commit('work/EDIT_WORKER',{
				workTypeName: this.currentWorkerName,
				workTypeName2: this.currentWorkerType
			});
			uni.navigateBack();
		},
    // 设置点击侧边栏右边滚动的高度
    setScrollH: function (index) {
      var that = this;
      let height = 0;
      var query = uni.createSelectorQuery();
      let foods = query.selectAll(".foods");
      this.$nextTick(function () {
        foods
          .fields(
            {
              size: true,
            },
            (data) => {
              if (index == 0) {
                that.foodSTop = 0;
              }
              for (let i = 0; i < index; i++) {
                height += parseInt(data[i].height);
                // console.log('fh', foods);
                that.foodSTop = height;
                // console.log(that.foodSTop)
              }
            }
          )
          .exec();
      });
    },
    getHeightList() {
      let _this = this;
      let selectorQuery = uni.createSelectorQuery().in(this);
      selectorQuery
        .select(".left-content")
        .boundingClientRect(function (rects) {
          _this.left_height = rects.height;
        });
      selectorQuery
        .selectAll(".foods")
        .boundingClientRect(function (rects) {
          _this.right_height = rects.map((item) => item.top);
        })
        .exec();
    },
    myscroll(e) {
      //引入节流
      let right_content_height = e.detail.scrollHeight - this.windows_height;
      if (right_content_height == e.detail.scrollTop) {
        return;
      }
      let scroll_top = e.detail.scrollTop + 110; //110是banner图的高度
      //判断当前的scrollTop在哪个区间内;
      let now = +new Date();
      if (now - this.last > 100) {
        this.last = now;
        let active_index = this.right_height.findIndex(
          (value, index, arr) =>
            value <= scroll_top && scroll_top < arr[index + 1]
        );
        this.currentIndex = active_index;
        if (this.left_height - this.windows_height) {
          //如果有超出部分
          let diff = this.left_height - this.windows_height;
          this.left_scroll = Math.round(
            (active_index * diff) / (this.goods.length - 1)
          );
        }
      }
    },
  },
};
</script>

<style lang='scss'>
.craft {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 55px;
  width: 100%;
  overflow: hidden;
}

.btn {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 10rpx 30rpx 10rpx 30rpx;
  z-index: 2;
  width: 100%;
  position: fixed;
  bottom: 0;

  span {
    background-color: #28ae3a;
    height: 76rpx;
    border-radius: 40rpx;
    line-height: 76rpx;
    text-align: center;
    color: #fff;
  }
}

.current {
  position: relative;
  z-index: 0;
  background-color: #fff;
  color: #28ae3a;
  border-left: 2px solid #28ae3a;
}

.menu-wrapper {
  text-align: center;
  width: 28%;
  display: flex;
  flex-direction: column;
  background: #f3f5f7;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-bottom: 1px solid #fff;
  font-size: 14px;
}

.allcount {
  position: absolute;
  right: 6px;
  top: 8px;
  display: inline-block;
  padding: 0 4px;
  font-size: 9px;
  line-height: 16px;
  font-weight: 400;
  border-radius: 50%;
  background-color: #f01414;
  color: #ffffff;
}

.foods-wrapper {
  margin-left: 4px;
  width: 72%;
}

.foods {
  padding: 20rpx 10rpx 0 24rpx;
}
.food-title {
  padding: 2px 0;
}
.option-list {
  .option-item {
    display: inline-flex;
    height: 60rpx;
    padding: 0 22rpx;
    border-radius: 30rpx;
    font-size: 26rpx;
    box-sizing: border-box;
    border: 1px solid #c3c3c3;
    background: #fff;
    width: 160rpx;
    color: #7d7d7d;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    &.active {
      background: #e9f7eb;
      color: #4eba5c;
      border-color: #4eba5c;
    }
  }
}
</style>
