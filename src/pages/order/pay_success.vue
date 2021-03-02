<template>
	<view class='pay_success'>
		<div class='content'>
			<image src='../static/success.png'></image>
			<h4>支付成功</h4>
			<p>订单支付成功，请耐心等待!</p>
			<span class='check' @click='goback'>查看订单</span>
		</div>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			goback(){
				uni.switchTab({
				    url: '/pages/index/index'
				})
			}
		}
	}
</script>
<style lang='scss'>
	.pay_success{
		display: flex;
		justify-content: center;
		.content{
			margin:auto;
			margin-top:220upx;
			text-align: center;
			overflow: hidden;
			width:330upx;
			&>image{
				width:70upx;
				height:70upx;
			}
			h4{
				font-size:18px;
				margin-top:17upx;
			}
			&>p{
				font-size:12px;
				color:#c8c8c8;
				word-wrap: break-word;
					word-break: break-all;
					margin-top:16upx;
			}
			.check{
				color:#569CFA;
				margin-top:46upx;
				display: inline-block;
				font-size:14px;
			}
		}
	}
</style>
