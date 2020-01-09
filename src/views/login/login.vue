<template>
  <div class="login-container">
    <!-- 左边的盒子 -->
    <div class="left">
      <div class="title-box">
        <div class="logo"><img src="../../assets/logo.png" alt="" /></div>
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
        <el-form-item class="url-box">
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="login-btn reset-btn" type="primary" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <div class="right">
      <img src="../../assets/login_banner_ele.png" alt="" class="bg" />
    </div>
    <!-- 注册对话框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" class="register-dialog">
      <el-form :model="regForm" :rules="rules" ref="regForm" label-width="60px" class="demo-ruleForm">
        <!-- 头像 -->
        <el-form-item label="头像" prop="avatar">
          <el-upload class="avatar-uploader" :action="upLoadURL" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name="image">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input v-model="regForm.avatar" type="hidden"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="username">
          <el-input v-model="regForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" prop="phone">
          <el-input v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="regForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img class="captcha" :src="regActions" @click="randomRegisterCaptcha" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.rcode" autocomplete="off">
              </el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="getMessage" :disabled="delayTime != 0">{{ btnMessage }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegForm('regForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { saveToken } from '../../utils/token'
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
  // 定义验证邮箱的方法
  const validateEmail = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("邮箱不能为空"));
    } else {
      // 定义正则 正则  对象
      const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      // 验证
      if (reg.test(value) == true) {
        // 对
        callback();
      } else {
        // 错
        callback(new Error("邮箱格式错误"));
      }
    }
  };
  import {
    login,
    sendsms,
    register
  } from '../../api/login'
  export default {
    data() {
      return {
        imageUrl: '',
        upLoadURL: process.env.VUE_APP_BASEURL + '/uploads',
        dialogFormVisible: false,
        // formLabelWidth: '120px',
        codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
        regActions: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
        ruleForm: {
          phone: "",
          password: "",
          code: "",
          checked: false,
        },
        rules: {
          email: [{
            required: true,
            validator: validateEmail,
            trigger: "blur"
          }],
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
            message: "验证码不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "长度在必须为4",
            trigger: "change"
          }
          ],
          avatar: [{
            required: true,
            message: "头像不能为空",
            trigger: "change"
          }],
          username: [{
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }],
          rcode: [{
            min: 4,
            max: 4,
            message: "长度在必须为4",
            trigger: "change"
          }]
        },
        regForm: {
          phone: "",
          username: "",
          rcode: "",
          avatar: "",
          password: "",
          // 图形验证码
          code: "",
          email: ''
        },
        // 定义按钮的文本
        btnMessage: "获取用户验证码",
        // 定义倒计时的时间
        delayTime: 0,
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
            login(this.ruleForm).then(res => {
              window.console.log(res)
              if (res.data.code == 201) {
                this.$message.error(res.data.message)
              } else if (res.data.code == 200) {
                this.$message.success('登录成功')
                // window.sessionStorage.token = res.data.data.token
                // window.console.log(res.data.data.token)

                // 保存token
                saveToken(res.data.data.token)
                
                this.$router.push('/index')
              }
            })
          } else {
            this.$message.error("格式不对哦，检查一下呗！");
            return false;
          }
        });
      },
      submitRegForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // this.$message.success("验证成功");
            register(this.regForm).then(res => {
              if (res.data.code == 201) {
                this.$message.error(res.data.message)
              } else if (res.data.code == 200) {
                this.$message.success('注册成功,请登录')
                this.dialogFormVisible = false
                this.$refs.regForm.resetFields()
                this.imageUrl = ''
              }
            })
          } else {
            this.$message.error("格式不对哦，检查一下呗！");
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // window.console.log(res)
        this.regForm.avatar = res.data.file_path
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      randomRegisterCaptcha() {
        // 通过时间戳来重新获取验证码
        this.regActions = `${
          process.env.VUE_APP_BASEURL
          }/captcha?type=sendsms&t=${Date.now()}`;
      },
      getMessage() {
        // 手机号
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(this.regForm.phone) == false) {
          return this.$message.error("小老弟，手机号不太对哦！！！");
        }
        // 图片验证码
        if (this.regForm.code.length != 4) {
          return this.$message.error("小老弟，图形验证码不太对哦！！！");
        }
        // 如果没有倒计时 开启
        if (this.delayTime === 0) {
          // 改成60
          this.delayTime = 60;
          // 判断 一些值
          const interId = setInterval(() => {
            // 递减
            this.delayTime--;
            // 修改显示的文本
            this.btnMessage = `还剩下${this.delayTime}秒哦！`;
            if (this.delayTime === 0) {
              // 倒计时结束
              // 清除定时器
              clearInterval(interId);
              // 还原文本
              this.btnMessage = "获取用户验证码";
            }
          }, 100);
        } else {
          // 正在倒计时中
          return;
        }
        // 调用接口
        sendsms({
          code: this.regForm.code,
          phone: this.regForm.phone,
        }).then(res => {
          // window.console.log(res)
          if (res.data.code == 200) {
            this.$message.success("短信验证码是:" + res.data.data.captcha)
          }
        })
      }
    }
  };
</script>

<style lang="less">
  .login-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: linear-gradient(to right, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
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

        .logo img {
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

        /* 栅格 验证码 */
        .code-col {
          height: 40px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        /* 更高的文本框 */
        .high-input>input {
          height: 45px;
          line-height: 45px;
        }
      }

      /* 表单内部的 按钮 */
      .login-btn {
        width: 100%;
        margin-left: 0;
      }

      .reset-btn {
        margin-top: 28px;
      }

      .url-box {
        .el-checkbox {
          display: flex;
          align-items: center;

          .el-checkbox__label {
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .register-dialog {
      .el-dialog {
        width: 600px;
      }

      .captcha {
        width: 100%;
      }

      .avatar-uploader {
        display: flex;
        justify-content: center;
      }

      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }

      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }

      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }

      .dialog-footer {
        display: flex;
        justify-content: center
      }
    }
  }
</style>