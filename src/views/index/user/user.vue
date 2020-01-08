<template>
  <div class="user-container">
    <!-- 表单 -->
    <el-card class="header-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.name" class="name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.email" class="email"></el-input>
        </el-form-item>
        <el-form-item label="角色" class="state">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onusermit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-box">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" max-height="250" border>
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="userName" label="用户名">
        </el-table-column>
        <el-table-column prop="userPhone" label="电话">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="role" label="角色">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="state" label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="60">
      </el-pagination>
    </el-card>
    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="603px" center>
      <el-form :model="userForm" ref="userForm" label-width="80px" :rules="userRules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="userForm.role"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="userForm.state"></el-input>
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input v-model="userForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          email: '',
          region: '',
          name: '',
        },
        tableData: [{
          // 用户名
          userName: 'QD001',
          // 电话
          userPhone: '前端与移动开发',
          // 邮箱
          email: '前端',
          // 角色
          role: '任嘉伦',
          // 备注
          remark: '2020-01-06',
          // 状态
          state: '启用'
        }],
        userForm: {
          // 用户名
          name: '',
          // 邮箱
          email: '',
          // 电话
          phone: '',
          // 角色
          role: '',
          // 状态
          state: '',
          // 用户备注
          remark: ''
        },
        userRules: {
          name: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
          email: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          phone: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          role: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        },
        dialogFormVisible: false,
        currentPage: 2,
        pageSize: 3,
        pageSizes: [5, 10, 16, 22]
      }
    },
    methods: {
      onusermit() {
      },
      handleClick(row) {
        window.console.log(row);
      },
      handleSizeChange(val) {
        window.console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        window.console.log(`当前页: ${val}`);
      },
      userConfirm() {

      }
    }
  }
</script>

<style lang="less">
  .user-container {
    .header-card {
      margin-bottom: 20px;

      .name .el-input__inner {
        width: 100px;
      }

      .email .el-input__inner,
      .state .el-input__inner {
        width: 150px;
      }
    }

    .content-box {
      .el-pagination {
        text-align: center;
        padding-top: 30px;
      }
    }
  }
</style>