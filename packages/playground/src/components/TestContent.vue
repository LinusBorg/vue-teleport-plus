<script lang="ts" setup>
import { onBeforeUnmount, onUnmounted } from 'vue'

onBeforeUnmount(() => {
  console.log('TestContent component unmounting')
})
onUnmounted(() => {
  console.log('TestContent component has unmounted')
})
</script>

<template>
  <p>This is a component with test content</p>
</template>
