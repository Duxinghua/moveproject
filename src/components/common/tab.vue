<template>
	<div class="tab-box">
		<div class="tab-fixed" @click="onSearch">
        <img src="../../assets/images/huabansearchico.png" alt="">
        <input type="text" v-model="searchText" class="input" placeholder="请输入关键字" disabled>
    </div>
		<div class="tab-content">
			<ul>
				<li
				 v-for="(item, index) in tabList"
				 :key="index"
				 class="active"
				 @click="tabClick(item.id)"
				>
        {{item.name}}
        </li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0,
      searchText: ''
    }
  },
  props: {
    tabList: {
      type: Array,
      default: []
    }
  },
  watch: {
    tabList (data) {
      if (data) {
        this.tabIndex = data[0].id
      }
    }
  },
  methods: {
    tabClick (id) {
      this.tabIndex = id
      this.$emit('on-change', id)
    },
    onSearch () {
      this.$emit('on-search')
    },
    onCate () {
      this.$emit('on-cate')
    }
  }
}
</script>

<style lang='scss' scoped>
.tab-box {
  width: 100%;
  height: 200px;
  background: url("../../assets/images/tab-bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  .tab-fixed {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top:30px;
    box-sizing: border-box;
      img{
        position: absolute;
        width:33px;
        height:35px;
        left:72px;
        top:50%;
        transform: translateY(-50%)
      }
      input{
        width:90%;
        height:70px;
        border-radius: 20px;
        padding-left:85px;
        background:#FAFAFA;
        border:none;
        font-size: 30px;
        color:#333;
      }
  }
  .tab-content {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
          width: 40px;
          height: 40px;
          margin-top: 10px;
    }
    ul {
      width:90%;
      height: 100px;
      display: flex;
      align-items: center;
      // padding-left: 30px;
      // padding-right: 30px;
      overflow: hidden;
      overflow-x: auto;
      li {
        font-size: 32px;
        // margin-right: 40px;
        flex-shrink: 0;
        transition: all 0.3s;
        color: #fff;
        padding-left:25px;
        padding-right:24px;
        height: fit-content;
        position: relative;
        &:first-child {
          // margin-right: 40px;
          padding-left:0px;
        }
      }
      li::after{
        position: absolute;
        content:'';
        width:2px;
        height:60%;
        border-right:2px dashed #E3D29C;
        right:0;
        top:60%;
        transform: translateY(-60%)
      }
      li:last-child::after{
        display: none
      }
      .active {
        // font-weight: 500;
        // transform: scale(1.3);
        color: #e3d29c;
      }
    }
  }
}
</style>
