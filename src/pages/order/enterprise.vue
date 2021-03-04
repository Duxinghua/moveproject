<template>
	<div class='enterprise'>
		<div class="scroll-wrap">
			<scroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :fixed='false'>
		<div class='box' v-for='(item,index) in array' :key="index">
			<img :src='item.log'></img>
			<div class='message'>
				<div class='address'>
					<text>{{item.operSelf?'自营':'非自营'}}</text>
					<text>{{item.enterpriseName}} ({{item.region||''}})</text>
				</div>
				<div class="rate">
					<div v-for="(citem,index) in num" :key="index" :class="index <= (item.starLevel-1) ?'selected':''" class='li' ></div>
					<text>{{item.score || 0}}分</text>
				</div>
				<div class='phone' @tap='call(item.linkMobile)'>
					<img src='../static/phone.png'></img>
					<text>{{item.linkMobile }}</text>
				</div>
				<div class='location'>
					<img src='../static/wz.png'></img>
					<text>{{item.ownerCity }}市{{item.region||''}}</text>
				</div>
			</div>
		</div>
		</scroll-uni>
		</div>
	</div>
</template>
<script>
	import {custEnterpriseApply } from '@/api';
	import { mapGetters } from 'vuex';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		computed: {
			...mapGetters([
				'currentCity'
			])
		},
		data() {
			return {
				array: [],
				num:5,
				upOption: {
					page: {
						num: 0,
						size: 10
					}
				}
			}
		},
		methods:{
			downCallback() {
				this.array=[]
				this.mescroll.resetUpScroll();
			},
			upCallback(page) {
				let user = uni.getStorageSync('userInfo')
				custEnterpriseApply({
					pageno: page.num,
					pagesize: page.size,
					ownerCity:this.currentCity
				}).then(res => {
					if (page.num === 1) this.datas = [];
					this.array = this.array.concat(res.list)
					// 数据渲染成功后,隐藏下拉刷新的状态
					this.$nextTick(() => {
						this.mescroll.endSuccess((res.list && res.list.length) ? res.list.length : 0, res.total)
					})
				}).catch(e => {
					this.mescroll.endErr()
				})

			},
			call(phone){
				uni.makePhoneCall({
					phoneNumber: phone, //手机号
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log(res);
					}
				});
			}
		}
	}
</script>
<style lang='scss'>
	.enterprise {
		height: 100vh;
		background-color: #f3f3f3;
		.scroll-wrap{
			/* height: calc(100vh - 120upx); */
			width: 100%;
		}
		.box {
			display: flex;
			align-items: flex-start;
			padding: 35rpx 24rpx;
			background: #fff;
			border-bottom: 1px solid #eee;

			&>img {
				width: 240rpx;
				height: 175rpx;
				border-radius: 15rpx;
			}

			.message {
				flex: 1;
				margin-left: 30rpx;

				.address {
					display: flex;
					align-items: flex-start;

					text:first-child {
						padding: 2rpx 14rpx;
						background-color: #28AE3A;
						color: #fff;
						font-size: 12px;
						border-radius: 30rpx;
					}

					text:last-child {
						color: #353535;
						margin-left: 15rpx;
						font-size: 15px;
						font-weight: bold;
						flex:1;
					}
				}
				.rate {
					display: flex;
					align-items: center;
					margin-top: 10rpx;
					margin-bottom: 5rpx;
					.li {
						width: 23rpx;
						height: 22rpx;
						background: url('https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604296122378bc6n.png') no-repeat;
						background-size: cover;
						margin-right:16rpx;
					}

					.selected {
						background: url('https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604295577891vxth.png');
						background-size: cover;
					}
					text{
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #353535;
						margin-left:10rpx;
					}
				}
				.phone {
					img {
						width: 22rpx;
						height: 22rpx;
					}
					text{
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #28AE3A;
						margin-left:12rpx;

					}
				}

				.location {
					display: flex;
					align-items: center;
					margin-top:12rpx;
					img {
						width: 28rpx;
						height: 32rpx;
					}
					text{
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #888888;
						margin-left:12rpx;

					}
				}
			}
		}
	}
</style>
