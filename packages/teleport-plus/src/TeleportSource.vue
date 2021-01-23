<script lang="ts" setup="props">
import {
  computed,
  defineProps,
  getCurrentInstance,
  nextTick,
  onUnmounted,
} from 'vue'
import { injectCoordinator } from './coordinator'

const props = defineProps({
  disabled: {
    type: Boolean,
  },
  name: {
    type: String,
    default: 'teleportSource' + Math.round(Math.random() * 100000),
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

const vm = getCurrentInstance()
const _update = () => {
  vm?.update()
}

const coordinator = injectCoordinator()
const isTargetInDOM = computed(
  () => coordinator.outletTargets[props.to]?.[props.name].active
)
coordinator.addTargetToOutlet(props.to, props.name, props.order)
coordinator.bus.on(props.name, _update)

onUnmounted(async () => {
  const { to, name } = props
  coordinator.bus.off(name, _update)
  await nextTick()
  coordinator.removeTargetFromOutlet(to, name)
})
</script>

<template>
  <teleport
    v-if="!props.disabled && isTargetInDOM"
    :to="props.to"
    :disabled="props.disabled"
  >
    <slot></slot>
  </teleport>
</template>
