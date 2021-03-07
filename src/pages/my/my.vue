<template>
	<div class="main">
    <!-- // v-if="Object.keys(userInfo).length>0" -->
        <TopNav :menu="menutext" page="home" />
		<header>
			<img :src="userInfo.avatarUrl"></img>
			<div>
				<p>
					{{userInfo.nickName}}
					<img src='../../assets/img/male.png' v-if="userInfo.gender == 1"></img>
					<img src='../../assets/img/female.png' v-if="userInfo.gender == 2"></img>
				</p>
				<p>{{userInfo.mobileNo}}</p>
			</div>
		</header>
		<div class='content'>
			<div class="link">
				<div class="bottoms">
					<img src="../../assets/img/order.png" ></img>
					<div class="right_wrap" @click="link('/myorder')">
						<span>我的订单</span>
						<img src="../../assets/img/right_gray.png"></img>
					</div>
				</div>
			</div>
			<div class='block'></div>
			<div class='link'>
				<div class="top">
					<img src="../../assets/img/erji.png"></img>
					<div class="right_wrap" @click="link('/callCenter')">
						<span>客服中心</span>
						<img src="../../assets/img/right_gray.png"></img>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TopNav from "@/components/topnav.vue";
	export default {
		data() {
			return {
				userInfo: {},
				token: '',
        menutext:'我的'
			}
		},
    components:{
      TopNav
    },
		async mounted() {
			let userId = await JSON.parse(localStorage.getItem('payload')).userId
      console.log(userId)
			let data = await this.$api.getUserDataBySeqId({ customerSeqId: userId });
			this.userInfo = data.data;
			console.log(data)
		},
		methods: {
			link(path){
         this.$router.push(path)
			},
		}
	}
</script>

<style lang='scss' scoped>
	.main {
		background-color: #f5f6f7;

		.block {
			background-color: #f5f6f7;
			height: 26px;
		}

		header {
			display: flex;
      flex-direction: row;
      align-items: center;
			height: 130px;
			background-color: #fff;
			padding: 60px 24px 0 24px;

			&>img {
				width: 92px;
				height: 92px;
				border-radius: 50%;
			}

			&>div {
				flex: 1;
				margin-left: 28px;

				p:first-child {
					font-size: 30px;
					color: #333;
					font-weight: 600;
					display: flex;
					align-items: center;

					&>img {
						width: 35px;
						height: 30px;
						margin-left: 12px;
					}
				}

				p:last-child {
					margin-top: 10px;
					font-size: 30px;
					color: #888;
				}
			}
		}

		.content {
			background-color: #fff;
			padding-top: 10px;
			margin-top: 26px;
		}

		.link {
			.btn {
				height: 110px;
				padding: 0 32px;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
			}

			.top,
			.bottoms {
				height:94px;
				padding: 0 32px;
				display: flex;
				align-items: center;
			}

			img {
				width: 36px;
				height: 36px;
			}

			.right_wrap {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height:94px;
				border-bottom: 1px solid rgba(240, 240, 240, .5);
				margin-left: 24px;

				span {
					font-size: 28px;
					font-family: PingFang SC;
					// font-weight:500;
					color: rgba(49, 49, 49, 1);
				}

				&>img {
					width: 23px;
					height: 24px;
				}
			}
		}
	}
</style>
