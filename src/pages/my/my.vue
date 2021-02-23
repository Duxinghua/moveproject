<template>
	<div class="main" v-if="Object.keys(userInfo).length>0">
		<header @tap="link('/personalCenter/setting',userInfo)">
			<image :src="userInfo.avatarUrl"></image>
			<div>
				<p>
					{{userInfo.nickName}}
					<image src='../../assets/img/male.png' v-if="userInfo.gender == 1"></image>
					<image src='../../assets/img/female.png' v-if="userInfo.gender == 2"></image>
				</p>
				<p>{{userInfo.mobileNo}}</p>
			</div>
		</header>
		<div class='content'>
			<div class="link">
				<div class="bottoms">
					<image src="../../assets/img/order.png" style='height:31px'></image>
					<div class="right_wrap" @click="link('/myOrder/index')">
						<text>我的订单</text>
						<image src="../../assets/img/right_gray.png"></image>
					</div>
				</div>
			</div>
			<div class='block'></div>
			<div class='link'>
				<div class="top">
					<image src="../../assets/img/erji.png" style='height: 28px;'></image>
					<div class="right_wrap" @click="link('/personalCenter/callCenter')">
						<text>客服中心</text>
						<image src="../../assets/img/right_gray.png"></image>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				token: ''
			}
		},
		async onShow() {
			let userId = await uni.getStorageSync('userId')
			let data = await this.$api.getUserDataBySeqId({ customerSeqId: userId });
			this.userInfo = data.data;
			console.log(data)
		},
		methods: {
			link(path,query){
				let params = query ? '?userInfo='+JSON.stringify(query) : '';
				uni.navigateTo({
					url: path + params
				})
			},
		}
	}
</script>

<style lang='scss' scoped>
	.main {
		background-color: #f5f6f7;

		.block {
			background-color: #f5f6f7;
			height: 16px;
		}

		header {
			display: flex;
			height: 130px;
			background-color: #fff;
			padding: 60px 24px 0 24px;

			&>image {
				width: 92px;
				height: 92px;
				border-radius: 50%;
			}

			&>div {
				flex: 1;
				margin-left: 28px;

				p:first-child {
					font-size: 16px;
					color: #333;
					font-weight: 600;
					display: flex;
					align-items: center;

					&>image {
						width: 35px;
						height: 30px;
						margin-left: 12px;
					}
				}

				p:last-child {
					margin-top: 10px;
					font-size: 12px;
					color: #888;
				}
			}
		}

		.content {
			background-color: #fff;
			padding-top: 10px;
			margin-top: 16px;
		}

		.link {
			.btn {
				height: 110px;
				padding: 0 32px;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
			}

			.top,
			.bottoms {
				height:94px;
				padding: 0 32px;
				display: flex;
				align-items: center;
			}

			image {
				width: 36px;
				height: 36px;
			}

			.right_wrap {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height:94px;
				border-bottom: 1px solid rgba(240, 240, 240, .5);
				margin-left: 24px;

				text {
					font-size: 28px;
					font-family: PingFang SC;
					// font-weight:500;
					color: rgba(49, 49, 49, 1);
				}

				&>image {
					width: 23px;
					height: 24px;
				}
			}
		}
	}
</style>
