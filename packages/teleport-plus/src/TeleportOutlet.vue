<script setup lang="ts">
import {
  computed,
  defineProps,
  nextTick,
  onBeforeUnmount,
  onBeforeUpdate,
  onUpdated,
} from 'vue'
import { injectCoordinator } from './coordinator'
import { stableSort } from './stabelSort'
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
  const state = coordinator.outletTargets[props.name]
  const targets = Object.keys(state)
  return stableSort(
    targets,
    (a: string, b: string) => state[a].order - state[b].order
  )
})

const elementsRefs: HTMLElement[] = []
const addElement = (el: HTMLElement) => elementsRefs.push(el)

onBeforeUpdate(() => {
  elementsRefs.length = 0
})
onUpdated(async () => {
  // after nextTick:
  // coordinator.updateActiveTargets(targets.value)
  await nextTick()
  targets.value.forEach((t) => coordinator.activateTarget(props.name, t))
})
onBeforeUnmount(() => {
  // signal to sources to unmount their teleports
  // I doubt that we can do this in a synchronous way though,
  // so it will likely require additional hacks? at least when leave transitions are involved
  // targets.value.map(t => coordinator.deactivateTarget(t))
  targets.value.forEach((t) => coordinator.deactivateTarget(props.name, t))
})
</script>
<template>
  <component
    v-for="id in targets"
    :key="id"
    :id="id"
    :is="tag"
    :ref="addElement"
  />
</template>
