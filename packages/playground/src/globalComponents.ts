import type { App } from '@vue/runtime-core'
import Button from './components/Button.vue'
import DemoWrapper from './components/DemoWrapper.vue'
import DemoCard from './components/DemoCard.vue'
export function components(app: App) {
  app.component('Button', Button)
  app.component('DemoWrapper', DemoWrapper)
  app.component('DemoCard', DemoCard)
}
