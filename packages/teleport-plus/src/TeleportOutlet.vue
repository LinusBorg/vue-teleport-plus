<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
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
      const targets = Object.entries(state)
        .filter(([_, entry]) => entry.enabled)
        .map(([name]) => name)
      return stableSort(
        targets,
        (a: string, b: string) => state[a].order - state[b].order
      )
    })

    onMounted(async () => {
      // wait for elements to be in DOM
      await nextTick()
      targets.value.forEach((t) =>
        coordinator.switchMountedState(props.name, t, true)
      )
    })

    onBeforeUnmount(() => {
      targets.value.forEach((t) => {
        coordinator.switchMountedState(props.name, t, false)
      })
    })

    const onMountedHandler = (t: string) => {
      coordinator.switchMountedState(props.name, t, true)
    }
    const onUnmountedHandler = (t: string) => {
      coordinator.switchMountedState(props.name, t, false)
    }

    return {
      targets,
      onMountedHandler,
      onUnmountedHandler,
    }
  },
})
</script>
<template>
  <template v-if="$slots.wrapper">
    <slot
      name="wrapper"
      v-for="id in targets"
      :data-teleport-plus="id"
      :key="id"
      :onVnodeMounted="() => onMountedHandler(id)"
      :onVnodeBeforeUnmount="() => onUnmountedHandler(id)"
    />
  </template>
  <template v-else>
    <component
      v-for="id in targets"
      :is="tag"
      :key="id"
      :data-teleport-plus="id"
      @vnodeMounted="onMountedHandler(id)"
      @vnodeBeforeUnmount="onUnmountedHandler(id)"
    />
  </template>
</template>
