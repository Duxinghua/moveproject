<template>
<view>
	<view class='ship_address'>
		<view class='search'>
			<view class='left' @tap='select_city'>
				<text>{{city}}</text>
				<image src='../static/arrow-down.png'></image>
			</view>
			<view class='right'>
				<input type="text" :placeholder="index != 0 ? '到达哪儿?' : '从哪儿发出?'" placeholder-style="color:#cdcdcd;font-size:13px" v-model="searchKey" @input="search">
			</view>
		</view>
		<view class='block'>

		</view>
		<!-- 默认位置-->
		<view class="scroll-wrap" v-show="!IsOption">
			<scroll-view scroll-y="" @scrolltolower="moreMessage">
				<view v-for='(item,index) in poisList' :key="index">
					<view class='road' @click="choosePoit(item,index)">
						<image src='../static/dingwei.png'></image>
						<view class='detail'>
							<view>{{item.title}}</view>
							<view>
								<text>{{item.address}}</text>
								<text>{{fomatter(item._distance)}}Km</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 查询位置 -->
		<scroll-view scroll-y="" class="option" v-show="IsOption">
			<view class='column_item' v-for='(item,index) in data' :key='index' @click="tapOption(item)">
				{{item.title}}
				<view style="font-size: 12px;color: #ccc;">
					{{item.address}}
				</view>
			</view>
		</scroll-view>
	</view>
		<citySelect @city="back_city" v-if='show_city'></citySelect>
</view>
</template>

<script>
	import QQMapWX from "@/utils/qqmap-wx-jssdk.js"
	import citySelect from '@/components/select-city';
	var qqmapsdk, self
	export default {
		components: {
			citySelect
		},
		data() {
			return {
				latitude: '',
				longitude: '',
				poisList: [],
				data: [],
				IsOption: false,
				searchKey: "",
				pageIndex: 1,
				city: '',
				show_city:false,
				index: ''
			}
		},
		onLoad(option) {
			if(option.index){
				this.index = option.index;
			}
			self = this
			self.getAuthorizeInfo()
			const mapKey = process.env.VUE_APP_MAP_KEY;
			qqmapsdk = new QQMapWX({
				key: mapKey
			});
		},
		onShow() {
			this.searchKey = ''
		},
		methods: {
			select_city() {
				this.show_city=true;
			},
			back_city(e) {
				this.city = e; 
				this.show_city=false;
				this.newAddress()
			},
			newAddress() {
				const mapKey = process.env.VUE_APP_MAP_KEY;
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1', //仅为示例，并非真实接口地址。
					data: { //参数
						address:this.city,
						key:mapKey
					},
					method: 'GET', //请求方式  或GET
					success: res => {
						self.latitude=res.data.result.location.lat;
						self.longitude=res.data.result.location.lng;
						self.poisList=[];
						self.mapRange(self.latitude, self.longitude)
					}
				});
			},
			// 位置授权
			getAuthorizeInfo() {
				uni.authorize({
					scope: 'scope.userLocation',
					success() { // 允许授权
						console.log("确定了")
						self.getLocationInfo();
					},
					fail() { // 拒绝授权
						self.openConfirm();
						console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			// 获取当前地理位置
			getLocationInfo() {
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						console.log(res, "当前位置");
						// 移动到当前位置
						self.latitude = res.latitude;
						self.longitude = res.longitude;
						self.mapRange(res.latitude, res.longitude)
					}
				});
			},
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm() {
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '你拒绝了授权，无法获得周边信息',
								icon: 'none',
								duration: 1000
							})
						}
					}
				});
			},
			// 上拉加载
			moreMessage() {
				this.pageIndex += 1;
				this.mapRange(this.latitude, this.longitude);
			},
			// 查询地址范围
			mapRange(latitude, longitude) {
				let promise = new Promise(function(resolve, reject) {
					// 调用接口
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: latitude,
							longitude: longitude
						},
						get_poi: 1,
						poi_options: 'policy=2;radius=3000;page_size=20;page_index=' + self.pageIndex,
						success: function(res) {
							console.log(res)
							self.city = self.city ?self.city : res.result.address_component.city.split("市")[0];
							if (res.result.pois.length > 0) {
								self.poisList = [...self.poisList, ...res.result.pois]
							}
							resolve(res)
						},
						fail: function(res) {
							reject(res)
						}
					});
				})
				return promise
			},
			fomatter(value) {
				let result = (value / 1000).toFixed(2)
				return result;
			},
			//搜索地址
			search: function(e) {
				console.log(e)
				self.searchKey = e.detail.value
				if (self.searchKey) {
					self.poitList = []
					self.pageIndex = 1
				} else {
					self.IsOption = false
					self.getLocationInfo();
					self.poitList = []
				}
				self.data = []
				var location = self.latitude + "," + self.longitude
				self.mapSearch(self.searchKey, location).then(res => {
					self.data = res.data
					console.log(self.data)
					if (self.searchKey && self.data.length) {
						self.IsOption = true
					} else {
						self.IsOption = false
					}

				}, error => {
					// self.$api.msg('请求失败')
					// console.log(error,"aaaaaaaaaaa");
				})

			},
			mapSearch(keyword, location) {
				let promise = new Promise(function(resolve, reject) {
					// 调用接口
					qqmapsdk.search({
						keyword: keyword, //搜索关键词
						location: location, //设置周边搜索中心点
						success: function(res) {
							resolve(res)
						},
						fail: function(res) {
							reject(res)
						}
					});
				})
				return promise

			},
			// 选择列表地址
			choosePoit(item, index) {
				console.log(index)
				// self.choosePoitFlag = index
				let obj = JSON.stringify(item)
				console.log(item)
				uni.navigateTo({
					url: '/order/ship_message?address=' + obj + "&latitude=" + self.latitude + "&longitude=" + self.longitude+"&city="+this.city
				})
			},
			// 选择搜索地址
			tapOption(item) {
				console.log(item)
				self.tapOpitItem = item
				self.IsOption = false
				let obj = JSON.stringify(item)
				uni.navigateTo({
					url: '/order/ship_message?address=' + obj + "&latitude=" + self.latitude + "&longitude=" + self.longitude+"&city="+this.city
				})
			}
		}
	}
</script>
<style lang='scss'>
	.ship_address {
		background-color: #f3f3f3;
		height: 100vh;

		.block {
			height: 20rpx;
			background-color: #f3f3f3;
			position: absolute;
			width: 100%;
			top: 84rpx;
		}

		.search {
			display: flex;
			align-items: center;
			background-color: #fff;
			height: 58rpx;
			padding: 13rpx 0;
			border-top: 1px solid #f7f7f7;
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 88;

			.left {
				width: 20%;
				border-right: 1px solid #fafafa;
				text-align: center;

				text {
					font-size: 14px;
				}

				&>image {
					width: 22rpx;
					height: 22rpx;
					margin-left: 7rpx;
				}
			}

			.right {
				input {
					position: relative;
					padding-left: 73rpx;
				}

				input::before {
					content: '';
					border: 2px solid #3cb64c;
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					left: 26rpx;
					position: absolute;
					bottom: 14rpx;
				}
			}
		}

		.scroll-wrap {
			margin-top: 104rpx;
			background: #Fff;

			.road {
				display: flex;
				align-items: center;
				border-bottom: 1px solid #f8f8f8;
				padding: 25rpx 24rpx;

				&>image {
					width: 37rpx;
					height: 34rpx;
				}

				.detail {
					flex: 1;
					margin-left: 27rpx;

					view:first-child {
						font-size: 15px;
						font-weight: 600;
						color: #585858;
					}

					view:last-child {
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #aaaaaa;
						font-size: 12px;
						margin-top: 10rpx;

						text:first-child {
							flex: 1;
						}

						text:last-child {
							width: 18%;
							display: inline-block;
							text-align: right;
						}
					}
				}
			}
		}

		.option {
			line-height: 45rpx;
			background-color: #FFFFFF;
			margin-top: 104rpx;

			.column_item {
				padding: 20rpx 24rpx;
				border-bottom: 1px solid #fafafa;
			}
		}
	}
</style>
