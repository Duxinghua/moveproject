
$.extend({
  host:'http://106.52.164.64:8183/',
  cityName:''
});

(function ($) {
  $.getUrlParam = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
  }
})(jQuery);
