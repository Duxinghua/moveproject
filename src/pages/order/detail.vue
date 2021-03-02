<template>
	<view class='detail'>
		<div class='show'>
			<image :src='message.picUrl2'></image>
		</div>
		<div class='descrion'>
			<span>载货空间及重量</span>
			<p>
				<view class='weight'>载重：{{message.carCapacity | kgToT}}</view>
				<view class='weight'>长宽高：{{message.carLwh}}</view>
				<view class='weight'>载货体积：{{message.carVolume}}方</view>
			</p>
			<span style='margin-top:25rpx'>用车参考</span>
			<p v-for='item in fomat(message.remarks)' class='tip'><span v-html='txt' class='round'></span>{{item}}</p>
		</div>
	</view>
</template>

<script>
	import {
		car_getByPk
	} from '@/api';
	export default {
		data() {
			return {
				seqId: '',
				message: {},
				txt: '.'
			}
		},
		onLoad(option) {
			this.seqId = option.seqId
			this.getcar(option.seqId)
		},
		filters: {
			kgToT(value){
				return parseInt(value) >= 1000 ? value/1000 + '吨' : value + '公斤'
			}
		},
		methods: {
			getcar(id) {
				car_getByPk({
					seqId: id
				}).then(res => {
					if (res.code == 200) {
						this.message = res.data;
						console.log(this.message)
					}

				})
			},
			fomat(val) {
				let arr = val && val.split("，")
				return arr
			}
		}
	}
</script>

<style lang='scss'>
	.detail {
		.show {
			height: 420rpx;
			background-color: #f3f3f3;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 590rpx;
				height: 320rpx;
			}
		}

		.descrion {
			padding: 30rpx 24rpx;

			&>span {
				position: relative;
				padding-left: 20rpx;
				font-size: 15px;
				font-weight: 600;
				display: inline-block;
				color: #4a4a4a;
			}

			&>span::before {
				position: absolute;
				width: 7rpx;
				height: 73%;
				background-color: #00c400;
				left: 0;
				content: "";
				top: 7rpx;
			}

			p {
				font-size: 14px;
				color: #888;
				line-height: 54rpx;
				margin-top: 15rpx;
				margin-left: 30rpx;
				word-break: break-all;
			}
			.weight{
				position: relative;
				padding-left: 20rpx;
			}
			.weight::before{
				content: "";
				position: absolute;
				left: 0;
				bottom: 50%;
				width: 8rpx;
				height:8rpx;
				background-color: #888;
				border-radius: 50%;
			}

			.tip {
				line-height: 40rpx;
				position: relative;
				padding-left: 20rpx;
				margin-left: 30rpx;
				word-break: break-all;
				.round {
					font-size: 58rpx;
					position: absolute;
					left: 0;
					top: -22rpx;
				}
			}
		}
	}
</style>
