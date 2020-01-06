<template>
  <div class="subject-container">
    <!-- 表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline headerForm">
      <el-form-item label="学科编号">
        <el-input v-model="formInline.number" class="number"></el-input>
      </el-form-item>
      <el-form-item label="学科名称">
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
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button>清除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增学科</el-button>
      </el-form-item>
    </el-form>
    <div class="content-box">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="subNumber" label="学科编号" width="150">
        </el-table-column>
        <el-table-column prop="subName" label="学科名称" width="150">
        </el-table-column>
        <el-table-column prop="shortName" label="简称" width="150">
        </el-table-column>
        <el-table-column prop="creator" label="创建者" width="150">
        </el-table-column>
        <el-table-column prop="date" label="创建日期" width="150">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="150">
        </el-table-column>
        <el-table-column label="操作" width="120">
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
    </div>
    <!-- 新增学科 -->
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible" width="603px" center>
      <el-form :model="subjectForm" ref="subjectForm" label-width="80px" :rules="subjectRules">
        <el-form-item label="学科编号" prop="number">
          <el-input v-model="subjectForm.number"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称">
          <el-input v-model="subjectForm.shortName"></el-input>
        </el-form-item>
        <el-form-item label="学科简介">
          <el-input v-model="subjectForm.brief"></el-input>
        </el-form-item>
        <el-form-item label="学科备注">
          <el-input v-model="subjectForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subjectConfirm">确 定</el-button>
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
          // 学科编号
          subNumber: 'QD001',
          // 学科名称
          subName: '前端与移动开发',
          // 简称
          shortName: '前端',
          // 创建者
          creator: '任嘉伦',
          // 创建日期
          date: '2020-01-06',
          // 状态
          state: '启用'
        }],
        subjectForm: {
          // 学科编号
          number: '',
          // 学科名称
          name: '',
          // 学科简称
          shortName: '',
          // 学科简介
          brief: '',
          // 学科备注
          remark: '',
        },
        subjectRules: {
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
      onSubmit() {
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
      subjectConfirm() {

      }
    }
  }
</script>

<style lang="less">
  .subject-container {
    .headerForm {
      background-color: #fff;
      margin-bottom: 20px;
      height: 103px;
      display: flex;
      align-items: center;
      padding-left: 23px;
      box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
      border-radius: 4px;

      .number .el-input__inner,
      .creator .el-input__inner {
        width: 100px;
      }

      .name .el-input__inner,
      .state .el-input__inner {
        width: 150px;
      }

      .el-form-item {
        margin-bottom: 0;
      }
    }

    .content-box {
      padding-left: 23px;
      background-color: #fff;
      box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
      border-radius: 4px;

      .el-pagination {
        text-align: center;
        padding-top: 30px;
        padding-bottom: 22px;
      }
    }

    .el-dialog__header {
      background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
    }
  }
</style>