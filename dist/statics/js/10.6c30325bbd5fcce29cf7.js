webpackJsonp([10],{"30Am":function(e,a){},mmnW:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=t("mvHQ"),d=t.n(s),n=t("Hu0/"),r={name:"addressMessage",props:{adretext:{type:String,default:"武汉"},adreadonly:{type:Boolean,default:!0},addressplaceholder:{type:String,default:"从哪儿发"}},data:function(){return{address:""}},methods:{addressInput:function(e){this.$emit("addressInput",this.address)}}},i={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"addressnemu"},[t("div",{staticClass:"menu"},[t("div",{staticClass:"adleft"},[t("div",{staticClass:"addr"},[e._v("\n            "+e._s(e.adretext)+"\n          ")]),e._v(" "),t("van-icon",{attrs:{name:"arrow-down"}})],1),e._v(" "),t("div",{staticClass:"adright"},[t("van-icon",{attrs:{name:"circle",color:"#28ae3a"}}),e._v(" "),t("van-field",{attrs:{maxlength:"500",clearable:!0,readonly:e.adreadonly,label:"",placeholder:e.addressplaceholder},on:{input:e.addressInput},model:{value:e.address,callback:function(a){e.address=a},expression:"address"}})],1)]),e._v(" "),t("div",{staticClass:"aheight"})])},staticRenderFns:[]};var l={components:{AddressMenu:t("VU/8")(r,i,!1,function(e){t("30Am")},"data-v-3f848aea",null).exports,TopNav:n.a},data:function(){return{map:{},adretext:"武汉",addressplaceholder:"从哪儿发",adreadonly:!1,menutext:"",adList:[],result:{},index:0}},mounted:function(){this.index=this.$route.query.index,0==this.$route.query.index?(this.addressplaceholder="从哪儿发",this.menutext="发货地信息"):(this.addressplaceholder="到达哪儿",this.menutext="收货地址")},methods:{addressInput:function(e){var a=this;this.map=new AMap.Map("map",{resizeEnable:!0}),AMap.service(["AMap.PlaceSearch"],function(){new AMap.PlaceSearch({pageSize:100,pageIndex:1,city:a.adretext}).search(e,function(e,t){console.log(t),"complete"==e&&"OK"==t.info&&(a.result=t.poiList,a.adList=t.poiList.pois)})})},adItemHandler:function(e,a){var t=localStorage.getItem("adList");(t=t?JSON.parse(t):[])[this.index]=e,localStorage.setItem("adList",d()(t)),this.$router.push({path:"/chooseaddress",query:{index:this.index}})}}},o={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"sendaddress"},[t("TopNav",{attrs:{menu:e.menutext}}),e._v(" "),t("AddressMenu",{attrs:{adretext:e.adretext,adreadonly:e.adreadonly,addressplaceholder:e.addressplaceholder},on:{addressInput:e.addressInput}}),e._v(" "),t("div",{staticClass:"addresswrap"},e._l(e.adList,function(a,s){return a.address?t("div",{key:s,staticClass:"addressitem",on:{click:function(t){return e.adItemHandler(a,s)}}},[t("div",{staticClass:"addresstop"},[e._v("\n        "+e._s(a.address)+"\n      ")]),e._v(" "),t("div",{staticClass:"addressbottom"},[t("div",{staticClass:"ad1"},[e._v("\n          "+e._s(a.address)+"\n        ")]),e._v(" "),t("div",{staticClass:"ad2"},[e._v("\n          "+e._s(a.juli)+"\n        ")])])]):e._e()}),0),e._v(" "),t("div",{staticClass:"map",attrs:{id:"map"}})],1)},staticRenderFns:[]};var c=t("VU/8")(l,o,!1,function(e){t("n0Xm")},"data-v-a1768088",null);a.default=c.exports},n0Xm:function(e,a){}});
//# sourceMappingURL=10.6c30325bbd5fcce29cf7.js.map?v=1604326429072