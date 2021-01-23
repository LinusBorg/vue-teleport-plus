<template>
  <Source />
  <hr />
  <Outlet />
</template>

<script lang="ts">
import Source from './components/Source.vue'
import Outlet from './components/Outlet.vue'

export default {
  name: 'App',
  components: {
    Source,
    Outlet,
  },
}
</script>
