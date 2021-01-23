import { App } from 'vue'
import TeleportOutlet from './TeleportOutlet.vue'
import TeleportSource from './TeleportSource.vue'
import { createCoordinator, coordinatorKey } from './coordinator'

export default function install(app: App) {
  const coordinator = createCoordinator()
  app.provide(coordinatorKey, coordinator)
  console.log(coordinator)
}

export { install, TeleportOutlet, TeleportSource }
