<template>
  <div class="subject-container">
    <!-- 表单 -->
    <el-card class="header-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.number" class="number"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.name" class="name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.username" class="username"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="status">
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
          <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.dialogFormVisible = true">新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-box">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号">
        </el-table-column>
        <el-table-column prop="name" label="学科名称">
        </el-table-column>
        <el-table-column prop="short_name" label="简称">
        </el-table-column>
        <el-table-column prop="username" label="创建者">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="changeStatus(scope.row)">
              {{scope.row.status==0?'启用':'禁用'}}
            </el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 新增学科 -->
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
  import addDialog from './components/addDialog'
  import { subjectList, subjectStatus } from '@/api/subject'
  export default {
    name: 'subject',
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [{
          // 学科编号
          rid: 'QD001',
          // 学科名称
          name: '前端与移动开发',
          // 简称
          short_name: '前端',
          // 创建者
          username: '任嘉伦',
          // 创建日期
          create_time: '2020-01-06',
          // 状态
          status: '启用'
        }],
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5, 10, 16, 22],
        total: 60
      }
    },
    components: {
      addDialog
    },
    methods: {
      onSubmit() {
      },
      handleClick(row) {
        window.console.log(row);
      },
      changeStatus(item) {
        // window.console.log(item);
        subjectStatus({ id: item.id }).then(res => {
          if (res.code == 200) {
            this.$message.success('修改成功')
            this.getList()
          }
        })
      },
      handleSizeChange(val) {
        window.console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        window.console.log(`当前页: ${val}`);
      },
      getList() {
        subjectList({
          // 页码
          page: this.currentPage,
          // 页容量
          limit: this.pageSize
        }).then(res => {
          // window.console.log(res)
          if (res.code === 200) {
            this.tableData = res.data.items
            this.total = res.data.pagination.total
          }
        })
      }
    },
    created() {
      this.getList()
    },
  }
</script>

<style lang="less">
  .subject-container {
    .header-card {
      margin-bottom: 20px;

      .number .el-input__inner,
      .username .el-input__inner {
        width: 100px;
      }

      .name .el-input__inner,
      .status .el-input__inner {
        width: 150px;
      }
    }

    .content-box {
      .el-pagination {
        text-align: center;
        padding-top: 30px;
      }

      .red {
        color: #ff3d3d;
      }
    }
  }
</style>