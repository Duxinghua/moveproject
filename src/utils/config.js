var url = 'https://youmengtest.qixiuu.com'
var pro = 'dev'
if (pro == 'dev') {
  url = 'https:///mini.huobanban.com.cn'
}
const config = {
  apiurl:'https:///mini.huobanban.com.cn:8184',
  appid: 'wx5f3a575e5a1d7875',
  baseurl: url + '/index.html#',
  shareurls: url + '/index.html#/login',
  gourl: url + '/statics/html/redirect.html?app3Redirect='
}

export default config
