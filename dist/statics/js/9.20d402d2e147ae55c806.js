webpackJsonp([9],{"7USG":function(e,t){},bzuE:function(e,t,n){"use strict";var a="https://youmengwx.qixiuu.com";var o={appid:"wxd2a255476bf18aec",baseurl:a+"/index.html#",shareurls:a+"/index.html#/",gourl:a+"/statics/html/redirect.html?app3Redirect="};t.a=o},r8n2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("gyMJ"),o=n("VKKs"),r=n("bzuE"),i={data:function(){},mounted:function(){!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&&o.a.setStr("iosurl",location.href);var e=this.GetUrlParame("code"),t=window.location.href,n=encodeURIComponent(t);console.log(window.location.href);var i="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd2a255476bf18aec&redirect_uri="+n+"&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect";console.log("当前url",i),console.log("获取code码"),e||(location.href=i);var c={code:e};a.a.wxLogin(c).then(function(e){1===e.code&&(o.a.setStr("mobile",e.data.info.mobile),o.a.setStr("token",e.data.info.token),o.a.setStr("openid",e.data.info.openid),o.a.setStr("userid",e.data.info.user_id),a.a.userIndex().then(function(e){1===e.code&&(o.a.setStr("ispartner",e.data.is_partner),localStorage.getItem("page")?location.href=localStorage.getItem("page"):location.href=r.a.shareurls)}))})},methods:{GetUrlParame:function(e){var t=window.location.search;if(t.indexOf(e)>-1){var n="";return(n=t.substring(t.indexOf(e),t.length)).indexOf("&")>-1?n=(n=n.substring(0,n.indexOf("&"))).replace(e+"=",""):""}}}},c={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};var s=n("VU/8")(i,c,!1,function(e){n("7USG")},null,null);t.default=s.exports}});
//# sourceMappingURL=9.20d402d2e147ae55c806.js.map?v=1602519544087