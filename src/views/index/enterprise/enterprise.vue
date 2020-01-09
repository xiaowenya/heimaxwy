<template>
  <div class="enterprise-container">
    <!-- 表单 -->
    <el-card class="header-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item prop="eid" label="企业编号">
          <el-input v-model="formInline.eid" class="small"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="企业名称">
          <el-input v-model="formInline.name" class="normal"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="创建者">
          <el-input v-model="formInline.username" class="small"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态" class="normal">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchEnterprise">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearQuery">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.dialogFormVisible = true">新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="content-box">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="eid" label="企业编号">
        </el-table-column>
        <el-table-column prop="name" label="企业名称">
        </el-table-column>
        <el-table-column prop="short_name" label="简称">
        </el-table-column>
        <el-table-column prop="username" label="创建者">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="changeStatus(scope.row)">
              {{scope.row.status==0?'启用':'禁用'}}
            </el-button>
            <el-button type="text" size="small" @click="removeEnterprise(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 新增企业 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 编辑企业 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
  import addDialog from './components/addDialog'
  import editDialog from './components/editDialog'
  import { enterpriseList, enterpriseStatus, enterpriseRemove } from '@/api/enterprise'
  export default {
    name: 'enterprise',
    data() {
      return {
        formInline: {
          eid: '',
          name: '',
          username: '',
          create_time: '',
          status: ''
        },
        tableData: [{
          // 企业编号
          eid: 'QD001',
          // 企业名称
          name: '黑马程序员',
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
        pageSize: 2,
        pageSizes: [2, 5, 10, 16, 22],
        total: 20
      }
    },
    methods: {
      onepmit() {
      },
      handleClick(row) {
        window.console.log(row);
      },
      // 改变页容量
      handleSizeChange(val) {
        // window.console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.currentPage = 1
        this.getList()
      },
      // 改变当前页数
      handleCurrentChange(val) {
        // window.console.log(`当前页: ${val}`);
        this.currentPage = val
        this.getList()
      },
      // 查询企业
      searchEnterprise() {
        this.getList()
      },
      // 清除查询
      clearQuery() {
        this.$refs.formInline.resetFields()
        this.getList()
      },
      // 修改状态
      changeStatus(item) {
        enterpriseStatus({ id: item.id }).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.getList()
          }
        })
      },
      // 删除企业
      removeEnterprise(item) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          enterpriseRemove({ id: item.id }).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              if (this.tableData.length == 1) {
                this.currentPage--
                if (this.currentPage == 0) {
                  this.currentPage = 1
                }
              }
              this.getList()
            }
          })
        }).catch(() => { });
      },
      // 编辑企业 
      editClick(item) {
        this.$refs.editDialog.dialogFormVisible = true
        this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item))
      },
      // 企业列表接口
      getList() {
        enterpriseList({
          page: this.currentPage,
          limit: this.pageSize,
          ...this.formInline
        }).then(res => {
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
    components: {
      addDialog,
      editDialog
    }
  }
</script>

<style lang="less">
  .enterprise-container {
    .header-card {
      margin-bottom: 20px;

      .small {
        width: 100px;
      }

      .normal {
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