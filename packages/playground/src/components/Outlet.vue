<script setup lang="ts">
import { TeleportOutlet } from '@linusborg/vue-teleport-plus'
import { ref } from 'vue'

const show = ref(true)
const toggle = () => (show.value = !show.value)
</script>

<template>
  <button @click="toggle" class="border-green-400 border-2 rounded px-3 py-2">
    {{ show ? 'Deactivate' : 'Activate' }} Outlet
  </button>
  <h2>
    Below this line is the TeleportOutlet that should show out teleported
    content when the Source is active.
  </h2>
  <TeleportOutlet v-if="show" name="myOutlet" />
</template>
