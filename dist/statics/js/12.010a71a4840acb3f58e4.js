webpackJsonp([12],{"3n4S":function(t,e){},ltQH:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("mvHQ"),n=r.n(a),s={name:"Cart",data:function(){return{type:"",operCenter:"",carList:[]}},mounted:function(){this.type=this.$route.query.type,this.operCenter=this.$route.query.operCenter,this.getAllCart()},methods:{getAllCart:function(){var t=this,e={serverType:this.type,operCenter:this.operCenter,pageno:1,pagesize:100};this.$api.carStyleFindPage(e).then(function(e){t.carList=e.list})},cartHandler:function(t){localStorage.setItem("sCar",1),localStorage.setItem("cartObject",n()(t));var e=localStorage.getItem("orderType");1==e?this.$router.push("/"):2==e&&this.$router.push("/confirmorder")}}},i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"cartwrap"},t._l(t.carList,function(e,a){return r("div",{key:a,staticClass:"cartitem",on:{click:function(r){return t.cartHandler(e)}}},[r("img",{staticClass:"cartico",attrs:{src:e.picUrl}}),t._v(" "),r("div",{staticClass:"carttext"},[t._v("\n    "+t._s(e.carName)+"\n    ")])])}),0)},staticRenderFns:[]};var c=r("VU/8")(s,i,!1,function(t){r("3n4S")},"data-v-af1a802e",null);e.default=c.exports}});
//# sourceMappingURL=12.010a71a4840acb3f58e4.js.map?v=1602519544087