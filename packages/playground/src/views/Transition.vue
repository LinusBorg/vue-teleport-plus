<script lang="ts">
export default {
  name: 'TransitionsDemo',
}
</script>
<script setup lang="ts">
import DemoWrapper from '../components/DemoWrapper.vue'
import Source from './Transition/Source.vue'
import Outlet from './Transition/Outlet.vue'
</script>
<template>
  <DemoWrapper>
    <template #left>
      <Source />
    </template>
    <template #right>
      <Outlet />
    </template>
  </DemoWrapper>
</template>
