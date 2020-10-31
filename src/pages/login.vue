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
          @click="getCode"
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
import config from "@/utils/config";
import getSitem from "@/utils/storage";
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
          var token = localStorage.getItem('token')
          var tokenresult = this.decodeToken(token)
          console.log(tokenresult)

  },
  methods: {
    getCode() {
      var data = {
        mobile: this.mobile,
      };
      if (this.flag) {
        this.$api.shortmessagelogin(data).then((result) => {
          if (result.code == 200) {
            this.$toast(result.msg);
            this.flag = false;
            clearInterval(this.timeFlag);
            this.timeFlag = setInterval(() => {
              if (this.timer != 0) {
                this.timer--;
                this.timerText = this.timer + " S";
              } else {
                this.timer = 60;
                this.timerText = "获取验证码";
                clearInterval(this.timeFlag);
                this.timeFlag = null;
              }
            }, 1000);
          } else {
            this.$toast(result.msg);
          }
        });
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
          localStorage.clear()
          localStorage.setItem("token", result.data);

          this.$router.push("/");
        }
      });
    },
  },
  destroyed() {
    this.timer = 60;
    this.timerText = "获取验证码";
    clearInterval(this.timeFlag);
    this.timeFlag = null;
  },
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
  /deep/ .van-cell{
    background:transparent;
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
      border: 1px solid #28ae3a;
      margin-bottom: 40px;
      padding: 15px;
      box-sizing: border-box;
      /deep/ .van-cell{
        line-height: 1!important;
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
        font-size: 16px;
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
      font-size: 18px;
      color: white;
      margin-top: 80px;
    }
  }
}
</style>
