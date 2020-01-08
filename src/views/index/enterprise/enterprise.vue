<template>
  <div class="enterprise-container">
    <!-- 表单 -->
    <el-card class="header-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.number" class="number"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.name" class="name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creator" class="creator"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="state">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onepmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="content-box">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="epNumber" label="企业编号">
        </el-table-column>
        <el-table-column prop="epName" label="企业名称">
        </el-table-column>
        <el-table-column prop="shortName" label="简称">
        </el-table-column>
        <el-table-column prop="creator" label="创建者">
        </el-table-column>
        <el-table-column prop="date" label="创建日期">
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
    <!-- 新增企业 -->
    <el-dialog title="新增企业" :visible.sync="dialogFormVisible" width="603px" center>
      <el-form :model="enterpriseForm" ref="enterpriseForm" label-width="80px" :rules="enterpriseRules">
        <el-form-item label="企业编号" prop="number">
          <el-input v-model="enterpriseForm.number"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="enterpriseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称">
          <el-input v-model="enterpriseForm.shortName"></el-input>
        </el-form-item>
        <el-form-item label="企业简介">
          <el-input v-model="enterpriseForm.brief"></el-input>
        </el-form-item>
        <el-form-item label="企业备注">
          <el-input v-model="enterpriseForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterpriseConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [{
          // 企业编号
          epNumber: 'QD001',
          // 企业名称
          epName: '黑马程序员',
          // 简称
          shortName: '前端',
          // 创建者
          creator: '任嘉伦',
          // 创建日期
          date: '2020-01-06',
          // 状态
          state: '启用'
        }],
        enterpriseForm: {
          // 企业编号
          number: '',
          // 企业名称
          name: '',
          // 企业简称
          shortName: '',
          // 企业简介
          brief: '',
          // 企业备注
          remark: '',
        },
        enterpriseRules: {
          number: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        },
        dialogFormVisible: false,
        currentPage: 2,
        pageSize: 3,
        pageSizes: [5, 10, 16, 22]
      }
    },
    methods: {
      onepmit() {
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
      enterpriseConfirm() {

      }
    }
  }
</script>

<style lang="less">
  .enterprise-container {
    .header-card {
      margin-bottom: 20px;

      .number .el-input__inner,
      .creator .el-input__inner {
        width: 100px;
      }

      .name .el-input__inner,
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