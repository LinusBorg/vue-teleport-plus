import type { App } from '@vue/runtime-core'
import Button from './components/Button.vue'
import DemoWrapper from './components/DemoWrapper.vue'
export function components(app: App) {
  app.component('Button', Button)
  app.component('DemoWrapper', DemoWrapper)
}
