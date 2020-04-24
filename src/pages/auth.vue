<template>
<div>

</div>
</template>

<script>
import Api from '@/api/index'
import getSitem from '@/utils/storage'
import Config from '@/utils/config'
export default {
  data () {

  },
  mounted () {
    const agent = navigator.userAgent
    const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isiOS) {
      getSitem.setStr('iosurl', location.href)
    }
    var code = this.GetUrlParame('code')
    var localurl = window.location.href
    var goback = encodeURIComponent(localurl)
    console.log(window.location.href)
    var appid = 'wxd2a255476bf18aec'
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + goback + '&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect'
    console.log('当前url', url)
    console.log('获取code码')
    if (!code) {
      location.href = url
    }
    var data = {
      code: code
    }
    Api.wxLogin(data).then((result) => {
      if (result.code === 1) {
        getSitem.setStr('mobile', result.data.info.mobile)
        getSitem.setStr('token', result.data.info.token)
        getSitem.setStr('openid', result.data.info.openid)
        getSitem.setStr('userid', result.data.info.user_id)
        Api.userIndex().then((result) => {
          if (result.code === 1) {
            getSitem.setStr('ispartner', result.data.is_partner)
            if (localStorage.getItem('page')) {
              location.href = localStorage.getItem('page')
            } else {
              location.href = Config.shareurls
            }
          }
        })
      }
    })
  },
  methods: {
    GetUrlParame: function (parameName) {
      var parames = window.location.search
      if (parames.indexOf(parameName) > -1) {
        var parameValue = ''
        parameValue = parames.substring(parames.indexOf(parameName), parames.length)
        if (parameValue.indexOf('&') > -1) {
          parameValue = parameValue.substring(0, parameValue.indexOf('&'))
          parameValue = parameValue.replace(parameName + '=', '')
          return parameValue
        }
        return ''
      }
    }
  }

}
</script>

<style>

</style>
