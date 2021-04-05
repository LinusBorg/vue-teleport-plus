import { inject, InjectionKey, provide, reactive, readonly } from 'vue'
import mitt from 'mitt'

interface OutletTargets {
  [outlet: string]: {
    [source: string]: {
      source: string
      enabled: boolean
      outlet: string
      mounted: boolean
      order: number
    }
  }
}

export function createCoordinator() {
  const outletTargets: OutletTargets = reactive({})
  const bus = mitt()
  /**
   * Called by a TeleportSource to communicate the target Element ID to which it intends to teleport.
   */
  function addConnection(
    outlet: string,
    source: string,
    order: number = Infinity
  ) {
    const outletState = outletTargets[outlet] ?? (outletTargets[outlet] = {})
    outletState[source] = {
      outlet,
      source,
      enabled: true,
      mounted: false,
      order,
    }
  }
  function removeConnection(outlet: string, source: string) {
    const outletState = outletTargets[outlet]
    if (outletState) {
      delete outletState[source]
    }
  }
  function switchEnabledState(
    outlet: string,
    source: string,
    enabled: boolean
  ) {
    const target = outletTargets[outlet]?.[source]
    if (target) {
      target.enabled = enabled
    }
  }

  function switchMountedState(
    outlet: string,
    source: string,
    mounted: boolean
  ) {
    const target = outletTargets[outlet]?.[source]
    if (target) {
      target.mounted = mounted
    }
    if (mounted) bus.emit(target.source)
  }

  return {
    outletTargets: readonly(outletTargets),
    // to be used by TeleportSource
    addConnection,
    removeConnection,
    // to be used by TeleportOutlet
    switchEnabledState,
    switchMountedState,
    bus,
  }
}

export type CoordinatorFactory = typeof createCoordinator
export type Coordinator = ReturnType<CoordinatorFactory>
export type CoordinatorKey = InjectionKey<Coordinator>

export const coordinatorKey = Symbol(
  'TeleportPlusCoordinator'
) as CoordinatorKey

export function provideCoordinator(coordinator: Coordinator) {
  provide(coordinatorKey, coordinator)
}

export function injectCoordinator() {
  const c = inject(coordinatorKey)
  if (!c) {
    throw new Error(
      'injection for TeleportPlus not found. did you install the plugin on the app instance?'
    )
  }
  return c
}
