import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router'

import 'virtual:uno.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.mount('#root')
