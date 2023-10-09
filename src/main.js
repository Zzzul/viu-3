// import './assets/main.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "vue-toastification/dist/index.css"

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from "vue-toastification"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const toastOptions = {
    position: "top-center",
    timeout: 2500,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__slideBlurred",
    newestOnTop: true
}

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
