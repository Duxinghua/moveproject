<template>
	<view class='extra'>
		<h5>搬运计价方式</h5>
		<div class='modelCar'>
			<view>
				<text style='font-size: 15px;'>平台标准计价</text>
				<radio :checked="valuation=='STANDARD'" @click='selectValuation("STANDARD")' style="transform:scale(0.7)"></radio>
			</view>
			<view style='margin-bottom:20rpx'>
				<text style='font-size: 15px;'>与司机协商计价</text>
				<radio :checked="valuation=='DISCUSS'" @click='selectValuation("DISCUSS")' style="transform:scale(0.7)"></radio>
			</view>
		</div>
		<h5 style='margin-top:12px;'>其他服务</h5>
		<div class='modelCar' v-if="otherServiceList.length>0">
			<view v-for="(item,index) in otherServiceList" :key="index">
				<view>
					{{item.propName}}
					<text class='money' v-if="item.price != 0">{{item.remarks}}</text>
					<text class='free' v-else>{{item.remarks}}</text>
				</view>
				<radio :checked="item.checked" @click='checkOther(item)' style="transform:scale(0.7)"></radio>
			</view>
		</div>
		<view class='bottom'>
			<text class='right_aside' @tap='confirm'>确定</text>
		</view>
	</view>
</template>

<script>
	import { carOtherService } from '@/api'
	import { mapGetters } from 'vuex';
	export default{
		data(){
			return{
				otherServiceList: [],
				valuation: '',
			}
		},
		computed: {
			...mapGetters([
				'valuationType',
				'carOtherList',
				'valuationType'
			]),
		},
		async onLoad(){
			this.valuation = this.valuationType != '' ? this.valuationType : '';
			if(this.carOtherList.length>0){
				this.otherServiceList = this.carOtherList;
				return;
			}
			const { seqId } = await this.$store.getters.carData;
			carOtherService({
				headSeqId: seqId,
				attachType: 'OTHER'
			}).then(res=> {
				if(res.list.length>0) {
					let list = res.list.map(item=>{
						return {
							refSeqId: item.seqId,
							propName: item.catItem,
							price: item.price,
							checked: false,
							remarks: item.remarks
						}
					})
					this.otherServiceList = list;
				}
			})
		},
		methods: {
			selectValuation(e){
				this.valuation = e;
				if(e == 'STANDARD'){
					uni.navigateTo({
						url:'/order/standard_pricing'
					})
				}
			},
			checkOther(item){
				item.checked = !item.checked;
				console.log(this.carOtherList)
			},
			confirm(){
				if(this.valuation == ''){
					uni.showToast({ title: '请选择计价方式',icon: 'none' });
					return;
				}
				if(this.valuation == 'DISCUSS'){
					//选择议价后，清除已选择的标准计价数据
					this.$store.commit('pull/CLEAN_STANDARD_DATA');
				}
				this.$store.commit('pull/SET_VALUATION',this.valuation);
				this.$store.commit('pull/SET_CAR_OTHER',this.otherServiceList);
				uni.navigateBack();
			}
		}
	}
</script>

<style lang='scss' scoped>
	.extra{
		background: #f8f8f8;
		padding-top: 24upx;
		height: 100vh;
		h5 {
			color: rgba(124, 122, 122, 1);
			font-size: 16px;
			font-family: PingFang SC;
			margin-bottom: 20upx;
			margin-left: 24rpx;
		}
		.modelCar {
			background: #fff;
			padding: 20upx 30upx 5rpx 30rpx;
			border-radius: 17upx;
			margin: 0 24rpx;
			&>view{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom:25rpx;
				&>view{
					font-size: 15px;
					display: flex;
					align-items: center;
					.money{
						    padding: 2rpx 12rpx;
						    background-color: #ffeee8;
						    color: #ff6e44;
						    border: 1px solid #ff6e44;
						    border-radius: 30rpx;
						    font-size: 19rpx;
						    margin-left: 12rpx;
					}
					.free{
						padding: 2rpx 12rpx;
						background-color: #ffffff;
						color: #969696;
						border: 1px solid #969696;
						border-radius: 30rpx;
						font-size: 19rpx;
						margin-left: 12rpx;
					}
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
