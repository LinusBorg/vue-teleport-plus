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
  name: 'TeleportOutlet',
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
    const state = computed(() => coordinator.outletTargets[props.name] ?? {})
    const targets = computed(() => {
      const targets = Object.entries(state.value).map(([name]) => name)
      return stableSort(
        targets,
        (a: string, b: string) => state.value[a].order - state.value[b].order
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
    const onUnmountedHandler = (source: string) => {
      if (state.value[source].mounted) {
        coordinator.switchMountedState(props.name, source, false)
      }
    }

    return {
      targets,
      onMountedHandler,
      onUnmountedHandler,
      state,
    }
  },
})
</script>
<template>
  <template v-if="$slots.wrapper">
    <slot
      name="wrapper"
      v-for="id in targets"
      :enabled="state[id].enabled"
      :data-teleport-plus="id"
      :key="id"
    />
  </template>
  <template v-else>
    <component
      v-for="id in targets"
      v-show="state[id].enabled"
      :is="tag"
      :key="id"
      :data-teleport-plus="id"
    />
  </template>
</template>
