<template>
    <div class="container">
      <el-form :model="myAccount" ref="editForm">
        <el-form-item label="Username"  prop="username" label-width="100px">
          <el-input v-model="myAccount.username" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="Created At"  prop="created" label-width="100px">
          <el-input v-model="myAccount.created" autocomplete="off" readonly></el-input>
        </el-form-item>
      </el-form>
      
      <div class="handle-box">
        <el-button
        size="mini"
        @click="resetPWdialog()">Edit</el-button>
      </div>
      <el-dialog
        title="Reset Password"
        :visible.sync="dialogVisible"
        width="700px"
        :before-close="handleClose">
          <el-form :model="resetPasswordForm" ref="resetPasswordForm">
            <el-form-item label="New Password" prop="newPassword" label-width="100px">
              <el-input
                v-model="resetPasswordForm.newPassword"
                type="password"
                auto-complete="off"
                placeholder="Paasword"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
              </el-input>
            </el-form-item>
            <el-form-item label="Confirm New Password" prop="confirmPasswor" label-width="100px">
              <el-input
                v-model="resetPasswordForm.confirmPassword"
                type="password"
                auto-complete="off"
                placeholder="Paasword"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('resetPasswordForm')">Reset Field</el-button>
            <el-button :disabled="hideSaveBtn" type="primary" @click="submitReset('editForm')">Reset Password</el-button>
          </div>
      </el-dialog>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from '../../axios'

export default Vue.extend({
  name: 'UserIndex',
  data() {
    const myAccount: any = {}
    const resetPasswordForm: any = {}
    return {
      myAccount,
      resetPasswordForm,
      dialogVisible: false,
    }
  },
  created() {
    this.getMyAccount()
  },
  methods: {
    getMyAccount() {
      axios.get('/sys/userInfo').then((res: any)=>{
        console.log(res.data)
        this.myAccount = res.data.data
      })
    },
    resetPWdialog() {
      this.dialogVisible = true
    },
    resetForm(formName: string) {
      const refs: any = this.$refs[formName]
      refs.resetFields();
      this.dialogVisible = false
      this.resetPasswordForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    submitReset(formName: string) {
      const formNames :any = this.$refs[formName]
      formNames.validate((valid: any) => {
        if (valid) {
          const { newPassword ,confirmPassword} = this.resetPasswordForm
          if (newPassword === confirmPassword ) {
            axios.post(
              '/sys/user/self/repass',
              {
                username: this.myAccount.username,
                newPassword 
              }
            ).then(
              res => {
                if (res.data.code === 200) {
                  this.$notify({
                    title: '',
                    showClose: true,
                    message: 'Password have change',
                    type: 'success'
                  })
                  this.dialogVisible = false
                }
              }
            )
          } else {
            this.$notify({
              title: '',
              showClose: true,
              message: 'Two Password not match!',
              type: 'error'
            })
          }
        } else {
          return false;
        }
      })
    }
  }
})
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

    /*.el-pagination {*/
    /*    float: right;*/
    /*    margin-top: 5px;*/
    /*}*/

</style>