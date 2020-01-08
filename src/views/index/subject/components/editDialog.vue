<template>
  <div>
    <el-dialog title="编辑学科" :visible.sync="dialogFormVisible" width="603px" center>
      <el-form :model="editForm" ref="editForm" label-width="80px" :rules="editRules">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="editForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="editForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="editForm.intro" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subjectEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { subjectEdit } from '@/api/subject'
  export default {
    data() {
      return {
        editForm: {
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
        editRules: {
          rid: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        },
        dialogFormVisible: false,
      }
    },
    methods: {
      subjectEdit() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            subjectEdit(this.editForm).then(res => {
              if (res.code === 200) {
                this.$message.success('编辑成功')
                this.$parent.getList()
                // 关闭对话框
                this.dialogFormVisible = false
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