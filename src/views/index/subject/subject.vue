<template>
  <div class="subject-container">
    <!-- 表单 -->
    <el-card class="header-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid" class="rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name" class="name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username" class="username"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="status" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubject">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearQuery">清除</el-button>
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
            <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="changeStatus(scope.row)">
              {{scope.row.status==0?'启用':'禁用'}}
            </el-button>
            <el-button type="text" size="small" @click="removeSubject(scope.row)">删除
            </el-button>
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
    <!-- 编辑学科 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
  import addDialog from './components/addDialog'
  import editDialog from './components/editDialog'
  import { subjectList, subjectStatus, subjectRemove } from '@/api/subject'
  export default {
    name: 'subject',
    data() {
      return {
        formInline: {
          rid: '',
          name: '',
          username: '',
          create_time: '',
          status: ''
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
        pageSize: 2,
        pageSizes: [2, 5, 10, 16, 22],
        total: 60
      }
    },
    components: {
      addDialog,
      editDialog
    },
    methods: {
      // 修改状态
      changeStatus(item) {
        // window.console.log(item);
        subjectStatus({ id: item.id }).then(res => {
          if (res.code == 200) {
            this.$message.success('修改成功')
            this.getList()
          }
        })
      },
      // 删除学科
      removeSubject(item) {
        this.$confirm('确认要删除么?', '友情提示', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          subjectRemove({ id: item.id }).then(res => {
            if (res.code == 200) {
              this.$message.success('删除成功')
              this.getList()
            }
          })
        }).catch(() => { });
      },
      // 改变当前页容量
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
      // 点击搜索
      searchSubject() {
        this.getList()
      },
      // 清空搜索
      clearQuery() {
        this.$refs.formInline.resetFields()
        this.getList()
      },
      // 编辑学科
      editClick(item) {
        this.$refs.editDialog.dialogFormVisible = true
        this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item))
      },
      // 列表接口
      getList() {
        subjectList({
          // 页码
          page: this.currentPage,
          // 页容量
          limit: this.pageSize,
          ...this.formInline
        }).then(res => {
          // window.console.log(res)
          if (res.code === 200) {
            this.tableData = res.data.items
            // for (var i = 0; i < this.tableData.length; i++) {
            //   this.tableData[i].create_time = this.tableData[i].create_time.split(' ')[0]
            // }
            this.tableData.forEach((item) => {
              item.create_time=item.create_time.split(' ')[0]
            })
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

      .rid .el-input__inner,
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