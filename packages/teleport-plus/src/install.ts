import { App, toRaw, watch } from 'vue'
import { createCoordinator, coordinatorKey, Coordinator } from './coordinator'
import TeleportOutlet from './TeleportOutlet.vue'
import TeleportSource from './TeleportSource.vue'

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
    teleportOutlet,
    teleportSource,
    coordinator: _coordinator,
  } = Object.assign({}, defaultOptions, options)

  // TODO: skip in node env
  addFallbackTargetElement()

  const coordinator = _coordinator ?? createCoordinator()

  watch(coordinator.outletTargets, (c) => console.log(toRaw(c)), { deep: true })

  teleportSource && app.component(teleportSource, TeleportSource)
  teleportOutlet && app.component(teleportOutlet, TeleportOutlet)

  app.provide(coordinatorKey, coordinator)
}

function addFallbackTargetElement() {
  const el = document.createElement('DIV')
  el.style.display = 'none'
  el.dataset.teleportPlusFallbackTarget = ''
  document.body.append(el)
}
