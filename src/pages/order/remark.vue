<template>
	<view class='remark'>
		<div class="job">
			<textarea maxlength="200" v-model="content" placeholder="填写订单备注需求" placeholder-style="color:#999;font-size:14px"
			 class="textarea" />
			</div>
		<view class="btn" @click="back">
			<span>确定</span>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				content: '',
				index: ''
			}
		},
		onLoad(){
			this.index = uni.getStorageSync('home_index');
			this.content = this.index == 0 ? this.orderDescribe : this.orderDescribeWork;
		},
		computed: {
			...mapGetters([
				'orderDescribe',
				'orderDescribeWork'
			]),
		},
		methods: {
			back(){
				let type = this.index == 0 ? 'pull' : 'work';
				this.$store.commit(type+'/EDIT_REMARK', this.content)
				uni.navigateBack();
			}
		}
	}
</script>

<style lang='scss'>
	.remark{
		background-color: #f3f3f3;
		height: 100vh;
		padding-top:20rpx;
		 .job {
		 		margin:0upx 24upx 28upx 24upx;
		 		padding-bottom:20px;
				background:rgba(255,255,255,1);
				border-radius:6px;
		 		position: relative;
				textarea {
					padding:10px 10px 0 12px;
		 			 width: 90%;
		      }
		 		.textarea{
					font-size: 28upx;
					font-family: PingFang SC;
					color: rgba(102, 102, 102, 1);
					line-height: 40upx;
					height: 130px;						  
		 		}	
		    } 
			.btn{
				position: fixed;
				 bottom: 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				box-sizing: border-box;
				padding:30rpx 30rpx 20rpx 30rpx;
				z-index: 2;
				width: 100%;
				span{
					background-color: #28ae3a;
					height: 76rpx;
					border-radius: 40rpx;
					line-height: 76rpx;
					text-align: center;
					color:#fff;
				}
			}
	}
</style>
