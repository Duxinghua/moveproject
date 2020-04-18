const storage = {
  setObj (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getObj (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  setStr (key, value) {
    localStorage.setItem(key, value)
  },
  getStr (key) {
    return localStorage.getItem(key)
  },
  remove (key) {
    localStorage.removeItem(key)
  },
  checkName: function (code) {
    return /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(code)
  },
  checkPhone: function (code) {
    if (!(/^1[123456789]\d{9}$/.test(code))) {
      return false
    } else {
      return true
    }
  }
}
export default storage
