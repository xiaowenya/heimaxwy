<template>
  <div>
    <el-dialog title="新增企业" :visible.sync="dialogFormVisible" width="603px" center>
      <el-form :model="addForm" ref="addForm" label-width="80px" :rules="addRules">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="addForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="addForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="addForm.intro" type="textarea" rows="2"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterpriseAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import { enterpriseAdd } from '@/api/enterprise'
  export default {
    name: 'addDialog',
    data() {
      return {
        addForm: {
          // 企业编号
          eid: '',
          // 企业名称
          name: '',
          // 企业简称
          short_name: '',
          // 企业简介
          intro: '',
          // 企业备注
          remark: '',
        },
        addRules: {
          // 企业编号
          eid: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
          // 企业名称
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          // 企业简称
          short_name: [{ required: true, message: '简称不能为空', trigger: 'blur' }],
          // 企业简介
          intro: [{ required: true, message: '简介不能为空', trigger: 'blur' }],
        },
        dialogFormVisible: false,
      }
    },
    methods: {
      enterpriseAdd() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            enterpriseAdd(this.addForm).then(res => {
              if (res.code === 200) {
                this.$message.success('新增成功')
                // 关闭对话框
                this.dialogFormVisible = false
                // 清空(重置)表单
                this.$refs.addForm.resetFields()
                this.$parent.getList()
              } else if (res.code === 201) {
                this.$message.error('企业编号已存在,换一个哦')
              }
            })
          } else {
            this.$message.error('格式不对哦')
          }
        })
      }
    },
  }
</script>