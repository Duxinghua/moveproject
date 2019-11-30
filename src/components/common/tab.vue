<template>
	<div class="tab-box">
		<div class="tab-fixed"></div>
		<div class="tab-content">
			<ul>
				<li><img
					 @click="onSearch"
					 src="../../assets/images/search.png"
					 alt=""
					></li>
				<li
				 v-for="(item, index) in tabList"
				 :key="index"
				 :class="tabIndex == item.id ? 'active' : ''"
				 @click="tabClick(item.id)"
				>{{item.name}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tabIndex: 0
		}
	},
	props: {
		tabList: {
			type: Array,
			default: []
		}
	},
	watch: {
		tabList(data) {
			if (data) {
				this.tabIndex = data[0].id
			}
		}
	},
	methods: {
		tabClick(id) {
			this.tabIndex = id
			this.$emit('on-change', id)
		},
		onSearch() {
			this.$emit('on-search')
		}
	}
}
</script>

<style lang='scss' scoped>
.tab-box {
  width: 100%;
  .tab-fixed {
    height: 100px;
  }
  .tab-content {
    width: 100%;
    height: 100px;
    background: url("../../assets/images/tab-bg.png") 100% 100% no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    ul {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 30px;
      padding-right: 30px;
      overflow: hidden;
      overflow-x: auto;
      li {
        font-size: 28px;
        margin-right: 40px;
        flex-shrink: 0;
        transition: all 0.3s;
        color: #fff;
        &:first-child {
          margin-right: 40px;
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
