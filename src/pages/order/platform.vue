<template>
	<view class='platform'>
		<h5>工种选择</h5>
		<div class='modelCar'>
			<div class='selected'>
				<span>选择工种</span>
				<div @tap='select_craft'>
					<input type="text" 
						placeholder="选择工种" 
						:value="worker ? worker.workTypeName+'-'+worker.workTypeName2 : ''" 
						placeholder-style="color:#cfcfcf" 
						disabled/>
					<image src='../static/right_gray.png'></image>
				</div>
			</div>
			<div class="selected" style='margin-top:42rpx'>
				<span>详细需求</span>
				<div @tap="remark">
					<input type="text" 
						placeholder="填写订单备注需求" 
						:value="orderDescribeWork"
						placeholder-style="color:#cfcfcf" 
						disabled/>
					<image src='../static/right_gray.png'></image>
				</div>
			</div>
		</div>
		<h5 style='margin-top:12px;margin-bottom:10rpx'>需求填写</h5>
		<p class='beizhu'>服务工期不足4小时的按半天计价，4-9小时以内的按1天计价</p>

		<div class='demand'>
			<div class='first'>
				<span>需要劳务工人数</span>
				<div>
					<input type="number" v-model.number="orderForm.workerUserCnt" :maxlength="4" @blur="blurHandle" placeholder="填写人数" placeholder-style="color:#cfcfcf" />
					人
				</div>
			</div>
			<div class='first'>
				<span>服务工期</span>
				<div @click="selectWorkUnit">
					<input type="text" placeholder="请选择工期类型" v-model="orderForm.workTypeUnit" placeholder-style="color:#cfcfcf" disabled/>
					<image src='../static/right_gray.png'></image>
				</div>
			</div>
			<div class='first' v-if="orderForm.workTypeUnit != ''">
				<span>服务周期天数</span>
				<div>
					<input type="number" v-model.number="orderForm.workerTimeQty" :maxlength="3"  placeholder="填写服务时间" placeholder-style="color:#cfcfcf" />
					<!-- {{orderForm.workTypeUnit}} -->
				</div>
			</div>
			<div class='first'>
				<span>服务区域</span>
				<div>
					<picker mode="region" :value="locationAddress" @change="changeRegion">
						<view class="changeTime">
							<input type="text" placeholder="请选择" v-model="orderForm.workerRegion" placeholder-style="color:#cfcfcf" disabled/>
							<image src='../static/right_gray.png'></image>
						</view>
					</picker>
				</div>
			</div>
			<div class='first'>
				<span>详细地址</span>
				<div>
					<input type="text" placeholder="填写具体地址" v-model="orderForm.workerAddress" :maxlength="100" placeholder-style="color:#cfcfcf"/>
				</div>
			</div>
		</div>
		<h5 style='margin-top:12px;'>其他信息</h5>
		<div class='demand'>
			<div class='first'>
				<span>联系人</span>
				<div>
					<input type="text" placeholder="填写联系人姓名" :maxlength="15" v-model="orderForm.receiverName" placeholder-style="color:#cfcfcf" />
				</div>
			</div>
			<div class='first'>
				<span>联系电话</span>
				<div>
					<input type="number" placeholder="填写联系电话" v-model="orderForm.receiverMobileNo" placeholder-style="color:#cfcfcf" />
				</div>
			</div>
			<div class='first'>
				<span>号码保护</span>
				<div>
					<switch checked disabled style="transform:scale(0.6);position: absolute;right:19rpx" />
				</div>
			</div>
			<div class='first'>
				<span>上门服务时间</span>
				<div>
					<hTimePicker interval="10" @changeTime="changeTime">
						<view slot="pCon" class="changeTime">
							<input type="text" v-model="orderForm.orderDate" placeholder="请选择" placeholder-style="color:#cfcfcf" disabled/>
							<image src='../static/right_gray.png'></image>
						</view>
					</hTimePicker>
				</div>
			</div>
			<div class='first' style='margin-bottom:20rpx'>
				<span>自定义价格</span>
				<div>
					<switch :checked="isCustom" @change="customHandle" style="transform:scale(0.6);position: absolute;right:19rpx" />
				</div>
			</div>
			<p class='custom' v-if='isCustom'>￥<input type="digit" :maxlength="10" v-model.lazy="customPrice"  @input="oninput" placeholder="请输入自定义的价格" placeholder-style="color:#cfcfcf;font-size:13px" /></p>
		</div>
		<div class='remark' v-if='!isCustom'>
			<span>计费规则说明</span>
			<div @tap='rules'>
				<image src='../static/right_gray.png'></image>
			</div>
		</div>
		<div class='discount'>
			<span>选择优惠券</span>
			<div @click="selectCoupon">
				<input type="text" :placeholder="couponTip" :value="selectCouponData.couponName ? selectCouponData.couponName : ''" placeholder-style="color:#cfcfcf" disabled/>
				<image src='../static/right_gray.png'></image>
			</div>
		</div>
		<div class='foot'>
			<span>具体上门时间以线下沟通为主</span>
			<view class='xieyi'>
				<checkbox-group @change="checkboxChange">
					<checkbox value="cb" :checked="isAgree"/>
				</checkbox-group>
				<span style='display: flex;'>勾选即代表服从 <span @click="rules2" style='color:#3cb34b'>《货搬搬用户服务协议》</span></span>
			</view>
		</div>
		<div class='bottom'>
			<div class='left_aside'>
				<span>
					￥{{isCustom && Object.keys(selectCouponData).length>0 ? totalMoney : 
					(isCustom && !Object.keys(selectCouponData).length>0 ? customPrice : totalMoney)}}
				</span>
				<span @tap='go_cost'>价格明细<image src='../static/right_gray.png'></image></span>
			</div>
			<div class='right_aside' @tap="confirmOrder">确认下单</div>
		</div>
		<!-- 优惠券 -->
		<wyb-popup ref="popup" type="bottom" height="400" width="500" radius="6" :showCloseIcon="true">
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
				<h6>
					￥{{isCustom && Object.keys(selectCouponData).length>0 ? totalMoney : 
					(isCustom && !Object.keys(selectCouponData).length>0 ? customPrice : totalMoney)}}
				</h6>
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
					<span>确定</span>
				</div>
			</view>
		</wyb-popup>
		<!-- 工期类型 -->
		<wyb-popup ref="popup_2" type="bottom" height="400" width="500" radius="6" :showCloseIcon="true">
			<view class="popup-content_2">
				<p>请选择工期类型</p>
				<div class='project'>
					<div v-for="(item,index) in workTypeUnitList" :key="index">
						<span>{{item.workUnitDesc}}</span>
						<radio :checked="orderForm.workTypeUnit==item.workUnit" @click="selectUnit(item.workUnit)" style="transform:scale(0.7)"></radio>
					</div>
				</div>
				<div class="btn" @click="closeUnit">
					<span>确定</span>
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
	import { findWorkUnit,orderFindUserCoupon,calcPrice,insert,calcHireWorkerDet } from '@/api'
	export default {
		components: {
			hTimePicker,
			wybPopup
		},
		data() {
			return {
				orderForm: {
					receiverMobileNo: '',
					receiverName: '',
					orderDate: '',
					workerUserCnt: '',
					workTypeUnit: '',
					workerRegion: '',
					workerAddress: '',
					workerTimeQty: '',
					serverType: "HIRE_WORKER",
					orderType: 'ACTUAL_TIME',
					mobileProtected: true,
				},
				totalMoney: 0,
				isCustom: false,
				customPrice: '',
				workTypeUnitList: [],
				couponList: [],
				selectCouponData: {},
				orderId: '',
				baseTotalMoney: 0,
				couponTip: '请选择'
			}
		},
		computed: {
			...mapGetters([
				'worker',
				'orderDescribeWork',
				'currentCity',
				'locationAddress'
			]),
			paramsChange(){
				return [
					this.worker.workTypeName2,
					this.orderForm.workTypeUnit,
					this.orderForm.workerUserCnt,
					this.orderForm.workerTimeQty
				]
			}
		},
		mixins: [OrderConfirm],
		watch: {
			worker(){
				this.orderForm.workTypeUnit = '';//工种变动后清除
				this.orderForm.workerTimeQty = '';
				this.totalMoney = 0;
			},
			paramsChange(){
				//关键数据变动后，计算价格
				let hasValue = this.paramsChange.some(item=>item == '')
				if(!hasValue && !this.isCustom){
					this.selectCouponData = {};
					this.calcOrderPrice();
				}
			},
			customPrice(){
				//自定义价格变动清除优惠券
				if(Number(this.customPrice)<=0){
					this.customPrice=""
					return
				}
				this.selectCouponData = {}
			}
		},
		onLoad(){
			this.serverType = 'worker';
		},
		methods: {
			oninput(e) {
				let that = this;
				let price = e.detail.value
				if (price.indexOf(".") < 0 && price != "") {
					price = parseFloat(price);
				} else if (price.indexOf(".") == 0) {
					//'首位小数点情况'
					price = price.replace(/[^$#$]/g, "0.");
					price = price.replace(/\.{2,}/g, ".");
				} else if (!(/^(\d?)+(\.\d{0,2})?$/.test(price))) {
					//去掉最后一位
					price = price.substring(0, price.length - 1)
				}
				that.$nextTick(function() {
					that.customPrice = price
				})
			},
			changeTime(time) {
				this.orderForm.orderDate = time;
			},
			selectUnit(type){
				if(this.orderForm.workTypeUnit != type){
					this.orderForm.workerTimeQty = '';
					this.orderForm.workTypeUnit = type;
				}
			},
			closeUnit(){
				if(this.orderForm.workTypeUnit == ''){
					uni.showToast({ title: '未选择工期~',icon: 'none' });
					return;
				}
				this.$refs.popup_2.hide()
			},
			remark() {
				uni.navigateTo({
					url: '/order/remark'
				})
			},
			async go_cost() {
				if((this.isCustom && this.customPrice != '') || (!this.isCustom && this.totalMoney>0)){
					let params = await this.getOrderParams();
					calcHireWorkerDet(params).then(res => {
						if(res.code == 200){
							uni.navigateTo({
								url: '/order/cost?detail='+JSON.stringify(res.data)
							})
						}
					})
				}
			},
			async confirmOrder() {
				if(this.orderForm.workerTimeQty == '' || this.orderForm.workerUserCnt == ''){
					uni.showToast({ title: '请添加人数或工期',icon: 'none' });
					return;
				}
				if(this.orderForm.workerRegion == '' || this.orderForm.workerAddress == ''){
					uni.showToast({ title: '请完善地址信息',icon: 'none' });
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
				if (!(/^1[3456789]\d{9}$/.test(this.orderForm.receiverMobileNo))) {
					uni.showToast({ title: '手机号码不正确',icon: 'none' });
					return;
				}
				if(this.orderForm.orderDate == ''){
					uni.showToast({ title: '请选择上门服务时间',icon: 'none' });
					return;
				}
				if(this.isCustom && this.customPrice == '' && Number(this.customPrice) <=0){
					uni.showToast({ title: '请输入自定义价格',icon: 'none' });
					return;
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
			selectWorkUnit() {
				if(this.worker.workTypeName2){
					findWorkUnit({
						workName: this.worker.workTypeName,
						workName2: this.worker.workTypeName2
					}).then(res =>{
						this.workTypeUnitList = res.list;
						this.$refs.popup_2.show()
					})
				}else{
					uni.showToast({ title: '请先选择工种~',icon: 'none' });
				}
			},
			selectCoupon() {
				if(this.isCustom && this.customPrice == ''){
					uni.showToast({ title: '请输入自定义价格',icon: 'none' });
					return;
				}
				if(this.totalMoney == 0 && !this.isCustom){
					uni.showToast({ title: '请完善信息后选择',icon: 'none' });
					return;
				}
				const userId = uni.getStorageSync('userId');
				orderFindUserCoupon({
					userId: userId,
					applicableType: 'HIRE_WORKER',
					useCondition: this.isCustom ? this.customPrice : this.baseTotalMoney
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
				this.calcOrderPrice().catch(res=>{
					this.selectCouponData = {};
				})
				this.$refs.popup.hide()
			},
			customHandle(){
				this.isCustom = !this.isCustom;
				this.selectCouponData = {};
				if(!this.isCustom && this.orderForm.workerTimeQty != '' && this.orderForm.workerUserCnt != ''){
					this.calcOrderPrice();
				}else{
					this.totalMoney = 0;
				}
			},
			protectChange(e) {
				this.orderForm.mobileProtected = e.target.value;
				console.log(this.orderForm)
			},
			getOrderParams(){
				let obj = {};
				obj = {
					totalMoney: this.isCustom ? this.customPrice : this.totalMoney,
					ownerCity: this.currentCity,
					priceType: this.isCustom ? 'DISCUSS' : 'STANDARD',
					orderDescribe: this.orderDescribeWork,
					totalMoney: this.isCustom ? this.customPrice : this.totalMoney,
					workTypeName: this.worker.workTypeName,
					workTypeName2: this.worker.workTypeName2,
					couponSeqId:  Object.keys(this.selectCouponData).length>0 ? this.selectCouponData.seqId : '',
					couponName: Object.keys(this.selectCouponData).length>0 ? this.selectCouponData.couponName : '',
					couponMoney: Object.keys(this.selectCouponData).length>0 ? this.selectCouponData.couponValue : '',
				}
				Object.assign(obj,this.orderForm);
				return obj;
			},
			async calcOrderPrice(){
				let params = await this.getOrderParams();
				return new Promise((resolve, reject) => {
					calcPrice(params).then(res=>{
						this.totalMoney = res.data;
							if(!Object.keys(this.selectCouponData).length>0){
								this.couponTip = '请选择';
								this.baseTotalMoney = res.data;
							}
						resolve(res)
					}).catch(err => {
						reject(err);
					})
				});
			},
			select_craft() {
				//选择工种
				uni.navigateTo({
					url: '/order/craft'
				})
			},
			changeRegion(e) {
				this.orderForm.workerRegion = e.detail.value[2];
			},
			rules(){
				uni.navigateTo({
					url:'/order/accounting'
				})
			},
			rules2(){
				uni.navigateTo({
					url: '/personalCenter/rules'
				})
			},
			onUnload(){
				this.$store.commit('work/CLEAN_WORKER');
			},
			blurHandle(){
				if(this.orderForm.workerUserCnt === 0){
					this.orderForm.workerUserCnt = '';
					uni.showToast({ title: '人数必须大于等于1',icon: 'none' });
				}
				if(this.orderForm.workerTimeQty === 0){
					this.orderForm.workerTimeQty = '';
					uni.showToast({ title: '时间必须大于等于1',icon: 'none' });
				}
			}
		}
	}
</script>

<style lang='scss'>
	.platform {
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
		.popup-content_2 {
			padding-top: 70rpx;
			&>p {
				font-size: 17px;
				color: #333;
				margin-left: 40rpx;
				margin-bottom: 40rpx;
				text-align: center;
				font-weight: 600;
			}
			.project {
				padding-bottom: 40rpx;

				&>div {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 10rpx 20rpx 10rpx 30rpx;
					border-bottom: 1px solid #fafafa;
				}

				&>div:last-child {
					border-bottom: none;
				}
			}
		}

		.modelCar {
			background: #fff;
			padding: 30upx;
			border-radius: 17upx;
			margin: 0 24rpx;

			.selected {
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
			}
		}

		.demand {
			background: #fff;
			padding: 20upx 30upx 8rpx 30rpx;
			border-radius: 17upx;
			margin: 20rpx 24rpx 20rpx 24rpx;

			.first {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 36rpx;

				&>div {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					font-size: 13px;
					flex:1;
					input {
						text-align: right;
						font-size: 13px;
						margin-right: 10rpx;
					}

					image {
						width: 22rpx;
						height: 22rpx;
						margin-left: 10rpx;
					}

					.changeTime {
						display: flex;
						align-items: center;
					}
				}
			}

			.custom {
				display: flex;
				align-items: center;
				padding-bottom: 24rpx;

				input {
					margin-left: 10rpx;
				}
			}
		}

		.remark,
		.discount {
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
				flex:1;
				height:48rpx;
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

		h5 {
			color: #7c7a7a;
			font-size: 16px;
			font-family: PingFang SC;
			margin-bottom: 20upx;
			margin-left: 24rpx;
		}

		.beizhu {
			font-size: 13px;
			color: #b4b4b4;
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
					transform: scale(0.6)
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
