<template>
	<div class='move' v-if="Object.keys(orderDetail).length>0">
		<h4>{{orderDetail.orderStatus | orderStatus}}</h4>
		<div class='calling' v-if="orderDetail.orderStatus!='WAIT_REC' && orderDetail.orderStatus!='NOPAY' && orderDetail.orderStatus!='NOPAY2' && orderDetail.orderStatus!='CANCEL_APPLY'">
			<div>
				<image :src="orderDetail.custDriverInfoSimpleVo.avatarUrl"></image>
				<div class='rates'>
					<p><span v-if='orderDetail.custDriverInfoSimpleVo'>{{formatName(orderDetail.custDriverInfoSimpleVo.plateNumber || "")}}</span><span>{{orderDetail.carType | carType}}</span></p>
					<div>
						<span>{{orderDetail.custDriverInfoSimpleVo.name}}</span>
						<div class="rate">
							<div v-for="(item,index) in num" :key="index" :class="{'selected' :index <=orderDetail.custDriverInfoSimpleVo.score-1}"
							 class='li'></div>
						</div>
						<span style='margin-left:10px'>{{orderDetail.custDriverInfoSimpleVo.score || 0}}分</span>
					</div>
				</div>
			</div>
			<image src='../../assets/img/calling.png' @tap='call(orderDetail.driverMobilno)'></image>
		</div>
		<div class='modelCar'>
			<div class='date'>
				<p><span class='minute'>{{orderDetail.orderDateStr}}</span></p>
				<p>{{orderDetail.carType | carType}}</p>
			</div>
		</div>
		<div class="address">
			<div class="left_wrap">
				<div class="start" v-for='(item,i) in orderDetail.orderRouteList' :key='i' :class="i==orderDetail.orderRouteList.length-1?'end':''">
					<div class="lt-icon-box"></div>
					<p class="addressName">{{item.address1}}</p>
					<p class="detailAddress">{{item.address2}}</p>
				</div>
			</div>
		</div>
		<h5 v-if='orderDetail.orderLargeList && orderDetail.orderLargeList.length>0'>搬运服务</h5>
		<div class='demand' v-if='orderDetail.orderLargeList && orderDetail.orderLargeList.length>0'>
			<p class='way'><span>大件物品</span><span>平台标准计价</span></p>
			<div class='ul'>
				<div class='li' v-for="(item,index,) in orderDetail.orderLargeList" :key="index"><span>{{item.catType}}</span><span>{{item.catItem}}*{{item.qty}}</span></div>
			</div>
			<!-- <p class='way'><span>搬运楼层</span></p> -->
			<div class='ul'>
				<div class='li' v-for="(val,key,i) in orderDetail.orderPriceMap" :key="i"><span>{{val.propName}}</span><span>{{val.remarks}}</span></div>
			</div>
		</div>
		<div class='remark'>
			<p>订单备注</p>
			<p style='color: #888888;margin-top:16px;font-size: 13px;'>{{orderDetail.orderDescribe ? orderDetail.orderDescribe : '无'}}</p>
			<div class='pic_list' v-if='orderDetail.orderPicList && orderDetail.orderPicList.length>0'>
				<image v-for='(item,index) in orderDetail.orderPicList' :src='item.picUrl' style='width:25%;margin-right:2%;margin-top:20px;height:140px'
				 @click='prediv(index,orderDetail.orderPicList)'></image>
			</div>
		</div>
		<div class="name">
			<span>姓名</span><span>{{orderDetail.receiverName}}</span>
		</div>
		<div class='contact'>
			<span>联系电话</span><span>{{orderDetail.receiverMobileNo}} <text v-if='orderDetail.mobileProtected' class='protect'>号码保护中</text></span>
		</div>
		<div class='particulars' @tap='gocost'>
			<span>费用明细</span><span>
				<image src='../../assets/img/right_gray.png' class='pic'></image>
			</span>
		</div>
		<div class='paid'>
			<p><span>已支付</span><span>￥{{orderDetail.payMoney}}</span></p>
			<p><span>订单金额</span><span>￥{{orderDetail.payMoney}}</span></p>
			<p><span>已优惠</span><span>-￥{{orderDetail.couponMoney}}</span></p>
			<p><span>订单总额</span><span>￥{{orderDetail.totalMoney}}</span></p>
		</div>
		<div class='orderNember'>
			<p><span>订单编号</span><span>{{orderDetail.sheetId}}</span></p>
			<p><span>下单时间</span><span>{{orderDetail.createDate}}</span></p>
			<p><span>支付时间</span><span>{{orderDetail.payDate || ''}}</span></p>
		</div>
		<div class='block'>

		</div>
		<div class='foot'>
			<span class="back_order" v-if="orderDetail.orderStatus == 'WAIT_REC' && isFromConfirm" @click="goOrder()">确定</span>
			<span class='cancel_order' v-if='orderDetail.orderStatus=="NOPAY"||orderDetail.orderStatus=="WAIT_REC" || orderDetail.orderStatus=="DRIVER_REC"  || orderDetail.orderStatus=="DRIVER_COME"|| orderDetail.orderStatus=="DRIVER_WORKING"|| orderDetail.orderStatus=="DRIVER_FINISH" || orderDetail.orderStatus=="NOPAY2"'
			 @tap='cancel(orderDetail.seqId,orderDetail.sheetId)'>取消订单</span>
			<span class='pay' v-if='orderDetail.orderStatus=="NOPAY"||orderDetail.orderStatus=="NOPAY2"' @tap='pay(orderDetail.seqId)'>立即支付</span>
			<span class='cancel_order' v-if='orderDetail.orderStatus=="FINISH"' @tap='remark(orderDetail.seqId,orderDetail.sheetId)'>立即评价</span>
			<!-- <span class='cancel_order' v-if='orderDetail.orderStatus=="CANCEL"' @tap='del(orderDetail.seqId)'>删除订单</span> -->
		</div>

		<!-- 支付方式 -->
		<wyb-popup ref="popup_1" type="bottom" height="400" width="500" radius="6" :showCloseIcon="true">
			<div class="popup-content_1">
				<h6>￥{{orderDetail.payMoney}}</h6>
				<p>选择支付方式</p>
				<div class='payType'>
					<div>
						<div>
							<image src='../../assets/img/wx.png'></image>微信支付
						</div>
						<radio value='1' :checked="bianhao==1" @click='radio("1")' style="transform:scale(0.7)"></radio>
					</div>
					<div>
						<div>
							<image src='../../assets/img/xx.png'>线下支付</image>
						</div>
						<radio value='2' :checked="bianhao==2" @click='radio("2")' style="transform:scale(0.7)"></radio>
					</div>
				</div>
				<div class='btn' @tap='submit'>
					<span>立即叫车</span>
				</div>
			</div>
		</wyb-popup>
		<!-- 弹框 -->
		<uni-popup type='center' ref="popup3">
			<div class="uni-tip">
				<div class="uni-top">
					<p class='uni-text'>温馨提示</p>
					<p class='uni-content'>选择线下付款，平台不承担任何责任</p>
				</div>
				<div class='uni-btn'>
					<span class="btns_cancel" @tap='cal'>取消</span>
					<span class="btns" @tap='contact'>确定</span>
				</div>
			</div>
		</uni-popup>
	</div>
</template>

<script>
	import OrderDetail from '@/mixins/OrderDetail'
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	export default {
		data() {
			return {
				list: [1, 2, 3],
				num: 5,
				bianhao: '1'
			}
		},
		components: {
			wybPopup
		},
		methods: {
			prediv(index, array) {
				let _this = this;
				let imgsArray = [];
				for (let i = 0; i < array.length; i++) {
					imgsArray.push(array[i].picUrl);
				}
				uni.predivImage({
					current: index,
					urls: imgsArray
				});
			},
			gocost() {
				let obj = {}
				obj = {
					headSeqId: this.orderDetail.seqId
				}
				orderSheet_price(obj).then(res => {
					if (res.code == 200) {
						uni.navigateTo({
							url: '/order/cost?detail=' + JSON.stringify(res.data)
						})
					}
				})
			},
			cancel(id, sheetId) {
				uni.navigateTo({
					url: '/order/cancelOrder?seqId=' + id + "&sheetId=" + sheetId
				})
			},
			del(id) {
				order_delete({
					seqId: id
				}).then(res => {
					if (res.code == 200) {
						uni.redirectTo({
							url: '/myOrder/index'
						})
					}
				})
			},
			pay() {
				this.$refs.popup_1.show()
				// wx_pay({
				// 	orderHeadSeqId: id
				// }).then(res => {
				// 	if (res.code == 200) {
				// 		let paymentData = res.data;
				// 		uni.requestPayment({
				// 			timeStamp: paymentData.timeStamp,
				// 			nonceStr: paymentData.nonceStr,
				// 			package: paymentData.package,
				// 			signType: paymentData.signType,
				// 			paySign: paymentData.paySign,
				// 			success: (res) => {
				// 				uni.showToast({
				// 					title: "支付成功"
				// 				})
				// 			},
				// 			fail: (res) => {
				// 				uni.showModal({
				// 					content: "支付失败",
				// 					showCancel: false
				// 				})
				// 			},
				// 			complete: (res) => {
				// 				uni.redirectTo({
				// 					url: '/myOrder/index'
				// 				})
				// 			}
				// 		})
				// 	}

				// })
			},
			submit() {
				if (this.bianhao == 1) {
					//微信支付
					wx_pay({
						orderHeadSeqId: this.orderDetail.seqId
					}).then(res => {
						if (res.code == 200) {
							let paymentData = res.data;
							uni.requestPayment({
								timeStamp: paymentData.timeStamp,
								nonceStr: paymentData.nonceStr,
								package: paymentData.package,
								signType: paymentData.signType,
								paySign: paymentData.paySign,
								success: (res) => {
									uni.showToast({
										title: "支付成功"
									})
								},
								fail: (res) => {
									uni.showModal({
										content: "支付失败",
										showCancel: false
									})
								},
								complete: (res) => {
									uni.redirectTo({
										url: '/myOrder/index'
									})
								}
							})
						}

					})
				} else {
					// 线下支付
					this.$refs.popup3.open()
					this.$refs.popup_1.close()
				}
			},
			contact() {
				orderPayOffLine({
					seqId: this.orderDetail.seqId,
					payType: 'OFF_LINE'
				}).then(res => {
					if (res.code == 200) {
						uni.redirectTo({
							url:'/myOrder/index'
						})
					}
				})
			},
			cal() {
				this.$refs.popup3.close()
			},
			radio(e) {
				this.bianhao = e
			},
			remark(id, sheetId) {
				uni.navigateTo({
					url: '/myOrder/evaluation?seqId=' + id + "&sheetId=" + sheetId
				})
			},
			call(phone) {
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
			},
			formatName(name) {
				let newStr;
				newStr = name.substr(0, 2) + '***' + name.substr(5, name.split('').length)
				return newStr;
			}
		},
		mixins: [OrderDetail],
	}
</script>

<style lang='scss'>
	.move {
		background: #f8f8f8;
		padding: 24px 0px 30px 0px;

		.uni-tip {
			background-color: #fff;
			width: 82%;
			margin: 0 auto;
			border-radius: 16px;

			.uni-top {
				padding: 20px 30px 50px 30px;

				.uni-text {
					height: 100px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 36px;
				}

				.uni-content {
					padding: 0 50px;
					font-size: 32px;
					color: #4c4c4c;
					line-height: 48px;
				}
			}

			.uni-btn {
				overflow: hidden;
				border-radius: 0px 0px 13px 13px;
				border: none;
				text-align: center;
				display: flex;

				.btns {
					background-color: #28ae3a;
					color: #fff;
					width: 50%;
					height: 90px;
					line-height: 90px;
				}

				.btns_cancel {
					background-color: #f5f6f7;
					color: #888889;
					width: 50%;
					height: 90px;
					line-height: 90px;
				}
			}
		}


	.btn {
		background-color: #Fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
		padding: 30px 30px 20px 30px;
		z-index: 2;
		width: 100%;

		span {
			background-color: #28ae3a;
			height: 76px;
			border-radius: 40px;
			line-height: 76px;
			text-align: center;
			color: #fff;
		}
	}
	.popup-content_1 {
		padding-top: 70px;

		h6 {
			text-align: center;
			padding-bottom: 70px;
			font-size: 48px;
			color: #28ae3a;
		}

		&>p {
			font-size: 14px;
			color: #888;
			margin-left: 40px;
			margin-bottom: 20px;
		}

		.payType {
			&>div {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px 20px 10px 30px;
				border-bottom: 1px solid #fafafa;

				&>div {
					display: flex;
					align-items: center;
					font-size: 15px;

					image {
						width: 90px;
						height: 80px;
						margin-right: 10px;
					}
				}
			}
		}
	}

		h4 {
			font-size: 19px;
			font-weight: 600;
			margin-bottom: 24px;
			margin-left: 24px;
		}

		.pic_list {
			display: flex;

			image:last-child {
				margin-right: 0 !important;
			}
		}

		.calling {
			background: #fff;
			padding: 20px 30px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 17px;
			margin: 0 24px;
			margin-bottom: 20px;

			&>div {
				display: flex;
				align-items: center;
				flex: 1;

				&>image {
					width: 80px;
					height: 80px;
					border-radius: 50%;
				}

				.rates {
					flex: 1;
					margin-left: 18px;

					&>p {
						span:first-child {
							font-weight: 600;
							font-size: 15px;
						}

						span:last-child {
							background-color: #e9eaeb;
							padding: 2px 16px;
							border-radius: 30px;
							color: #7d7e7e;
							margin-left: 10px;
							font-size: 13px;
						}
					}

					&>div {
						display: flex;
						margin-top: 11px;

						&>span {
							font-size: 12px;
						}

						.rate {
							margin-left: 7px;
							display: flex;
							align-items: center;

							.li {
								width: 23px;
								height: 22px;
								background: url('https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604296122378bc6n.png') no-repeat;
								background-size: cover;
								margin-right: 16px;
							}

							.selected {
								background-image: url('https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604295577891vxth.png');
							}
						}
					}


				}
			}

			&>image {
				width: 70px;
				height: 70px;
				border-radius: 50%;
			}

		}

		.modelCar {
			background: #fff;
			padding: 20px 30px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 17px;
			margin: 0 24px;

			.date {
				flex: 1;

				p:first-child {
					.minute {
						position: relative;
					}
				}

				p:last-child {
					margin-top: 16px;
					font-size: 13px;
					color: #888888;
				}
			}
		}

		.address {
			display: flex;
			justify-content: space-between;
			padding: 30px 30px 18px 30px;
			background: #fff;
			border-radius: 17px;
			margin: 24px 24px 20px 24px;

			.left_wrap {
				flex: 1;

				.start {
					position: relative;
					padding-left: 60px;
					padding-bottom: 36px;

					.lt-icon-box {
						position: absolute;
						border: 2px solid #7ccd87;
						background: #fff;
						border-radius: 50%;
						width: 12px;
						height: 12px;
						left: -2px;
						top: 12px;
					}

					.addressName {
						font-size: 16px;
						font-family: PingFang SC;
					}

					.detailAddress {
						font-size: 12px;
						color: #c3c3c3;
						margin-top: 6px;
						white-space:normal; word-break:break-all;
					}
				}

				.end {
					.lt-icon-box {
						border: 2px solid #ff6a39 !important;
					}
				}

				.start:before {
					content: "";
					position: absolute;
					height: 97%;
					border: 1px dashed #ebe9e9;
					display: block;
					left: 7px;
					top: 18px;
				}

				.start:last-child:before {
					height: 0;
				}
			}
		}

		h5 {
			color: rgba(124, 122, 122, 1);
			font-size: 16px;
			font-family: PingFang SC;
			margin-bottom: 20px;
			margin-left: 24px;
		}

		.demand {
			background: #fff;
			padding: 20px 30px;
			border-radius: 17px;
			margin: 0 24px;

			.way {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 12px;
				font-size: 14px;
			}

			.other {
				margin-top: 30px;
				font-size: 14px;
				margin-bottom: 10px;
			}

			.ul .li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #888;
				font-size: 12px;
				margin-bottom: 12px;

				span:first-child {
					flex: 1;
				}

				span:last-child {
					text-align: right;
				}
			}
		}

		.remark {
			background: #fff;
			padding: 20px 30px;
			border-radius: 17px;
			margin: 20px 24px;

			p:last-child {
				font-size: 12px;
				color: #888888;
				margin-top: 20px;
				word-break: break-all;
			}
		}

		.name,
		.contact,
		.particulars {
			background: #fff;
			padding: 20px 30px;
			border-radius: 17px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 24px 20px 24px;

			span:first-child {
				width: 30%;
			}

			span:last-child {
				font-size: 14px;
				color: #363636;
				flex: 1;
				text-align: right;
				display: flex;
				justify-content: flex-end;
			}

			image {
				width: 20px;
				height: 20px;
			}

			.protect {
				padding: 1px 15px;
				border: 1px solid #88d292;
				color: #88d292;
				border-radius: 30px;
				font-size: 11px;
				margin-left: 10px;
			}
		}

		.paid {
			background: #fff;
			padding: 20px 30px;
			border-radius: 17px;
			margin: 0 24px 20px 24px;

			p:first-child {
				font-size: 16px;
				color: #333;
			}

			p {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				color: #888;
				margin-bottom: 14px;
			}
		}

		.orderNember {
			background: #fff;
			padding: 20px 30px;
			border-radius: 17px;
			margin: 0 24px;

			p {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				color: #888;
				margin-bottom: 14px;
			}
		}

		.block {
			margin-bottom: 100px;
		}

		.foot {
			background-color: #fff;
			height: 90px;
			position: fixed;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 100%;

			.cancel_order {
				font-family: PingFang SC;
				border: 1px solid #e5e5e5;
				height: 54px;
				line-height: 54px;
				text-align: center;
				color: #949494;
				width: 180px;
				border-radius: 30px;
				font-size: 13px;
				margin-right: 24px;
			}

			.pay {
				background-color: #28ae3a;
				color: #fff;
				font-family: PingFang SC;
				height: 54px;
				line-height: 54px;
				text-align: center;
				width: 180px;
				border-radius: 30px;
				font-size: 13px;
				margin-right: 24px;
			}
			.back_order{
				border: 1px solid #28ae3a;
				color: #28ae3a;
				font-family: PingFang SC;
				height: 54px;
				line-height: 54px;
				text-align: center;
				width: 180px;
				border-radius: 30px;
				font-size: 13px;
				left: 24px;
				position: absolute;
			}
		}
	}
</style>
