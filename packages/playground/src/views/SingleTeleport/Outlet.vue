<script lang="ts">
import { TeleportOutlet } from '@linusborg/vue-teleport-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    TeleportOutlet,
  },
  setup() {
    const show = ref(true)
    const toggle = () => (show.value = !show.value)

    return {
      show,
      toggle,
    }
  },
})
</script>

<template>
  <div data-test-outlet-wrapper>
    <h3 class="text-xl font-bold mb-3">Outlet</h3>
    <Button @click="toggle">
      {{ show ? 'Deactivate' : 'Activate' }} Outlet
    </Button>
    <p class="mt-1 mb-2">
      Below this line is the TeleportOutlet that should show out teleported
      content when the Source is active.
    </p>
    <hr class="my-3" />
    <TeleportOutlet v-if="show" name="myOutlet" />
  </div>
</template>
