<script lang="ts" setup>
import {
  computed,
  defineProps,
  getCurrentInstance,
  nextTick,
  onUnmounted,
  defineEmit,
  watch,
  // hack for : https://github.com/vuejs/vue-next/issues/2855
  Teleport as teleport_,
  onUpdated,
  // hack end
} from 'vue'
import type { TeleportProps, VNodeProps } from 'vue'
import { injectCoordinator } from './coordinator'

// Hack for: https://github.com/vuejs/vue-next/issues/2855
const Teleport = teleport_ as {
  new (): {
    $props: VNodeProps & TeleportProps
  }
}

const props = defineProps({
  disabled: {
    type: Boolean,
  },
  name: {
    type: String,
    default: 'teleport-source' + Math.round(Math.random() * 100000),
  },
  to: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: Infinity,
  },
})
const emit = defineEmit(['outletMounted'])

const vm = getCurrentInstance()
console.log('vm', vm)
const update = () => {
  console.log('forcing update as outlet unmounts')
  vm?.update()
}

const coordinator = injectCoordinator()
coordinator.addTargetToOutlet(props.to, props.name, props.order)
// when the Outlet unmounts, we get a synchronous event emitted
// which we can use to directly update the Source
// this - hopefully - will allow the teleport to unmount from the target properly
// if that doesn't work, we need to find other workarounds.
coordinator.bus.on(props.name, update)
const isTargetActive = computed(() => {
  const target = coordinator.outletTargets[props.to]?.[props.name]
  return !!target?.active
})

const selector = computed(() =>
  isTargetActive.value && !props.disabled
    ? `[data-teleport-plus="${props.name}"]`
    : '[data-teleport-plus-fallback-target]'
)

watch(
  () => isTargetActive.value,
  (value) => {
    console.log('Source emitting `outletMounted`')
    emit('outletMounted', value)
  }
)

onUpdated(() => {
  console.log(vm)
})

onUnmounted(async () => {
  const { to, name } = props
  coordinator.bus.off(name, update)
  await nextTick()
  coordinator.removeTargetFromOutlet(to, name)
})
</script>

<template>
  <p>disabled: {{ props.disabled }}</p>
  <p>isTargetActive: {{ isTargetActive }}</p>
  <h2>Below this headline is the teleport component.</h2>
  <component
    :is="Teleport"
    v-if="isTargetActive || disabled"
    :to="selector"
    :disabled="props.disabled"
  >
    <slot></slot>
  </component>
</template>
