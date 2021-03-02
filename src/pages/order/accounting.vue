<template>
	<view class='accounting'>
		<view class='head'>拉货</view>
		<view style='text-align: center;margin-top:40rpx'>
			<image src='https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201103/app_1604384501106q19m.png' style='width: 100%;height:300rpx'></image>
		</view>
		<view style='text-align: center;margin-top:40rpx'>
			<image src='https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201103/app_1604384330159nc7j.png' style='width: 100%;height:300rpx'></image>
		</view>
		<view style='text-align: center;margin-top:40rpx'>
			<image src='https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201103/app_160438457950942ta.png' style='width: 100%;height:300rpx'></image>
		</view>
		<view style='text-align: center;margin-top:40rpx'>
			<image src='https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201103/app_1604384762842ckas.png' style='width: 100%;height:300rpx'></image>
		</view>
		<view class='lufei' style='margin-top:35rpx'>
			<view class='top'>基本路费（小面包）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（5公里）</text>
				<text>28元</text>
			</view>
			<view>
				<text>分段价（6-20公里）</text>
				<text>3元/公里</text>
			</view>
			<view>
				<text>分段价（21公里及以上）</text>
				<text>2.5元/公里</text>
			</view>
		</view>
		<view class='lufei'>
			<view class='top'>基本路费（中面包）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（5公里）</text>
				<text>50元</text>
			</view>
			<view>
				<text>分段价（6-20公里）</text>
				<text>4元/公里</text>
			</view>
			<view>
				<text>分段价（21公里及以上）</text>
				<text>3元/公里</text>
			</view>
		</view>
		<view class='lufei'>
			<view class='top'>基本路费（依维柯）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（5公里）</text>
				<text>60元</text>
			</view>
			<view>
				<text>分段价（6-20公里）</text>
				<text>5元/公里</text>
			</view>
			<view>
				<text>分段价（21公里及以上）</text>
				<text>4元/公里</text>
			</view>
		</view>
		<view class='lufei'>
			<view class='top'>基本路费（中货车）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（5公里）</text>
				<text>96元</text>
			</view>
			<view>
				<text>分段价（6-20公里）</text>
				<text>5元/公里</text>
			</view>
			<view>
				<text>分段价（21公里及以上）</text>
				<text>4.5元/公里</text>
			</view>
		</view>
		<view class='biggood' style='margin-bottom: 25rpx;'>
			<view style='margin-bottom: 30rpx;'>
				<text>
					总费用=基础搬运费+楼层费+大件物品附件费
				</text>
				<text>
					（楼层费说明有电梯按照1层计费；住1楼，则不收取楼层费）
				</text>
			</view>
			<view>
				<text>
					大件物品附加费=大件基础搬运费+大件楼层费
				</text>
				<text>
					（大件基础搬运费：25元/件，大件楼层费：3元/件/层）
				</text>
			</view>
		</view>
		<view class='standard'>
			<view>大件标准</view>
			<view class='second'>单件重量在20kg-45kg，体积1.5m³以内，例如：</view>
			<view class='remark'>
				<text>冰箱：单门/双开门冰箱</text>
				<text>洗衣机：常见中小型洗衣机</text>
				<text>空调：悬挂式空调，包括内机和外机</text>
				<text>衣柜：双门及以下衣柜</text>
				<text>书桌：小型单人书桌</text>
				<text>电视：普通家用电视</text>
				<text>鱼缸：1米以下鱼缸</text>
				<text>其他大件：体积小于1.5m³或总重量小于45kg</text>
			</view>
		</view>
		<view class='over'>
			<view>以下为超限物品</view>
			<view class='second'>不适用平台计价，需与司机商议定价：</view>
			<view class='remark'>
				<text>冰箱：双开门以上冰箱</text>
				<text>衣柜：大型衣柜或长宽高之和大于3米</text>
				<text>鱼缸：长度大于1米鱼缸</text>
				<text>钢琴：三角钢琴</text>
				<text>打印机：彩色喷墨打印机或其他专用打印机，总质量45kg 以上各类打印机</text>
				<text>其他大件：体积大于1.5m³或总重量大于45kg</text>
			</view>
		</view>
		<view class='wait'>
			<view class='title'>
				司机等待 上下货时间说明
			</view>
			<view>
				<text>
					小面包 中面包 依维柯＊
				</text>
				<text>
					上货、卸货免费等候时长总共为30分钟，过后每10分钟加收5元，不足10分钟按10分钟计算（如已收取搬运费，则无需加收等候费）。高速及停车场等费用，根据实际产生的金额由客户支付。
				</text>
			</view>
			<view>
				<text>
					中货车＊
				</text>
				<text>
					上货、卸货免费等候时长总共为50分钟，过后每15分钟加收10元，不足15分钟按15分钟计算（如已收取搬运费，则无需加收等候费）。高速及停车场等费用，根据实际产生的金额由客户支付。
				</text>
			</view>
			<view>
				<text>
					5米2，6米8，7米6，9米6，14米，17.5米＊
				</text>
				<text>
					上货、卸货免费等候时长总共为180分钟，过后每30分钟加收40元，不足30分钟按30分钟计算。高速及停车场等费用，根据实际产生的金额由客户支付。
				</text>
			</view>
		</view>
		<view class='other'>
			<view class='title'>
				其他说明：
			</view>
			<view>1.除搬运上楼外，纯人工搬运距离不超过20m, 超过20m以上超出部分1元/米，由客户和司机协商据实结算搬运费用。</view>
			<view>2.如有与订单不符的物品，需要以实际情况为准，与司机根据费用参考协商搬运费用。</view>
			<view>3.如需货物拆装，增加额外搬运工，需要与司机协商搬运费用</view>
		</view>
		<view class='last'>
			<view class='title'>注：</view>
			<view>
				以上通过和司机协商产生的搬运费用，可在司机接单后，与司机协商议价。
			</view>
			<view>
				为保证您的权益如果发生线下乱收费可以拒绝 电话400-6789-121
			</view>
		</view>
		<view class='last'>
			<view class='title'>温馨提示：</view>
			<view>
				货搬搬是服务平台，暂不支持开具发票哦，如有需要，请于商家协商。
			</view>
		</view>
		<view class='head' style='margin-top:70rpx'>搬家</view>
		<view style='text-align: center;margin-top:40rpx'>
			<image src='https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201103/app_1604386204524nzh7.png' style='width: 100%;height:430rpx'></image>
		</view>
		<view class='lufei' style='margin-top:35rpx'>
			<view class='top'>基本路费（小面包）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（8公里）</text>
				<text>58元</text>
			</view>
			<view>
				<text>分段价（9公里及以上）</text>
				<text>4元/公里</text>
			</view>
		</view>
		<view class='lufei' style='margin-top:35rpx'>
			<view class='top'>基本路费（中面包）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（8公里）</text>
				<text>88元</text>
			</view>
			<view>
				<text>分段价（9公里及以上）</text>
				<text>4元/公里</text>
			</view>
		</view>
		<view class='lufei' style='margin-top:35rpx'>
			<view class='top'>基本路费（依维柯）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（8公里）</text>
				<text>98元</text>
			</view>
			<view>
				<text>分段价（9公里及以上）</text>
				<text>5元/公里</text>
			</view>
		</view>
		<view class='lufei' style='margin-top:35rpx'>
			<view class='top'>基本路费（中货车）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（8公里）</text>
				<text>148元</text>
			</view>
			<view>
				<text>分段价（9公里及以上）</text>
				<text>6元/公里</text>
			</view>
		</view>
		<view class='biggood' style='margin-bottom: 25rpx;'>
			<view style='margin-bottom: 30rpx;'>
				<text>
					总费用=起步价（根据车型起步价不同）+超里程（根据超出里程数定价）+楼层费+大件物品费用+基础搬运费（楼层费说明有电梯按照1层计费；住1楼，则不收取楼层费）
				</text>
			</view>
		</view>
		<view class='over'>
			<view>小面包 中面包 依维柯</view>
			<view class='remark'>
				<text>加人费：100元/人</text>
				<text>中途装卸费：50元/点</text>
				<text>
					超时费：50元/点:（因客户原因导致超时30分钟以上）
				</text>
				<text>
					空驶费：50元/车（上门后因客户自身原因取消订单时收取）
				</text>
				<text>
					第三方服务费：客户承担（停车费、过路费、过桥费等产生的第三方收费）
				</text>
			</view>
		</view>
		<view class='over'>
			<view>中货车</view>
			<view class='remark'>
				<text>加人费：200元/人</text>
				<text>中途装卸费：100元/点</text>
				<text>
					超时费：50元/点:（因客户原因导致超时30分钟以上）
				</text>
				<text>
					空驶费：200元/车（上门后因客户自身原因取消订单时收取）
				</text>
				<text>
					第三方服务费：客户承担（停车费、过路费、过桥费等产生的第三方收费）
				</text>
			</view>
		</view>
		<view class='wait'>
			<view class='title'>
				司机等待 上下货时间说明
			</view>
			<view>
				<text>
					小面包 中面包 依维柯＊
				</text>
				<text>
					上货、卸货免费等候时长总共为30分钟，过后每10分钟加收5元，不足10分钟按10分钟计算（如已收取搬运费，则无需加收等候费）。高速及停车场等费用，根据实际产生的金额由客户支付。
				</text>
			</view>
			<view>
				<text>
					中货车＊
				</text>
				<text>
					上货、卸货免费等候时长总共为50分钟，过后每15分钟加收10元，不足15分钟按15分钟计算（如已收取搬运费，则无需加收等候费）。高速及停车场等费用，根据实际产生的金额由客户支付。
				</text>
			</view>
			<view>
				<text>
					5米2，6米8，7米6，9米6，14米，17.5米＊
				</text>
				<text>
					上货、卸货免费等候时长总共为180分钟，过后每30分钟加收40元，不足30分钟按30分钟计算。高速及停车场等费用，根据实际产生的金额由客户支付。
				</text>
			</view>
		</view>
		<view class='other'>
			<view class='title'>
				其他说明：
			</view>
			<view>1.除搬运上楼外，纯人工搬运距离不超过20m, 超过20m以上超出部分1元/米，由客户和司机协商据实结算搬运费用。</view>
			<view>2.如有与订单不符的物品，需要以实际情况为准，与司机根据费用参考协商搬运费用。</view>
			<view>3.如需货物拆装，增加额外搬运工，需要与司机协商搬运费用</view>
		</view>
		<view class='last'>
			<view class='title'>注：</view>
			<view>
				以上通过和司机协商产生的搬运费用，可在司机接单后，与司机协商议价。
			</view>
			<view>
				为保证您的权益如果发生线下乱收费可以拒绝 电话400-6789-121
			</view>
		</view>
		<view class='last'>
			<view class='title'>温馨提示：</view>
			<view>
				货搬搬是服务平台，暂不支持开具发票哦，如有需要，请于商家协商。
			</view>
		</view>
		<view class='head' style='margin-top:70rpx;margin-bottom: 40rpx;'>租车</view>
		<view class='reason'>费用计算说明</view>
		<view class='tips'> 租车按起步价和超里程价格计费。</view>
		<view class='lufei'>
			<view class='top'>基本路费（5米2）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（15公里）</text>
				<text>220元</text>
			</view>
			<view>
				<text>分段价（16-50公里）</text>
				<text>4.5元/公里</text>
			</view>
			<view>
				<text>分段价（51公里及以上）</text>
				<text>4元/公里</text>
			</view>
		</view>
		<view class='lufei'>
			<view class='top'>基本路费（6米8）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（15公里）</text>
				<text>260元</text>
			</view>
			<view>
				<text>分段价（16-50公里）</text>
				<text>5元/公里</text>
			</view>
			<view>
				<text>分段价（51公里及以上）</text>
				<text>4元/公里</text>
			</view>
		</view>
		<view class='lufei'>
			<view class='top'>基本路费（7米6）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（15公里）</text>
				<text>280元</text>
			</view>
			<view>
				<text>分段价（16-50公里）</text>
				<text>5.5元/公里</text>
			</view>
			<view>
				<text>分段价（51公里及以上）</text>
				<text>4.5元/公里</text>
			</view>
		</view>
		<view class='lufei'>
			<view class='top'>基本路费（9米6）</view>
			<view>
				<text>00:00-24:00</text>
			</view>
			<view>
				<text>起步价（15公里）</text>
				<text>380元</text>
			</view>
			<view>
				<text>分段价（16-50公里）</text>
				<text>6.5元/公里</text>
			</view>
			<view>
				<text>分段价（51公里及以上）</text>
				<text>6元/公里</text>
			</view>
		</view>
		<view class='head' style='margin-top:70rpx;margin-bottom: 40rpx;'>劳务工</view>
		<view class='reason'>费用计算说明</view>
		<view class='tips'>  劳务工按工作时长计费（半天、一天）。</view>
		<view class='reason'>搬搬提示：</view>
		<view class='tips'>   此信息价格均是参考价格，最终价格可为双方线下协商价格。</view>
		<view class='reason'>搬搬提醒：</view>
		<view class='tips'>  招工、找活请确认好对方身份，签好合同，如对方要求缴纳费用，请慎重选择，自身利益受到损害的同时可立即报警，货搬搬可配合调查，但概不负责。</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang='scss'>
	.accounting {
		padding: 30rpx;

		.head {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #000000;
			text-align: center;
		}
		.reason{
			font-size:30rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #000000;
			margin-bottom: 20rpx;
		}
		.tips{
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #000000;
			margin-bottom: 50rpx;
		}
		.biggood {
			view {
				text {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 36rpx;
				}

				text:first-child {
					color: #505050;
				}

				text:last-child {
					color: #999999;
				}
			}
		}

		.standard {
			margin-top: 35rpx;

			view:first-child {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #000000;
				margin-bottom: 16rpx;
			}

			.second {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #505050;
				margin-bottom: 13rpx;
			}

			.remark {
				text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					display: block;
					margin-top: 13rpx;
				}
			}
		}

		.lufei {
			margin-bottom: 35rpx;

			.top {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #000000;
				margin-bottom: 16rpx;
			}

			view {
				text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #505050;
					display: inline-block;
				}

				text:first-child {
					width: 54%;
				}
			}
		}

		.over {
			margin-top: 35rpx;

			view:first-child {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #000000;
				margin-bottom: 16rpx;
			}

			.second {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #505050;
				margin-bottom: 13rpx;
			}

			.remark {
				text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #505050;
					display: block;
					margin-top: 13rpx;
				}
			}
		}

		.wait {
			margin-top: 35rpx;

			.title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #000000;

			}

			view {
				margin-bottom: 14rpx;

				text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;

					line-height: 36rpx;

				}

				text:first-child {
					color: #333333;
				}

				text:last-child {
					color: #999999;
				}
			}
		}

		.other {
			margin-top: 35rpx;

			.title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #000000;
				margin-bottom: 14rpx;
			}

			view {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 36rpx;
				margin-bottom: 12rpx;
			}
		}

		.last {
			margin-top: 35rpx;

			.title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #000000;
				margin-bottom: 14rpx;
			}

			view {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 36rpx;
				margin-bottom: 13rpx;
			}
		}
	}
</style>
