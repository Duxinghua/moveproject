<template>
	<view class='standard_pricing'>
		<view class="navbar">
			<template v-for="(item, index) in navList" >
				<view 
					:key="index" class="nav-item" 
					 v-if="item.attach != 'STAND3'"
					:class="{ current: attach === item.attach }"
					@click="tabClick(item.attach)">
					{{ item.text }}
				</view>
				<view 
					:key="index" class="nav-item" 
					 v-if="carData.carType == 'MINI_JEEP' && item.attach == 'STAND3'"
					:class="{ current: attach === item.attach }"
					@click="tabClick(item.attach)">
					{{ item.text }}
				</view>
			</template>
		</view>
		<view class='content'>
			<image :src="carData.picUrl"></image>
			<view>
				<view>载重：{{carData.carCapacity | kgToT}}</view>
				<view>长宽高：{{carData.carLwh}}</view>
				<view>载货体积：{{carData.carVolume}}方</view>
			</view>
		</view>
		<h5 style='margin-top:12px;'>货物大小</h5>
		<div class='modelCar'>
			<view class='li'>
				<text style='font-size: 15px;'>货物最长</text>
				<view>
					<picker @change="bindPickerChange1" :value="longIndex" 
					range-key="catItem"
					:range="longList">
						<text class="uni-input" style='font-size: 14px;'>{{longList[longIndex].catItem}}</text>
						<image src='../static/right_gray.png'></image>
					</picker>
				</view>
			</view>
			<view class='li' style='margin-bottom: 20rpx;'>
				<text style='font-size: 15px;'>货物最高</text>
				<view>
					<picker @change="bindPickerChange2" :value="highIndex" 
					range-key="catItem"
					:range="highList">
						<text class="uni-input" style='font-size: 14px;'>{{highList[highIndex].catItem}}</text>
						<image src='../static/right_gray.png'></image>
					</picker>

				</view>
			</view>
		</div>
		<h5 style='margin-top:12px;'>搬运楼层</h5>
		<div class='modelCar'>
			<view class='li'>
				<text style='font-size: 15px;'>发货楼层</text>
				<view>
					<picker @change="bindPickerChange3" :value="sendIndex" 
					range-key="remarks"
					:range="indexList">
						<text class="uni-input" style='font-size: 14px;'>{{indexList[sendIndex].remarks}}</text>
						<image src='../static/right_gray.png'></image>
					</picker>
				</view>
			</view>
			<view class='li' style='margin-bottom: 20rpx;'>
				<text style='font-size: 15px;'>收货楼层</text>
				<view>
					<picker @change="bindPickerChange4" :value="receiveIndex" 
					range-key="remarks"
					:range="indexList">
						<text class="uni-input" style='font-size: 14px;'>{{indexList[receiveIndex].remarks}}</text>
						<image src='../static/right_gray.png'></image>
					</picker>
				</view>
			</view>
		</div>
		<view class='big_good'>
			<text>大件物品数量</text>
			<view>
				<text class='reduce' @tap='reduce'>-</text>
				<text class='num'>{{num}}</text>
				<text class='add' @tap='add'>+</text>
			</view>
		</view>
		<view class='rules'>
			<text>计费规则说明</text>
			<view @tap='accounting'>
				<image src='../static/right_gray.png' ></image>
			</view>
		</view>
		<view class='bottom'>
			<text class='right_aside' @tap='confirm'>确定</text>
		</view>
	</view>
</template>

<script>
	import { findMap } from '@/api'
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				attach: 'STAND1',//默认整车
				num: 0,
				navList: [{
						text: '整车',
						attach: 'STAND1'
					},
					{
						text: '半车',
						attach: 'STAND2'
					},
					{
						text: '小件',
						attach: 'STAND3'
					}
				],
				longIndex: 0,
				highIndex: 0,
				sendIndex: 0,
				receiveIndex: 0,
				longList: [],
				highList: [],
				indexList: []
			}
		},
		computed: {
			...mapGetters([
				'carData',
				'attachType',
				'luggageNum',
				'sendFloor',
				'receiveFloor',
				'longMax',
				'highMax'
			]),
		},
		async onLoad(){
			this.attach = this.attachType;
			this.getValuationInfo();
			if(Object.keys(this.longMax).length>0){
				this.longIndex = this.longMax.index,
				this.highIndex = this.highMax.index,
				this.sendIndex = this.sendFloor.index,
				this.receiveIndex = this.receiveFloor.index,
				this.num = this.luggageNum;
			}
		},
		filters: {
			kgToT(value){
				return parseInt(value) >= 1000 ? value/1000 + '吨' : value + '公斤'
			}
		},
		methods: {
			//整车，半车切换 后清空选择内容
			tabClick(type) {
				if(type == this.attach) return;
				this.attach = type;
				this.$store.commit('pull/SET_ATTACH',type);
				this.longIndex = 0;
				this.highIndex = 0;
				this.sendIndex = 0;
				this.receiveIndex = 0;
				this.longList = [];
				this.highList = [];
				this.indexList = [];
				this.getValuationInfo();
			},
			//获取楼层信息
			async getValuationInfo(){
				const { seqId } = await this.carData;
				uni.showLoading();
				findMap({
					headSeqId: seqId,
					attachType: this.attach
				}).then(res=> {
					uni.hideLoading();
					this.longList = res.data['货物最长'];
					this.highList = res.data['货物最高'];
					this.indexList = res.data['楼层'];
				})
			},
			add() {
				if(this.num != 200){
					this.num++
				}
			},
			reduce() {
				if (this.num > 0) {
					this.num--
				}
			},
			bindPickerChange1(e) {
				this.longIndex = e.target.value;
			},
			bindPickerChange2(e) {
				this.highIndex = e.target.value;
			},
			bindPickerChange3(e) {
				this.sendIndex = e.target.value;
			},
			bindPickerChange4(e) {
				this.receiveIndex = e.target.value;
			},
			confirm(){
				this.$store.commit('pull/SET_L_MAX',{
					refSeqId: this.longList[this.longIndex].seqId,
					propName: '货物最长',
					index: this.longIndex
				});
				this.$store.commit('pull/SET_H_MAX',{
					refSeqId: this.highList[this.highIndex].seqId,
					propName: '货物最高',
					index: this.highIndex
				});
				this.$store.commit('pull/SET_S_FLOOR',{
					refSeqId: this.indexList[this.sendIndex].seqId,
					propName: '发货楼层',
					index: this.sendIndex
				});
				this.$store.commit('pull/SET_R_FLOOR',{
					refSeqId: this.indexList[this.receiveIndex].seqId,
					propName: '收货楼层',
					index: this.receiveIndex
				});
				this.$store.commit('pull/SET_L_NUM',this.num);
				uni.navigateBack();
			},	
			accounting(){
				uni.navigateTo({
					url:'/order/accounting'
				})
			}
		}
	}
</script>

<style lang='scss'>
	.standard_pricing {
		background-color: #f3f3f3;
		height: 100vh;

		.navbar {
			display: flex;
			height: 42px;
			padding: 0 24rpx;
			z-index: 10;
			display: flex;
			align-items: center;

			.nav-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #919192;
				position: relative;

				&.current {
					color: #7bcb85;
				}
			}
		}

		.content {
			background-color: #fff;
			display: flex;
			align-items: center;
			padding: 20rpx 20rpx 20rpx 30rpx;
			margin: 0 24rpx;
			border-radius: 13rpx 13rpx 0 0;

			&>image {
				width: 320rpx;
				height: 220rpx;
			}

			&>view {
				font-size: 12px;
				color: #383838;
				margin-left: 30rpx;

				&>view {
					margin-top: 10rpx;
				}
			}
		}

		h5 {
			color: rgba(124, 122, 122, 1);
			font-size: 16px;
			font-family: PingFang SC;
			margin-bottom: 20upx;
			margin-left: 24rpx;
		}

		.modelCar {
			background: #fff;
			padding: 20upx 24upx 5rpx 30rpx;
			border-radius: 17upx;
			margin: 0 24rpx;

			.li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30rpx;

				&>text {
					font-size: 15px;
				}

				&>view {
					display: flex;
					align-items: center;
					justify-content: flex-end;

					input {
						text-align: right;
					}

					image {
						width: 22rpx;
						height: 22rpx;
						margin-left: 12rpx;
					}
				}
			}

		}

		.rules {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			padding: 20rpx 24rpx;
			margin: 0 24rpx;
			border-radius: 17rpx;
			margin-top: 15rpx;

			text {
				font-size: 15px;
			}
			&>view{
				flex:1;
				text-align: right;
				image {
					width: 22rpx;
					height: 22rpx;
				}
			}
			
		}

		.big_good {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			padding: 20rpx 24rpx;
			margin: 0 24rpx;
			border-radius: 17rpx;
			margin-top: 15rpx;

			text {
				font-size: 15px;
			}

			&>view {
				.num {
					font-size: 14px;
				}

				.reduce,
				.add {
					border-radius: 50%;
					border: 1px solid #888;
					width: 30rpx;
					height: 30rpx;
					display: inline-block;
					text-align: center;
					line-height: 30rpx;
					margin: 0 15rpx;
				}
			}
		}

		.bottom {
			background-color: #fff;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			bottom: 0;
			width: 100%;

			.right_aside {
				width: 92%;
				height: 72rpx;
				background-color: #28ae3a;
				color: #fff;
				border-radius: 40rpx;
				text-align: center;
				line-height: 78rpx;
			}
		}
	}
</style>
