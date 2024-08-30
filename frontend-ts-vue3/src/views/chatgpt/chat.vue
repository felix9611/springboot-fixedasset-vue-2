<template>
    <div class="container">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="Self Box"  prop="selfBox" label-width="100px">
          <el-input type="textarea" v-model="editForm.text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-left: 100px;">
        <el-button @click="sendForm('editForm')">Send</el-button>
      </div>

      <div class="gpt-res">
        <div class="gpt-content">
          <p v-html="gptOutput"></p>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import bus from '../../components/common/bus'
import axios from 'axios'
import { openaiToken, orgId } from '@/utils/openai_token'

export default {
  name: 'ChatGPTChat',
  data() {
    return {
      editForm: {},
      gptOutput: ''
    }
  },
  methods: {
    sendForm(formName: string) {
      const refs: any = this.$refs[formName]
      refs.validate(async (valid: any) => {
        if (valid) {

          axios(
            {
              method: 'post',
              baseURL: 'https://api.openai.com/v1/chat/completions',
              headers: {
                Authorization: openaiToken,
                'OpenAI-Organization': orgId,
                'Content-Type': 'application/json'
              },
              data: {
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: this.editForm.text}],
              }
            }
          ).then(
            (rest: any) => {
              const data = rest.data.choices
              const message = data[0]

              console.log(message)

              const answer = message.message.content

              this.gptOutput = `<div>${answer.replace(/\n/g, '<br/>')}</div>`
            }
          )

          
        }
      })
    }
  }
}
</script>
<style>
.gpt-res {
  padding-top: 50px;
}

.gpt-content {
  border-style: dashed;
  padding: 20px 20px 20px 20px;
}
</style>
