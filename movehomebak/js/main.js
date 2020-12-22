$(function () {
  var htmlstr = ''
  htmlstr += '<div class="flotwaps clearfix">'
  htmlstr += '<div class="floatitems">'
  htmlstr += '<img src="images/phones.png" class="floatimg" />'
  htmlstr += '<a  href="http://wpa.qq.com/msgrd?v=3&uin=2559374579&site=qq&menu=yes" target="_blank" class="qqwrap">'
  htmlstr += '<img src="images/qqico.png" class="qqicos" />'
  htmlstr += '<div class="qqwraptext">'
  htmlstr += '2559374579'
  htmlstr += '</div>'
  htmlstr += '</a>'
  htmlstr += '</div>'
  htmlstr += '<div class="floatitems sctops">'
  htmlstr += '<img src="images/upico.png" class="floatimg floatimg1" />'
  htmlstr += '</div>'
  htmlstr += '</div>'
  $('body').append(htmlstr)
  var four;
  function Topfun() {
    four = setInterval(FourscrollBy, 10);
  }
  function FourscrollBy(eachHeight) {
    if (document.documentElement && document.documentElement.scrollTop) //IE
    {
      if (document.documentElement.scrollTop <= 0) {
        clearInterval(four);
      } else {
        window.scrollBy(0, -30);
      }
    } else { //Chrome不支持documentElement.scrollTop
      if (document.body.scrollTop <= 0) {
        clearInterval(four);
      } else {
        window.scrollBy(0, -30);
      }
    }
  }
  $(document).on('click','.sctops',function(){
    Topfun()
  })
  var submitHTML = ''
  submitHTML += '<div class="submenu">'
  submitHTML += '<a href="./about.html">联系我们</a>'
  submitHTML += '<a href="./message.html">在线留言</a>'
  submitHTML += '</div>'
  $('.menuul li:last-child').append(submitHTML)


        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var s = width / 1920
                if(width > 1200){
                  if ($('#home-banner').hasClass('home-banner')){
                    $(".home-banner").css({'width':width,'height':s*700})
                    $(".home-banner .swiper-container").css({'width':width,'height':s*700})
                  }
                  if ($('#home-banner').hasClass('fei-banner')){
                      $(".home-banner").css({'width':width,'height':s*500})
                      $(".home-banner .swiper-container").css({'width':width,'height':s*500})
                  }
                }else{
                   if ($('#home-banner').hasClass('home-banner')){
                     $(".home-banner").css({'width':1200,'height':s*700})
                     $(".home-banner .swiper-container").css({'width':1200,'height':s*700})
                   }
                    if ($('#home-banner').hasClass('fei-banner')){
                      $(".home-banner").css({'width':1200,'height':s*500})
                      $(".home-banner .swiper-container").css({'width':1200,'height':s*500})
                  }
                }
                window.onresize = function(){
                    var falseFlag = false
                    if(!falseFlag){
                        falseFlag = true
                        setTimeout(function(){
                            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                            var s = width / 1920
                               if(width > 1200){
                                  if ($('#home-banner').hasClass('home-banner')){
                                      $(".home-banner").css({'width':width,'height':s*700})
                                      $(".home-banner .swiper-container").css({'width':width,'height':s*700})
                                  }
                                  if ($('#home-banner').hasClass('fei-banner')){
                                      $(".home-banner").css({'width':width,'height':s*500})
                                      $(".home-banner .swiper-container").css({'width':width,'height':s*500})
                                  }
                               }else{
                                 if ($('#home-banner').hasClass('home-banner')){
                                    $(".home-banner").css({'width':1200,'height':s*700})
                                    $(".home-banner .swiper-container").css({'width':1200,'height':s*700})
                                 }
                                 if ($('#home-banner').hasClass('fei-banner')){
                                      $(".home-banner").css({'width':1200,'height':s*500})
                                      $(".home-banner .swiper-container").css({'width':1200,'height':s*500})
                                  }
                               }
                            falseFlag = false
                        }, 300)
                    }
                }
})
