
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

import { store } from './store'
// import ElementUI from 'element-ui'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Axios from './axios'
import VueAxios from 'vue-axios'

import { messages } from './components/common/i18n'
// import locale from 'element-ui/lib/locale/lang/en'
import VJsoneditor from 'v-jsoneditor'
import vuetify from './plugins/vuetify'

import './assets/css/theme-green/index.css'
import './assets/css/icon.css'
import './assets/icons'
import './components/common/directives'
import 'babel-polyfill'

import VueBase64FileUpload from 'vue-base64-file-upload'
import VueApexCharts from 'vue-apexcharts'
// import VueHtmlToPaper from 'vue-html-to-paper'
import FormBuilderPlugin from '@fext/vue-form-builder'

const app = createApp(App).use(router as any)

/*

// app.prototype.$htmlToPaper = VueHtmlToPaper


app.config.productionTip = false


*/

// app.use(VueCompositionApi)
app.use(FormBuilderPlugin)
// app.use(VueHtmlToPaper)
// app.use(VueApexCharts)
// app.component('apexchart', VueApexCharts)
app.use(VueBase64FileUpload)
app.use(VJsoneditor)

// app.use(ElementPlus)


app.mount('#app')
// app.prototype.$axios = Axios

/*
Vue.use(VueCompositionApi)
Vue.use(FormBuilderPlugin)
Vue.use(VueHtmlToPaper)
Vue.prototype.$htmlToPaper = VueHtmlToPaper

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueBase64FileUpload)
Vue.config.productionTip = false
Vue.use(VJsoneditor)
Vue.use(VueI18n)
Vue.use(ElementUI, { locale })

Vue.prototype.$axios = Axios
*/


// require('./mock.js')

/*
process.env.VUE_APP_HTTPS = 'http://localhost/fixedasset-vue'
new Vue({
    vuetify,
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')
*/
