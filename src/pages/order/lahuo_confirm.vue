<template>
	<view class='lahuo_confirm'>
		<div class='modelCar'>
			<view class='li'>
				<text style='font-size: 15px;'>额外需求</text>
				<view @tap='extra'>
					<input type="text" 
						placeholder="搬运计价方式和服务"
						:value="hasOtherNeed"
						placeholder-style="color:#cfcfcf;font-size:13px" 
						disabled/>
					<image src='../static/right_gray.png'></image>
				</view>
			</view>
			<view class='li' style='margin-bottom: 20rpx;'>
				<text style='font-size: 15px;'>订单备注</text>
				<view @tap='remarks'>
					<input type="text" placeholder="填写订单备注需求" 
					v-model="orderDescribe"
					placeholder-style="color:#cfcfcf;font-size:13px" disabled/>
					<image src='../static/right_gray.png'></image>
				</view>
			</view>
		</div>
		<h5 style='margin-top:12px;'>订单联系人资料</h5>
		<div class='demand'>
			<view class='li'>
				<text>预约服务时间</text>
				<view>
					<hTimePicker interval="10" dayNum="0" @changeTime="changeTime" v-if="orderType=='ACTUAL_TIME'">
						<view slot="pCon" class="changeTime">
							<input type="text" 
								v-model="orderForm.orderDate"
								placeholder="请选择"
								placeholder-style="color:#cfcfcf;font-size:13px" disabled />
							<image src='../static/right_gray.png'></image>
						</view>
					</hTimePicker>
					<hTimePicker interval="10" dayNum="7" @changeTime="changeTime" v-if="orderType=='APPOINTMENT'">
						<view slot="pCon" class="changeTime">
							<input type="text" 
								v-model="orderForm.orderDate"
								placeholder="请选择"
								placeholder-style="color:#cfcfcf;font-size:13px" disabled />
							<image src='../static/right_gray.png'></image>
						</view>
					</hTimePicker>
				</view>
			</view>
			<view class='li'>
				<text>联系人</text>
				<view>
					<input type="text" placeholder="请输入" 
						:maxlength="15"
						v-model="orderForm.receiverName"
						placeholder-style="color:#cfcfcf" />
				</view>
			</view>
			<view class='li'>
				<text>联系人电话</text>
				<view>
					<input type="number" placeholder="请输入"
						v-model="orderForm.receiverMobileNo"
						placeholder-style="color:#cfcfcf" />
				</view>
			</view>
		</div>
		<div class='discount'>
			<span>选择优惠券</span>
			<div @tap='selectCoupon'>
				<input type="text" :placeholder="couponTip" 
				:value="selectCouponData.couponName ? selectCouponData.couponName : ''"
				placeholder-style="color:#cfcfcf" disabled />
				<image src='../static/right_gray.png'></image>
			</div>
		</div>
		<div class='protect'>
			<span>号码保护</span>
			<div>
				<switch checked disabled style="transform:scale(0.6);position: absolute;right:19rpx" />
			</div>
		</div>
		<div class='foot'>
			<span>具体上门时间以线下沟通为主</span>
			<view class='xieyi'>
				<checkbox-group @change="checkboxChange">
					<checkbox value="cb" :checked="isAgree" />
				</checkbox-group>
				<span style='display: flex;'>勾选即代表服从 <span @click='rules' style='color:#3cb34b'>《货搬搬用户服务协议》</span></span>
			</view>
		</div>
		<div class='bottom'>
			<view class="bottom-price">
				<view class="left"><text>￥</text>{{totalMoney == 0 ? baseTotalMoney : totalMoney}}</view>
				<view class="right" @click="go_cost">价格明细</view>
			</view>
			<div class='right_aside' @tap="confirmOrder">确定</div>
		</div>
		<!-- 优惠券 -->
		<wyb-popup ref="popup" type="bottom" height='800' width="500" radius="6" :showCloseIcon="true"  :scrollY='true' mode='size-fixed'>
				<view class="popup-content">
					<div class='card' v-for='(item,index) in couponList' :key="index" @click="couponHandle(item)">
						<div class='left_wrap'>
							<p>￥<span>{{item.couponValue}}</span></p>
							<p>{{item.couponName}}</p>
						</div>
						<div class='right_wrap'>
							<p>{{item.applicableName}}</p>
							<p>有效期：{{item.effectiveDate}}</p>
						</div>
					</div>
				</view>
		</wyb-popup>
		<!-- 支付方式 -->
		<wyb-popup ref="popup_1" type="bottom" height="400" width="500" radius="6" :showCloseIcon="true" >
			<view class="popup-content_1">
				<h6>￥{{totalMoney}}</h6>
				<p>选择支付方式</p>
				<div class='payType'>
					<div>
						<div>
							<image src='../static/wx.png'></image>微信支付
						</div>
						<radio :checked="payType=='on'" @click='selectPay("on")' style="transform:scale(0.7)"></radio>
					</div>
					<div>
						<div>
							<image src='../static/xx.png'></image>线下支付
						</div>
						<radio :checked="payType=='off'" @click='selectPay("off")' style="transform:scale(0.7)"></radio>
					</div>
				</div>
				<div class='btn' @click="submitPayment">
					<span>立即叫车</span>
				</div>
			</view>
		</wyb-popup>
			<!-- 弹框 -->
		<uni-popup type='center' ref="popup3">
			<view class="uni-tip">
				<view class="uni-top">
					<p class='uni-text'>温馨提示</p>
					<p class='uni-content'>选择线下付款，平台不承担任何责任</p>
				</view>
				<view class='uni-btn'>
					<span class="btns_cancel" @tap='cal'>取消</span>
					<span class="btns" @tap='contact'>确定</span>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	import OrderConfirm from '@/mixins/OrderConfirm'
	import { mapGetters } from 'vuex';
	import { orderFindUserCoupon,calcPrice,insert,calcPricePullDet } from '@/api';
	export default {
		components: {
			hTimePicker,
			wybPopup
		},
		data() {
			return {
				orderForm: {
					mobileProtected: true,
					receiverMobileNo: '',
					receiverName: '',
					orderDate: ''
				},
				totalMoney: 0,
				baseTotalMoney: 0,
				baseTotalMoney2: 0,
				bianhao: '1',
				totalDistance: 0,
				couponList: [],
				selectCouponData: {},
				couponTip: '请选择',
				orderType: '',
				hasOtherNeed: '',
				isClearCoupon: false,//是否清除优惠券
			}
		},
		onLoad(option){
			this.serverType = 'lahuo';
			this.totalDistance = option.distance;
			this.baseTotalMoney = option.price;
			this.baseTotalMoney2 = option.price;
			this.orderType = option.orderType;
		},
		onUnload(){
			this.$store.commit('pull/CLEAN_PULL_DATA');//清除拉货订单信息。
		},
		onShow(){
			this.hasOtherNeed = this.carOtherList.length > 0 ? '已选择' : '';
			if (this.valuationType == '' || !this.isClearCoupon) return;
			this.isClearCoupon = !this.isClearCoupon;
			this.selectCouponData = {};
			this.calcOrderPrice();
		},
		computed: {
			...mapGetters([
				'addressList',
				'currentCity',
				'orderDescribe',
				'attachType',
				'carData',
				'luggageNum',
				'sendFloor',
				'receiveFloor',
				'longMax',
				'highMax',
				'carOtherList',
				'valuationType'
			]),
		},
		mixins: [OrderConfirm],
		methods: {
			//获取订单参数
			getOrderParams(){
				let obj = {};
				obj = {
					orderType: this.orderType,
					serverType: "PULL_CARGO",
					priceType: this.valuationType == '' ? null : this.valuationType,
					orderDate: this.orderForm.orderDate,
					receiverName: this.orderForm.receiverName,
					receiverMobileNo: this.orderForm.receiverMobileNo,
					mobileProtected: this.orderForm.mobileProtected,
					carType: this.carData.carType,
					carTypeSeqId: this.carData.seqId,
					ownerCity: this.currentCity,
					orderDescribe: this.orderDescribe,
					attachType: this.attachType,
					routeKilometer: this.totalDistance,
					largeGoodsCnt: this.luggageNum,
					orderRouteList: this.addressList,
					couponSeqId:  Object.keys(this.selectCouponData).length>0 ? this.selectCouponData.seqId : '',
					couponName: Object.keys(this.selectCouponData).length>0 ? this.selectCouponData.couponName : '',
					couponMoney: Object.keys(this.selectCouponData).length>0 ? this.selectCouponData.couponValue : '',
					totalMoney: this.baseTotalMoney,
					orderPriceList: []
				}
				console.log(this.carOtherList)
				let priceList = [];
				if(Object.keys(this.sendFloor).length>0 && this.valuationType == 'STANDARD'){
					priceList = [this.sendFloor,this.receiveFloor,this.longMax,this.highMax]
				}
				obj.orderPriceList = priceList.concat(this.carOtherList);
				return obj;
			},
			//计算订单价格
			async calcOrderPrice(){
				let params = await this.getOrderParams();
				calcPrice(params).then(res=>{
					this.totalMoney = res.data;
					if(!Object.keys(this.selectCouponData).length>0){
						this.couponTip = '请选择';
						this.baseTotalMoney2 = res.data;
					}
				})
			},
			protectChange(e) {
				this.orderForm.mobileProtected = e.target.value;
				console.log(this.orderForm)
			},
			changeTime(time) {
				this.orderForm.orderDate = time;
			},
			remarks() {
				uni.navigateTo({
					url: '/order/remark'
				})
			},
			//选择优惠券
			selectCoupon() {
				if(this.baseTotalMoney == 0){
					uni.showToast({ title: '请先完善后在选择~',icon: 'none' });
					return;
				}
				const userId = uni.getStorageSync('userId');
				orderFindUserCoupon({
					userId: userId,
					applicableType: 'PULL_CARGO',
					useCondition: this.baseTotalMoney2
				}).then(res => {
					console.log(res.list)
					this.couponList = res.list;
					if(res.list.length > 0) {
						this.$refs.popup.show() // 显示
					}else{
						this.couponTip = '暂无可用券';
						uni.showToast({ title: '暂无可用优惠券',icon: 'none' });
					}
				})
			},
			couponHandle(item){
				this.selectCouponData = item;
				this.calcOrderPrice();
				this.$refs.popup.hide()
			},
			async go_cost() {
				let params = await this.getOrderParams();
				console.log(JSON.stringify(params))
				calcPricePullDet(params).then(res => {
					if(res.code==200){
						uni.navigateTo({
							url: '/order/cost?detail='+JSON.stringify(res.data)
						})
					}
				})
			},
			async confirmOrder() {
				if(this.valuationType == ''){
					uni.showToast({ title: '请选择计价方式',icon: 'none' });
					return;
				}
				if(Object.keys(this.sendFloor).length == 0 && this.valuationType == 'STANDARD'){
					uni.showToast({ title: '请确定标准计价信息',icon: 'none' });
					return;
				}
				if(this.orderForm.orderDate == ''){
					uni.showToast({ title: '请选择服务时间',icon: 'none' });
					return;
				}
				if(this.orderForm.receiverName == '' || this.orderForm.receiverMobileNo == ''){
					uni.showToast({ title: '请完善联系人信息',icon: 'none' });
					return;
				}else{
					if (!/^1[3456789]\d{9}$/.test(this.orderForm.receiverMobileNo)) {
						uni.showToast({
							icon: 'none',
							title: '手机号码不正确'
						})
						return ;
					}
				}
				if(!this.isAgree){
					uni.showToast({ title: '请同意服务协议',icon: 'none' });
					return;
				}
				let params = await this.getOrderParams();
				uni.showLoading({ title: '请稍后'});
				insert(params).then(res =>{
					console.log(res)
					this.orderId = res.data.seqId;
					uni.hideLoading();
					this.$refs.popup_1.show()
				})
			},
			extra(){
				this.isClearCoupon = true;
				uni.navigateTo({
					url:'/order/extra'
				})
			},
		}
	}
</script>

<style lang='scss'>
	.lahuo_confirm {
		background: #f8f8f8;
		padding-top: 24upx;
		height:100vh;
		.uni-tip {
			background-color: #fff;
			width: 82%;
			margin: 0 auto;
			border-radius: 16rpx;

			.uni-top {
				padding: 20rpx 30rpx 50rpx 30rpx;

				.uni-text {
					height: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 36rpx;
				}

				.uni-content {
					padding: 0 50rpx;
					font-size: 32rpx;
					color: #4c4c4c;
					line-height: 48rpx;
				}
			}

			.uni-btn {
				overflow: hidden;
				border-radius: 0px 0px 13rpx 13rpx;
				border: none;
				text-align: center;
				display: flex;

				.btns {
					background-color: #28ae3a;
					color: #fff;
					width: 50%;
					height: 90rpx;
					line-height: 90rpx;
				}

				.btns_cancel {
					background-color: #f5f6f7;
					color: #888889;
					width: 50%;
					height: 90rpx;
					line-height: 90rpx;
				}
			}
		}
		h4 {
			font-size: 19px;
			font-weight: 600;
			margin: 0 24rpx;
			margin-bottom: 24upx;
		}

		.btn {
			background-color: #Fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			box-sizing: border-box;
			padding: 30rpx 30rpx 20rpx 30rpx;
			z-index: 2;
			width: 100%;

			span {
				background-color: #28ae3a;
				height: 76rpx;
				border-radius: 40rpx;
				line-height: 76rpx;
				text-align: center;
				color: #fff;
			}
		}

		.popup-content {
			background: #f3f3f3;
			padding: 60rpx 20rpx 10rpx 20rpx;
			/* height: 800rpx;
			overflow-y: scroll; */
			.card {
				margin-bottom: 15rpx;
				display: flex;

				.left_wrap {
					background-color: #fff;
					border-radius: 18rpx;
					padding: 32rpx 30rpx;
					position: relative;
					width: 240rpx;
					p:first-child {
						color: #ff561e;

						&>span {
							font-size: 50rpx;
							color: #ff561e;
							font-weight: 600;
						}
					}

					p:last-child {
						color: #888;
						font-size: 26rpx;
						text-align: center;
						margin-top: 5rpx;
					}
				}

				.left_wrap::after {
					border: 1rpx dashed #ececec;
					height: 85%;
					position: absolute;
					content: "";
					top: 7px;
					right: 0;

				}

				.right_wrap {
					background-color: #fff;
					border-radius: 18rpx;
					padding: 32rpx 100rpx 32rpx 30rpx;
					flex: 1;

					p:first-child {
						font-size: 30rpx;
						color: #595959;
						font-weight: 600;
					}

					p:last-child {
						color: #bdbdbd;
						font-size: 24rpx;
						margin-top: 20rpx;
					}
				}
			}
		}

		.popup-content_1 {
			padding-top: 70rpx;

			h6 {
				text-align: center;
				padding-bottom: 70rpx;
				font-size: 48rpx;
				color: #28ae3a;
			}

			&>p {
				font-size: 14px;
				color: #888;
				margin-left: 40rpx;
				margin-bottom: 20rpx;
			}

			.payType {
				&>div {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 10rpx 20rpx 10rpx 30rpx;
					border-bottom: 1px solid #fafafa;

					&>div {
						display: flex;
						align-items: center;
						font-size: 15px;

						image {
							width: 90rpx;
							height: 80rpx;
							margin-right: 10rpx;
						}
					}
				}
			}
		}

		.modelCar {
			background: #fff;
			padding: 20upx 30upx 5rpx 30rpx;
			border-radius: 17upx;
			margin: 0 24rpx;
			.li{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30rpx;
				&>text{
					font-size: 15px;
				}
				&>view{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					input{
						text-align: right;
					}
					image{
						width:22rpx;
						height:22rpx;
						margin-left:12rpx;
					}
				}
			}
			
		}

		.demand{
			background: #fff;
			padding: 26upx 30upx;
			border-radius: 17upx;
			margin: 20rpx 24rpx 20rpx 24rpx;
			.li{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 35rpx;
				&>view{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					
					input {
						text-align: right;
						font-size: 13px;
					}
					
					image {
						width: 22rpx;
						height: 22rpx;
						margin-left: 10rpx;
					}
				}
				&>text{
					font-size: 15px;
				}
				.changeTime {
					display: flex;
					align-items: center;
				}
			}
			.li:last-child{
				margin-bottom:6rpx;
			}
		}
		.discount,
		.protect {
			background: #fff;
			padding: 20upx 30upx;
			border-radius: 17upx;
			margin: 20rpx 24rpx 20rpx 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&>div {
				display: flex;
				justify-content: flex-end;
				align-items: center;

				input {
					text-align: right;
					font-size: 13px;
				}

				image {
					width: 22rpx;
					height: 22rpx;
					margin-left: 10rpx;
				}
			}
			&>span{
				font-size: 15px;
			}
		}

		h5 {
			color: rgba(124, 122, 122, 1);
			font-size: 16px;
			font-family: PingFang SC;
			margin-bottom: 20upx;
			margin-left: 24rpx;
		}


		.name,
		.contact {
			background: #fff;
			padding: 20upx 30upx;
			border-radius: 17upx;
			margin: 0 24rpx;
			margin-bottom: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			span:first-child {
				width: 30%;
			}

			span:last-child {
				font-size: 13px;
				color: #363636;
				flex: 1;
				text-align: right;
			}

			image {
				width: 20upx;
				height: 20upx;
			}
		}

		.foot {
			text-align: center;
			margin-bottom: 30rpx;

			&>span {
				color: #888;
				font-size: 13px;
			}

			.xieyi {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #888;
				font-size: 13px;

				checkbox {
					transform: scale(0.8)
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
			left: 0;
			right: 0;
			padding: 0 20rpx;
			.right_aside {
				width: 260rpx;
				height: 72rpx;
				background-color: #28ae3a;
				color: #fff;
				border-radius: 40rpx;
				text-align: center;
				line-height: 78rpx;
			}
			.bottom-price{
				flex: 1;
				display: flex;
				.left{
					color: #28ae3a;
					font-size: 38rpx;
					font-weight: 700;
					text{
						font-size: 24rpx;
					}
				}
				.right{
					padding: 7rpx 30rpx;
					border: 1px solid #e5e5e5;
					border-radius: 30rpx;
					font-size: 26rpx;
					color: #929292;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>

