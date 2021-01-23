<script setup lang="ts">
import { TeleportSource } from '@linusborg/vue-teleport-plus'
import { ref } from 'vue'

const disabled = ref(true)
const toggle = () => (disabled.value = !disabled.value)
</script>

<template>
  <h1>This is where we send content from</h1>
  <button @click="toggle" class="border-green-400 border-2 rounded px-3 py-2">
    {{ disabled ? 'Activate' : 'Deactivate' }}
    Source
  </button>
  <hr />
  <TeleportSource to="myOutlet" :disabled="disabled">
    <p>this is our content we want to teleport</p>
  </TeleportSource>
</template>
