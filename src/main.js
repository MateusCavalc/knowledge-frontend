import { createApp } from 'vue';
import App from './App.vue'

import 'font-awesome/css/font-awesome.css'
import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import BootstrapVue from 'bootstrap-vue-3'
import store from './config/store'
import router from './config/router'
import Gravatar from "vue3-gravatar"
import Toast, { TYPE } from "vue-toastification";

import '@/config/interceptors'

const app = createApp(App)

app.use(BootstrapVue)
app.use(store)
app.use(router)
app.use(Gravatar)

app.use(Toast, {
    iconPack: 'fontawesome',
    timeout: 3000,
    toastDefaults: {
        [TYPE.ERROR]: {
            timeout: 5000,
            hideProgressBar: true,
            pauseOnFocusLoss: false,
        },
        [TYPE.SUCCESS]: {
            timeout: 1500,
            hideProgressBar: true,
            pauseOnFocusLoss: false,
        }
    }
})

app.mount('#app')
