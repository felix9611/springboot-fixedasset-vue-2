<template>
    <div class="container">
      <div class="handle-box">
        <el-button icon="el-icon-back" circle @click="back"></el-button>
      </div>
      <br>
      <el-form>
        <VueForm
          v-model="formData"
          :schema="formConfig.schema"
          :formProps="formConfig.formProps"
          :formFooter="formConfig.formFooter"
          @on-submit="handlerSubmit"
          @on-cancel="handlerCancel"
        >
        </VueForm>
      </el-form>
    </div>
</template>
<script lang="ts">
/*
import { readJson } from '@/utils/formJsonHelp'
import axios from '@/axios'
import localizeEn from 'ajv-i18n/localize/en'
import { i18n } from '@lljj/vue-json-schema-form'
import VueForm from '@lljj/vue-json-schema-form'

i18n.useLocal(localizeEn)
export default {
  components: {
    VueForm
  },
  data() {
    return {
      formConfig: {},
      formData: {}
    }
  },
  computed: {
    path: {
      get: function() {
        return this.$route.params.path
      }
    },
    mode: {
      get: function() {
        return this.$route.params.mode
      }
    }
  },
  created() {
    console.log(this.path)
    readJson(this.path, this.mode).then((res: any)=> {
      this.formConfig = res
    })
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    handlerSubmit() {
      axios({
        url: this.formConfig.setting.url,
        method: this.formConfig.setting.method,
        data: this.formData
      }).then( (res: any) => {
        this.$notify({
          title: '',
          showClose: true,
          message: `${this.formConfig.setting.method} is successful`,
          type: 'success',
        })

        this.$router.push({ path: `${this.formConfig.routeBackURL}` })
      })
    }

    handlerCancel() {
      this.formData = {}
    }
  },
}
*/
</script>