<script setup lang="ts">
import { TeleportSource } from '@linusborg/vue-teleport-plus'
import TestContent from '../../components/TestContent.vue'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

// TODO: fixgure out if this should be a helper within the library?
type State =
  | 'enteringSource'
  | 'leavingSource'
  | 'inSource'
  | 'inOutlet'
  | 'leavingOutlet'
  | 'enteringOutlet'
const state: Ref<State> = ref('inSource')
const teleportEnabled = computed(() => /Outlet/.test(state.value))
const show = computed(() => /^(?!leaving).+/.test(state.value))
function steps(action: string) {
  console.log('step: ', action, state.value)
  const current = state.value
  if (action === 'left') {
    state.value =
      current === 'leavingSource' ? 'enteringOutlet' : 'enteringSource'
  } else if (action === 'disable') {
    state.value = 'leavingOutlet'
  } else if (action === 'enable') {
    state.value = 'leavingSource'
  }
}
function toggle() {
  if (teleportEnabled.value) {
    steps('disable')
  } else {
    steps('enable')
  }
}
</script>
<template>
  <div>
    <Button @click="toggle">Toggle</Button>
    <hr />
    <TeleportSource :disabled="!teleportEnabled" to="transition-outlet">
      <transition
        mode="out-in"
        appear
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition-opacity duration-1000"
        leave-active-class="transition-opacity duration-1000"
        :css="true"
        @after-leave="steps('left')"
      >
        <div v-show="show">
          <TestContent />
        </div>
      </transition>
    </TeleportSource>
  </div>
</template>
