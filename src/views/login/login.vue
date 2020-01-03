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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="43px" class="demo-ruleForm login-form">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input class="high-input" prefix-icon="el-icon-user" v-model="ruleForm.phone" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input show-password prefix-icon="el-icon-lock" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <!-- 验证码 -->
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col class="code-col" :span="6">
              <!-- 一部分 -->
              <!-- <img src="../../assets/code.jpg" alt="" /> -->
              <img :src="codeUrl" alt="" @click="getUrl" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="login-btn reset-btn" type="primary" @click="resetForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img src="../../assets/login_banner_ele.png" alt="" class="bg" />
  </div>
</template>

<script>
  // 定义验证手机号的方法
  const validatePhone = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("手机号不能为空"));
    } else {
      // 定义正则 正则  对象
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      // 验证
      if (reg.test(value) == true) {
        // 对
        callback();
      } else {
        // 错
        callback(new Error("小老弟，手机号，写错了哟 O(∩_∩)O哈哈~"));
      }
    }
  };
  export default {
    data() {
      return {
        codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
        ruleForm: {
          phone: "",
          password: "",
          code: "",
          checked: false,
        },
        rules: {
          phone: [{
            required: true,
            validator: validatePhone,
            trigger: "blur"
          }],
          password: [{
              required: true,
              message: "密码不能为空",
              trigger: "blur"
            },
            {
              min: 6,
              max: 20,
              message: "长度在 6 到 20 个字符",
              trigger: "change"
            }
          ],
          code: [{
              required: true,
              message: "验证码",
              trigger: "blur"
            },
            {
              min: 4,
              max: 4,
              message: "长度在必须为4",
              trigger: "change"
            }
          ]
        }
      };
    },
    methods: {
      getUrl() {
        this.codeUrl = process.env.VUE_APP_BASEURL + "/captcha?type=login&_t=" + Math.random() * 999
      },
      submitForm(formName) {
        if (this.ruleForm.checked == false) {
          this.$message.error('请先勾选用户协议')
          return
        }
        // 等同于 this.$refs.ruleForm
        this.$refs[formName].validate(valid => {
          if (valid) {
            // this.$message.success("验证成功");
            this.$axios({
              url: process.env.VUE_APP_BASEURL + '/login',
              method: 'post',
              withCredentials: true,
              data: {
                "phone": this.ruleForm.phone,
                "password": this.ruleForm.password,
                "code": this.ruleForm.code
              },
              // params: { 'get请求参数'}
            }).then(res => {
              //成功回调
              // window.console.log(res)
              if(res.data.code==201) {
                this.$message.error(res.data.message)
              } else if(res.data.code==200) {
                this.$message.success('登录成功')
              }
            });
          } else {
            this.$message.error("格式不对哦，检查一下呗！");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style lang="less" scoped>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: linear-gradient(225deg,
        rgba(20, 147, 250, 1),
        rgba(1, 198, 250, 1));
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

      .login-form {
        padding-right: 41px;
        margin-top: 27px;

        // 栅格 验证码
        .code-col {
          height: 40px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        // 更高的文本框
        .high-input>input {
          height: 45px;
          line-height: 45px;
        }
      }

      // 表单内部的 按钮
      .login-btn {
        width: 100%;
        margin-left: 0;
      }

      .reset-btn {
        margin-top: 28px;
      }
    }
  }
</style>