<script lang="ts">
import { TeleportSource } from '@linusborg/vue-teleport-plus'
import TestContent from './TestContent.vue'
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
  <h1 data-test="source-h1">This is where we send content from</h1>
  <Button @click="toggle">
    {{ disabled ? 'Activate' : 'Deactivate' }}
    Source
  </Button>
  <hr class="my-3" />
  <TeleportSource to="myOutlet" :disabled="disabled">
    <p>this is our content we want to teleport</p>
    <TestContent />
  </TeleportSource>
</template>
