<script lang="ts" setup>
import {
  computed,
  defineProps,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  onUpdated,
} from 'vue'
import { injectCoordinator } from './coordinator'

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
const selector = computed(() => `[data-teleport-plus="${props.name}"]`)
const vm = getCurrentInstance()
const update = () => {
  vm?.update()
}

const coordinator = injectCoordinator()
const isTargetInDOM = computed(() => {
  const target = coordinator.outletTargets[props.to]?.[props.name]
  return !!target?.active && !!document.querySelector(selector.value)
})
coordinator.addTargetToOutlet(props.to, props.name, props.order)
// when the Outlet unmounts, we get a synchronous event emitted
// which we can use to directly update the Source
// this - hopefully - will allow the teleport to unmount from the target properly
// if that doesn't work, we need to find other workarounds.
coordinator.bus.on(props.name, update)

onUnmounted(async () => {
  const { to, name } = props
  coordinator.bus.off(name, update)
  await nextTick()
  coordinator.removeTargetFromOutlet(to, name)
})
</script>

<template>
  <h2>Below this headline is the teleport component.</h2>
  <teleport v-if="isTargetInDOM" :to="selector" :disabled="props.disabled">
    <slot></slot>
  </teleport>
</template>
