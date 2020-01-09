<template>
  <div>
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible" width="603px" center>
      <el-form :model="subjectForm" ref="subjectForm" label-width="80px" :rules="subjectRules">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="subjectForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="subjectForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="subjectForm.intro" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="subjectForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subjectAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  // import { subjectAdd } from '../../../../api/subject'
  import { subjectAdd } from '@/api/subject'
  export default {
    data() {
      return {
        subjectForm: {
          // 学科编号
          rid: '',
          // 学科名称
          name: '',
          // 学科简称
          short_name: '',
          // 学科简介
          intro: '',
          // 学科备注
          remark: '',
        },
        subjectRules: {
          rid: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        },
        dialogFormVisible: false,
      }
    },
    methods: {
      subjectAdd() {
        this.$refs.subjectForm.validate(valid => {
          if (valid) {
            subjectAdd(this.subjectForm).then(res => {
              if (res.code === 200) {
                this.$message.success('新增成功')
                this.$parent.getList()
                // 关闭对话框
                this.dialogFormVisible = false
                // 清空表单
                this.$refs.subjectForm.resetFields()
              } else if (res.code === 201) {
                this.$message.error('学科编号不能重复哦')
              }
            })
          } else {
            this.$message.error('格式不对哦')
            return false
          }
        })
      }
    },
  }
</script>
<style>
</style>