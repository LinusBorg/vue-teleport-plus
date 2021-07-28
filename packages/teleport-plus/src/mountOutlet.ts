import { createApp, getCurrentInstance, onUnmounted } from 'vue'
import Outlet from './TeleportOutlet.vue'
import { install } from './install'
import type { Coordinator } from './coordinator'

export function mountOutlet<T extends Element>(
  el: string | T,
  coordinator: Coordinator,
  autoUnmount = true
) {
  const vm = getCurrentInstance()!

  const app = createApp(Outlet)

  app._context = {
    ...vm.appContext,
    provides: Object.create((vm as any).provides),
  }

  app.use(install, {
    coordinator,
  })

  app.mount(el)

  if (autoUnmount) {
    onUnmounted(() => app.unmount())
  }

  return () => app.unmount()
}
