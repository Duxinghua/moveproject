webpackJsonp([19],{Ij5d:function(t,a){},Yaje:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={name:"Cartinfo",components:{TopNav:s("Hu0/").a},data:function(){return{seqId:"",detail:{},menutext:"车辆详情"}},mounted:function(){this.seqId=this.$route.query.seqId,this.getDetail()},methods:{getDetail:function(){var t=this,a={seqId:this.seqId};this.$api.carStyleGetByPk(a).then(function(a){t.detail=a.data})}}},e={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"cartinfo"},[s("TopNav",{attrs:{menu:t.menutext}}),t._v(" "),s("div",{staticClass:"cartinfowrap"},[s("div",{staticClass:"carimgwrap"},[s("img",{staticClass:"cartimg",attrs:{src:t.detail.picUrl}})]),t._v(" "),s("div",{staticClass:"cartitem"},[s("div",{staticClass:"carttitle"},[t._v("\n          载货空间及重量\n        ")]),t._v(" "),s("div",{staticClass:"cartlist"},[s("div",{staticClass:"line"},[t._v("\n            载重:"+t._s(t.detail.carCapacity)+"公斤\n          ")]),t._v(" "),s("div",{staticClass:"line"},[t._v("\n            长宽高:"+t._s(t.detail.carLwh)+"\n          ")]),t._v(" "),s("div",{staticClass:"line"},[t._v("\n            载货体积:"+t._s(t.detail.carVolume)+"\n          ")])])]),t._v(" "),s("div",{staticClass:"cartitem"},[s("div",{staticClass:"carttitle"},[t._v("\n          用车参考\n        ")]),t._v(" "),s("div",{staticClass:"cartlist"},[s("div",{staticClass:"line"},[t._v(t._s(t.detail.remarks))])])])])],1)},staticRenderFns:[]};var n=s("VU/8")(i,e,!1,function(t){s("Ij5d")},"data-v-45064fa0",null);a.default=n.exports}});
//# sourceMappingURL=19.6869e05c9dbba883962f.js.map?v=1604326429072