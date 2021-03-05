<template>
	<div class='cost'>
        <TopNav :menu="menutext" />
		<div>
			<p class='price'>￥<span>{{payMoney}}</span></p>
			<span v-if="serverType != 'HIRE_WORKER'">总里程{{routeKilometer}}公里</span>
			<p class='tip' v-if="serverType == 'PULL_CARGO' || serverType == 'RENT_CAR'">若产生高速费、停车费和搬运费，请用户额外支付，若涉及逾时等候费，请于司机按收费标准结算。</p>
			<p class='tip' v-if="serverType == 'CHANGE_HOUSE'">若产生高速费、停车费，请用户额外支付若涉及逾时等候费，请于司机按收费标准结算。</p>
			<div class='basics' v-if='jichu && jichu.length>0'>
				<h3>基础费用</h3>
				<p v-for="(item,index) in jichu" :key="index">
					<template  v-if="serverType == 'HIRE_WORKER'">
						<span style='flex:1;margin-right: 18rpx;'>{{item.name}} <text v-if="item.propValue != ''">（{{item.propValue}})</text></span><span>{{item.name2 != '' ? item.name2 : item.feeMoney}}</span>
					</template>
					<template v-else>
						<span>{{item.name}} <text v-if='item.name2'>（{{item.name2}})</text></span><span>￥{{item.feeMoney}}</span>
					</template>
				</p>
			</div>
			<div class='extra' v-if='extra && extra.length>0'>
				<h3>额外收费</h3>
				<p v-for='(item,index) in extra' :key="index"><span>{{item.name}} <text style='margin-left:12rpx'>({{item.name2}})</text></span><span>￥{{item.feeMoney}}</span></p>
			</div>
		</div>
	</div>
</template>
<script>
import TopNav from "@/components/topnav.vue";
	export default{
		data(){
			return{
				payMoney:'',
				routeKilometer:'',
				mp:{},
				jichu:[],
				extra:[],
				index: 0,
				serverType: '',
        seqId:'',
        menutext:'费用明细'
			}
		},
		mounted(){
      this.seqId = this.$route.query.seqId
      this.getDetail()
		},
    components:{
      TopNav
    },
    methods:{
			getDetail(){
        let obj={}
				obj = {
					headSeqId:this.seqId
				}
				this.$api.orderSheet_price(obj).then(result => {
					if(result.code==200){
                let data= result.data
                this.routeKilometer=data.routeKilometer
                this.payMoney=data.payMoney
                this.serverType = data.serverType
                let _that=this
                Object.keys(data.map).forEach(function(key){
                  if(key=='基础费用'){
                    _that.jichu = data.map[key]
                  }else{
                    _that.extra = data.map[key]
                  }
                })
					}
				})
      }
    }
	}
</script>
<style lang='scss'>
	.cost{
		height:100vh;
		padding: 70px 32px 0 32px;
		&>div{
			text-align: center;
			.price{
        font-size:18px;
				span{
					font-size:16px;
				}
			}
			&>span{
				font-size:13px;
			}
			.tip{
				margin-top:30px;
				padding-bottom:60px;
				border-bottom:1px solid #eee;
				font-size:13px;
				color:#888;
			}
			.basics,.extra{
				text-align: left;
				h3{
					margin-top:50px;
          font-size: 26px;
					color:#888;
				}
				p{
					margin-top:18px;
					display: flex;
					justify-content: space-between;
					font-size:14px;
					align-items: flex-start;
				}
			}
		}

	}
</style>
