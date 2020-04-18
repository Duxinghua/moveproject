<template>
  <div>
    <button @click="test">测试</button>
  </div>
</template>

<script>
import getSitem from '@/utils/storage'
export default {
  methods: {
    test () {
      alert(getSitem.getStr('mobile'))
      alert(getSitem.getStr('token'))
      getSitem.remove('token')
      getSitem.remove('mobile')
      localStorage.clear()
    }
  }
}
</script>

<style>

</style>
