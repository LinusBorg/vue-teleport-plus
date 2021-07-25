<script lang="ts">
import { TeleportSource } from '@linusborg/vue-teleport-plus'
import TestContent from '../../components/TestContent.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SingleSource',
  components: {
    TeleportSource,
    TestContent,
  },
  setup() {
    const disabled = ref(true)
    const toggle = () => (disabled.value = !disabled.value)

    return {
      disabled,
      toggle,
    }
  },
})
</script>

<template>
  <h3 class="text-xl font-bold">Source</h3>
  <p class="mb-2 mt-1">This is where content comes from</p>
  <Button @click="toggle" data-test-btn="toggle">
    {{ disabled ? 'Teleport to Outlet' : 'Move content back' }}
  </Button>
  <hr class="my-3" />
  <div data-test="source1">
    <TeleportSource to="myOutlet" :disabled="disabled">
      <p class="mt-1 mb-2">This is our content we want to teleport:</p>
      <TestContent />
    </TeleportSource>
  </div>
</template>
