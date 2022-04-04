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
        @click="resetAvatar()">Change Avatar</el-button>
      </div>
      
      <div class="handle-box">
        <el-button
        size="mini"
        @click="resetPWdialog()">Reset Password</el-button>
      </div>

      <div class="handle-box">
        <el-table
          ref="multipleTable"
          :data="loginRecords"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="ipAddress"
            label="IP Address">
            </el-table-column>
            <el-table-column
            prop="loginTime"
            label="Login Time">
            </el-table-column>
          <el-table-column
            prop="loginStatus"
            label="Status">
            </el-table-column>
            
        </el-table>
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


      <el-dialog
        title="Change Avatar"
        :visible.sync="dialogUploadVisible"
        width="700px"
        :before-close="handleClose">
          <el-upload
              class="upload-demo"
              :auto-upload="false"
              :file-list="fileList"
              :on-change="onChangeUpload"
              :on-remove="removeUploaded"
            >
            <div slot="tip" class="el-upload__tip">Only upload one picture on JPG or PNG</div>
            <el-button size="small" type="primary">Upload</el-button>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changeAvatar()">Upload</el-button>
          </div>
      </el-dialog>
    </div>
</template>
<script lang="ts">
import axios from '@/axios'
import moment from 'moment'
import { uploadImgToBase64 } from '@/utils/uploadImgToBase64'
import { Component, Vue } from 'vue-property-decorator'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'

@Component
export default class UserIndex extends Vue {
  // myAccount: any = {}
  get myAccount(): any {
    return this.$store.state.userProfile
  }
  resetPasswordForm: any = {}
  dialogVisible: boolean = false
  fileList: any = []
  fileBase64Data: string = ''

  dialogUploadVisible: boolean = false

  loginRecords: any = []

  created() {
    this.getMyAccount()
  }

  getMyAccount() {
    axios.get('/sys/userInfo').then((res: any)=>{
      const data = res.data.data
      this.myAccount.username = data.username
      this.myAccount.created = moment(new Date(data.created)).format('DD-MM-YYYY HH:MM')
      this.myAccount.lastLogin = moment(new Date(data.lastLogin)).format('DD-MM-YYYY HH:MM')
      this.getLoginRecord()
    })
    
  }

  getLoginRecord() {
    const ins = this.myAccount.username
    axios.post(`/sys/user/listLoginRecord/${ins}`).then(
      (res: any) => {
        this.loginRecords = res.data.data.records
        this.loginRecords.forEach(
          (re: any) => {
            const loginTimeNew = moment(new Date(re.loginTime)).format('DD-MM-YYYY HH:MM:ss')
            re['loginTime'] = loginTimeNew
            return re
          }
        )
      }
    )
  }

  resetPWdialog() {
    this.dialogVisible = true
  }

  resetAvatar() {
    this.dialogUploadVisible = true
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

  onChangeUpload(file: UploadFile) {
        let testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const isJpg = testmsg === 'jpg' || testmsg === 'png' || testmsg === 'JPG' || testmsg === 'PNG'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJpg) {
            this.fileList = this.fileList.filter(v => v.uid !== file.uid)
            this.$message.error('Only Upload jpg and png!')
        }
        if (!isLt2M) {
            this.fileList = this.fileList.filter(v => v.uid !== file.uid)
            this.$message.error('File size cannot over 2MB!')
        }
        if (isJpg && isLt2M){
            this.fileList.push(file)
        }
        if (this.fileList.length > 1) {
            this.$message.error('Cannot upload more than one pcture!')
        }
        this.imgToBase64()
        // return isJpg && isLt2M;
    }

    imgToBase64() {
        this.fileList.map(async (file: any) => {
            const response: any = await uploadImgToBase64(file.raw)
            const dataBase64: string = response.data
            this.fileBase64Data = dataBase64
            console.log(this.fileBase64Data)
            // const test = response as never
        })
    }

    changeAvatar() {
        axios.put('/sys/user/updateIcon', 
        {
          id: this.myAccount.id,
          avatarBase64: this.fileBase64Data
        }).then((res: any) => {
            this.$store.commit('setUserProfile', { ...this.myAccount, avatarBase64: this.fileBase64Data })
            this.getMyAccount()
            this.$notify({
              title: '',
              showClose: true,
              message: 'Save success',
              type: 'success',
            })
            this.dialogUploadVisible = false
            this.handleClose()
        })
    }
}
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

</style>