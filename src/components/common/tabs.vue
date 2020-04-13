<template>
	<div class="tab-box">
		<div class="tab-fixed">
    </div>
		<div class="tab-content">
			<ul>
				<li
				 v-for="(item, index) in tabList"
				 :key="index"
         v-if="index < 4"
				 :class="tabIndex == item.id ? 'active' : ''"
				 @click="tabClick(item.id,index)"
				>{{item.name}}</li>
			</ul>
      <van-icon v-if="tabList.length > 4" :name="name ? 'arrow-down' : 'arrow-up'" class="arrowicop" color="#e3d29c" @click="arrowClick"/>
      <ul class="tab-ul" v-if="!name">
        <li
				 v-for="(item, index) in tabList"
				 :key="index"
         v-if="index > 3"
				 :class="tabIndex == item.id ? 'active' : ''"
				 @click="tabClick(item.id,index)"
				>{{item.name}}</li>
      </ul>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0,
      searchText: '',
      name: true
    }
  },
  props: {
    tabList: {
      type: Array,
      default: []
    }
  },
  mounted () {
    this.tabIndex = this.tabList.length ? this.tabList[0].id : 0
  },
  watch: {
    tabList (data) {
      if (data) {
        this.tabIndex = data[0].id
      }
    }
  },
  methods: {
    arrowClick () {
      this.name = !this.name
    },
    tabClick (id, index) {
      this.tabIndex = id
      this.$emit('on-change', id)
      if (index > 3) {
        if (!this.name) {
          this.name = true
        }
      }
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
  width: 100%;
  background: url("../../assets/images/tab-bg.png") 100% 100% no-repeat;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  .tab-fixed {

  }
  .tab-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
          width: 40px;
          height: 40px;
          margin-top: 10px;
    }
    .arrowicop{
      position: absolute;
      right:30px;
      top:50%;
      transform: translateY(-50%);
      font-size: 35px;
    }
    .tab-ul {
      position: absolute;
      top:100px;
      left:0;
      z-index: 100;
      background: white;
      width:100%;
      height: fit-content;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      padding-left: 30px;
      padding-right: 30px;
      box-sizing: border-box;
      li {
        font-size: 32px;
        // margin-right: 40px;
        // flex-shrink: 0;
        transition: all 0.3s;
        color: #333;
        width:25%;
        height:100px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:first-child {
          // margin-right: 40px;
        }
        img {
          width: 40px;
          height: 40px;
          margin-top: 10px;
        }
      }
      .active {
        font-weight: 500;
        transform: scale(1.3);
        color: #e3d29c;
      }
    }
    ul {
      width:100%;
      height: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 30px;
      padding-right: 90px;
      li {
        font-size: 32px;
        // margin-right: 40px;
        // flex-shrink: 0;
        transition: all 0.3s;
        color: #fff;
        width:25%;
        display: flex;
        justify-content: center;
        &:first-child {
          // margin-right: 40px;
        }
        img {
          width: 40px;
          height: 40px;
          margin-top: 10px;
        }
      }
      .active {
        font-weight: 500;
        transform: scale(1.3);
        color: #e3d29c;
      }
    }
  }
}
</style>
