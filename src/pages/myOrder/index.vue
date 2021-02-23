<template>
	<div class='index_wrap'>
		<div class="navbar">
			<div v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
			 @click="tabClick(index)">
				{{ item.text }}
			</div>
		</div>
		<!-- 显示区域 -->
		<div class="scroll-wrap">
			<scroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"
			 :fixed='false'>
			<listCard :order-list="orderList"></listCard>
				</scroll-uni>
		</div>
	</div>
</template>

<script>
	import { orderList } from "@/api"
	import listCard from "./components/list.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components: {
			listCard
		},
		data() {
			return {
				orderList: [],
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '进行中',
						orderStaus: `NOPAY,WAIT_REC,DRIVER_REC,DRIVER_COME,DRIVER_WORKING,DRIVER_FINISH,NOPAY2,CANCEL_APPLY`
					},
					{
						state: 1,
						text: '已完成',
						orderStaus: `FINISH,EVALUATE`
					},
					{
						state: 2,
						text: '已取消',
						orderStaus: `CANCEL,RETURN`
					}
				],
				upOption: {
					page: {
						num: 0,
						size: 10
					}
				}
			}
		},
		methods: {
			tabClick(index) {
				if(this.tabCurrentIndex == index) return;
				this.tabCurrentIndex = index;
				this.orderList = []
				this.mescroll.resetUpScroll();
			},
			downCallback() {
				this.orderList = []
				this.mescroll.resetUpScroll();
			},
			upCallback(page) {
				orderList({
					orderStatusList: this.navList[this.tabCurrentIndex].orderStaus,
					pageno: page.num,
					pagesize: page.size,
				}).then(res=>{
					console.log(res)
					if (page.num === 1) this.orderList = [];
					this.orderList = this.orderList.concat(res.list)
					// 数据渲染成功后,隐藏下拉刷新的状态
					this.$nextTick(() => {
						this.mescroll.endSuccess((res.list && res.list.length) ? res.list.length : 0, res.total)
					})
				})
			},
			getOrderList(){
				orderList({
					orderStatusList: this.navList[this.tabCurrentIndex].orderStaus,
					pagesize: 99
				}).then(res=>{
					console.log(res)
					this.orderList = res.list;
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f3f3f3;
	}
	.index_wrap {
		// padding-bottom: 30px;
		background-color: #f3f3f3;
		.navbar {
			display: flex;
			height: 42px;
			padding: 0 5px;
			z-index: 10;
			.nav-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 28px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #919192;
				position: relative;

				&.current {
					color: #7bcb85;
				}
			}

		}
		.scroll-wrap{
			height: calc(100vh-100px);
		}
	}
</style>
