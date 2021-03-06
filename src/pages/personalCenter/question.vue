<template>
	<div class='question'>
		<div v-if='state==1'>
			<div class='title'>
				选择车型下单
			</div>
			<div class='content'>
				<p>在订单页面选择车型时有相应的车辆图片，图片标注了车辆的载重和长宽高信息，您可以根据相关信息选择车型。如有疑问请您拨打客服热线400-6789-121咨询。</p>
			</div>
		</div>
		<div v-if='state==2'>
			<div class='title'>
				预约用车
			</div>
			<div class='content'>
				可根据用车时间预约服务（最多可预约3天内的订单）。订单提交后，若有司机接单，可提前与司机确认好用车时间及额外需求，若无法满足用户需求，可选择取消订单，费用会原路退回给您。
			</div>
		</div>
		<div v-if='state==3'>
			<div class='title'>
				如何取消订单
			</div>
			<div class='content'>
				如需取消订单，在货搬搬首页左上角头像图标进入“我的”个人中心页面→进入订单详情页→点击订单选择“取消订单”。 注意：订单“工作中”状态无法取消，如订单处于“已达到”状态，双方在友好协商情况下达成一致方可取消。
			</div>
		</div>
		<div v-if='state==4'>
			<div class='title'>
				查询订单
			</div>
			<div class='content'>
				您可以在货搬搬用户版，点击左上角【小黑人】-【订单列表】查看您账号下的订单信息。
			</div>
		</div>
		<div v-if='state==5'>
			<div class='title'>
				预估与实际价格不符
			</div>
			<div class='content'>
				由于预估价格是您在下单时系统根据始发地与目的地的最优距离预估的里程费用，实际费用会根据司机货车推荐导航里程和服务中所产生的等候费，高速费，停车费，搬运费等其他费用需要用户承担，所以导致预估费用与实际费用不同。
			</div>
		</div>
		<div v-if='state==6'>
			<div class='title'>
				发出订单后无司机接单
			</div>
			<div class='content'>
				成功下单后，订单会推送至附近匹配度最高的司机端，可能当前时间或者范围内没有可匹配司机提供服务。由于是司机自行抢单，如无司机接单，可以耐心等待或拨打客服热线400-6789-121。
			</div>
		</div>
		<div v-if='state==7'>
			<div class='title'>
				查询订单支付情况
			</div>
			<div class='content'>
				点击货搬搬首页左上角头像图标进入“我的”个人中心页面→点击“全部订单”进入订单管理页面即可看到订单支付状态。
			</div>
		</div>
		<div v-if='state==8'>
			<div class='title'>
				订单支付方式
			</div>
			<div class='content'>
				目前平台支付方式有：
				在线支付：微信钱包支付、微信银联支付（目前暂不支持支付宝、余额支付）
				线下支付：现金支付（若需要订单完成后支付费用，可选择此支付方式，<text class='red'>温馨提示：线下支付，如发生疑问纠纷，无法追溯责任</text>）
			</div>
		</div>
		<div v-if='state==9'>
			<div class='title'>
				司机要求线下支付
			</div>
			<div class='content'>
				推荐使用线上付款，可保证货主和司机的资金安全和保障，若司机提出不合理要求用户可提交平台进行投诉。
			</div>
		</div>
		<div v-if='state==10'>
			<div class='title'>
				订单在线支付被重复扣款
			</div>
			<div class='content'>
				如果订单出现在线支付时被重复扣款的情况，系统在48小时内会自动将重复扣除的款项按原支付路径退回至用户支付的账户内，客户可在48小时后进行核实；如依旧有异常，可拨打客服热线400-6789-121。
			</div>
		</div>
		<div v-if='state==11'>
			<div class='title'>
			优惠券类型
			</div>
			<div class='content'>
				目前只存在两种优惠券类型：满减券 现金券
			</div>
		</div>
		<div v-if='state==12'>
			<div class='title'>
				领取优惠券
			</div>
			<div class='content'>
				通知形式有：货搬搬用户端弹窗、货搬搬用户版专属活动页面、货搬搬微信公众号礼券、货搬搬推荐好友专属礼券
			</div>
		</div>
		<div v-if='state==13'>
			<div class='title'>
				使用优惠券
			</div>
			<div class='content'>
				<p>用户下单时，系统会自动匹配当前可用的面额最高的优惠券，结算时系统自动减免优惠券相应面额；优惠券内容包括：适用范围和条件，优惠金额、过期时间、适用区域、适应车型等。</p>
				<p>使用条件：需线上支付并且符合的适用范围。</p>
			</div>
		</div>
		<div v-if='state==14'>
			<div class='title'>
				优惠券无法使用
			</div>
			<div class='content'>
				<p>您可以点击查看优惠券的适用范围和条件。包括优惠金额、过期时间、适用区域、适应车型等是否符合。</p>
				<p>使用条件：需线上支付并且符合的适用范围。</p>
			</div>
		</div>
		<div v-if='state==15'>
			<div class='title'>
				里程费收费标准
			</div>
			<div class='content'>
			<p>目前平台的收费标准是依据您所在城市以及车型，根据实时路况会自动规划路线核算费用，在下单页面可以查看价格明细。</p>
			<p>温馨提示：</p>
			<p>该费用不包含高速费、停车费、超时等候费及搬运费的，请您留意确认。</p>
			</div>
		</div>
		<div v-if='state==16'>
			<div class='title'>
				什么是超里程费？如何计算？
			</div>
			<div class='content'>
				超里程费是超出基本运输距离之后，每公里里程的单价费用，具体的收费标准请参考货搬搬相关说明。
			</div>
		</div>
		<div v-if='state==17'>
			<div class='title'>
				什么是等候费，如何计算？
			</div>
			<div class='content'>
				司机接单达到指定地点后有一定的免费等候时间来进行货物的装卸，如果超出免费等候时间则会产生等候费用。等候费用的计算方式按照各城市各个车型的相应收费标准进行计算，具体的收费标准请参考货搬搬相关说明。
			</div>
		</div>
		<div v-if='state==18'>
			<div class='title'>
				订单取消后退款什么时候到账
			</div>
			<div class='content'>
				<p>订单取消后您所预付的费用将会原路退回：</p>
				<p>钱包余额：3个工作日（目前暂不支持支付宝、余额支付）；</p>
				<p>温馨提示：若超过时效还未到账,您可以及时联系客服为您协助处理。</p>
			</div>
		</div>
		<div v-if='state==19'>
			<div class='title'>
				计算搬运费
			</div>
			<div class='content'>
				平台是撮合式服务，如您需要搬运服务，可以参考平台的定价标准并与司机沟通达成一致，平台的参考定价在货搬搬用户版【计费规则说明】里查看。
				温馨提示：为保障您的权益，请记得支付时选择线上支付，因为线下支付的行为平台无法追溯。
			</div>
		</div>
		<div v-if='state==20'>
			<div class='title'>
				额外费用
			</div>
			<div class='content'>
				可能会产生的额外费用有：搬运费，等候费，停车费，路桥高速费，尾板费等；运输中实际产生费用才需要额外支付，建议您下单后可第一时间与师傅沟通确认。
			</div>
		</div>
		<div v-if='state==21'>
			<div class='title'>
				成为企业客户
			</div>
			<div class='content'>
				请您拨打客服热线400-6789-121咨询
			</div>
		</div>
		<div v-if='state==22'>
			<div class='title'>
				申请发票
			</div>
			<div class='content'>
				个人版订单目前不支持开具发票
			</div>
		</div>
		<div v-if='state==23'>
			<div class='title'>
				修改订单评价
			</div>
			<div class='content'>
				<p>您的好评对于司机师傅至关重要，已完成订单无法修改、删除、撤销评价内容。</p>
				<p>注：五星评价为好评，一星评价为差评，请您谨慎评价。</p>
			</div>
		</div>
		<div v-if='state==24'>
			<div class='title'>
				投诉评价意见
			</div>
			<div class='content'>
				用户与司机如在服务过程中产生任何问题，可自行协商处理，如协商未果可向平台方提供相应的证据，联系客服热线。
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				state:''
			}
		},
		mounted(){
			this.state = this.$route.query.state
		}
	}
</script>
<style lang='scss'>
	.question{
		padding: 30px;
    box-sizing: border-box;

		.title {
			font-weight: 600;
      font-size: 36px;
			margin-bottom: 20px;
		}

		.content {
			color: #4f4f4f;
			font-size: 30px;
			line-height: 47px;
		}
		.red{
			color:#ff0000;
		}
	}
</style>
