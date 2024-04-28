import { createApp } from 'vue'

import App from './App.vue'
import { registerPlugins } from './plugins'
import { router } from './router'

// eslint-disable-next-line import/no-unresolved
import 'virtual:uno.css'

import './styles.css'

const app = createApp(App)
app.use(router)
registerPlugins(app)
app.mount('#root')
