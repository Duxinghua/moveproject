<template>
	<div class='callCenter'>
		<div class='top'>
			<!-- <button class="onCall" open-type="contact" session-from="message">
				<img src='../static/tishi.png'></img>
				<span>在线客服</span>
			</button> -->
			<div class='offCall' @click='call'>
				<img src='../../assets/img/call.png'></img>
				<span>客服热线</span>
			</div>
		</div>
		<h4>常见问题</h4>
		<div class='used'>
			<p @click='go_question(1)'>
				<span>选择车型下单?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(2)'>
				<span>预约用车?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(3)'>
				<span>如何取消订单?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(4)'>
				<span>查询订单?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(5)'>
				<span>预估与实际价格不符?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(6)'>
				<span>发出订单后无司机接单?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(7)'>
				<span>查询订单支付情况?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(8)'>
				<span>订单支付方式?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(9)'>
				<span>司机要求线下支付?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>

			<p @click='go_question(10)'>
				<span>订单在线支付被重复扣款?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(11)'>
				<span>优惠券类型?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(12)'>
				<span>领取优惠券?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(13)'>
				<span>使用优惠券?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(14)'>
				<span>优惠券无法使用?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(15)'>
				<span>里程费收费标准?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(16)'>
				<span>什么是超里程费？如何计算?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(17)'>
				<span>什么是等候费，如何计算?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(18)'>
				<span>订单取消后退款什么时候到账?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(19)'>
				<span>计算搬运费?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(20)'>
				<span>额外费用?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(21)'>
				<span>成为企业客户?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(22)'>
				<span>申请发票?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(23)'>
				<span>修改订单评价?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
			<p @click='go_question(24)'>
				<span>投诉评价意见?</span>
				<img src='../../assets/img/right_gray.png'></img>
			</p>
		</div>
		<!-- <div class='comment'>
			<span @click='back'>意见反馈</span>
		</div> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				phone: ''
			}
		},
		onShow() {
			this.getPhone()
		},
		methods: {
			getPhone() {
				this.$api.findCustomerServiceNumber().then(res => {
					if (res.code == 200) {
						this.phone = res.data;
					}
				})
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: this.phone, //手机号
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log(res);
					}
				});
			},
			go_question(state) {
				uni.navigateTo({
					url: '/personalCenter/question?state='+state
				})
			}
		}
	}
</script>

<style lang='scss'>
	.callCenter {
		background-color: #f3f3f3;
		padding-top: 60px;
		padding-bottom: 30px;
		.top {
			display: flex;
			align-items: center;
			margin: 0 24px;

			.onCall {
				background-img: linear-gradient(#70adfb, #6790fc);
				border-radius: 13px;
				width: 50%;
				margin-right: 26px;
				height: 130px;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					width: 86px;
					height: 80px;
					margin-right: 20px;
				}

				span {
					color: rgba(255, 255, 255, .8);
					font-size: 14px;
				}
			}

			.offCall {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50%;
				background-img: linear-gradient(#fca73c, #fe8a35);
				border-radius: 20px;
				height: 130px;

				img {
					width: 86px;
					height: 80px;
					margin-right: 20px;
				}

				span {
					color: rgba(255, 255, 255, .8);
					font-size: 14px;
				}
			}
		}

		h4 {
			font-weight: 600;
			margin: 50px 0 25px 24px;
		}

		.used {
			background-color: #fff;
			border-radius: 20px;
			padding: 20px;
			margin: 0 24px;

			p {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80px;

				span {
					font-size: 14px;
					color: #555555;
				}

				img {
					width: 20px;
					height: 20px;
				}
			}
		}

		.comment {
			/* position: absolute;
			bottom: 100px; */
			display: flex;
			/* width: 100%; */
			justify-content: center;
			margin-top:40px;

			span {
				padding: 6px 36px;
				border: 1px solid #888;
				color: #888;
				font-size: 13px;
				border-radius: 30px;
			}
		}
	}
</style>
