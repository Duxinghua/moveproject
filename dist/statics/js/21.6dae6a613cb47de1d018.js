webpackJsonp([21],{DaJj:function(e,t){},YYmV:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("mvHQ"),i=r.n(a),s={name:"Ordernote",components:{TopNav:r("Hu0/").a},data:function(){return{remarks:"",fileList:[],orderType:2,menutext:"订单备注"}},mounted:function(){this.orderType=localStorage.getItem("orderType")},methods:{messageHandler:function(){localStorage.setItem("remarks",this.remarks),3==this.orderType?this.$router.push({path:"/platformpricing",query:{remarks:this.remarks}}):(localStorage.setItem("fileList",i()(this.fileList)),this.$router.push({path:"/confirmorder",query:{remarks:this.remarks}}))},afterRead:function(e,t){var r=this;console.log(t);var a=new FormData;a.append("file",e.file),this.$api.appealimgUpload(a).then(function(e){if(200!=e.code)return r.$toast(e.msg);r.fileList[t.index].viewUrl=e.data.viewUrl})},beforedelete:function(e,t){var r=t.index;this.fileList.splice(r,1)}}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"orderwrap"},[r("TopNav",{attrs:{menu:e.menutext}}),e._v(" "),r("div",{staticClass:"ordernote"},[r("van-field",{attrs:{rows:"2",autosize:"",label:"",type:"textarea",maxlength:"200",placeholder:"填写订单备注需求","show-word-limit":""},model:{value:e.remarks,callback:function(t){e.remarks=t},expression:"remarks"}}),e._v(" "),2==e.orderType?r("div",{staticClass:"imgwrap"},[r("div",{staticClass:"imgtitle"},[e._v("\r\n      上传搬家照片\r\n    ")]),e._v(" "),r("van-uploader",{attrs:{multiple:"","max-count":9,"after-read":e.afterRead,"before-delete":e.beforedelete},model:{value:e.fileList,callback:function(t){e.fileList=t},expression:"fileList"}})],1):e._e(),e._v(" "),r("van-button",{attrs:{type:"primary",size:"small",round:"",block:""},on:{click:e.messageHandler}},[e._v("确定")])],1)],1)},staticRenderFns:[]};var n=r("VU/8")(s,o,!1,function(e){r("DaJj")},"data-v-0c3fe121",null);t.default=n.exports}});
//# sourceMappingURL=21.6dae6a613cb47de1d018.js.map?v=1604380012532