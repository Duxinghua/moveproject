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
    var appid = 'wx4b4608ff44b127cb'
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + goback + '&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect'
    console.log('当前url', url)
    console.log('获取code码')
    if (!code) {
      location.href = url
    }
    var data = {
      code: code
    }
    console.log(JSON.stringify(code))
    Api.getOfficeOpenId(data).then((result) => {
      if(result.code == 200){
        localStorage.setItem('openid',result.data)
        if(localStorage.getItem('token')){
          this.$router.push('/')
        }else{
          this.$router.push('/login')
        }
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
