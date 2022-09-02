<template>
  <div class="container">
    <div class="handle-box">
        <el-button icon="el-icon-back" circle @click="back"></el-button>
        <el-button icon="el-icon-circle-plus" circle v-if="readonlyForm === true" @click="startEdit()"></el-button>
    </div>
    <el-form :model="fromContent" ref="editForm" :disabled="readonlyForm">
      <el-row :span="24">
        <el-col :span="18">
          <el-form-item label="Path"  prop="path" label-width="130px">
            <el-input v-model="fromContent.path" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Method"  prop="method" label-width="130px">
            <el-input v-model="fromContent.method" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Mark"  prop="mark" label-width="130px">
        <el-input v-model="fromContent.mark" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Form Json Schema"  prop="formJson" label-width="130px">
        <vue-json-editor v-model="fromContent.formJson.schema" :expandedOnStart="true" ></vue-json-editor>
      </el-form-item>
      <el-row :span="24">
        <el-col :span="12">
          <el-form-item label="API URL Path"  prop="path" label-width="130px">
            <el-input v-model="fromContent.formJson.setting.url" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="API Method"  prop="method" label-width="130px">
            <el-input v-model="fromContent.formJson.setting.method" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Form Props"  prop="formProps" label-width="130px">
        <vue-json-editor v-model="fromContent.formJson.formProps" :expandedOnStart="true" ></vue-json-editor>
      </el-form-item>
      <el-form-item label="Form Footer"  prop="formFooter" label-width="130px">
        <vue-json-editor v-model="fromContent.formJson.formFooter" :expandedOnStart="true" ></vue-json-editor>
      </el-form-item>
      <el-form-item label="Route Back URL"  prop="routeBackURL" label-width="130px">
        <el-input v-model="fromContent.formJson.routeBackURL" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">Reset</el-button>
        <el-button :disabled="hideSaveBtn" type="primary" @click="submitForm('editForm')" v-if="!readonlyForm">{{ fromContent.id? 'Update' : 'Create' }}</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '@/axios'
import moment from 'moment'
import vueJsonEditor from 'vue-json-editor'

@Component({
  components: {
    vueJsonEditor
  }
})
export default class FormSettingForm extends Vue {

  fromContent: any = {}

  readonlyForm: boolean = false

  startEdit() {
    this.readonlyForm = false
  }

  created() {
    if (this.$route.params.id) {
      this.editHandle()
    } else if (!this.$route.params.id) {
      this.readonlyForm = false
    }
  }

  editHandle() {
    axios.get(`/base/form/json/${this.$route.params.id}`).then((res: any) => {
      this.readonlyForm = true
      this.fromContent = res.data.data
      
      const { setting, formJson, ..._fromContent } = this.fromContent
      const newFormJson = JSON.parse(formJson)
      const newSetting = JSON.parse(setting)

      this.fromContent = {
        ..._fromContent,
        setting: newSetting,
        formJson: newFormJson
      }
    })
  }

  back() {
    this.$router.push({ path:'/form/setting' })
  }

  submitForm(formName: string) {
      const { setting, formJson, ..._fromContent } = this.fromContent
      const newFormJson = JSON.stringify(formJson)
      const newSetting = JSON.stringify(setting)

      const saveData = {
        ..._fromContent,
        setting: newSetting,
        formJson: newFormJson
      }

      axios.post(
        `/base/form/json/${this.fromContent.id ? 'update' : 'create'}`,
        saveData
      ).then(
        (res: any) => {
          this.$notify({
            title: '',
            showClose: true,
            message: 'Success to save',
            type: 'success',
          })
          this.back()
        }
      )
  }

  resetForm(formName: string) {
    const refs: any = this.$refs[formName]
    refs.resetFields()
    this.fromContent = {}
    if (this.$route.params.id) {
      this.editHandle()
    }
  }
}
</script>
<style scoped>
.vue-json-editor {
  height: 100%;
}
</style>
