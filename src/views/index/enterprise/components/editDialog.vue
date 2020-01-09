<template>
  <div>
    <el-dialog title="新增企业" :visible.sync="dialogFormVisible" width="603px" center>
      <el-form :model="editForm" ref="editForm" label-width="80px" :rules="editRules">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="editForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="editForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="editForm.intro" type="textarea" rows="2"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterpriseEdit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import { enterpriseEdit } from '@/api/enterprise'
  export default {
    name: 'EditDialog',
    data() {
      return {
        editForm: {
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
        editRules: {
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
      enterpriseEdit() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            enterpriseEdit(this.editForm).then(res => {
              if (res.code === 200) {
                this.$message.success('编辑成功')
                // 关闭对话框
                this.dialogFormVisible = false
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