import type { App } from 'vue'
import { createCoordinator, coordinatorKey, Coordinator } from './coordinator'
import TeleportOutletComp from './TeleportOutlet.vue'
import TeleportSourceComp from './TeleportSource.vue'

export interface PluginOptions {
  teleportOutlet?: string | false
  teleportSource?: string | false
  coordinator?: Coordinator
}

const defaultOptions: PluginOptions = {
  teleportOutlet: 'TeleportOutlet',
  teleportSource: 'TeleportSource',
}

export function install(app: App, options: PluginOptions = {}) {
  const {
    teleportOutlet = 'TeleportOutlet',
    teleportSource = 'TeleportSource',
    coordinator: _coordinator,
  } = Object.assign({}, defaultOptions, options)

  // TODO: skip in node env
  addFallbackTargetElement()

  const coordinator = _coordinator ?? createCoordinator()

  teleportSource !== false && app.component(teleportSource, TeleportSourceComp)
  teleportOutlet !== false && app.component(teleportOutlet, TeleportOutletComp)

  app.provide(coordinatorKey, coordinator)
}

function addFallbackTargetElement() {
  const el = document.createElement('DIV')
  el.style.display = 'none'
  el.dataset.teleportPlusFallbackTarget = ''
  document.body.append(el)
}
