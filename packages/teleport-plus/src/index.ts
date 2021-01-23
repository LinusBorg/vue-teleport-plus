import { App } from 'vue'
import TeleportOutlet from './TeleportOutlet.vue'
import TeleportSource from './TeleportSource.vue'
import { createCoordinator, coordinatorKey } from './coordinator'

export default function install(app: App) {
  app.provide(coordinatorKey, createCoordinator())
}

export { install, TeleportOutlet, TeleportSource }
