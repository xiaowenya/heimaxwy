<template>
  <div class="index-container">
    <el-container class="content-box">
      <el-header class="index-header">
        <!-- 左侧盒子 -->
        <div class="left">
          <i class="icon el-icon-s-fold" @click="collapse=!collapse"></i>
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
        <!-- 宽度设为自适应 -->
        <el-aside width="auto" class="index-aside">
          <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="collapse">
            <el-menu-item index="1">
              <!-- e-charts -->
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="index-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { info, logout } from '../../api/login'
  import { removeToken } from '../../utils/token'
  export default {
    data() {
      return {
        userUrl: require('../../assets/汪汪.jpg'),
        userName: '傻子',
        collapse: false
      }
    },
    created() {
      info().then(res => {
        // window.console.log(res);
        this.userName = res.data.data.username || this.userName
        if (res.data.data.avatar) {
          this.userUrl = process.env.VUE_APP_BASEURL + '/' + res.data.data.avatar
        }
      })
    },
    methods: {
      logout() {
        this.$confirm('确认要退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          logout().then(res => {
            if (res.data.code === 200) {
              removeToken()
              this.$router.push('./login')
            }
          })
        }).catch(() => {

        })
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

      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
      }
    }
  }
</style>