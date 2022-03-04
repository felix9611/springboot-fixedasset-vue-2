<template>
    <div class="container">
      <el-form :model="myAccount" ref="editForm">
        <el-form-item>
          <img :src="myAccount.avatarBase64" width="20%" height="20%"/>
        </el-form-item>
        <el-form-item label="Username"  label-width="100px">
          <el-input v-model="myAccount.username" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="Email"  label-width="100px">
          <el-input v-model="myAccount.email" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="Created At"  label-width="100px">
          <el-input v-model="myAccount.created" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="Last Login At"  label-width="100px">
          <el-input v-model="myAccount.lastLogin" autocomplete="off" readonly></el-input>
        </el-form-item>
      </el-form>
      
      <div class="handle-box">
        <el-button
        size="mini"
        @click="resetPWdialog()">Reset Password</el-button>
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
import axios from '../../axios'
import moment from 'moment'

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UserIndex extends Vue {
  myAccount: any = {}
  resetPasswordForm: any = {}
  dialogVisible: boolean = false

  created() {
    this.getMyAccount()
  }

  getMyAccount() {
      axios.get('/sys/userInfo').then((res: any)=>{
        console.log(res.data)
        this.myAccount = res.data.data

        this.myAccount.created = moment(new Date(this.myAccount.created)).format('DD-MM-YYYY HH:MM')
        this.myAccount.lastLogin = moment(new Date(this.myAccount.lastLogin)).format('DD-MM-YYYY HH:MM')
      })
  }

  resetPWdialog() {
    this.dialogVisible = true
  }

  resetForm(formName: string) {
      const refs: any = this.$refs[formName]
      refs.resetFields()
      this.dialogVisible = false
      this.resetPasswordForm = {}
  }

  handleClose() {
    this.resetForm('editForm')
  }

  submitReset(formName: string) {
      const formNames :any = this.$refs[formName]
      formNames.validate((valid: any) => {
        if (valid) {
          const { newPassword ,confirmPassword } = this.resetPasswordForm
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
                  this.handleClose()
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
          return false
        }
    })
  }
}
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

</style>