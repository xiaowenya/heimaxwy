<template>
  <div class="login-container">
    <!-- 左边的盒子 -->
    <div class="left">
      <div class="title-box">
        <div class="logn"><img src="../../assets/logo.png" alt="" /></div>
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登陆</div>
      </div>
      <div class="content-box">
        <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="username" class="username">
        </el-input>
        <el-input placeholder="请输入密码" show-password prefix-icon="el-icon-lock" v-model="password" class="password">
        </el-input>
        <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="code" class="code">
        </el-input>
        <!-- `checked` 为 true 或 false -->
        <el-checkbox v-model="checked">我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link></el-checkbox>
        <el-button type="primary" class="btn">登录</el-button>
        <el-button type="primary" class="btn">注册</el-button>
      </div>
    </div>
    <!-- 右边的图片 -->
    <img src="../../assets/login_banner_ele.png" alt="" class="bg" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      username:'',
      password:'',
      code:'',
      checked: false,
    }
  }
};
</script>

<style lang="less">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 44px;
    .title-box {
      display: flex;
      align-items: center;
      margin-left: 48px;
      margin-bottom: 29px;
      .logn img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
        vertical-align: middle;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #ccc;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .content-box {
      padding-left: 43px;
      padding-right: 41px;
      .username,.password,.code {
        margin-bottom: 26px;
      }
      button {
        margin-top: 26px;
      }
      .username .el-input__inner {
        height: 45px;
      }
      .btn {
        width: 100%;
        &+.btn {
          margin-left:0;
        }
      }
    }
  }
}
</style>
