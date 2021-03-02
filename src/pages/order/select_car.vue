<template>
	<view class='select_car'>
		<view class='each' v-for='(item,i) in carList' :key="i" @click='selectCar(i)'>
			<image :src="item.picUrl"></image>
			<view>{{item.carName}}</view>
		</view>
	</view>
</template>

<script>
	import { carStyle } from '@/api';
	export default {
		data() {
			return {
				carList: '',
			}
		},
		onLoad(option){
			if(option.data){
				this.carList = JSON.parse(option.data)
			}
		},
		methods:{
			selectCar(index){
				let serverType = this.carList[index].serverType == 'PULL_CARGO' ? 'pull' : 'rent';
				this.$store.commit(serverType+'/SET_CAR_INDEX',index);
				uni.navigateBack();
			}
		}
	}
</script>
<style lang='scss'>
	.select_car {
		background-color: #f3f3f3;
		height: 100vh;

		.each {
			padding-top:20rpx;
			float: left;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			width: 33.3%;
			height: 220rpx;
			border-right: 1px solid #fafafa;
			box-sizing: border-box;
			border-bottom: 1px solid #fafafa;
			text-align: center;
			image {
				width: 150rpx;
				height: 120rpx;
				margin: 0 auto;
			}
			&>view{
				color:#b5b5b5;
				font-size: 13px;
				margin-top:5rpx;
			}
		}
		.green{
			border:1px solid #e9f7eb;
		}
	}
</style>
