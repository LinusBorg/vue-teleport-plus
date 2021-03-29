<template>
  <div class="flex justify-around">
    <div
      class="flex-grow-0 flex-shrink p-3 m-3 border border-gray-300 shadow-md"
      style="max-width: 500px"
    >
      <slot name="left" />
    </div>
    <div
      class="flex-grow-0 flex-shrink p-3 m-3 border border-gray-300 shadow-md"
      style="max-width: 500px"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DemoWrapper',
  setup() {},
})
</script>
