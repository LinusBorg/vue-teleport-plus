<script setup lang="ts">
import {
  computed,
  defineProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
} from 'vue'
import { injectCoordinator } from './coordinator'
import { stableSort } from './stableSort'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'DIV',
  },
})

const coordinator = injectCoordinator()
const targets = computed(() => {
  const state = coordinator.outletTargets[props.name] ?? {}
  const targets = Object.keys(state)
  return stableSort(
    targets,
    (a: string, b: string) => state[a].order - state[b].order
  )
})

onMounted(async () => {
  await nextTick()
  targets.value.forEach((t) => coordinator.activateTarget(props.name, t))
})
onUpdated(async () => {
  await nextTick()
  targets.value.forEach((t) => coordinator.activateTarget(props.name, t))
})
onBeforeUnmount(() => {
  // signal to sources to unmount their teleports
  // I doubt that we can do this in a synchronous way though,
  // so it will likely require additional hacks? at least when leave transitions are involved
  // targets.value.map(t => coordinator.deactivateTarget(t))
  targets.value.forEach((t) => {
    coordinator.deactivateTarget(props.name, t)
    coordinator.bus.emit(t)
  })
})
</script>
<template>
  <template v-if="$slots.wrapper">
    <slot name="wrapper" v-for="id in targets" :id="id" />
  </template>
  <template v-else>
    <component
      v-for="id in targets"
      :is="tag"
      :key="id"
      :data-teleport-plus="id"
    />
  </template>
</template>
