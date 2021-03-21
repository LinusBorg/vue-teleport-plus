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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
