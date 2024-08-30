import Vue, { VueConstructor } from 'vue'
import axios from './Axios'

declare module 'vue/types/vue' {
  interface VueConstructor {
    $http: typeof axios
  }
}

declare global {
  interface Window {
    Vue: VueConstructor
  }
}