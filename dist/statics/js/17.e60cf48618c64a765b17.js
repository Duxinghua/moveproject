webpackJsonp([17],{"+qlG":function(e,t){},"49b7":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("mvHQ"),s=a.n(r),n=a("fZjL"),i=a.n(n),o={name:"Need",data:function(){return{priceType:"DISCUSS",serverArr:[],otherList:[]}},mounted:function(){this.getOther(),localStorage.getItem("platformstandard")&&(this.priceType="STANDARD")},methods:{getPlatformHandler:function(){this.$router.push("/platformstandard")},getOther:function(){var e=this,t={headSeqId:JSON.parse(localStorage.getItem("cartObject")).seqId,attachType:"OTHER"};this.$api.carStyleDetFindMap(t).then(function(t){if(200==t.code){var a=t.data,r=[];i()(a).forEach(function(e){var t=a[e][0];t.keyValue=e,r.push(t)}),e.otherList=r}})},needHandler:function(e){var t=this,a={};a.priceType=this.priceType;var r=[];this.serverArr.forEach(function(e){for(var a in t.otherList)t.otherList[a].seqId==e&&r.push(t.otherList[a])}),a.otherServer=r,localStorage.setItem("need",s()(a));var n=localStorage.getItem("platformstandard");"STANDARD"==this.priceType?n?this.$router.push("/confirmorder"):this.$router.push("/platformstandard"):this.$router.push("/confirmorder")}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"need"},[a("div",{staticClass:"needtitle"},[e._v("\n    计价方式\n  ")]),e._v(" "),a("div",{staticClass:"needprice"},[a("van-radio-group",{attrs:{"checked-color":"#28ae3a"},model:{value:e.priceType,callback:function(t){e.priceType=t},expression:"priceType"}},[a("van-radio",{attrs:{name:"STANDARD"},on:{click:e.getPlatformHandler}},[a("div",{staticClass:"payitem"},[a("span",{staticClass:"payname"},[e._v("平台标准计价")]),e._v(" "),a("van-icon",{attrs:{name:"warning-o",color:"#333333",size:"18"}})],1)]),e._v(" "),a("van-radio",{attrs:{name:"DISCUSS"}},[a("div",{staticClass:"payitem"},[a("span",{staticClass:"payname"},[e._v("与司机协商计划")])])])],1)],1),e._v(" "),e.otherList.length?a("div",{staticClass:"otherwrap"},[a("div",{staticClass:"needtitle needtitlefix"},[e._v("\n      其他服务\n    ")]),e._v(" "),a("van-checkbox-group",{model:{value:e.serverArr,callback:function(t){e.serverArr=t},expression:"serverArr"}},e._l(e.otherList,function(t,r){return a("van-checkbox",{key:r,attrs:{name:t.seqId,"checked-color":"#28ae3a"}},[a("div",{staticClass:"severitem"},[a("span",[e._v(e._s(t.catItem))]),e._v(" "),a("div",{class:["fee",0==t.price?"gray":""]},[e._v("\n            "+e._s(t.remarks)+"\n          ")])])])}),1)],1):e._e(),e._v(" "),a("div",{staticClass:"fixedbtn"},[a("van-button",{attrs:{type:"primary",color:"#28ae3a",round:"",block:"",size:"small"},on:{click:e.needHandler}},[e._v("确定")])],1)])},staticRenderFns:[]};var l=a("VU/8")(o,c,!1,function(e){a("+qlG")},"data-v-4f5a1464",null);t.default=l.exports}});
//# sourceMappingURL=17.e60cf48618c64a765b17.js.map?v=1602519544087