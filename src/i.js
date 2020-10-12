var isCategory = {
  flag: false, init: function () {
    var self = this; var _id = document.getElementById('sort_container'); var navbar = _id.querySelectorAll('.sort_navbar li'); var list = _id.querySelectorAll('.sort_wrap li'); var listArr = []; for (var index = 0; index < list.length; index++) { listArr.push(list[index].offsetTop); }
    for (var index = 0; index < navbar.length; index++) {
      navbar[index].setAttribute('data-index', index)
      navbar[index].addEventListener("click", function (_this) { self.handleClick(_this, navbar, listArr); });
    }
    _id.querySelector('.sort_wrap').addEventListener("touchstart", function (_this) { self.flag = true; }); window.addEventListener('scroll', function () {
      if (!self.flag) { return; }
      var _top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; if (_top >= listArr[listArr.length - 1]) { index = listArr.length - 1; } else { for (var i = 0; i < listArr.length; i++) { if (listArr[i + 1] >= _top) { index = i; break; } } }
      self.toggleClass(navbar, index < 0 ? 0 : index);
    }, false);
  }, handleClick: function (_this, _el, listArr) { var tempIndex = _this.target.dataset.index; this.flag = false; this.toggleClass(_el, tempIndex); window.scroll(0, listArr[tempIndex]) }, toggleClass: function (_el, _index) {
    for (let index = 0; index < _el.length; index++) { _el[index].classList.remove("on"); }
    _el[_index].classList.add("on");
  },
};
