<template>
	<view class='confirm'>
		<h5>基础服务</h5>
		<div class='modelCar'>
			<div class='selected'>
				<span>已选车型</span>
				<p>{{carType |carType }}</p>
			</div>
			<div class='switch'>
				<span>需要大件搬运服务</span>
				<switch @change="switch2Change" style="transform:scale(0.6);position: absolute;right:19rpx" />
			</div>
		</div>
		<h5 style='margin-top:12px;'>搬家信息</h5>
		<div class="address">
			<div class="left_wrap">
				<div class="start" @tap='selectAddress(index)' :class="index != 0 ? 'end' : ''" v-for="(item,index) in addressListMove"
				 :key="index">
					<div class="lt-icon-box"></div>
					<view v-if="item.address1">
						<view class="addressName">{{item.address1}}</view>
						<view class="addressDesc">{{item.address2}}</view>
					</view>
					<input class="addressName" v-else :placeholder="index != 0 ? '填写搬入地址' : '填写搬出地址'" placeholder-style="color:#cfcfcf"
					 disabled />
				</div>
			</div>
			<div class='time_wrap'>
				<span>搬家时间</span>
				<div>
					<hTimePicker interval="10" @changeTime="changeTime">
						<view slot="pCon" class="changeTime">
							<input type="text" placeholder="请选择" placeholder-style="color:#cfcfcf" disabled="true" v-model='orderDate' />
							<image src='../static/right_gray.png'></image>
						</view>
					</hTimePicker>

				</div>
			</div>
		</div>
		<div class='demand' v-if='serve'>
			<span>大件物品</span>
			<div @tap='select_good'>
				<input type="text" placeholder="请选择" placeholder-style="color:#cfcfcf" disabled="true" v-if='carTypeList.length==0' />
				<view v-else style='font-size: 14px;'><text v-for='item in carTypeList' style='margin-right:12rpx' v-if='item.catType!="楼层"'>{{item.catItem}}</text></view>
				<image src='../static/right_gray.png'></image>
			</div>

		</div>
		<div class='demand' v-if='serve'>
			<span>搬出地</span>
			<div>
				<view>
					<picker @change="bindPickerChange3" :value="sendIndex" range-key="remarks" :range="indexList">
						<text class="uni-input" style='font-size: 14px;'>{{indexList[sendIndex].remarks}}</text>
						<image src='../static/right_gray.png'></image>
					</picker>
				</view>
			</div>

		</div>
		<div class='demand' v-if='serve'>
			<span>搬入地</span>
			<div>
				<view>
					<picker @change="bindPickerChange4" :value="sendIndexs" range-key="remarks" :range="indexLists">
						<text class="uni-input" style='font-size: 14px;'>{{indexLists[sendIndexs].remarks}}</text>
						<image src='../static/right_gray.png'></image>
					</picker>
				</view>
			</div>
		
		</div>
		<view class='bigger'>
			<div class='remark' style='padding:0px 0px;margin:0px'>
				<span>订单备注</span>
				<div @tap='remarks'>
					<input type="text" placeholder="搬家物品及图片备注" placeholder-style="color:#cfcfcf" disabled="true" v-model='orderDescribe' />
					<image src='../static/right_gray.png'></image>
				</div>
			</div>
			<view  class='pic_list'>
				<image v-for='item in orderPicList' :src='item.picUrl' style='width:24%;height:140rpx;margin-right:2%;margin-top:20rpx'></image>
			</view>
		</view>

		<div class="name">
			<span>姓名</span>
			<div>
				<input type="text" :maxlength="15" placeholder="输入姓名" placeholder-style="color:#cfcfcf" v-model='receiverName' />
			</div>
		</div>
		<div class='contact'>
			<span>联系电话</span>
			<div>
				<input type="number" placeholder="输入联系电话" placeholder-style="color:#cfcfcf" v-model='receiverMobileNo' :maxlength="11" />
			</div>
		</div>
		<div class='discount'>
			<span>选择优惠券</span>
			<div @tap='select_value'>
				<input type="text" :placeholder="couponTip" :value="selectCouponData.couponName ? selectCouponData.couponName : ''"
				 placeholder-style="color:#cfcfcf" disabled />
				<image src='../static/right_gray.png'></image>
			</div>
		</div>
		<div class='protect'>
			<span>号码保护</span>
			<div>
				<switch  checked disabled style="transform:scale(0.6);position: absolute;right:19rpx" />
			</div>
		</div>
		<div class='remark'>
			<span>计费规则说明</span>
			<div @tap='rules_1'>
				<image src='../static/right_gray.png'></image>
			</div>
		</div>
		<div class='foot'>
			<span>具体上门时间以线下沟通为主</span>
			<view class='xieyi'>
				<checkbox-group @change='change'>
					<checkbox value="cb" />
				</checkbox-group>
				<span style='display: flex;'>勾选即代表服从 <span @click='rules' style='color:#3cb34b'>《货搬搬用户服务协议》</span></span>
			</view>
		</div>
		<div class='bottom'>
			<div class='left_aside'>
				<span>￥{{totalMoney}}</span>
				<span @tap='go_cost'>价格明细<image src='../static/right_gray.png'></image></span>
			</div>
			<div class='right_aside' @tap='confirm'>确认下单</div>
		</div>
		<!-- 优惠券 -->
		<wyb-popup ref="popup" type="bottom" height='800' width="500" radius="6" :showCloseIcon="true" :scrollY='true' mode='size-fixed'>
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
		<wyb-popup ref="popup_1" type="bottom" height="400" width="500" radius="6" :showCloseIcon="true">
			<view class="popup-content_1">
				<h6>￥{{totalMoney}}</h6>
				<p>选择支付方式</p>
				<div class='payType'>
					<div>
						<div>
							<image src='../static/wx.png'></image>微信支付
						</div>
						<radio value='1' :checked="bianhao==1" @click='radio("1")' style="transform:scale(0.7)"></radio>
					</div>
					<div>
						<div>
							<image src='../static/xx.png'>线下支付</image>
						</div>
						<radio value='2' :checked="bianhao==2" @click='radio("2")' style="transform:scale(0.7)"></radio>
					</div>
				</div>
				<div class='btn' @tap='submit'>
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
	import {
		mapGetters
	} from 'vuex';
	import {
		get
	} from '@/utils/request'
	import {
		calcSimplePrice,
		orderFindUserCoupon,
		getUserDataBySeqId,
		insert,
		calcPrice,
		wx_pay,
		orderPayOffLine,
		calcPricePullDet,
		getDistance,
		findMap
	} from '@/api';
	export default {
		components: {
			hTimePicker,
			wybPopup
		},
		data() {
			return {
				checked: [],
				otherList: {},
				brList:{},
				couponList: [],
				selectCouponData: {},
				totalDistance: '',
				bianhao: '1',
				carType: '',
				carTypeSeqId: '',
				serve: false,
				price: 0,
				baseTotalMoney: 0,
				totalMoney: 0,
				receiverName: '',
				receiverMobileNo: '',
				orderDate: '',
				mobileProtected: true, //号码
				orderPicList: [], //图片列表
				orderDescribe: '',
				order_id: '', //订单确认成功id
				indexList: [],
				indexLists:[],
				sendIndex: 0,
				sendIndexs:0,
				couponTip: '请选择',
				isClearCoupon: false,//是否清除优惠券
			}
		},
		computed: {
			...mapGetters([
				'addressListMove',
				'currentCity',
				'carTypeList'
			]),
			queryChange() {
				let {
					addressListMove
				} = this;
				return [addressListMove];
			},
		},
		watch: {
			queryChange() {
				this.calcDistance();
			}
		},
		onLoad(option) {
			this.getPhone()
			this.carType = option.carType
			this.carTypeSeqId = option.carTypeSeqId
			this.getValuationInfo(this.carTypeSeqId)
		},
		onUnload(){
			uni.removeStorageSync('fileList');
			uni.removeStorageSync('notedata');
			this.$store.commit('move/CLEAN_MOVE_DATA');//清除搬家订单信息。
		},
		onShow() {
			if (!this.isClearCoupon) return;
			this.isClearCoupon = !this.isClearCoupon;
			this.selectCouponData = {};
			this.calcOrderPrice();
		},
		filters: {
			carType(value) {
				switch (value) {
					case 'MINI_JEEP':
						return '小面包车';
						break;
					case 'MIDDLE_JEEP':
						return '中面包车';
						break;
					case 'KYW_JEEP':
						return '依维科';
						break;
					case 'SMALL_CAR':
						return '小货车';
						break;
					case 'MIDDLE_CAR':
						return '中货车';
						break;
					case 'FIVE_METER_CAR':
						return '5米2';
						break;
					case 'SIX_METER_CAR':
						return '6米8';
						break;
					case 'SEVEN_METER_CAR':
						return '7米6';
						break;
					case 'NINE_METER_CAR':
						return '9米6';
						break;
					case 'THIRTEEN_METER_CAR':
						return '13米';
						break;
					case 'SEVENTEEN_METER_CAR':
						return '17米5';
						break;
				}
			}
		},
		methods: {
			async calcDistance() {
				//查询是否存在空地址
				if (this.addressListMove.some(item => !item.latitude)) {
					return this.price = 0;
				}
				//是否有城市 是否有车型
				if (this.currentCity == '' || this.carType == "") {
					return this.price = 0;
				}
				uni.showLoading({
					title: '正在计算..',
					mask: true
				});
				let distance = await getDistance(this.addressListMove);
				this.totalDistance = distance.data;
				calcSimplePrice({
					ownerCity: this.currentCity,
					carTypeSeqId: this.carTypeSeqId,
					routeKilometer: this.totalDistance
				}).then(result => {
					this.price = result.data;
					uni.hideLoading()
				})
			},
			async calcOrderPrice() {
				if (!this.addressListMove.some(item => !item.latitude)) {
					let distance = await getDistance(this.addressListMove);
					this.totalDistance = distance.data;
				}
				let obj = {};
				let list = []
				if (this.serve) {
					list = this.carTypeList.map(item => {
						return {
							refSeqId: item.seqId,
							propName: item.catType,
							price: item.price,
							qty: item.count
						}

					})
				}
				if (Object.keys(this.otherList).length > 0 && this.serve) {
					let lc = {
						refSeqId: this.otherList.seqId,
						propName: '搬出楼层'
					}
					list.push(lc)
				}
				
				if(Object.keys(this.brList).length >0 && this.serve){
					let banru = {
						refSeqId: this.brList.seqId,
						propName: '搬入楼层'
					}
					list.push(banru)
				}
				console.log(list)

				obj = {
					orderType: 'APPOINTMENT',
					serverType: "CHANGE_HOUSE",
					orderDate: this.orderDate,
					receiverName: this.receiverName,
					receiverMobileNo: this.receiverMobileNo,
					mobileProtected: this.mobileProtected,
					carType: this.carType,
					carTypeSeqId: this.carTypeSeqId,
					ownerCity: this.currentCity,
					orderDescribe: this.orderDescribe,
					attachType: this.attachType,
					routeKilometer: this.totalDistance || 0,
					orderRouteList: this.addressListMove,
					couponSeqId: Object.keys(this.selectCouponData).length > 0 ? this.selectCouponData.seqId : '',
					couponName: Object.keys(this.selectCouponData).length > 0 ? this.selectCouponData.couponName : '',
					couponMoney: Object.keys(this.selectCouponData).length > 0 ? this.selectCouponData.couponValue : '',
					totalMoney: this.price,
					orderPriceList: list
				}
				calcPrice(obj).then(res => {
					this.totalMoney = res.data;
					if (!Object.keys(this.selectCouponData).length > 0) {
						this.couponTip = '暂无可用券';
						this.baseTotalMoney = res.data;
					}
				})
			},
			getPhone(){
				getUserDataBySeqId({
					customerSeqId: uni.getStorageSync('userId')
				}).then(res => {
					this.receiverMobileNo=res.data.mobileNo 
				})
			},
			getValuationInfo(id) {
				findMap({
					headSeqId: id,
					attachType: 'STAND1'
				}).then(res => {
					this.indexList = res.data['楼层'];
					this.indexLists = res.data['楼层'];
					console.log(res)
				})
			},
			bindPickerChange3(e) {
				this.sendIndex = e.target.value;
				this.otherList = this.indexList[this.sendIndex]
				console.log(this.otherList)
				this.calcOrderPrice()
			},
			bindPickerChange4(e){
				this.sendIndexs = e.target.value;
				this.brList = this.indexLists[this.sendIndexs]
				console.log(this.brList)
				this.calcOrderPrice()
			},
			switch2Change(e) {
				this.serve = e.target.value
				this.otherList = this.indexList[this.sendIndex]
				this.brList = this.indexLists[this.sendIndexs]
				this.calcOrderPrice()
			},
			switch2Change_1(e) {
				this.mobileProtected = e.target.value
			},
			changeTime(time, timap) {
				console.log(time)
				this.orderDate = time
			},
			select_good() {
				this.isClearCoupon = true;
				uni.navigateTo({
					url: '/order/good?carTypeSeqId=' + this.carTypeSeqId
				})
			},
			remarks() {
				uni.navigateTo({
					url: '/order/order_remarks'
				})
			},
			rules_1(){
				uni.navigateTo({
					url:'/order/accounting'
				})
			},
			change(e) {
				this.checked = e.detail.value;
			},
			select_value() {
				if (this.totalMoney == 0) {
					uni.showToast({
						title: '请先完善后在选择~',
						icon: 'none'
					});
					return;
				}
				const userId = uni.getStorageSync('userId');
				orderFindUserCoupon({
					userId: userId,
					applicableType: 'CHANGE_HOUSE',
					useCondition: this.baseTotalMoney
				}).then(res => {
					console.log(res.list)
					this.couponList = res.list;
					if (res.list.length > 0) {
						this.$refs.popup.show() // 显示
					} else {
						this.couponTip = '暂无可用券';
						uni.showToast({
							title: '暂无可用优惠券',
							icon: 'none'
						});
					}
				})
			},

			couponHandle(item) {
				this.selectCouponData = item;
				this.calcOrderPrice();
				this.$refs.popup.hide()
			},
			async go_cost() {
				let distance = 0
				if (!this.addressListMove.some(item => !item.latitude)) {
					let result = await getDistance(this.addressListMove);
					distance = result.data;
					console.log(distance)
				}
				let obj = {};
				let list = []
				if (this.serve) {
					list = this.carTypeList.map(item => {
						return {
							refSeqId: item.seqId,
							propName: item.catType,
							price: item.price,
							qty: item.count
						}

					})
				}
				if (Object.keys(this.otherList).length > 0 && this.serve) {
					let lc = {
						refSeqId: this.otherList.seqId,
						propName: '搬出楼层'
					}
					list.push(lc)
				}
				
				if(Object.keys(this.brList).length >0 && this.serve){
					let banru = {
						refSeqId: this.brList.seqId,
						propName: '搬入楼层'
					}
					list.push(banru)
				}
				
				obj = {
					orderType: 'APPOINTMENT',
					serverType: "CHANGE_HOUSE",
					orderDate: this.orderDate,
					receiverName: this.receiverName,
					receiverMobileNo: this.receiverMobileNo,
					mobileProtected: this.mobileProtected,
					carType: this.carType,
					carTypeSeqId: this.carTypeSeqId,
					ownerCity: this.currentCity,
					orderDescribe: this.orderDescribe,
					attachType: this.attachType,
					routeKilometer: distance,
					orderRouteList: this.addressListMove,
					couponSeqId: Object.keys(this.selectCouponData).length > 0 ? this.selectCouponData.seqId : '',
					couponName: Object.keys(this.selectCouponData).length > 0 ? this.selectCouponData.couponName : '',
					couponMoney: Object.keys(this.selectCouponData).length > 0 ? this.selectCouponData.couponValue : '',
					totalMoney: this.price,
					orderPriceList: list,
					needTransfer: this.serve
				}
				calcPricePullDet(obj).then(res => {
					if (res.code == 200) {
						uni.navigateTo({
							url: '/order/cost?detail=' + JSON.stringify(res.data)
						})
					}
				})

			},
			confirm() {
				if (!this.addressListMove[0].address1) {
					uni.showToast({
						title: '请选择搬出地址',
						icon: 'none'
					})
					return false
				}
				if (!this.addressListMove[1].address1) {
					uni.showToast({
						title: '请选择搬入地址',
						icon: 'none'
					})
					return false
				}
				if (!this.orderDate) {
					uni.showToast({
						title: '请选择搬家时间',
						icon: 'none'
					})
					return false
				}
				if (this.serve) {
					if (this.carTypeList.length < 1) {
						uni.showToast({
							title: '请选择大件物品',
							icon: 'none'
						})
						return false
					}
				}
				if (!this.receiverName) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return false
				}
				if (!this.receiverMobileNo) {
					uni.showToast({
						title: '请输入联系电话',
						icon: 'none'
					})
					return false
				} else {
					if (!/^1[3456789]\d{9}$/.test(this.receiverMobileNo)) {
						uni.showToast({
							icon: 'none',
							title: '手机号码不正确'
						})
						return false
					}
				}
				if (this.checked.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请勾选同意协议和隐私政策'
					})
					return false
				}
				const userId = uni.getStorageSync('userId');
				let list = []
				if (this.serve) {
					list = this.carTypeList.map(item => {
						return {
							refSeqId: item.seqId,
							propName: item.catType,
							price: item.price,
							qty: item.count
						}

					})
				}
				if (Object.keys(this.otherList).length > 0 && this.serve) {
					let lc = {
						refSeqId: this.otherList.seqId,
						propName: '搬出楼层'
					}
					list.push(lc)
				}
				
				if(Object.keys(this.brList).length >0 && this.serve){
					let banru = {
						refSeqId: this.brList.seqId,
						propName: '搬入楼层'
					}
					list.push(banru)
				}
				insert({
					carType: this.carType,
					carTypeSeqId: this.carTypeSeqId,
					// customerSeqId: userId,
					mobileProtected: this.mobileProtected,
					needTransfer: this.serve,
					orderDate: this.orderDate,
					orderDescribe: this.orderDescribe,
					orderPicList: this.orderPicList,
					orderRouteList: this.addressListMove,
					orderType: 'APPOINTMENT',
					ownerCity: this.currentCity,
					payMoney: this.totalMoney,
					totalMoney: this.price,
					payType: this.bianhao == 1 ? 'WX' : 'OFF_LINE',
					receiverMobileNo: this.receiverMobileNo,
					receiverName: this.receiverName,
					orderPriceList: list, //订单附加任务
					couponSeqId: Object.keys(this.selectCouponData).length > 0 ? this.selectCouponData.seqId : '',
					couponName: Object.keys(this.selectCouponData).length > 0 ? this.selectCouponData.couponName : '',
					couponMoney: Object.keys(this.selectCouponData).length > 0 ? this.selectCouponData.couponValue : '',
					"attachType": "OTHER",
					serverType: 'CHANGE_HOUSE',
					routeKilometer: this.totalDistance || 0
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.$refs.popup_1.show()
						this.order_id = res.data.seqId
					}
				})

			},
			submit() {
				if (this.bianhao == 1) {
					uni.showLoading({ title: '请稍后',mask: true });
					//微信支付
					wx_pay({
						orderHeadSeqId: this.order_id
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
									uni.hideLoading();
									uni.redirectTo({
										url: `/myOrder/move?id=${this.order_id}&from=confirm`
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
					seqId: this.order_id,
					payType: 'OFF_LINE'
				}).then(res => {
					if (res.code == 200) {
						uni.redirectTo({
							url: `/myOrder/move?id=${this.order_id}&from=confirm`
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
			rules() {
				uni.navigateTo({
					url: '/personalCenter/rules'
				})
			},
			selectAddress(index) {
				this.isClearCoupon = true;
				this.$store.dispatch('move/setIndex', index)
				uni.navigateTo({
					url: '/order/ship_address?index=' + index
				})
			}
		}
	}
</script>

<style lang='scss'>
	.confirm {
		background: #f8f8f8;
		padding-top: 24upx;

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
						font-size: 26rpx;
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
			padding: 20upx 30upx;
			border-radius: 17upx;
			margin: 0 24rpx;

			.selected {
				display: flex;
				justify-content: space-between;
				align-items: center;

				&>p {
					font-size: 14px;
				}
			}

			.switch {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 40rpx;
			}
		}

		.address {
			padding-top: 30upx;
			background: #fff;
			margin-top: 24upx;
			border-radius: 17upx;
			margin: 0 24rpx;
			margin-bottom: 20upx;

			.left_wrap {
				padding: 0 30rpx;

				.start {
					position: relative;
					padding-left: 60upx;
					padding-bottom: 36upx;

					.lt-icon-box {
						position: absolute;
						border: 2px solid #7ccd87;
						background: #fff;
						border-radius: 50%;
						width: 12rpx;
						height: 12rpx;
						left: -2upx;
						top: 12upx;
					}

					.addressName {
						font-size: 14px;
						font-family: PingFang SC;
					}

					.addressDesc {
						font-size: 24rpx;
						color: #c3c3c3;
						margin-top: 6rpx;
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
					left: 7upx;
					top: 18upx;
				}

				.start:last-child:before {
					height: 0;
				}
			}

			.time_wrap {
				padding: 0 30rpx;
				height: 70rpx;
				display: flex;
				justify-content: space-between;
				border-top: 1px solid #f1f1f1;
				align-items: center;

				.changeTime {
					display: flex;
					align-items: center;
				}

				&>div {
					flex: 1;
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
			}
		}

		.demand,
		.remark,
		.discount,
		.name,
		.contact,
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
				flex: 1;
				margin-left: 25rpx;

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
		}

		.bigger {
			background: #fff;
			padding: 20upx 30upx;
			border-radius: 17upx;
			margin: 20rpx 24rpx 20rpx 24rpx;
			.pic_list{
				display: flex;
				image:last-child{
					margin-right: 0!important;
				}
			}
		}

		h5 {
			color: rgba(124, 122, 122, 1);
			font-size: 16px;
			font-family: PingFang SC;
			margin-bottom: 20upx;
			margin-left: 24rpx;
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
			justify-content: space-between;
			align-items: center;
			padding: 0 24rpx;

			.left_aside {
				flex: 1;
				display: flex;
				align-items: center;

				span:first-child {
					font-size: 40rpx;
					color: #28ae3a;
				}

				span:last-child {
					width: 156rpx;
					height: 38rpx;
					border: 1px solid #eee;
					color: #888;
					font-size: 22rpx;
					border-radius: 40rpx;
					display: inline-block;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 12rpx;

					image {
						width: 20rpx;
						height: 20rpx;
					}
				}
			}

			.right_aside {
				width: 230rpx;
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
