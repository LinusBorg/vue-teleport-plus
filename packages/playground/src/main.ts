import { createApp } from 'vue'
import { router } from './router'
import TeleportPlus from '@linusborg/vue-teleport-plus'
import { components } from './globalComponents'
import App from './App.vue'
import '@virtual/windi.css'

const app = createApp(App)

app.use(components)
app.use(router)
app.use(TeleportPlus)
app.mount('#app')
