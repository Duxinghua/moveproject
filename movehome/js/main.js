$(function () {
  var htmlstr = ''
  htmlstr += '<div class="flotwaps clearfix">'
  htmlstr += '<div class="floatitems">'
  htmlstr += '<img src="images/phones.png" class="floatimg" />'
  htmlstr += '</div>'
  htmlstr += '<div class="floatitems sctops">'
  htmlstr += '<img src="images/upico.png" class="floatimg" />'
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
})
