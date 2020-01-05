<template>
  <div class="index-container">
    <el-container class="content-box">
      <el-header class="index-header">
        <!-- 左侧盒子 -->
        <div class="left">
          <i class="icon el-icon-s-fold"></i>
          <img src="../../assets/logo.png" alt="" class="logo">
          <span class="title">黑马面面</span>
        </div>
        <!-- 右侧盒子 -->
        <div class="right">
          <img :src="userUrl" alt="" class="avatar">
          <span class=user>{{ userName }},您好</span>
          <el-button type="primary" size="small" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="index-aside">Aside</el-aside>
        <el-main class="index-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { info } from '../../api/login'
  export default {
    data() {
      return {
        userUrl: '',
        userName: ''
      }
    },
    created() {
      info().then(res => {
        // window.console.log(res);
        this.userName = res.data.data.username
        this.userUrl = process.env.VUE_APP_BASEURL + '/' + res.data.data.avatar
      })
    },
    methods: {
      logout() {
        window.sessionStorage.removeItem('token')
        this.$router.push('/login')
      }
    },
  }
</script>

<style lang="less">
  .index-container {
    height: 100%;
    background: rgba(232, 233, 236, 1);

    .content-box {
      height: 100%;

      .index-header {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);


        .left {
          display: flex;
          align-items: center;

          .icon {
            font-size: 24px;
            margin-right: 22px;
          }

          .logo {
            width: 33px;
            height: 28px;
            margin-right: 11px;
          }

          .title {
            font-size: 22px;
            color: #49A1FF;
          }
        }

        .right {
          display: flex;
          align-items: center;

          .avatar {
            width: 43px;
            height: 43px;
            margin-right: 9px;
          }

          .user {
            font-size: 14px;
            margin-right: 38px;
          }
        }
      }

      .index-aside {
        background-color: #fff;
      }
    }
  }
</style>