<template>
	<view class="content">
		<view class='search'>
			<view class='left'>
				<text>{{city}}</text>
				<!-- <image src='../static/arrow-down.png'></image> -->
			</view>
			<view class='right'>
				<input type="text" placeholder="从哪发出?" placeholder-style="color:#cdcdcd;font-size:13px" v-model="searchKey" @input="search">
			</view>
		</view>
		<view class='block'>

		</view>
		<scroll-view scroll-y="true" class="option" v-show="IsOption">
			<view class='column_item' v-for='(item,index) in data' :key='index' @click="tapOption(item)">
				{{item.title}}
				<view style="font-size: 12px;color: #ccc;">
					{{item.address}}
				</view>
			</view>
		</scroll-view>
		<view v-if="!IsOption">
			<view class="page-section page-section-gap">
				<map id="myMap" style="width: 100%; height: 280px;" :latitude="latitude" :longitude="longitude" :markers="markers"
				 @poitap="poitap" show-location></map>
			</view>
		</view>
		<view class='record' v-if="!IsOption">
			<view>
				<image src='../static/dingwei.png'></image>
				<view>
					<text>{{title}}</text>
					<text>{{name}}</text>
				</view>
			</view>
			<view>
				<image src='../static/lc.png'></image>
				<input type="text" placeholder="请输入楼层及门牌号" placeholder-style="color:#dddddd;font-size:15px" :maxlength="10" v-model="address3">
			</view>
			<view>
				<image src='../static/people.png'></image>
				<input type="text" placeholder="请输入联系人姓名" placeholder-style="color:#dddddd;font-size:15px" :maxlength="10" v-model="userName">
			</view>
			<view>
				<image src='../static/dh.png'></image>
				<input type="text" placeholder="请输入联系号码" placeholder-style="color:#dddddd;font-size:15px"  :maxlength="11" v-model="mobileNo">
			</view>
		</view>
		<div class='btn' v-if="!IsOption" @click="submitAddress">
			<span>确定</span>
		</div>
	</view>
</template>
<script>
	import QQMapWX from '@/utils/qqmap-wx-jssdk.js';
	var self, mapCtx
	var qqmapsdk
	export default {
		//相关配置参数
		data() {
			return {
				latitude: '',
				longitude: '',
				// 标记点
				markers: [{
					id: 1,
					latitude: '',
					longitude: '',
					name: ''
				}],
				poitList: [], // 周边地址
				choosePoitFlag: -1,
				data: [],
				IsOption: false,
				searchKey: "",
				empty: false,
				tapOpitItem: {},
				title: '', //当前位置
				name: '',
				city:'',
				address3: '',
				mobileNo: '',
				userName: ''
			}

		},
		onLoad(option) {
			self = this
			// 获取当前map
			mapCtx = wx.createMapContext('myMap')
			let result = JSON.parse(option.address)
			console.log(option)
			let obj = {
				latitude: result.location.lat,
				longitude: result.location.lng,
			}
			self.title = result.address;
			self.name = result.title;
			self.latitude = result.location.lat;
			self.longitude = result.location.lng;
			self.city = option.city;
			self.toLocation(obj)
			const mapKey = process.env.VUE_APP_MAP_KEY;
			qqmapsdk = new QQMapWX({
				key: mapKey
			});
		},
		methods: {
			submitAddress(){
				let data = {
					address1: this.title,
					address2: this.name,
					address3: this.address3,
					mobileNo: this.mobileNo,
					userName: this.userName,
					latitude: this.latitude,
					longitude: this.longitude,
				}
				const index = uni.getStorageSync('home_index');
				let serverType  = '';
				switch (index) {
					case 0:
						serverType = 'pull'
						break;
					case 1:
						serverType = 'move'
						break;
					case 3:
						serverType = 'rent'
						break;
				}
				this.$store.dispatch(serverType+'/edit',data);
				uni.navigateBack({
					delta: 2
				});
			},
			// 点击地图位置改变中心位置
			poitap: function(e) {
				console.log(e, "poitap")
				var obj = e.detail
				self.toLocation(obj)
				self.getPoint(obj)
			},
			getPoint(result) {
				const mapKey = process.env.VUE_APP_MAP_KEY;
				let location=result.latitude+","+result.longitude
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1', //仅为示例，并非真实接口地址。
					data: { //参数
						location,
						get_poi:1,
						key: mapKey
					},
					method: 'GET', //请求方式  或GET
					success: res => {
						console.log('返回', res.data);
						self.title=res.data.result.pois[0].address
						self.name=res.data.result.pois[0].title
						self.latitude = result.latitude;
						self.longitude = result.longitude;
					}
				});
			},
			toLocation: function(obj) {
				// self.choosePoitFlag = -1
				// 改变地图中心位置
				mapCtx.moveToLocation(obj)
				// 移动标记点并添加动画效果
				mapCtx.translateMarker({
					markerId: 1,
					autoRotate: true,
					duration: 100,
					destination: {
						latitude: obj.latitude,
						longitude: obj.longitude,
					},
					animationEnd() {
						console.log('animation end')
					}
				})
			},
			// 选择列表地址
			choosePoit(item, index) {
				console.log(index)
				self.choosePoitFlag = index
				let obj = {
					latitude: item.location.lat,
					longitude: item.location.lng
				}
				mapCtx.moveToLocation(obj)
				mapCtx.translateMarker({
					markerId: 1,
					autoRotate: true,
					duration: 100,
					destination: {
						latitude: obj.latitude,
						longitude: obj.longitude,
					},
				})
			},
			//搜索地址
			search: function(e) {
				console.log(e)
				self.searchKey = e.detail.value
				if (self.searchKey) {
					self.choosePoitFlag = -1
				} else {
					self.IsOption = false
				}
				self.data = []
				var location = self.latitude + "," + self.longitude
				console.log(location)
				self.mapSearch(self.searchKey, location).then(res => {
					self.data = res.data
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
			// 清空搜索框
			closeCircle() {
				self.data = []
				self.searchKey = ''
				self.empty = false
				self.IsOption = false
				self.choosePoitFlag = -1
				self.poitList = []
				self.pageIndex = 1
			},
			// 选择搜索地址
			tapOption(item) {
				console.log(item)
				self.tapOpitItem = item
				self.IsOption = false
				let obj = {
					latitude: item.location.lat,
					longitude: item.location.lng
				}
				self.toLocation(obj)
				self.title=item.address
				self.name=item.title
				self.latitude = item.location.lat;
				self.longitude = item.location.lng;
				self.searchKey=''
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #fff;
	}

	.page-section-gap {
		box-sizing: border-box;
	}

	.page-body-button {
		margin-bottom: 30rpx;
	}

	.poitItem {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.poitDetil {
		width: 90%;
		padding: 30upx;

	}

	.poitDetil .title {
		font-size: 18px;
	}

	.address {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
		color: #808080;
	}

	.flexBox {
		display: flex;
		align-items: center;
		background-color: #f4f4f4;
		padding: 10upx 20upx;
		border-radius: 50upx;
		margin: 30upx 20upx;
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

	.block {
		height: 20rpx;
		background-color: #f3f3f3;
		position: absolute;
		width: 100%;
		top: 84rpx;
	}

	.iconPadding {
		padding-left: 20upx;
	}

	.citystyle {
		border-right: 2upx solid #ccc;
		padding-right: 20upx;
	}

	.close-btn {
		display: flex;
		justify-content: space-evenly;
		margin: 20upx;
		margin-top: 40upx;
	}

	.pop-box {
		margin-top: 30upx;
		font-size: 14px;
	}

	.pop-title {
		font-weight: 700;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pop-detile {
		margin: 20upx;
	}

	.pop-input {
		display: flex;
		margin-top: 20upx;
	}

	.option {
		line-height: 45rpx;
		margin-top: 104rpx;
	}

	.column_item {
		padding: 10upx 40rpx;
		/* height: 60rpx; */
		overflow: hidden;
		margin: 0rpx auto;
		background-color: #fff;
		text-overflow: ellipsis;
		white-space: nowrap;
		border-bottom: 2upx solid #fafafa;
	}

	.column_item:active {
		background-color: #8F8F94;
	}

	.page-section-gap {
		box-sizing: border-box;
	}

	.text-gray {
		font-size: 18px;
	}

	.record {
		&>view {
			display: flex;
			align-items: center;
			padding: 27rpx 24rpx;
			border-bottom: 1px solid #eee;

			image {
				width: 40rpx;
				height: 39rpx;
				margin-right: 20rpx;
			}

			&>view {
				flex: 1;

				text {
					display: block;
				}

				text:first-child {
					font-size: 15px;
					color: #434343;
				}

				text:last-child {
					color: #b2b2b2;
					font-size: 12px;
					margin-top: 5rpx;
				}
			}
		}
	}

	.btn {
		background-color: #Fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
		padding: 10rpx 30rpx 10rpx 30rpx;
		z-index: 2;
		margin-top:20rpx;
		span {
			background-color: #28ae3a;
			height: 76rpx;
			border-radius: 40rpx;
			line-height: 76rpx;
			text-align: center;
			color: #fff;
		}
	}
</style>
