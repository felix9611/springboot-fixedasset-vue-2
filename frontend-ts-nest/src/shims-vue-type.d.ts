import { VueConstructor } from 'vue'
import Axios from '@/axios'

declare module 'vue/types/vue' {
  interface VueConstructor {
    _: any
    $axios: Axios
  }
}
declare global {
  interface Window {
    Vue: VueConstructor
  }
}


export default ({ store, Vue }) => {
  Vue.prototype.$axios = Axios
  store.$axios = Axios
}