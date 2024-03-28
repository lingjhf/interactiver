import { render } from 'solid-js/web'

import App from './App'
const root = document.getElementById('root')
import 'virtual:uno.css'
import './index.css'

if (root) {
  render(() => <App />, root)
}
