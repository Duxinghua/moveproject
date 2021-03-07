<template>
  <div class="content">
    <div class="loginwrap">
      <div class="logintitle">登录</div>
      <div class="inputwrap">
        <img
          src="../assets/images/mobile.png"
          class="loginico"
        />
        <van-field
          v-model="mobile"
          type="number"
          placeholder="请输入手机号"
        />
      </div>
      <div class="inputcode">
        <div class="inputwrap codewrap">
          <img
            src="../assets/images/code.png"
            class="loginico"
          />
          <van-field
            v-model="code"
            type="number"
            placeholder="请输入验证码"
          />
        </div>
        <div
          class="codebtns"
          @click.stop="getCode"
        >
          {{timerText}}
        </div>
      </div>
      <div
        class="inputloginbtn"
        @click="loginHandler"
      >
        登录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      timer: 60,
      timeFlag: null,
      timerText: "获取验证码",
      mobile: "",
      code: "",
      flag: true,
    };
  },
  mounted() {
    // 区分微信
    if (
      window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
      "micromessenger"
    ) {
      localStorage.setItem("isWeixin", 1);
      if(!localStorage.getItem('openid')){
        this.$router.push("/auth");
      }
    } else {
      localStorage.setItem("isWeixin", 2);
    }
  },
  methods: {
    getCode() {
      var data = {
        mobile: this.mobile,
      };
      if (!/^1[0-9]{10}$/.test(this.mobile)) {
        this.mobile = "";
        return this.$toast("请输入正确的手机号");
      }
      if (this.flag) {
        this.flag = false;
        this.$api.shortmessagelogin(data).then((result) => {
          if (result.code == 200) {
            this.$toast(result.msg);
            clearInterval(this.timeFlag);
            this.timeFlag = setInterval(() => {
              if (this.timer != 0) {
                this.timer--;
                this.timerText = this.timer + " S";
              } else {
                this.timer = 60;
                this.flag = true;
                this.timerText = "获取验证码";
                clearInterval(this.timeFlag);
                this.timeFlag = null;
              }
            }, 1000);
          } else {
           return  this.$toast(result.msg);
          }
        });
      } else {
        return  this.$toast("一分钟之内只能发一次");
      }
    },
    loginHandler() {
      var data = {
        mobile: this.mobile,
        validateCode: this.code,
      };
      this.$api.loginByMobileAndVlidateCode(data).then((result) => {
        if (result.code == 200) {
          this.$toast(result.msg);
          localStorage.setItem("token", result.data);
          var tokenresult = this.decodeToken(result.data);
          localStorage.setItem("payload", JSON.stringify(tokenresult.payload));
          localStorage.setItem("sCar", 0);
          this.timer = 60;
          this.timerText = "获取验证码";
          clearInterval(this.timeFlag);
          this.flag = true;
          setTimeout(()=>{
            this.$router.push("/");
          },500)
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url("../assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
  z-index: 100;
  /deep/ .van-cell {
    background: transparent;
  }
  .loginwrap {
    display: flex;
    flex-direction: column;
    width: 530px;
    .logintitle {
      color: #28ae3a;
      font-size: 42px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 120px;
    }
    .inputwrap {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 90px;
      border-radius: 10px;
      border: 2px solid #28ae3a;
      margin-bottom: 40px;
      padding: 15px;
      box-sizing: border-box;
      /deep/ .van-cell {
        line-height: 1 !important;
      }
      .loginico {
        width: 40px;
        height: 40px;
        margin-right: 15px;
      }
    }
    .inputcode {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      .codewrap {
        width: 320px;
        margin-right: 40px;
        margin-bottom: 0px;
      }
      .codebtns {
        width: 170px;
        height: 90px;
        border-radius: 10px;
        font-size: 30px;
        background: #28ae3a;
        line-height: 90px;
        color: white;
        text-align: center;
      }
    }
    .inputloginbtn {
      width: 100%;
      height: 90px;
      border-radius: 10px;
      line-height: 90px;
      background: #28ae3a;
      text-align: center;
      font-size: 32px;
      color: white;
      margin-top: 80px;
    }
  }
}
</style>
