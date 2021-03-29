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
  <Button @click="toggle">
    {{ show ? 'Deactivate' : 'Activate' }} Outlet
  </Button>
  <h2>
    Below this line is the TeleportOutlet that should show out teleported
    content when the Source is active.
  </h2>
  <hr class="my-3" />
  <TeleportOutlet v-if="show" name="myOutlet" />
</template>
