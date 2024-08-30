import axios from '@/axios'

export function readJson(path: string, method: string, jsonArray?: any) {
  // if (!path && !method) return this.$message.error('WTF?Why have no path and method????')
   return axios.post('/base/form/json/read', { path, method }).then(
    (res: any) => {
      let formJsonArray: any = []
      formJsonArray = JSON.parse(res.data.data.formJson)
      return formJsonArray
    }
  )
 
}