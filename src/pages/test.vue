<template>
  <div>
        <!-- 时间 -->
    <van-popup
      v-model="dateShow"
      closeable
      overlay
      round
      position="bottom"
    >
    <van-datetime-picker  class="my-van-popup"  @change="dateChangeHandler" @confirm="dateConfirmHandler" @cancel="dateCancelHandler"
      v-model="currentDate"
      type="date"
      :formatter="formatter"
      show-toolbar
    />
    </van-popup>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
