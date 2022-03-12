import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import axios from './axios'
import { messages } from './components/common/i18n'
import locale from 'element-ui/lib/locale/lang/en'
import VJsoneditor from 'v-jsoneditor'

import './assets/css/theme-green/index.css'
import './assets/css/icon.css'
import './assets/icons'
import './components/common/directives'
import 'babel-polyfill'

import VueBase64FileUpload from 'vue-base64-file-upload'
import VueApexCharts from 'vue-apexcharts'
import VueHtmlToPaper from 'vue-html-to-paper'

Vue.use(VueHtmlToPaper)
Vue.prototype.$htmlToPaper = VueHtmlToPaper

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueBase64FileUpload)
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(VJsoneditor)
Vue.use(VueI18n)
Vue.use(ElementUI, { locale })



// require('./mock.js')
const i18n = new VueI18n({
    locale: 'en',
    messages
})
process.env.VUE_APP_HTTPS = 'http://localhost/fixedasset-vue'
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')