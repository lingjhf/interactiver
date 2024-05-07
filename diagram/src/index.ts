import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'

// eslint-disable-next-line import/no-unresolved
import 'virtual:uno.css'

import './styles.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(PrimeVue)
app.mount('#root')
