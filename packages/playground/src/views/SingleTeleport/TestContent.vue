<script lang="ts">
import { defineComponent, onBeforeUnmount, onUnmounted, ref } from 'vue'
export default defineComponent({
  name: 'TestCounter',
  setup() {
    onBeforeUnmount(() => {
      console.log('TestContent component unmounting')
    })
    onUnmounted(() => {
      console.log('TestContent component has unmounted')
    })

    const count = ref(0)

    return {
      count,
    }
  },
})
</script>

<template>
  <div class="border border-gray-300 m-1 p-2" data-test-content>
    <p class="mt-2 mb-2">This is a component with test content</p>
    <Button @click="count++" data-test-btn="count">Count ({{ count }})</Button>
  </div>
</template>
