<template>
  <div class="invite">
    <div class="inviteitem">
      <img src="../assets/images/wxcode.png"  class="wxcode"/>
      <p>分享二维码邀请好友</p>
    </div>
    <div class="invitebutton">
      分享好友
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style scoped>
.invitebutton{
  position: fixed;
  bottom: 0;
  left:0;
  width:100%;
  height:98px;
  background:#9C3FA2;
  text-align: center;
  line-height: 98px;
  font-size: 36px;
  color:white;
  cursor: pointer;
}
.invite{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:url('../assets/images/invitebackground.png');
  background-size: 100% 100%;
  width:100vw;
  height:100vh;
}
.inviteitem{
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:448px;
    height:428px;
    background:url('../assets/images/inviteitem.png');
    background-size:100% 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.inviteitem .wxcode{
  margin-top:36px;
  width:227px;
  height:225px;
}
.inviteitem p {
  font-size:23px;
  margin-top:36px;
  color:#666
}
</style>
