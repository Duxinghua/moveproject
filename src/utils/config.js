var url = 'https://youmengwx.qixiuu.com'
var pro = 'dev'
if (pro == 'dev') {
  url = 'https://youmengtest.qixiuu.com'
}
const config = {
  appid: 'wxd2a255476bf18aec',
  baseurl: url + '/index.html#',
  shareurls: url + '/index.html#/',
  gourl: url + '/statics/html/redirect.html?app3Redirect='
}

export default config
