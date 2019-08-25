<template>
    <div class="pagetab">
      <img src="../assets/images/prev.png" />
      <img src="../assets/images/next.png" />
    </div>
</template>

<script>
export default {

}
</script>

<style>
.pagetab{
  position: fixed;
  left:0;
  bottom: 0;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background:#FFFFFF;
  height:98px;
  border-top:1px solid rgba(227, 227, 227, 1);
}
.pagetab img{
  width:19px;
  height:34px;
}
.pagetab img:first-child{
  margin-right:77px;
}
.pagetab img:last-child{
  margin-left:77px;
}
</style>
