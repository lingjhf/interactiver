import { createApp } from 'vue'

import App from './App.vue'

// eslint-disable-next-line import/no-unresolved
import 'virtual:uno.css'

import './styles.css'

const app = createApp(App)

app.mount('#root')
