import { VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor {
    _: any
  }
}
declare global {
  interface Window {
    Vue: VueConstructor
  }
}