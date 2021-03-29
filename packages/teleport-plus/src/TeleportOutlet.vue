<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
} from 'vue'
import { injectCoordinator } from './coordinator'
import { stableSort } from './stableSort'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'DIV',
    },
  },
  setup(props) {
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
      // wait for elements to be in DOM
      await nextTick()
      targets.value.forEach((t) => coordinator.activateTarget(props.name, t))
    })
    onUpdated(async () => {
      // wait for elements to be updated in DOM
      await nextTick()
      targets.value.forEach((t) => coordinator.activateTarget(props.name, t))
    })
    onBeforeUnmount(() => {
      targets.value.forEach((t) => {
        coordinator.deactivateTarget(props.name, t)
        coordinator.bus.emit(t)
      })
    })

    return {
      targets,
    }
  },
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
