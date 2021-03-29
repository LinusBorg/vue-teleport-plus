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
  <p>This is a component with test content</p>
  <Button @click="count++">Count ({{ count }})</Button>
</template>
