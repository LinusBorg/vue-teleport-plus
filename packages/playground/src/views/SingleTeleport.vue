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

<script lang="ts">
import Source from '../components/Source.vue'
import Outlet from '../components/Outlet.vue'

export default {
  name: 'App',
  components: {
    Source,
    Outlet,
  },
}
</script>
