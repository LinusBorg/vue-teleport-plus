import { createApp } from 'vue'
import tpplus from '@linusborg/vue-teleport-plus'
import App from './App.vue'
import '@virtual/windi.css'

const app = createApp(App)

app.use(tpplus)
app.mount('#app')
