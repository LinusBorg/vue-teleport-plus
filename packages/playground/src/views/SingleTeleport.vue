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
import Source from './SingleTeleport/Source.vue'
import Outlet from './SingleTeleport/Outlet.vue'

export default {
  name: 'SingleTeleport',
  components: {
    Source,
    Outlet,
  },
}
</script>
