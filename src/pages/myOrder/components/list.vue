<template>
	<div class="list_wrap">
		<template>
			<div class="content_wrap"  v-for="(item,index) in orderList" :key="index">
				<div @tap='goDetail(item.serverType,item.seqId)'>
					<div class="time">
						<div>
							<span class="typeName">{{item.serverType | serverType}}</span>
							<span class="date">{{item.createDate}}</span>
						</div>
						<span class="state" v-if="item.serverType == 'HIRE_WORKER'">{{item.orderStatus | orderStatus_worker}}</span>
						<span class="state" v-else>{{item.orderStatus | orderStatus}}</span>
					</div>
					<div class="address" v-if="item.serverType == 'HIRE_WORKER'" >
						<div class="left_wrap">
							<div class="end">
								<div class="lt-icon-box"></div>
								<p class="addressName">{{item.workerRegion}}</p>
								<p class="detailAddress">{{item.workerAddress}}</p>
							</div>
						</div>
					</div>
					<div class="address" v-else >
						<div class="left_wrap">
							<div
								:class="item.orderRouteList.length == i+1 ? 'end' : 'start'"
								v-for="(address,i) in item.orderRouteList"
								:key="i">
								<div class="lt-icon-box"></div>
								<p class="addressName">{{address.address1}}</p>
								<p class="detailAddress">{{address.address2}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="bottom_wrap">
					<span>￥{{item.payMoney}}</span>
					<span class='cancel_btn' v-if='item.orderStatus=="NOPAY"||item.orderStatus=="WAIT_REC" || item.orderStatus=="DRIVER_REC"  || item.orderStatus=="DRIVER_COME"|| item.orderStatus=="DRIVER_WORKING"|| item.orderStatus=="DRIVER_FINISH" || item.orderStatus=="NOPAY2" ' @tap='cancel(item.seqId,item.sheetId)'>取消订单</span>
					<span class='pay_btn' v-if="item.orderStatus == 'FINISH'" @tap='remark(item.seqId,item.sheetId)'>立即评价</span>
					<span class='pay_btn' v-if="item.orderStatus == 'NOPAY' || item.orderStatus == 'NOPAY2'" @tap='pay(item.seqId,item.payMoney)'>去支付</span>
				<!-- 	<span class='cancel_btn'  v-if='item.orderStatus=="CANCEL"' @tap='del(item.seqId)'>删除订单</span> -->
				</div>
			</div>
		</template>
		<!-- 支付方式 -->
		<van-popup ref="popup_1" position="bottom" height="400" width="500" radius="6" :showCloseIcon="true">
			<div class="popup-content_1">
				<h6>￥{{payMoney}}</h6>
				<p>选择支付方式</p>
				<div class='payType'>
					<div>
						<div>
							<image src='../../static/wx.png'></image>微信支付
						</div>
						<radio value='1' :checked="bianhao==1" @click='radio("1")' style="transform:scale(0.7)"></radio>
					</div>
					<div>
						<div>
							<image src='../../static/xx.png'>线下支付</image>
						</div>
						<radio value='2' :checked="bianhao==2" @click='radio("2")' style="transform:scale(0.7)"></radio>
					</div>
				</div>
				<div class='btn' @tap='submit'>
					<span>立即叫车</span>
				</div>
			</div>
		</van-popup>
		<!-- 弹框 -->
		<van-popup position='center'  v-model="unline" >
			<div class="uni-tip">
				<div class="uni-top">
					<p class='uni-text'>温馨提示</p>
					<p class='uni-content'>选择线下付款，平台不承担任何责任</p>
				</div>
				<div class='uni-btn'>
					<span class="btns_cancel" @click='unline = false'>取消</span>
					<span class="btns" @click='contact'>确定</span>
				</div>
			</div>
		</van-popup>
    <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
        show:true,
				bianhao: '1',
				current_id:'',
				payMoney:'',
			};
		},
		props:{
			orderList: {
				type: Array,
      	default: []
			}
		},
		components: {

		},
		filters: {
			serverType(value) {
				switch (value) {
					case 'PULL_CARGO':
						return '拉货';
						break;
					case 'CHANGE_HOUSE':
						return '搬家';
						break;
					case 'HIRE_WORKER':
						return '劳务工';
						break;
					case 'RENT_CAR':
						return '租车';
						break;
				}
			},
			orderStatus(value) {
				switch (value) {
					case 'NOPAY':
						return '待支付';
						break;
					case 'DRIVER_REC':
						return '司机已接单';
						break;
					case 'WAIT_REC':
						return '等待接单';
						break;
					case 'DRIVER_COME':
						return '司机到达';
					case 'DRIVER_WORKING':
						return '司机工作中';
						break;
					case 'DRIVER_FINISH':
						return '司机完成工作';
						break;
					case 'NOPAY2':
						return '付尾款';
						break;
					case 'FINISH':
						return '已完成';
						break;
					case 'EVALUATE':
						return '已评价';
						break;
					case 'CANCEL_APPLY':
						return '取消申请';
						break;
					case 'CANCEL':
						return '已取消';
						break;
					case 'RETURN':
						return '退款';
						break;
				}
			},
			orderStatus_worker(value) {
			  switch (value) {
			    case 'NOPAY':
			      return '待支付';
			      break;
			    case 'DRIVER_REC':
			      return '劳务工已接单';
			      break;
			    case 'WAIT_REC':
			      return '等待接单';
			      break;
			    case 'DRIVER_COME':
			      return '劳务工到达';
			    case 'DRIVER_WORKING':
			      return '劳务工工作中';
			      break;
			    case 'DRIVER_FINISH':
			      return '劳务工完成工作';
			      break;
			    case 'NOPAY2':
			      return '付尾款';
			      break;
			    case 'FINISH':
			      return '已完成';
			    case 'EVALUATE':
			      return '已评价';
			      break;
			    case 'CANCEL_APPLY':
			      return '取消申请';
			      break;
			    case 'CANCEL':
			      return '已取消';
			      break;
			    case 'RETURN':
			      return '退款';
			      break;
			  }
			}
		},
		methods: {
			goDetail(server,id) {
				let type;
				switch (server) {
					case 'PULL_CARGO':
						type = 'lahuo'
						break;
					case 'CHANGE_HOUSE':
						type = 'move'
						break;
					case 'HIRE_WORKER':
						type = 'worker'
						break;
					case 'RENT_CAR':
						type = 'rentCar'
						break;
				}
				uni.navigateTo({
					url: `/myOrder/${type}?id=${id}`
				})
			},
			cancel(id, sheetId) {
				uni.navigateTo({
					url: '/order/cancelOrder?seqId=' + id + "&sheetId=" + sheetId
				})
			},
			del(id){
				this.$api.order_delete({
					seqId:id
				}).then(res => {
					if(res.code==200){
						uni.redirectTo({
							url:'/myOrder/index'
						})
					}
				})
			},
			pay(id,money){
				this.current_id=id
				this.payMoney=money
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
					this.$api.wx_pay({
						orderHeadSeqId: this.current_id
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
					this.contact = true
					this.$refs.popup_1.close()
				}
			},
			contact() {
				this.$api.orderPayOffLine({
					seqId: this.current_id,
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
			remark(id, sheetId){
				uni.navigateTo({
					url: '/myOrder/evaluation?seqId=' + id + "&sheetId=" + sheetId
				})
			}
		},
	};
</script>

<style lang='scss'>
	.list_wrap {
		padding: 0 24px;
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
		.content_wrap {
			background-color: #fff;
			border-radius: 18px;
			padding-top: 28px;
			overflow: hidden;
			margin-bottom: 24px;
			.time {
				display: flex;
				justify-content: space-between;
				margin-bottom: 40px;
				padding-right: 26px;
				&>div {
					.typeName {
						padding: 3px 26px;
						background: #2b2e3c;
						color: #d3d4d6;
						border-radius: 0 30px 30px 0;
						font-size: 14px;
					}

					.date {
						background: #f5f6f7;
						padding: 5px 15px;
						font-size: 13px;
						border-radius: 0 27px 27px 0;
					}
				}
				.state{
					font-size: 13px;
					color: #7b7b7b;
				}
			}

			.laowu {
				display: flex;
				justify-content: space-between;
				padding: 0 26px 35px 26px;

				.left_wrap {
					flex: 1;

					.start {
						position: relative;
						padding-left: 60px;
						padding-bottom: 36px;

						.addressName {
							font-size: 16px;
							font-family: PingFang SC;
						}

						.detailAddress {
							font-size: 12px;
							color: #c3c3c3;
							margin-top: 6px;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
							white-space:normal; word-break:break-all;
						}

						.dingwei {
							position: absolute;
							width: 36px;
							height: 36px;
							left: -2px;
							top: 12px;
						}
					}
				}
			}

			.address {
				display: flex;
				justify-content: space-between;
				padding: 0 26px 45px 26px;

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
							width: 13px;
							height: 13px;
							left: -3px;
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
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
							white-space:normal; word-break:break-all;
						}
					}

					.end {
						position: relative;
						padding-left: 60px;

						.lt-icon-box {
							position: absolute;
							border: 2px solid #ff6a39;
							background: #fff;
							border-radius: 50%;
							width: 13px;
							height: 13px;
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
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
							white-space:normal; word-break:break-all;
						}
					}
				}
			}

			.bottom_wrap {
				height: 80px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding:0 24px;
				border-top: 1px solid #f7f7f7;

				span:first-child {
					font-family: PingFang SC;
					width: 32%;
					height: 80px;
					font-size: 40px;
					line-height: 80px;
					color: #090909;
				}

				.cancel_btn {
					font-family: PingFang SC;
					border:1px solid #e5e5e5;
					height: 54px;
					line-height: 54px;
					text-align: center;
					color: #949494;
					width: 180px;
					border-radius: 30px;
					font-size: 13px;
				}
				.pay_btn{
					background-color: #28ae3a;
					color:#fff;
					font-family: PingFang SC;
					height: 54px;
					line-height: 54px;
					text-align: center;
					width: 180px;
					border-radius: 30px;
					font-size: 13px;
				}
			}
		}
	}
</style>
