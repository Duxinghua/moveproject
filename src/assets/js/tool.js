class Tool {
  transformTime (inputTime) {
    var date = new Date(inputTime)
    var m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return m + '-' + d
  }
}
export default new Tool()
