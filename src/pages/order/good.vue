<template>
	<view class="content">
		<scroll-view class="menu-wrapper" scroll-y :scroll-top="left_scroll" scroll-with-animation="true">
			<view class="left-content">
				<view style="position: relative;" v-for="(val,key,i) in goods" :key="i" ref="menuList" @click="select(key)"
				 :class="{'current': currentIndex == key}">
					<view class="menu-item">{{key}}</view>
					<text class="allcount" v-if='getOne(val)>0'>{{getOne(val)}}</text>
				</view>
			</view>
		</scroll-view>
		<!-- 右侧滚动 -->
		<scroll-view class="foods-wrapper" scroll-y :style="'height:'+windows_height+'px'" :scroll-top="foodSTop" @scroll="myscroll"
		 scroll-with-animation="true">
		 	<template v-for="(val,key,i) in goods">
				<view ref="foodsWrapper" v-show="currentIndex == key" :key="i">
					<view ref="foodList" class="foods">
						<view class="food-title" style="color:#888;font-size:13px;padding-left: 20rpx;margin-bottom: 25rpx;margin-top:10rpx">
							{{key}}
						</view>
						<view class="food" v-for="(food, index) in val" :key="index">
							<view class="food-info">
								<text style="font-size: 15px;margin-top: 2px;">{{food.catItem}}</text>
								<!-- 加减 -->
								<view class="food-btm">
									<text class="food-price">￥{{food.price}}</text>
									<cartcontrol :food="food" @add="addCart" @dec="decreaseCart"></cartcontrol>
								</view>
							</view>
						</view>
					</view>
				</view>
		 	</template>
		</scroll-view>
		<div class='btn' @tap='save'>
			<span>确定</span>
		</div>
	</view>
</template>

<script>
	import cartcontrol from '@/components/cartcontrol.vue'
	import {
		mapGetters
	} from 'vuex';
	import Vue from 'vue'
	import {
		findMap
	} from '@/api';
	export default {
		data() {
			return {
				title: 'Hello',
				goods: [],
				windows_height: 0, //屏幕高度
				foodSTop: 0, //右侧的滑动值
				currentIndex: '',
				last: 0,
				right_height: [], //右侧每个内容的高度集合
				select_index: 0,
				left_height: 0, //左侧总高度
				left_scroll: 0, //左侧滑动值
				catrgoryList: [],
				timeout: null
			}

		},
		components: {
			cartcontrol
		},
		onLoad(option) {
			this.windows_height = Number(uni.getSystemInfoSync().windowHeight) - 65;
			setTimeout(() => {
				this.getHeightList();
			}, 1000)
			this.carTypeSeqId = option.carTypeSeqId;
			this.get_good(option.carTypeSeqId)
		},
		computed: {
			getList() {
				let result = [];
				let that=this
				Object.keys(this.goods).forEach(function(key) {
					that.goods[key].forEach((food) => {
						if (food.count) {
							result.push(food)
						}
					})
				})
				return result

			},
			// 获得购物车所有商品数量
			getAllCount: function(item) {
				let result = [];
				let count = 0;
				let that=this
				Object.keys(this.goods).forEach(function(key) {
					count = 0;
					that.goods[key].forEach((food) => {
						if (food.count >= 0) {
							count += food.count
							Vue.set(that.goods[key], 'count', count)
						}else{
							Vue.set(food, 'count', 0)
						}
						
					})
					result.push(count)
				})
				
				result.sort(function(a, b) {
					return a - b;
				})
				count = result[result.length - 1]
				return count;
			},
			...mapGetters([
				'carTypeList'
			]),
		},
		methods: {
			getOne(arr){
				var count=0;
				arr.forEach(item=>{
					count+=item.count
				})
				return count;
			},
			get_good(carTypeSeqId) {
				findMap({
					attachType: 'LARGE_GOODS',
					headSeqId: carTypeSeqId
				}).then(res => {
					if (res.code == 200) {
						let that = this;
						if(this.carTypeList.length>0){
							Object.keys(res.data).forEach(function(key) {
								res.data[key].forEach((food) => {
									that.carTypeList.forEach(item=>{
										if(item.seqId == food.seqId){
											food.count = item.count;
										}
									})
								})
							})
						}
						this.goods = res.data;
						this.currentIndex = Object.keys(res.data)[0];//默认展开第一个
					}
				})
			},
			save(){
				if(this.getList.length<1){
					uni.showToast({
						title:'您还未选择物品',
						icon:'none'
					})
					return false;
				}
				this.$store.commit('move/SET_BIG_LIST',this.getList);
				console.log(this.getList)
				uni.navigateBack()
			},
			// 点击侧边栏
			select(index) {
				console.log(index)
				this.currentIndex = index;
				this.setScrollH(index);
			},

			// 设置点击侧边栏右边滚动的高度
			setScrollH: function(index) {
				var that = this;
				let height = 0;
				var query = uni.createSelectorQuery();
				let foods = query.selectAll('.foods');

				this.$nextTick(function() {
					foods.fields({
						size: true
					}, data => {
						if (index == 0) {
							that.foodSTop = 0;
						}
						for (let i = 0; i < index; i++) {

							height += parseInt(data[i].height);
							// console.log('fh', foods);
							that.foodSTop = height;
							// console.log(that.foodSTop)
						}

					}).exec();
				})

			},

			addCart: function(item) {
				if (item.count >= 0) {
					if(item.count != 200){//限制最大200
						item.count++
					}
					let that = this
					Object.keys(this.goods).forEach(function(key) {
						that.goods[key].forEach((food,i) => {
							if (item.seqId == food.seqId) {
								food.count = item.count
							}
						})
					})

				} else {
					let that = this
					Object.keys(this.goods).forEach(function(key) {
						that.goods[key].forEach((food) => {
							if (item.seqId == food.seqId) {
								Vue.set(food, 'count', 1)
							}
						})
					})
				}
			},
			decreaseCart(item) {
				if (item.count) {
					item.count--
					let that = this
					Object.keys(this.goods).forEach(function(key) {
						that.goods[key].forEach((food) => {
							if (item.seqId == food.seqId) {
								food.count = item.count
							}
						})
					})
				}
			},
			getHeightList() {
				let _this = this;
				let selectorQuery = uni.createSelectorQuery().in(this);
				selectorQuery.select('.left-content').boundingClientRect(function(rects) {
					_this.left_height = rects.height;
				});
				selectorQuery.selectAll('.foods').boundingClientRect(function(rects) {
					_this.right_height = rects.map((item) => item.top);
				}).exec();
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
					let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top && scroll_top < arr[
						index + 1]);
					//this.currentIndex = active_index;
					if (this.left_height - this.windows_height) {
						//如果有超出部分
						let diff = this.left_height - this.windows_height
						this.left_scroll = Math.round((active_index * diff) / (this.goods.length - 1))
					}
				}
			}
		}
	}
</script>

<style lang='scss'>
	.content {
		display: flex;
		position: absolute;
		top: 0;
		bottom: 55px;
		width: 100%;
		overflow: hidden;
	}

	.btn {
		background-color: #Fff;
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
		line-height: 14px;
		font-weight: 400;
		border-radius: 50%;
		background-color: #f01414;
		color: #ffffff;
	}

	.foods-wrapper {
		margin-left: 4px;
		width: 72%;
	}

	.food,
	.food-btm,
	.content {
		display: flex;
		flex-direction: row;
		margin-bottom: 16rpx;
		margin-top: 20rpx;
	}

	.food-title {
		padding: 2px 0;
	}

	.food-info {
		margin-left: 10px;
		margin-right: 16px;
		display: flex;
		flex-direction: column;
		flex: 2;
	}

	.food-btm {
		justify-content: space-between;
	}

	.food-price {
		color: #3d3d3d;
		font-size: 16px;
	}
</style>
