<script lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onUnmounted,
  watch,
  // hack for : https://github.com/vuejs/vue-next/issues/2855
  Teleport as teleport_,
  // hack end
  defineComponent,
} from 'vue'
import type { TeleportProps, VNodeProps } from 'vue'
import { injectCoordinator } from './coordinator'

// Hack for: https://github.com/vuejs/vue-next/issues/2855
const Teleport = teleport_ as {
  new (): {
    $props: VNodeProps & TeleportProps
  }
}

function useBus(name: string) {
  const vm = getCurrentInstance()
  const coordinator = injectCoordinator()
  const update = () => {
    // force update synchronously so we can hopefully unmount the portal content
    // before the outlet removes the DOM elements
    // TODO: hack together something to make it work with Transitions?
    vm?.update()
  }
  coordinator.bus.on(name, update)
  onUnmounted(() => coordinator.bus.off(name, update))
}

export default defineComponent({
  name: 'TeleportSource',
  props: {
    disabled: {
      type: Boolean,
    },
    name: {
      type: String,
      default: () => 'teleport-source' + Math.round(Math.random() * 100000),
    },
    to: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: Infinity,
    },
  },
  emits: ['outletMounted'],
  components: {
    Teleport,
  },
  setup(props) {
    const coordinator = injectCoordinator()

    coordinator.addConnection(props.to, props.name, props.order)
    onUnmounted(async () => {
      const { to, name } = props
      await nextTick()
      coordinator.removeConnection(to, name)
    })

    watch(
      () => props.disabled,
      (value) => coordinator.switchEnabledState(props.to, props.name, !value),
      { flush: 'sync' }
    )

    // TODO: can this be replaced with a sync/pre watcher?
    useBus(props.name)

    const isTargetActive = computed(() => {
      const target = coordinator.outletTargets[props.to]?.[props.name]
      return !!target?.mounted && !!target?.enabled
    })

    const selector = computed(() =>
      isTargetActive.value && !props.disabled
        ? `[data-teleport-plus="${props.name}"]`
        : // hack to satify Teleport's need for an existing target element even when disabled
          '[data-teleport-plus-fallback-target]'
    )

    return {
      isTargetActive,
      selector,
    }
  },
})
</script>

<template>
  <component
    :is="'Teleport'"
    v-if="isTargetActive || disabled"
    :to="selector"
    :disabled="disabled"
  >
    <slot></slot>
  </component>
</template>
